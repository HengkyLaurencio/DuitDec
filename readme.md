# DuitDec

DuitDec adalah aplikasi manajemen uang yang membantu pengguna mengelola keuangan pribadi dengan mudah dan efisien.
## Cara Menjalankan Aplikasi
### 1. Clone Repository
Clone repository proyek DuitDec:
```bash
git clone https://github.com/HengkyLaurencio/DuitDec.git
```

### 2. Menjalankan Backend (API)

1. Masuk ke direktori backend:
    ```bash
    cd duitdec/backend
    ```

2. Install dependensi backend:
    ```bash
    npm install
    ```

3. **Konfigurasi Variabel Lingkungan**:

   - Salin file `.env.example` ke file `.env` di direktori root proyek backend.
     ```bash
     cp .env.example .env
     ```

   - Buka file `.env` dan sesuaikan nilai variabel dengan pengaturan lokal atau server Anda:
     ```ini
     PORT=5432
     HOST=localhost
     USER=your_db_user
     DATABASE=your_db_name
     PASSWORD=your_db_password

     DATABASE_URL="postgres://your_db_user:your_db_password@localhost:5432/your_db_name"
     JWT_SECRET=your_jwt_secret
     ```

4. **Menjalankan Migrations**: Pastikan database sudah dikonfigurasi, lalu jalankan migrations untuk membuat tabel di database:
    ```bash
    npm run migrate
    ```

5. **Menjalankan Seeder**: Untuk menambahkan data awal (seperti pengguna) ke dalam database:
    ```bash
    npm run seed
    ```

6. **Menjalankan Backend (API)**: Gunakan `nodemon` untuk menjalankan aplikasi secara lokal:
    ```bash
    npm run dev
    ```

   Backend API akan berjalan di `http://localhost:3000` atau port yang sudah dikonfigurasi di file `.env`.

### 3. Menjalankan Frontend

1. Masuk ke direktori frontend:
    ```bash
    cd duitdec/frontend
    ```

2. Install dependensi frontend:
    ```bash
    npm install
    ```

3. Jalankan frontend menggunakan Vite:
    ```bash
    npm run dev
    ```

4. Aplikasi frontend akan berjalan di `http://localhost:5173` (port default Vite).

# Dokumentasi API

## URL Dasar
`http://localhost:3000/api/`

## Endpoints

### Users Routes

- **GET /users**  
  - Deskripsi: Mengambil semua pengguna.  
  - Otorisasi: Diperlukan (Bearer Token)

- **GET /users/:id**  
  - Deskripsi: Mengambil pengguna tertentu berdasarkan ID.

- **POST /users**  
  - Deskripsi: Membuat pengguna baru.  
  - Parameter Body: `name`, `email`, `password`

- **PUT /users/:id**  
  - Deskripsi: Memperbarui pengguna tertentu berdasarkan ID.  
  - Parameter Body: `name`, `email`, `password`

- **DELETE /users/:id**  
  - Deskripsi: Menghapus pengguna tertentu berdasarkan ID.

### Authentication Routes

- **POST /auth/login**  
  - Deskripsi: Login pengguna.  
  - Parameter Body: `email`, `password`

- **GET /auth/userinfo**  
  - Deskripsi: Mengambil informasi pengguna berdasarkan token yang diberikan.  
  - Otorisasi: Diperlukan (Bearer Token)

### Accounts Routes

- **GET /user/accounts/:userid**  
  - Deskripsi: Mengambil semua akun untuk pengguna tertentu.

- **POST /user/accounts**  
  - Deskripsi: Membuat akun baru.  
  - Parameter Body: `account_name`, `balance`

- **PUT /user/accounts/:accountid**  
  - Deskripsi: Memperbarui akun.  
  - Parameter Body: `account_name`, `balance`

- **DELETE /user/accounts/:accountid**  
  - Deskripsi: Menghapus akun tertentu berdasarkan ID.

### Categorys Routes

- **GET /category**  
  - Deskripsi: Mengambil semua kategori.

### Debts Routes

- **GET /debts**  
  - Deskripsi: Mengambil semua utang.

- **GET /debts/:id**  
  - Deskripsi: Mengambil utang tertentu berdasarkan ID.

- **POST /debts**  
  - Deskripsi: Membuat utang baru.  
  - Parameter Body: `amount`, `due_date`, `description`

- **PUT /debts/:id**  
  - Deskripsi: Memperbarui utang tertentu berdasarkan ID.  
  - Parameter Body: `amount`, `due_date`, `description`

- **DELETE /debts/:id**  
  - Deskripsi: Menghapus utang tertentu berdasarkan ID.

### Budgets Routes

- **GET /budgets**  
  - Deskripsi: Mengambil semua anggaran.

- **GET /budgets/:id**  
  - Deskripsi: Mengambil anggaran tertentu berdasarkan ID.

- **POST /budgets**  
  - Deskripsi: Membuat anggaran baru.  
  - Parameter Body: `name`, `amount`

- **PUT /budgets/:id**  
  - Deskripsi: Memperbarui anggaran tertentu berdasarkan ID.  
  - Parameter Body: `name`, `amount`

- **DELETE /budgets/:id**  
  - Deskripsi: Menghapus anggaran tertentu berdasarkan ID.

### Transactions Routes

- **POST /transactions/income/:id**  
  - Deskripsi: Menambahkan pendapatan ke akun pengguna.  
  - Parameter Body: `amount`, `description`

- **POST /transactions/outcome/:id**  
  - Deskripsi: Menambahkan pengeluaran ke akun pengguna.  
  - Parameter Body: `amount`, `description`

- **GET /transactions**  
  - Deskripsi: Mengambil semua transaksi.

- **GET /transactions/:id**  
  - Deskripsi: Mengambil transaksi untuk pengguna tertentu.

- **PUT /transactions/:id/:transactionId**  
  - Deskripsi: Memperbarui transaksi tertentu berdasarkan ID.  
  - Parameter Body: `amount`, `description`

- **DELETE /transactions/:id/:transactionId**  
  - Deskripsi: Menghapus transaksi tertentu berdasarkan ID.

## Middleware

### AuthMiddleware

- Deskripsi: Middleware ini digunakan untuk memverifikasi token pengguna dan melindungi rute yang memerlukan autentikasi. Hanya pengguna dengan token yang valid yang dapat mengakses rute yang dilindungi.
