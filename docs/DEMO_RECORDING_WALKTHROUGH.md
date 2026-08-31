# 🖥️ Panduan Teknis Rekaman Layar (Screen Recording Walkthrough)
**SkillBridge — Academic & MSME Digital Collaboration Hub**

Dokumen ini berisi panduan teknis operasional **langkah demi langkah (step-by-step click guide)** apa yang harus diklik, dibuka, dan digerakkan di layar komputer selama sesi perekaman demo aplikasi, dipadukan secara sinkron dengan naskah **Voice Over (VO)**.

---

## 🔑 Data Akun Demo Resmi (Telah Dikonfigurasi)

Gunakan akun-akun demo berikut yang telah memiliki data proyek, riwayat lamaran, dan profil lengkap:

| Peran Akun | Email Login | Password | Fungsi Sesi Demo |
| :--- | :--- | :--- | :--- |
| **🎓 Mahasiswa** | `alex.rivers@university.edu` | `password123` | Demonstrasi eksplorasi market, pendaftaran, dan Workspace tugas |
| **🏬 UMKM** | `hello@luminabeans.com` | `password123` | Demonstrasi posting proyek, review **AI Match Score (94%)**, & Accept |
| **🛡️ Administrator** | `admin@skillbridge.edu` | `password123` | Demonstrasi Verification Center & Platform Governance |

> [!TIP]
> **Trik Rekaman Cepat**: Buka 2 jendela browser terpisah (atau 1 jendela biasa untuk UMKM dan 1 jendela *Incognito* untuk Mahasiswa) sehingga Anda bisa berpindah peran secara instan hanya dengan `Alt + Tab`.

---

## 🎬 Alur Rekaman Step-by-Step (6 Sesi Terpadu)

```
[Sesi 1] 🌐 MEMASUKI PLATFORM (Halaman Utama & Single-Page Scroll)
[Sesi 2] 👤 PERAN & PROFIL PENGGUNA (Login, Dashboard Mahasiswa & UMKM)
[Sesi 3] 🔍 MENEMUKAN PROYEK (Marketplace, Filter Kategori, Project Details)
[Sesi 4] 🤖 PROSES MATCHING (Google Gemini AI Match Score & Penerimaan)
[Sesi 5] 🚀 KOLABORASI & PROGRES (Milestone Workspace, Checklist, Chat & Upload)
[Sesi 6] 🌟 PENUTUP DEMO (Verified Portfolio & Ekosistem Berkelanjutan)
```

---

### Sesi 1 — MEMASUKI PLATFORM (`00:00 – 00:45`)

#### 🖱️ Panduan Aksi Layar:
1. Buka browser pada URL: `http://localhost:3000/` (atau `http://localhost:5173/`).
2. Mulai rekaman pada posisi paling atas beranda (*Hero Section*).
3. Gerakkan kursor ke navbar, klik tombol **"About"** ➔ Biarkan halaman *smooth scroll* ke section About (perhatikan *active pill* berpindah ke About).
4. Lanjutkan klik tombol **"Help & FAQ"** ➔ Halaman *smooth scroll* ke section Help.
5. Klik salah satu pertanyaan FAQ untuk memperlihatkan animasi *accordion expand*.
6. Scroll kembali ke atas atau klik logo **SkillBridge** di pojok kiri atas.

#### 🎙️ Naskah Voice Over (Sesi 1):
> *"Pada halaman utama, pengguna dapat mengenal terlebih dahulu konsep, visi, dan tujuan dari platform SkillBridge.*  
>  
> *Dilengkapi dengan navigasi terintegrasi single-page scroll, pengguna dapat mengeksplorasi pilar keunggulan platform, membaca panduan interaktif, hingga memahami alur kolaborasi secara ringkas sebelum mulai masuk ke dalam ekosistem."*

---

### Sesi 2 — PERAN DAN PROFIL PENGGUNA (`00:45 – 01:30`)

#### 🖱️ Panduan Aksi Layar:
1. Di navbar kanan atas, klik tombol **"Login"** (menuju `/login`).
2. Masukkan akun Mahasiswa: `alex.rivers@university.edu` / `password123` ➔ Klik **"Sign In"**.
3. Tampilkan **Student Dashboard** (`/student/dashboard`):
   - Arahkan mouse menyorot kartu statistik (*Active Projects, Applications, Portfolio Score*).
