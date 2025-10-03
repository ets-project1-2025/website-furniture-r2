-- Skema untuk fitur "Shop the Look" pada website E-commerce Furniture

-- Tabel lookbook_galleries - untuk menyimpan galeri lookbook
CREATE TABLE IF NOT EXISTS lookbook_galleries (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  PRIMARY KEY (id)
);

-- Tabel lookbook_hotspots - untuk menyimpan data hotspot pada gambar lookbook
CREATE TABLE IF NOT EXISTS lookbook_hotspots (
  id UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  gallery_id UUID NOT NULL REFERENCES lookbook_galleries(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  coordinates JSONB, -- Untuk menyimpan posisi x,y dalam format JSON
  hotspot_label TEXT, -- Label untuk hotspot (misalnya: "Chair", "Table", dll)
  PRIMARY KEY (id)
);

-- Kebijakan RLS untuk lookbook_galleries - publik bisa lihat, admin bisa CRUD
CREATE POLICY "Lookbook galleries are viewable by everyone" ON lookbook_galleries
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage lookbook galleries" ON lookbook_galleries
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND full_name = 'Admin'))
  );

-- Kebijakan RLS untuk lookbook_hotspots - publik bisa lihat, admin bisa CRUD
CREATE POLICY "Lookbook hotspots are viewable by everyone" ON lookbook_hotspots
  FOR SELECT USING (
    (SELECT is_active FROM lookbook_galleries lg WHERE lg.id = lookbook_hotspots.gallery_id) = true
  );

CREATE POLICY "Admin can manage lookbook hotspots" ON lookbook_hotspots
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND full_name = 'Admin'))
  );