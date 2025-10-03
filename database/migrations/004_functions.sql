-- Fungsi-fungsi tambahan untuk Website E-commerce Furniture

-- Fungsi untuk menambahkan poin loyalitas ke pengguna
CREATE OR REPLACE FUNCTION add_loyalty_points(user_id UUID, points INTEGER, reason TEXT, related_entity_id UUID DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
  -- Tambahkan poin ke profil pengguna
  UPDATE profiles 
  SET loyalty_points = loyalty_points + points 
  WHERE id = user_id;

  -- Simpan log poin loyalitas
  INSERT INTO loyalty_points_log (user_id, points_awarded, reason, related_entity_id)
  VALUES (user_id, points, reason, related_entity_id);
END;
$$ LANGUAGE plpgsql;

-- Fungsi untuk mendapatkan rekomendasi produk berdasarkan kategori
CREATE OR REPLACE FUNCTION get_product_recommendations(product_id UUID, limit_count INTEGER DEFAULT 4)
RETURNS SETOF products AS $$
BEGIN
  RETURN QUERY
  SELECT p.*
  FROM products p
  WHERE p.category_id = (SELECT category_id FROM products WHERE id = product_id)
    AND p.id != product_id
    AND p.is_active = true
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Fungsi untuk mendapatkan statistik produk
CREATE OR REPLACE FUNCTION get_product_stats(product_id UUID)
RETURNS TABLE(
  total_reviews INTEGER,
  average_rating NUMERIC,
  total_wishlist_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(r.id)::INTEGER AS total_reviews,
    COALESCE(AVG(r.rating), 0)::NUMERIC AS average_rating,
    (SELECT COUNT(*) FROM wishlists w WHERE w.product_id = product_id)::INTEGER AS total_wishlist_count
  FROM products p
  LEFT JOIN reviews r ON r.product_id = p.id
  WHERE p.id = product_id
  GROUP BY p.id;
END;
$$ LANGUAGE plpgsql;