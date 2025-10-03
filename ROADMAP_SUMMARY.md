### **Project Summary: Pembangunan E-commerce Furniture Modern**

**1. Ringkasan Proyek**

* **Nama Proyek:** Website E-commerce Furniture (Nama Brand: "WIDI Furniture").
* **Tujuan Utama:** Membangun sebuah platform e-commerce furnitur yang tidak hanya fungsional dan profesional, tetapi juga memberikan pengalaman belanja yang unik, interaktif, dan personal melalui fitur-fitur inovatif.
* **Tech Stack Utama:**
    * **Framework Frontend:** Astro
    * **Backend & Database:** Supabase
    * **Hosting/Deployment:** Vercel
    * **Version Control:** GitHub
    * **Lingkungan Development:** GitHub Codespace
    * **Asisten AI:** Qwen Code CLI

* **Fitur Unggulan:**
    * "Shop the Look" Interaktif
    * Asisten Desainer Berbasis AI
    * Bukti Sosial & Urgensi Real-time
    * Program Loyalitas Berbasis Gamifikasi
    * Progressive Web App (PWA)
    * Dukungan Multi-bahasa (Indonesia & Inggris)

**2. Arsitektur & Teknologi**

* **Frontend (Astro):** Kita akan menggunakan Astro untuk membangun antarmuka publik yang super cepat (*Static Site Generation*). Komponen yang membutuhkan interaktivitas tinggi (seperti tombol "Add to Cart", keranjang belanja, dan seluruh dasbor admin) akan dibangun sebagai *Astro Islands* menggunakan **React**untuk hidrasi parsial.
* **Backend (Supabase):** Supabase akan menjadi pusat dari semua data dan logika bisnis, memanfaatkan:
    * **Postgres Database:** Untuk semua data relasional.
    * **Supabase Auth:** Untuk manajemen akun admin dan pelanggan.
    * **Supabase Storage:** Untuk menyimpan semua aset gambar (produk, lookbook, konten dari user).
    * **Supabase Edge Functions:** Untuk logika backend yang aman (mis: proses pembayaran, pemberian poin loyalitas, interaksi dengan AI).
    * **Supabase Realtime:** Untuk fitur bukti sosial (*social proof*).
i
**3. Desain & UX/UI**

* **Prinsip Desain:** Bersih, modern, elegan, dan fokus pada visual produk berkualitas tinggi.
* **Skema Warna:** Tema akan didominasi oleh warna-warna hangat dan natural seperti **coklat kayu, krem, dan putih**, untuk memberikan nuansa yang mewah dan alami.
* **Responsivitas:** Desain akan sepenuhnya responsif dan dioptimalkan untuk pengalaman terbaik di perangkat mobile, tablet, dan desktop.
* **Internasionalisasi (i18n):** Sistem akan mendukung dua bahasa: Bahasa Indonesia (default) dan Bahasa Inggris.

**4. Desain Skema Database (Supabase)**

Ini adalah rancangan awal tabel yang dibutuhkan. Setiap tabel akan memiliki `id (uuid)` dan `created_at (timestamp)` secara default.

| Nama Tabel | Kolom Penting | Keterangan |
| :--- | :--- | :--- |
| **profiles** | `id` (references `auth.users`), `full_name`, `avatar_url`, `loyalty_points` | Menyimpan data tambahan untuk pengguna (admin & pelanggan). |
| **products** | `name`, `description`, `price`, `dimensions` (jsonb), `materials` (array), `category_id` | Tabel utama untuk semua detail produk. |
| **categories** | `name`, `slug`, `parent_id` | Untuk mengelompokkan produk secara hierarkis. |
| **product_images** | `product_id`, `image_url`, `is_primary` | Menghubungkan satu produk dengan banyak gambar. |
| **lookbook_galleries**| `title`, `description`, `cover_image_url` | Untuk fitur "Shop the Look". |
| **lookbook_hotspots**| `gallery_id`, `product_id`, `coordinates` (jsonb) | Menyimpan data hotspot (posisi x,y) pada gambar lookbook. |
| **reviews** | `product_id`, `user_id`, `rating` (1-5), `comment` | Ulasan dan rating dari pelanggan. |
| **wishlists** | `user_id`, `product_id` | Daftar produk favorit pelanggan. |
| **loyalty_points_log**| `user_id`, `points_awarded`, `reason` (text), `related_entity_id` | Riwayat penambahan poin untuk program gamifikasi. |
| **user_generated_content**| `user_id`, `image_url`, `approved` (boolean) | Galeri foto dari pelanggan. |
| **orders** & **order_items**| ... | *Akan ditambahkan saat implementasi e-commerce penuh.* |
| **posts** | `title`, `content`, `author_id` | Untuk fitur blog/artikel. |

---
### **Roadmap Pembangunan Detail Berdasarkan Fase**

#### **🚀 Fase 1: Fondasi, MVP, & Dasbor Admin**
**Tujuan:** Meluncurkan situs katalog fungsional dengan kemampuan manajemen konten penuh bagi admin.

