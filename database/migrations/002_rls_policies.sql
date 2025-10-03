-- Kebijakan RLS (Row Level Security) untuk Website E-commerce Furniture

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