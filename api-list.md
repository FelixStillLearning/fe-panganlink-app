# Daftar Kebutuhan API PanganLink

Berikut adalah daftar endpoint API yang dibutuhkan untuk aplikasi PanganLink, mulai dari Landing Page, Authentication (Login/Register), hingga fitur-fitur Admin.

## 1. Public & Landing Page
API ini bersifat *public* dan dapat diakses tanpa perlu login.

| Endpoint | Method | Deskripsi |
| :--- | :--- | :--- |
| `/api/public/stats` | `GET` | Mengambil statistik umum (contoh: jumlah petani, transaksi, produk aktif) untuk ditampilkan di landing page. |
| `/api/public/commodities` | `GET` | Mengambil daftar komoditas unggulan beserta harga pasar terkininya. |
| `/api/public/testimonials` | `GET` | Mengambil daftar ulasan/testimoni dari pengguna. |

## 2. Authentication (Auth)
API untuk keperluan autentikasi pengguna.

| Endpoint | Method | Deskripsi |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Mendaftarkan pengguna baru (Petani / Pembeli). **Payload**: `name`, `email`, `password`, `role`. |
| `/api/auth/login` | `POST` | Login pengguna. **Payload**: `email`, `password`. **Response**: `token`, data `user`. |
| `/api/auth/me` | `GET` | Mengambil profil pengguna yang sedang login berdasarkan token (Verifikasi Token). |
| `/api/auth/logout` | `POST` | Mengakhiri sesi pengguna (Invalidasi token). |

## 3. Admin
API yang hanya dapat diakses oleh role `Admin`. Membutuhkan token autentikasi.

| Endpoint | Method | Deskripsi |
| :--- | :--- | :--- |
| `/api/admin/dashboard` | `GET` | Mengambil data ringkasan dashboard admin (total user, total produk, grafik pertumbuhan, dll). |
| `/api/admin/users` | `GET` | Mengambil daftar semua pengguna (Petani dan Pembeli) beserta status akun mereka. |
| `/api/admin/users/:id/status`| `PUT` | Mengubah status aktif/blokir dari seorang pengguna. |
| `/api/admin/products` | `GET` | Mengambil daftar semua produk untuk keperluan moderasi. |
| `/api/admin/products/:id/approve` | `PUT` | Menyetujui produk yang diajukan oleh petani agar tampil di pasar. |
| `/api/admin/products/:id/reject` | `PUT` | Menolak produk yang diajukan petani dengan memberikan alasan penolakan. |
| `/api/admin/commodities` | `GET`, `POST` | Mendapatkan daftar komoditas utama (master data) / Menambahkan komoditas baru. |
| `/api/admin/commodities/:id` | `PUT`, `DELETE`| Memperbarui atau menghapus data komoditas. |
| `/api/admin/market-prices` | `GET`, `POST` | Mengelola data harga pasar harian/mingguan. |
| `/api/admin/price-trends` | `GET` | Mengambil data hasil prediksi tren harga dari model AI (Bayesian Ridge). |
| `/api/admin/settings` | `GET`, `PUT` | Mengelola pengaturan umum platform PanganLink. |

## 4. Petani
API yang diakses oleh pengguna dengan role `Petani`.

| Endpoint | Method | Deskripsi |
| :--- | :--- | :--- |
| `/api/petani/dashboard` | `GET` | Mengambil statistik dashboard petani (total pendapatan, pesanan baru, produk aktif). |
| `/api/petani/products` | `GET`, `POST` | Mendapatkan daftar produk milik petani / Menambahkan produk baru. |
| `/api/petani/products/:id` | `PUT`, `DELETE`| Memperbarui informasi produk atau menghapus produk. |
| `/api/petani/orders` | `GET` | Mengambil daftar pesanan/order yang masuk ke petani tersebut. |
| `/api/petani/orders/:id/status`| `PUT` | Memperbarui status pesanan (misal: "Diproses", "Dikirim", "Selesai"). |
| `/api/petani/history` | `GET` | Mengambil riwayat penjualan yang telah selesai atau dibatalkan. |
| `/api/petani/recommendations` | `GET` | Mengambil rekomendasi berbasis AI (misal: rekomendasi harga jual berdasar tren pasar). |
| `/api/petani/profile` | `GET`, `PUT` | Melihat dan memperbarui profil atau informasi toko/kebun petani. |

---

*Catatan: Struktur payload dan respons (JSON) akan disesuaikan dengan kebutuhan implementasi di sisi backend.*