4. Klik menu **"My Profile"** (`/profile`):
   - Tunjukkan daftar *Verified Skills* (React, TypeScript, UI/UX, Figma), riwayat proyek, dan lencana verifikasi institusi (*Universitas Indonesia*).
5. Switch tab / perlihatkan sudut pandang UMKM (`/umkm/dashboard`):
   - Tunjukkan ringkasan kebutuhan digital UMKM (*Lumina Beans Roastery*) dan status rekrutmen.

#### 🎙️ Naskah Voice Over (Sesi 2):
> *"SkillBridge dirancang fleksibel untuk mendukung kebutuhan dua jenis pengguna yang saling membutuhkan.*  
>  
> *Bagi mahasiswa, platform ini menjadi wadah untuk membangun profil profesional berdasarkan kompetensi nyata, keahlian terverifikasi, dan rekam jejak akademik.*  
>  
> *Sementara bagi pelaku UMKM, platform menyediakan ruang terstruktur untuk menyampaikan kebutuhan proyek digitalisasi yang ingin mereka kembangkan — mulai dari pembuatan aplikasi kasir, perancangan antarmuka, hingga pemasaran digital."*

---

### Sesi 3 — MENEMUKAN PROYEK (`01:30 – 02:15`)

#### 🖱️ Panduan Aksi Layar:
1. Kembali ke akun Mahasiswa, klik menu **"Market"** di pojok kanan navbar (`/market`).
2. Tunjukkan katalog proyek yang tersedia di marketplace:
   - Klik salah satu filter kategori (misal: *Web Development* atau *UI/UX Design*).
   - Ketik kata kunci di kolom pencarian (misal: *Coffee / E-Commerce*).
3. Klik salah satu kartu proyek (misal: *"Modern Web E-Commerce & POS System"*).
4. Di halaman **Project Details** (`/projects/:id`):
   - Arahkan mouse menyorot deskripsi objektif, deliverable yang diminta, kompensasi/stipend, dan durasi pengerjaan.
   - Klik tombol **"Apply Now"** ➔ Tunjukkan notifikasi *toast* sukses pendaftaran yang lembut.

#### 🎙️ Naskah Voice Over (Sesi 3):
> *"Mahasiswa dapat secara leluasa mengeksplorasi beragam peluang proyek industri yang terbuka di Project Market.*  
>  
> *Setiap lembar rincian proyek menyajikan informasi komprehensif mengenai target luaran, durasi pengerjaan, tumpukan teknologi yang dibutuhkan, hingga kompensasi.*  
>  
> *Kejelasan informasi ini membantu mahasiswa memilih proyek yang paling relevan dengan kapasitas dan minat keilmuan mereka."*

---

### Sesi 4 — PROSES MATCHING BERBASIS AI (`02:15 – 03:00`)

#### 🖱️ Panduan Aksi Layar:
1. Beralih ke akun UMKM (*Lumina Beans Roastery*), buka menu **My Projects** (`/umkm/projects`).
2. Klik proyek yang sedang membuka pendaftaran ➔ Masuk ke **UMKM Project Detail** (`/umkm/projects/:id`).
3. Klik tab **"Applicants"**:
   - Beri jeda 2-3 detik pada kartu pelamar mahasiswa (*Alex Rivers*).
   - Sorot badge hijau **AI Compatibility Score: 94%** dan ringkasan analisis kesesuaian dari Google Gemini AI.
4. Klik tombol biru **"Accept Applicant"** (atau ikon centang persetujuan).
5. Tunjukkan status proyek otomatis berubah menjadi **ACTIVE** dan ruang kolaborasi langsung diinisiasi.

#### 🎙️ Naskah Voice Over (Sesi 4):
> *"Selanjutnya, keunggulan SkillBridge hadir melalui **AI Matchmaking Engine**.*  
>  
> *Sistem cerdas memanfaatkan model Google Gemini untuk menganalisis dan menghitung skor kompatibilitas antara spesifikasi teknis proyek dengan portofolio pelamar.*  
>  
> *Pelaku UMKM tidak perlu lagi merasa ragu atau bingung menyaring puluhan berkas secara manual, karena sistem memberikan rekomendasi talenta yang paling presisi dan siap eksekusi."*

---

