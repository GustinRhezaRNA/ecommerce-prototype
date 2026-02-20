# E-Commerce Prototype

Prototype aplikasi e-commerce sederhana yang dibangun dengan React, Vite, dan Ant Design. Mencakup fitur manajemen produk, pelanggan, transaksi, dan dashboard analitik.

---

## 🕐 Waktu Pengerjaan

| Keterangan | Waktu |
|---|---|
| 📅 Mulai | 18 Februari 2026, 23:14 |
| ✅ Selesai | 20 Februari 2026, 22:46 |

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **UI Library:** Ant Design
- **Routing:** React Router DOM
- **Chart:** Recharts
- **Mock API:** JSON Server

---

## 🚀 Cara Menjalankan

### Prasyarat

Pastikan sudah terinstall:
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- npm (sudah termasuk bersama Node.js)

### Langkah-langkah

**1. Clone / Extract project**

```bash
# Jika menggunakan git
git clone <url-repository>
cd ecommerce-prototype
```

**2. Install dependensi**

```bash
npm install
```

**3. Jalankan Mock API Server** (terminal pertama)

```bash
npm run server
```

> Server API akan berjalan di: `http://localhost:3001`

**4. Jalankan aplikasi frontend** (terminal kedua, buka terminal baru)

```bash
npm run dev
```

> Aplikasi akan berjalan di: `http://localhost:5173`

**5. Buka di browser**

Akses `http://localhost:5173` — aplikasi siap digunakan.

---

## 🔑 Akun Login

| Username | Password |
|---|---|
| `admin@mail.com` | `123456` |

---

## 📁 Fitur Aplikasi

### 🏠 Dashboard
- **Stats Cards** — menampilkan ringkasan Total Customers, Total Transactions, dan Total Revenue secara real-time
- **Chart Customers Aktif** — visualisasi data pelanggan aktif menggunakan Recharts (bar/line chart)
- Data di-fetch dari API saat halaman pertama kali dimuat

### 📦 Produk
- **Tabel data produk** dengan kolom: Nama, Harga (format Rupiah), Kuota, Masa Berlaku
- **Search / pencarian** — filter produk berdasarkan nama secara real-time
- **Debounce 500ms** — pencarian tidak langsung hit API, tetapi menunggu jeda ketik untuk efisiensi
- **Pagination** — navigasi data per halaman (default 10 data/halaman), bisa diubah
- **CRUD lengkap** — tambah, lihat detail, edit, dan hapus produk
- **Batch Action** — pilih beberapa baris sekaligus lalu lakukan aksi Update / Delete
- **Form validasi** — field wajib diisi dengan pesan error yang jelas

### 👥 Pelanggan
- **Tabel data pelanggan** dengan kolom: Nama, Nomor Telepon, Saldo (format Rupiah)
- **Search** — filter pelanggan secara real-time
- **Debounce 500ms** pada input pencarian
- **Pagination** — navigasi halaman dengan ukuran halaman yang dapat disesuaikan
- **CRUD lengkap** — tambah, lihat detail, edit, dan hapus pelanggan
- **Form validasi** — semua field wajib diisi (nama, telepon, saldo)
- **Batch Action** — aksi massal pada baris yang dipilih

### 💳 Transaksi
- **Tabel riwayat transaksi** dengan kolom: ID Transaksi, Customer ID, Harga, Status, Tanggal
- **Status Badge berwarna** — `success` (hijau), `pending` (kuning), `failed` (merah) menggunakan Ant Design `Tag`
- **Search** — filter berdasarkan Transaction ID atau Customer ID
- **Debounce 500ms** pada input pencarian
- **Pagination** — navigasi halaman
- **Lihat detail transaksi** per baris

### 🔐 Autentikasi
- **Halaman Login** dengan validasi form
- **Protected Routes** — halaman dashboard, produk, pelanggan, dan transaksi hanya bisa diakses setelah login
- Session disimpan di `localStorage`

### 🧩 Shared Components
- **Reusable `Table` component** — komponen tabel generik yang digunakan di semua halaman, mendukung: search filter, pagination, batch action, row actions (view/edit/delete), dan loading state
- **Sidebar navigasi** — navigasi antar halaman dengan highlight menu aktif
---

## 📝 Catatan

- Kedua terminal (`npm run server` dan `npm run dev`) harus berjalan bersamaan agar aplikasi berfungsi dengan baik.
- Data disimpan di file `db.json` sebagai mock database.
