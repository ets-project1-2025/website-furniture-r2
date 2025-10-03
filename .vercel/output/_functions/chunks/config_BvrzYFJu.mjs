// src/i18n/config.js

const defaultLocale = 'id';

const getMessages = (locale) => {
  const messages = {
    id: {
      // Halaman Utama
      'home_title': 'WIDI Furniture | Furniture Modern',
      'home_welcome': 'Selamat Datang di WIDI Furniture',
      'home_description': 'Temukan furniture modern dan indah untuk rumah Anda.',
      
      // Navigasi
      'nav_home': 'Beranda',
      'nav_products': 'Produk',
      'nav_about': 'Tentang',
      'nav_contact': 'Kontak',
      'nav_login': 'Masuk',
      'nav_profile': 'Profil',
      'nav_logout': 'Keluar',
      
      // Admin Dashboard
      'admin_dashboard_title': 'Dasbor Admin',
      'admin_products': 'Produk',
      'admin_categories': 'Kategori',
      'admin_users': 'Pengguna',
      'admin_dashboard': 'Dasbor',
      
      // Produk
      'products_title': 'Produk Kami',
      'products_filter_by_category': 'Filter berdasarkan Kategori',
      'products_all': 'Semua Produk',
      'product_details': 'Detail Produk',
      'product_price': 'Harga',
      'product_description': 'Deskripsi',
      'product_category': 'Kategori',
      'product_add_to_cart': 'Tambah ke Keranjang',
      'product_add_to_wishlist': 'Tambah ke Favorit',
      'product_dimensions': 'Dimensi',
      'product_materials': 'Material',
      'product_reviews': 'Ulasan Pelanggan',
      'product_related': 'Mungkin Anda Suka',
      
      // Kategori
      'categories_title': 'Manajemen Kategori',
      'category_name': 'Nama Kategori',
      'category_slug': 'Slug',
      'category_parent': 'Kategori Induk',
      'category_actions': 'Tindakan',
      'category_top_level': 'Tidak ada induk (Kategori tingkat atas)',
      'category_no_parent': 'Tidak ada induk',
      
      // Produk CRUD
      'products_management': 'Manajemen Produk',
      'product_name': 'Nama Produk',
      'product_description': 'Deskripsi',
      'product_price': 'Harga',
      'product_category': 'Kategori',
      'product_is_active': 'Produk Aktif',
      'product_materials': 'Material',
      'product_length': 'Panjang (cm)',
      'product_width': 'Lebar (cm)',
      'product_height': 'Tinggi (cm)',
      'product_create': 'Buat Produk',
      'product_update': 'Perbarui Produk',
      'product_add_new': 'Tambah Produk Baru',
      'product_edit': 'Edit Produk',
      'product_delete': 'Hapus Produk',
      'product_confirm_delete': 'Ya, saya ingin menghapus produk ini',
      'product_cancel': 'Batal',
      
      // Kategori CRUD
      'category_add_new': 'Tambah Kategori Baru',
      'category_edit': 'Edit Kategori',
      'category_update': 'Perbarui Kategori',
      'category_create': 'Buat Kategori',
      'category_confirm_delete': 'Ya, saya ingin menghapus kategori ini',
      
      // Login
      'login_title': 'Masuk Admin',
      'login_email': 'Email',
      'login_password': 'Kata Sandi',
      'login_button': 'Masuk',
      'login_back_to_home': 'Kembali ke Beranda',
      
      // Footer
      'footer_copyright': 'Hak Cipta',
      
      // Umum
      'button_save': 'Simpan',
      'button_cancel': 'Batal',
      'required_field': '* wajib diisi',
      'no_reviews': 'Belum ada ulasan. Jadilah yang pertama memberi ulasan produk ini!',
      'share_product': 'Bagikan Produk',
      'back_to_products': 'Kembali ke Produk',
      'continue_shopping': 'Lanjutkan Belanja',
      'featured_products': 'Produk Pilihan',
      'continue_reading': 'Lanjutkan Membaca',
      'read_more': 'Baca Selengkapnya',
      'no_products': 'Tidak ada produk tersedia saat ini.',
    },
    en: {
      // Home Page
      'home_title': 'WIDI Furniture | Modern Furniture',
      'home_welcome': 'Welcome to WIDI Furniture',
      'home_description': 'Discover beautiful and modern furniture for your home.',
      
      // Navigation
      'nav_home': 'Home',
      'nav_products': 'Products',
      'nav_about': 'About',
      'nav_contact': 'Contact',
      'nav_login': 'Login',
      'nav_profile': 'Profile',
      'nav_logout': 'Logout',
      'nav_admin': 'Admin',
      
      // Admin Dashboard
      'admin_dashboard_title': 'Admin Dashboard',
      'admin_products': 'Products',
      'admin_categories': 'Categories',
      'admin_users': 'Users',
      'admin_dashboard': 'Dashboard',
      
      // Products
      'products_title': 'Our Products',
      'products_filter_by_category': 'Filter by Category',
      'products_all': 'All Products',
      'product_details': 'Product Details',
      'product_price': 'Price',
      'product_description': 'Description',
      'product_category': 'Category',
      'product_add_to_cart': 'Add to Cart',
      'product_add_to_wishlist': 'Add to Wishlist',
      'product_dimensions': 'Dimensions',
      'product_materials': 'Materials',
      'product_reviews': 'Customer Reviews',
      'product_related': 'You May Also Like',
      
      // Categories
      'categories_title': 'Categories Management',
      'category_name': 'Category Name',
      'category_slug': 'Slug',
      'category_parent': 'Parent Category',
      'category_actions': 'Actions',
      'category_top_level': 'No parent (Top-level category)',
      'category_no_parent': 'No parent',
      
      // Product CRUD
      'products_management': 'Products Management',
      'product_name': 'Product Name',
      'product_description': 'Description',
      'product_price': 'Price',
      'product_category': 'Category',
      'product_is_active': 'Active Product',
      'product_materials': 'Materials',
      'product_length': 'Length (cm)',
      'product_width': 'Width (cm)',
      'product_height': 'Height (cm)',
      'product_create': 'Create Product',
      'product_update': 'Update Product',
      'product_add_new': 'Add New Product',
      'product_edit': 'Edit Product',
      'product_delete': 'Delete Product',
      'product_confirm_delete': 'Yes, I want to delete this product',
      'product_cancel': 'Cancel',
      
      // Category CRUD
      'category_add_new': 'Add New Category',
      'category_edit': 'Edit Category',
      'category_update': 'Update Category',
      'category_create': 'Create Category',
      'category_confirm_delete': 'Yes, I want to delete this category',
      
      // Login
      'login_title': 'Admin Login',
      'login_email': 'Email',
      'login_password': 'Password',
      'login_button': 'Login',
      'login_back_to_home': 'Back to Home',
      
      // Footer
      'footer_copyright': 'Copyright',
      
      // General
      'button_save': 'Save',
      'button_cancel': 'Cancel',
      'required_field': '* required field',
      'no_reviews': 'No reviews yet. Be the first to review this product!',
      'share_product': 'Share Product',
      'back_to_products': 'Back to Products',
      'continue_shopping': 'Continue Shopping',
      'featured_products': 'Featured Products',
      'continue_reading': 'Continue Reading',
      'read_more': 'Read More',
      'no_products': 'No products available at the moment.',
    }
  };
  
  return messages[locale] || messages['id']; // Default to Indonesian if locale not found
};

export { defaultLocale as d, getMessages as g };
