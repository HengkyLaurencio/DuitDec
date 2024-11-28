# DuitDec

DuitDec adalah aplikasi manajemen uang yang membantu pengguna mengelola keuangan pribadi dengan mudah dan efisien.

## Cara Menjalankan Aplikasi

### 1. Menjalankan Backend (API)

1. Clone repository backend:
    ```bash
    git clone https://github.com/HengkyLaurencio/DuitDec.git
    cd duitdec/backend
    ```

2. Install dependensi backend:
    ```bash
    npm install
    ```

3. **Konfigurasi Variabel Lingkungan**:
   
   - Salin file `.env.example` ke file `.env` di direktori root proyek.
   
     ```bash
     cp .env.example .env
     ```

   - Buka file `.env` dan sesuaikan nilai variabel dengan pengaturan lokal atau server Anda.
   
     ```ini
     PORT=5432
     HOST=localhost
     USER=your_db_user
     DATABASE=your_db_name
     PASSWORD=your_db_password

     DATABASE_URL="postgres://your_db_user:your_db_password@localhost:5432/your_db_name"
     ```

   Penjelasan:
   - **`PORT`**: Port tempat backend API berjalan (misalnya, `5432`).
   - **`HOST`**: Alamat host tempat PostgreSQL berjalan (misalnya, `localhost`).
   - **`USER`**: Nama pengguna untuk mengakses database PostgreSQL.
   - **`DATABASE`**: Nama database PostgreSQL yang digunakan.
   - **`PASSWORD`**: Kata sandi untuk mengakses database PostgreSQL.
   - **`DATABASE_URL`**: URL koneksi lengkap ke database dalam format PostgreSQL, seperti:  
     `postgres://your_db_user:your_db_password@localhost:5432/your_db_name`.
   - **`JWT_SECRET`**: Secret Key untuk enkripsi token authentication.

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

Backend API akan berjalan di `http://localhost:3000` atau port yang sudah dikonfigurasi di `src/index.js`.

### 2. Menjalankan Frontend

1. Clone repository frontend:
    ```bash
    git clone https://github.com/HengkyLaurencio/DuitDec.git
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