* **1. Setup & Infrastruktur:**
    * Inisialisasi proyek Supabase, buat skema database untuk `products`, `categories`, `product_images`, dan `profiles`.
    * Atur kebijakan RLS: publik bisa `SELECT`, admin (terotentikasi) bisa `INSERT`, `UPDATE`, `DELETE`.
    * Inisialisasi proyek Astro, setup Tailwind CSS, dan hubungkan ke Supabase.
    * Atur repositori GitHub dan Vercel untuk CI/CD.

* **2. Dasbor Admin (Prioritas Utama):**
    * Buat grup rute `/admin` di Astro.
    * Gunakan *client-side rendering* untuk bagian ini (mis: dengan React).
    * Implementasikan login/logout menggunakan Supabase Auth.
    * Buat modul **CRUD (Create, Read, Update, Delete)** untuk **Produk**, termasuk form dengan upload gambar ke Supabase Storage.
    * Buat modul CRUD untuk **Kategori**.

* **3. Website Publik (MVP):**
    * Bangun Halaman Utama yang menampilkan produk dari Supabase.
    * Bangun Halaman Katalog dengan grid produk.
    * Bangun Halaman Detail Produk yang menarik semua data terkait dari Supabase.
    * Bangun halaman statis: "Tentang Kami" & "Kontak".

#### **✨ Fase 2: Peningkatan Pengalaman & Keterlibatan**
**Tujuan:** Mengimplementasikan fitur-fitur "brilian" yang sudah disetujui untuk meningkatkan interaksi.

* **1. Fitur "Shop the Look":**
    * Di Dasbor Admin: Buat modul CRUD untuk `lookbook_galleries` & `lookbook_hotspots`. Sediakan antarmuka visual untuk menempatkan titik hotspot pada gambar.
    * Di Website Publik: Buat halaman galeri dan komponen interaktif untuk menampilkan hotspot dan *pop-up* produk.

* **2. Akun Pelanggan & Fungsionalitas:**
    * Implementasikan sistem pendaftaran & login untuk pelanggan di website publik.
    * Buat Halaman Profil Pengguna (`/profil`).
    * Implementasikan fitur **Wishlist**: tombol "simpan" di produk, dan daftar wishlist di halaman profil.

* **3. Konfigurasi Aplikasi Modern:**
    * Implementasikan fungsionalitas **PWA**: Buat `manifest.json` dan *service worker* agar website bisa di-"install" di perangkat mobile.
    * Implementasikan **Multi-bahasa (i18n)**: Gunakan library `astro-i18n` atau sejenisnya untuk mengelola konten ID & EN.

#### **💡 Fase 3: Fitur Komunitas & Konversi**
**Tujuan:** Membangun kepercayaan dan mendorong konversi melalui interaksi komunitas dan AI.

* **1. Program Loyalitas & Gamifikasi:**
    * Buat Supabase Edge Function untuk logika pemberian poin (mis: `onNewReview`, `onNewUGC`).
    * Di Halaman Profil: Tampilkan jumlah poin pengguna dan riwayat perolehan poin dari tabel `loyalty_points_log`.
    * Tentukan mekanisme penukaran poin (mis: menjadi kode voucher).

* **2. Bukti Sosial & Ulasan:**
    * Implementasikan **Supabase Realtime** di frontend untuk menampilkan notifikasi "Seseorang baru saja membeli...".
    * Buat form untuk pelanggan agar bisa memberikan **Ulasan & Rating** di halaman detail produk.
    * Buat galeri untuk menampilkan konten dari `user_generated_content` yang sudah disetujui admin.

* **3. Asisten Desainer AI:**
    * Desain antarmuka *chatbot*.
    * Buat Supabase Edge Function yang menerima input pengguna, mengambil data produk relevan dari database, memformatnya menjadi *prompt*, dan mengirimkannya ke API LLM (mis: Qwen/OpenAI).
    * Tampilkan respons AI di antarmuka *chatbot*.

#### **🏆 Fase 4: E-commerce Penuh & Optimalisasi**
**Tujuan:** Mengubah situs menjadi platform e-commerce penuh dan melakukan optimalisasi berkelanjutan.

* **1. Implementasi Keranjang Belanja & Checkout:**
    * Kembangkan komponen keranjang belanja (shopping cart).
    * Buat alur checkout multi-langkah.
    * Integrasikan dengan *payment gateway* (Midtrans/Xendit) menggunakan Supabase Edge Functions untuk penanganan callback yang aman.
    * Buat tabel `orders` dan `order_items`.

* **2. Manajemen Pesanan:**
    * Di Dasbor Admin: Buat modul baru untuk melihat dan mengelola pesanan yang masuk.

* **3. Analitik & SEO Lanjutan:**
    * Integrasikan dengan tool analitik (Vercel Analytics, Google Analytics).
    * Lakukan audit SEO teknis dan optimalkan berdasarkan data.