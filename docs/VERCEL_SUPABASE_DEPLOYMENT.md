# 🚀 Panduan Deploy SkillBridge ke Vercel & Supabase (Online Publik)

Panduan ini menjelaskan cara mempublikasikan aplikasi **SkillBridge** ke internet secara penuh (Frontend + Backend Serverless di **Vercel** dan Database PostgreSQL di **Supabase**) sehingga Anda mendapatkan URL publik HTTPS (contoh: `https://skillbridge-app.vercel.app`) yang dapat dibuka di HP, laptop, atau perangkat siapa saja secara online 24/7.

---

## 🛠️ Langkah 1: Buat Database Gratis di Supabase (2 Menit)

1. Buka [https://supabase.com](https://supabase.com) dan login/daftar akun gratis.
2. Klik **"New Project"**:
   - **Name**: `skillbridge-db`
   - **Database Password**: Buat password yang kuat (contoh: `SkillBridge2026!`) dan catat.
   - **Region**: Pilih `Singapore (ap-southeast-1)` agar latensi paling cepat di Indonesia.
3. Setelah project dibuat, masuk ke menu **Settings** (ikon gear di kiri bawah) ➔ **Database**.
4. Gulir ke bagian **Connection string** ➔ Pilih tab **URI** / **Transaction Pooler (Port 6543)**.
5. Salin connection string tersebut, ganti `[YOUR-PASSWORD]` dengan password database Anda tadi.
   > Contoh: `postgresql://postgres.yourprojectid:SkillBridge2026!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

---

## 📦 Langkah 2: Migrasi & Seed Data ke Supabase dari Laptop (1 Perintah)

Buka terminal di folder project Anda (`c:\laragon\www\SkillBridge`) dan jalankan perintah berikut:

```powershell
# Ganti dengan connection string Supabase Anda
$env:DATABASE_URL="postgresql://postgres.yourprojectid:SkillBridge2026!@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Push schema tabel dan isi data demo (Mahasiswa, UMKM, Admin, Proyek)
cd backend
npx prisma db push
npx prisma db seed
cd ..
```

*Semua tabel dan akun demo (`alex.rivers@university.edu`, `hello@luminabeans.com`, `admin@skillbridge.edu`) akan otomatis terisi di Supabase!*

---

## 🌐 Langkah 3: Deploy ke Vercel (1-Click via GitHub)

1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **"Add New..."** ➔ **"Project"**.
3. Pilih repository: `Dhafin-dev/SkillBridge` ➔ Klik **"Import"**.
4. Di bagian **Environment Variables**, tambahkan variabel-variabel berikut:

| Key | Value |
| :--- | :--- |
| `DATABASE_URL` | *(Connection string Supabase dari Langkah 1)* |
| `JWT_SECRET` | `skillbridge-production-secret-key-2026` |
| `GEMINI_API_KEY` | *(API key Google Gemini Anda)* |
| `VITE_API_URL` | `/api` |

5. Klik tombol **"Deploy"**.
6. Tunggu ~1 menit hingga proses build selesai.

---

## 🎉 Hasil Akhir:
Vercel akan memberikan domain publik resmi, contoh:
👉 `https://skillbridge-production.vercel.app`

Anda sekarang dapat membuka link tersebut langsung di browser HP Anda di mana saja untuk melakukan **Screen Recording** dengan data dan backend yang berjalan 100% online tanpa kendala jaringan lokal!
