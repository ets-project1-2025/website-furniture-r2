-- Konfigurasi Storage untuk Website E-commerce Furniture

-- Membuat bucket untuk menyimpan gambar produk
INSERT INTO storage.buckets (id, name, owner, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('product_images', 'product_images', null, true, false, 5242880, 
        '{"image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif"}')
ON CONFLICT (id) DO NOTHING;

-- Membuat bucket untuk menyimpan gambar lookbook
INSERT INTO storage.buckets (id, name, owner, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('lookbook_images', 'lookbook_images', null, true, false, 5242880, 
        '{"image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif"}')
ON CONFLICT (id) DO NOTHING;

-- Membuat bucket untuk menyimpan gambar konten yang diunggah pengguna
INSERT INTO storage.buckets (id, name, owner, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('user_content', 'user_content', null, true, false, 5242880, 
        '{"image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif"}')
ON CONFLICT (id) DO NOTHING;

-- Kebijakan untuk storage
CREATE POLICY "Public access for product images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'product_images');
CREATE POLICY "Admin access for product images" ON storage.objects FOR ALL TO authenticated USING (
  bucket_id = 'product_images' AND 
  (auth.role() = 'service_role' OR 
   (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND full_name = 'Admin')))
);

CREATE POLICY "Public access for lookbook images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'lookbook_images');
CREATE POLICY "Admin access for lookbook images" ON storage.objects FOR ALL TO authenticated USING (
  bucket_id = 'lookbook_images' AND 
  (auth.role() = 'service_role' OR 
   (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND full_name = 'Admin')))
);

CREATE POLICY "User and public access for user content" ON storage.objects FOR SELECT TO public USING (bucket_id = 'user_content');
CREATE POLICY "Users can upload own content" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'user_content' AND (auth.uid() = owner OR auth.role() = 'service_role')
);
CREATE POLICY "Users can update own content" ON storage.objects FOR UPDATE TO authenticated USING (
  bucket_id = 'user_content' AND (auth.uid() = owner OR auth.role() = 'service_role')
);
CREATE POLICY "Users can delete own content" ON storage.objects FOR DELETE TO authenticated USING (
  bucket_id = 'user_content' AND (auth.uid() = owner OR auth.role() = 'service_role')
);