-- Skema Database untuk Website E-commerce Furniture

-- Tabel profiles - menyimpan data tambahan untuk pengguna (admin & pelanggan)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT,
  avatar_url TEXT,
  loyalty_points INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);

-- Tabel categories - untuk mengelompokkan produk secara hierarkis
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
);

-- Tabel products - untuk semua detail produk
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  dimensions JSONB, -- Untuk menyimpan panjang, lebar, tinggi dalam format JSON
  materials TEXT[], -- Array untuk menyimpan jenis bahan
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  PRIMARY KEY (id)
);

-- Tabel product_images - menghubungkan satu produk dengan banyak gambar
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

-- Tabel reviews - untuk ulasan dan rating dari pelanggan
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  PRIMARY KEY (id),
  UNIQUE (product_id, user_id) -- Satu user hanya bisa memberi satu review per produk
);

-- Tabel wishlists - untuk daftar produk favorit pelanggan
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (id),
  UNIQUE (user_id, product_id) -- Untuk mencegah produk yang sama ditambahkan ke wishlist lebih dari sekali
);

-- Tabel loyalty_points_log - untuk riwayat penambahan poin
CREATE TABLE IF NOT EXISTS loyalty_points_log (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  points_awarded INTEGER NOT NULL,
  reason TEXT NOT NULL, -- alasan poin diberikan (misalnya: "review produk", "pembelian", dll)
  related_entity_id UUID, -- ID entitas terkait (misalnya ID review jika poin dari review)
  PRIMARY KEY (id)
);

-- Trigger untuk membuat profil otomatis saat user register
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Policy untuk mengizinkan pengguna membaca profil mereka sendiri dan admin membaca semua profil
CREATE POLICY "Profiles are viewable by users who created them" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy untuk produk - publik bisa lihat, admin bisa CRUD
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage products" ON products
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND full_name = 'Admin'))
  );

-- Policy untuk kategori - publik bisa lihat, admin bisa CRUD
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage categories" ON categories
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND full_name = 'Admin'))
  );

-- Policy untuk product_images - publik bisa lihat, admin bisa CRUD
CREATE POLICY "Product images are viewable by everyone" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage product images" ON product_images
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND full_name = 'Admin'))
  );

-- Policy untuk reviews - publik bisa lihat, pengguna bisa CRUD own review
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own reviews" ON reviews
  FOR ALL USING (auth.uid() = user_id);

-- Policy untuk wishlists - pengguna bisa CRUD own wishlist
CREATE POLICY "Users can manage own wishlist" ON wishlists
  FOR ALL USING (auth.uid() = user_id);

-- Policy untuk loyalty_points_log - pengguna bisa lihat logs mereka sendiri
CREATE POLICY "Users can view own loyalty points history" ON loyalty_points_log
  FOR SELECT USING (auth.uid() = user_id);