### Sesi 5 — KOLABORASI & WORKSPACE PROGRES (`03:00 – 04:00`)

#### 🖱️ Panduan Aksi Layar:
1. Buka akun Mahasiswa, buka menu **My Projects** (`/student/my-projects`).
2. Klik tombol **"Open Workspace"** pada proyek yang baru disetujui ➔ Masuk ke **Workspace View** (`/student/workspace/:id`).
3. **Sprint Checklist**:
   - Centang salah satu checkbox tugas (misal: *"Setup Database & Prisma Models"*).
   - Perhatikan *Progress Bar Track* otomatis bertambah dari 50% menjadi 75%.
4. **In-App Direct Chat**:
   - Klik tombol **"Open Chat"** (`/chat/:id`).
   - Ketik pesan konfirmasi: *"Halo, API auth dan database sudah siap di-review."* ➔ Klik Kirim.
   - Klik ikon **Paperclip (Lampiran)** ➔ Pilih satu file screenshot/gambar ➔ File terunggah dan link terkirim ke dalam riwayat obrolan.
5. **Final Deliverables**:
   - Kembali ke Workspace tab Overview, tunjukkan form pengisian tautan *GitHub Repository*, *Figma Design*, dan *Live Demo URL*.

#### 🎙️ Naskah Voice Over (Sesi 5):
> *"Setelah proses pencocokan selesai, alur kerja tidak berhenti begitu saja. SkillBridge menyediakan **Shared Milestone Workspace** sebagai pusat kendali proyek.*  
>  
> *Di ruang kerja terpadu ini, mahasiswa dan mitra usaha dapat memantau setiap tahap sprint pengerjaan secara transparan melalui checklist tugas dan kalkulasi persentase progres otomatis.*  
>  
> *Tersedia pula fitur percakapan langsung dengan dukungan pengiriman lampiran dokumen, memastikan koordinasi pengerjaan berjalan intensif hingga penyerahan hasil akhir proyek."*

---

### Sesi 6 — PENUTUP DEMO & KEBERLANJUTAN (`04:00 – 04:45`)

#### 🖱️ Panduan Aksi Layar:
1. Tampilkan penyelesaian proyek:
   - UMKM memberikan rating ⭐⭐⭐⭐⭐ dan testimoni pada proyek yang tuntas.
2. Buka **Public Student Profile** (`/students/:id`):
   - Tunjukkan skor portofolio bertambah dan proyek tercatat sebagai *Verified Case Study*.
3. Beralih ke **Admin Overview** (`/admin/overview`) atau kembali ke **Homepage**:
   - Tunjukkan metrik platform secara keseluruhan (*Total Users, Active Collaborations, Verified MSMEs*).
4. Gerakkan mouse secara tenang di tengah layar, lalu biarkan video berakhir dengan transisi halus (*fade to black*).

#### 🎙️ Naskah Voice Over (Sesi 6):
> *"Melalui alur yang terintegrasi dari hulu ke hilir ini, SkillBridge berhasil membangun sebuah ekosistem kolaborasi yang mengubah kebutuhan usaha menjadi pengalaman berharga bagi mahasiswa.*  
>  
> *Setiap hasil kerja yang tuntas menjadi aset digital berkelanjutan bagi UMKM dan sertifikasi portofolio terpercaya bagi mahasiswa.*  
>  
> *Dan tentu saja, platform SkillBridge akan terus kami kembangkan guna merangkul lebih banyak perguruan tinggi dan jutaan pelaku usaha di seluruh pelosok Indonesia.*  
>  
> *SkillBridge: Menghubungkan Teori Akademik dengan Eksekusi Industri Nyata."*

---

## 📋 Ringkasan Shortcut URL Selama Rekaman

Simpan bookmark browser pada daftar URL berikut agar dapat berpindah halaman dengan cepat:

```
Beranda Publik        : http://localhost:3000/
Project Market        : http://localhost:3000/market
Login Page            : http://localhost:3000/login
Dashboard Mahasiswa   : http://localhost:3000/student/dashboard
Proyek Saya Mahasiswa : http://localhost:3000/student/my-projects
Dashboard UMKM        : http://localhost:3000/umkm/dashboard
Kelola Proyek UMKM    : http://localhost:3000/umkm/projects
Admin Governance      : http://localhost:3000/admin/overview
```
