# DOKUMEN PERENCANAAN PENGEMBANGAN PERANGKAT LUNAK
## (SOFTWARE DEVELOPMENT PLANNING DOCUMENT)

---

# SISTEM INFORMASI KOLABORASI PROYEK AKADEMIK DAN UMKM BERBASIS KECERDASAN BUATAN
## (SkillBridge Hub: Intelligent Academic & Industry Project Collaboration Platform)

<br>

**Disusun Oleh:**
### PENGEMBANG UTAMA (SOLO DEVELOPER)
**187241057** | Ahmad Dhafin Al Farisy *(Lead Software Architect & Fullstack Engineer)*

<br>

### PROGRAM STUDI S1 SISTEM INFORMASI
### FAKULTAS SAINS DAN TEKNOLOGI
### UNIVERSITAS AIRLANGGA
### SURABAYA
### 2026

---

# DAFTAR ISI

- [DAFTAR ISI](#daftar-isi)
- [DAFTAR TABEL](#daftar-tabel)
- [DAFTAR GAMBAR](#daftar-gambar)
- [BAB 1 — PROJECT OVERVIEW](#bab-1--project-overview)
  - [1.1 Deskripsi Proyek (Project Description)](#11-deskripsi-proyek-project-description)
    - [1.1.1 Latar Belakang (Background)](#111-latar-belakang-background)
    - [1.1.2 Rumusan Masalah (Problem Statement)](#112-rumusan-masalah-problem-statement)
    - [1.1.3 Solusi yang Diusulkan (Proposed Solution)](#113-solusi-yang-diusulkan-proposed-solution)
    - [1.1.4 Tujuan Proyek (Project Objectives)](#114-tujuan-proyek-project-objectives)
    - [1.1.5 Manfaat Proyek (Benefits)](#115-manfaat-proyek-benefits)
    - [1.1.6 Ruang Lingkup Proyek (Project Scope)](#116-ruang-lingkup-proyek-project-scope)
- [BAB 2 — SOFTWARE REQUIREMENTS](#bab-2--software-requirements)
  - [2.1 Pemangku Kepentingan (Stakeholders)](#21-pemangku-kepentingan-stakeholders)
  - [2.2 Peran Pengguna (User Roles & Access Levels)](#22-peran-pengguna-user-roles--access-levels)
  - [2.3 Kebutuhan Fungsional (Functional Requirements)](#23-kebutuhan-fungsional-functional-requirements)
  - [2.4 Kebutuhan Non-Fungsional (Non-Functional Requirements)](#24-kebutuhan-non-fungsional-non-functional-requirements)
  - [2.5 Kebutuhan Lingkungan Pengembangan (Development Requirements)](#25-kebutuhan-lingkungan-pengembangan-development-requirements)
  - [2.6 Kebutuhan Lingkungan Penerapan (Deployment Requirements)](#26-kebutuhan-lingkungan-penerapan-deployment-requirements)
- [BAB 3 — SOFTWARE DEVELOPMENT PLANNING](#bab-3--software-development-planning)
  - [3.1 Metodologi Pengembangan (Development Methodology)](#31-metodologi-pengembangan-development-methodology)
  - [3.2 Struktur Tim Rekayasa Perangkat Lunak (Development Team Structure)](#32-struktur-tim-rekayasa-perangkat-lunak-development-team-structure)
  - [3.3 Peran dan Tanggung Jawab (Roles and Responsibilities)](#33-peran-dan-tanggung-jawab-roles-and-responsibilities)
  - [3.4 Alur Kerja Pengembangan (Development Workflow)](#34-alur-kerja-pengembangan-development-workflow)
  - [3.5 Rencana Tahapan Pengembangan (Project Timeline & Sprints)](#35-rencana-tahapan-pengembangan-project-timeline--sprints)
  - [3.6 Tonggak Pencapaian Proyek (Project Milestones)](#36-tonggak-pencapaian-proyek-project-milestones)
  - [3.7 Luaran Proyek (Deliverables)](#37-luaran-proyek-deliverables)
- [BAB 4 — SOFTWARE ARCHITECTURE AND DESIGN PLAN](#bab-4--software-architecture-and-design-plan)
  - [4.1 Arsitektur Sistem (System Architecture)](#41-arsitektur-sistem-system-architecture)
  - [4.2 Proses Bisnis Utama (Business Process & BPMN)](#42-proses-bisnis-utama-business-process--bpmn)
  - [4.3 Perancangan Use Case (Use Case Plan & Scenarios)](#43-perancangan-use-case-use-case-plan--scenarios)
  - [4.4 Perancangan Basis Data (Database Design Plan)](#44-perancangan-basis-data-database-design-plan)
  - [4.5 Arsitektur Frontend (Frontend Architecture)](#45-arsitektur-frontend-frontend-architecture)
  - [4.6 Arsitektur Backend (Backend Architecture)](#46-arsitektur-backend-backend-architecture)
- [BAB 5 — IMPLEMENTATION PLAN](#bab-5--implementation-plan)
  - [5.1 Tumpukan Teknologi (Technology Stack)](#51-tumpukan-teknologi-technology-stack)
  - [5.2 Rencana Pengembangan Frontend (Frontend Development Plan)](#52-rencana-pengembangan-frontend-frontend-development-plan)
  - [5.3 Rencana Pengembangan Backend (Backend Development Plan)](#53-rencana-pengembangan-backend-backend-development-plan)
  - [5.4 Rencana Implementasi Basis Data (Database Implementation Plan)](#54-rencana-implementasi-basis-data-database-implementation-plan)
  - [5.5 Rencana Integrasi Sistem (Integration Plan)](#55-rencana-integrasi-sistem-integration-plan)
  - [5.6 Rencana Manajemen Kode Sumber (Version Control Plan)](#56-rencana-manajemen-kode-sumber-version-control-plan)
- [BAB 6 — TESTING AND QUALITY ASSURANCE PLAN](#bab-6--testing-and-quality-assurance-plan)
  - [6.1 Strategi Pengujian (Testing Strategy)](#61-strategi-pengujian-testing-strategy)
  - [6.2 Pengujian Fungsional (Functional Testing Matrix)](#62-pengujian-fungsional-functional-testing-matrix)
  - [6.3 Pengujian Integrasi (Integration Testing)](#63-pengujian-integrasi-integration-testing)
  - [6.4 Pengujian Penerimaan Pengguna (User Acceptance Testing / UAT)](#64-pengujian-penerimaan-pengguna-user-acceptance-testing--uat)
  - [6.5 Manajemen Defek dan Kutu (Bug Management Lifecycle)](#65-manajemen-defek-dan-kutu-bug-management-lifecycle)
- [BAB 7 — DEPLOYMENT AND MAINTENANCE PLAN](#bab-7--deployment-and-maintenance-plan)
  - [7.1 Strategi Deployment (Deployment Strategy)](#71-strategi-deployment-deployment-strategy)
  - [7.2 Lingkungan Produksi (Production Environment)](#72-lingkungan-produksi-production-environment)
  - [7.3 Rencana Cadangan Data dan Keamanan (Backup and Security Plan)](#73-rencana-cadangan-data-dan-keamanan-backup-and-security-plan)
  - [7.4 Rencana Pemeliharaan Sistem (Maintenance & Monitoring Plan)](#74-rencana-pemeliharaan-sistem-maintenance--monitoring-plan)
  - [7.5 Rencana Pengembangan Masa Depan (Future Enhancements)](#75-rencana-pengembangan-masa-depan-future-enhancements)
- [BAB 8 — RISK MANAGEMENT](#bab-8--risk-management)
  - [8.1 Identifikasi Risiko Teknis (Technical Risks)](#81-identifikasi-risiko-teknis-technical-risks)
  - [8.2 Identifikasi Risiko Proyek & Operasional (Project Risks)](#82-identifikasi-risiko-proyek--operasional-project-risks)
  - [8.3 Matriks Mitigasi dan Penanganan Risiko (Risk Mitigation Plan)](#83-matriks-mitigasi-dan-penanganan-risiko-risk-mitigation-plan)

---

# DAFTAR TABEL

- **Tabel 2.1** Matriks Analisis Pemangku Kepentingan (Stakeholder Analysis)
- **Tabel 2.2** Matriks Peran Pengguna dan Hak Akses Sistem (Role-Based Access Control)
- **Tabel 2.3** Spesifikasi Kebutuhan Fungsional (Functional Requirements Matrix)
- **Tabel 2.4** Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements Matrix)
- **Tabel 2.5** Spesifikasi Kebutuhan Lingkungan Pengembangan (Development Environment)
- **Tabel 2.6** Spesifikasi Kebutuhan Lingkungan Produksi (Deployment Environment)
- **Tabel 3.1** Struktur Peran, Tanggung Jawab, dan Luaran Tim Pengembang
- **Tabel 3.2** Rencana Pembagian Tahapan Siklus Pengembangan (Development Phases Matrix)
- **Tabel 3.3** Daftar Tonggak Pencapaian Proyek (Project Milestones)
- **Tabel 3.4** Rincian Luaran Proyek Perangkat Lunak (Deliverables)
- **Tabel 4.1** Skenario Use Case: Pendaftaran dan Verifikasi Profil Mahasiswa/UMKM
- **Tabel 4.2** Skenario Use Case: Penerbitan Brief Proyek oleh Mitra UMKM
- **Tabel 4.3** Skenario Use Case: Rekomendasi dan Pengajuan Lamaran Proyek dengan AI Matchmaking
- **Tabel 4.4** Skenario Use Case: Seleksi Pelamar dan Inisiasi Workspace Kolaboratif
- **Tabel 4.5** Skenario Use Case: Pengelolaan Milestone Tugas dan Pelacakan Progres
- **Tabel 4.6** Skenario Use Case: Penyerahan Deliverables dan Evaluasi Timbal Balik (Two-Way Review)
- **Tabel 4.7** Kamus Data Entitas Basis Data Relasional SkillBridge
- **Tabel 5.1** Rincian Tumpukan Teknologi (Technology Stack Breakdown)
- **Tabel 5.2** Rencana Endpoint RESTful API SkillBridge Backend
- **Tabel 6.1** Matriks Kasus Uji Fungsional Sistem (Functional Test Cases Matrix)
- **Tabel 6.2** Matriks Pengujian Integrasi Antar-Modul Sistem
- **Tabel 6.3** Panduan Klasifikasi Tingkat Keparahan Kutu (Bug Severity & Priority)
- **Tabel 8.1** Matriks Analisis dan Mitigasi Risiko Pengembangan Perangkat Lunak

---

# DAFTAR GAMBAR

- **Gambar 3.1** Diagram Alur Kerja Metodologi Agile Scrum
- **Gambar 3.2** Visualisasi Gantt Chart Tahapan Iterasi Proyek SkillBridge
- **Gambar 4.1** Diagram Arsitektur Sistem 3-Tier Layered SkillBridge
- **Gambar 4.2** BPMN Alur Proses Bisnis Kolaborasi Proyek Terpadu
- **Gambar 4.3** Use Case Diagram Sistem Informasi SkillBridge Hub
- **Gambar 4.4** Entity Relationship Diagram (ERD) Basis Data Relasional SkillBridge
- **Gambar 4.5** Conceptual Data Model (CDM) Relasi Bisnis Entitas
- **Gambar 4.6** Physical Data Model (PDM) Struktur Skema SQL & Foreign Keys
- **Gambar 4.7** Diagram Aliran Data (DFD) Level 0 (Context Diagram)
- **Gambar 4.8** Diagram Aliran Data (DFD) Level 1 Dekomposisi Sistem
- **Gambar 4.9** Diagram Struktur Komponen Frontend React 19
- **Gambar 4.10** Diagram Pipeline Controller-Service-Repository Backend Express 5
- **Gambar 5.1** Diagram Strategi Percabangan Git (Git Feature Branch Workflow)
- **Gambar 6.1** Piramida Pengujian Kualitas Perangkat Lunak (Software Testing Pyramid)
- **Gambar 6.2** Alur Siklus Hidup Penanganan Defek (Bug Life Cycle Workflow)
- **Gambar 7.1** Diagram Alur Pipeline Deployment Otomatis (CI/CD Architecture)

---

# BAB 1 — PROJECT OVERVIEW

## 1.1 Deskripsi Proyek (Project Description)

### 1.1.1 Latar Belakang (Background)
Di era transformasi digital yang berkembang pesat, integrasi antara dunia akademik dan sektor industri riil menjadi pilar fundamental dalam menghasilkan sumber daya manusia yang kompeten dan siap kerja. Mahasiswa di tingkat perguruan tinggi dituntut untuk tidak hanya menguasai teori formal di ruang kuliah, melainkan juga memiliki pengalaman praktis berskala produksi (*production-grade experience*), portofolio terverifikasi, serta soft skill komunikasi profesional. Di sisi lain, sektor Usaha Mikro, Kecil, dan Menengah (UMKM) serta industri rintisan di Indonesia menghadapi tantangan besar dalam mengadopsi teknologi digital. Keterbatasan anggaran, minimnya akses ke talenta digital profesional, serta kurangnya literasi teknis sering kali menghambat UMKM dalam mengembangkan situs web komersial, aplikasi mobile, desain antarmuka (UI/UX), strategi *branding*, maupun sistem automasi operasional.

Kondisi eksisting saat ini menunjukkan adanya jurang pemisah (*skills gap & mismatch*) yang lebar antara kebutuhan digitalisasi UMKM dan ketersediaan talenta mahasiswa. Proses pencarian proyek magang mandiri atau kolaborasi lepas (*freelance*) umumnya masih berlangsung secara konvensional, terfragmentasi di media sosial tanpa standarisasi kontrak kerja yang jelas, tidak memiliki jaminan transparansi pengerjaan tugas, serta rentan terhadap ketidaksesuaian ekspektasi hasil akhir. Pemilik UMKM kesulitan menyaring puluhan curriculum vitae (CV) secara manual guna mencocokkan kompetensi teknis pelamar dengan kebutuhan spesifik proyek. Sementara itu, mahasiswa sering kali menyelesaikan tugas proyek industri tanpa adanya wadah rekam jejak resmi yang dapat memvalidasi keaslian kontribusi teknis mereka sebagai portofolio kredibel.

Berdasarkan urgensi tersebut, diperlukan sebuah platform rekayasa perangkat lunak terintegrasi yang mampu mengotomatisasi proses penjodohan talenta (*talent matchmaking*), menyediakan ruang kerja kolaborasi tugas terstruktur (*shared milestone workspaces*), serta memfasilitasi evaluasi portofolio terverifikasi. Pengembangan platform perangkat lunak **SkillBridge Hub** dirancang sebagai solusi komprehensif untuk mendigitalkan dan mengorkestrasi seluruh siklus kolaborasi proyek akademik dan industri secara efisien, transparan, dan akuntabel.

### 1.1.2 Rumusan Masalah (Problem Statement)
Berdasarkan analisis latar belakang di atas, rumusan masalah utama yang ditangani dalam proyek rekayasa perangkat lunak ini adalah:
1. **Tingginya Tingkat Ketidaksesuaian Kualifikasi (*Skill Mismatch*)**: Pemilik UMKM kesulitan mengidentifikasi dan mencocokkan kompetensi teknis mahasiswa pelamar dengan kualifikasi spesifik *brief* proyek secara cepat dan akurat.
2. **Inefisiensi Kurasi Kandidat Secara Manual**: Proses seleksi pelamar secara konvensional memakan waktu lama dan sering menghasilkan keputusan yang bias tanpa metrik penilaian objektif.
3. **Ketiadaan Ruang Kerja Kolaborasi Terstandarisasi**: Kurangnya platform terpusat untuk memantau progres pengerjaan proyek, pembagian *milestone*, pelacakan *checklist* tugas (*task breakdown*), dan penyerahan berkas akhir (*deliverables*) yang transparan antara mahasiswa dan mitra UMKM.
4. **Minimnya Mekanisme Validasi Portofolio Berbasis Kinerja Nyata**: Portofolio mahasiswa kerap diragukan keabsahannya oleh industri karena tidak adanya sistem audit hasil kerja dan ulasan timbal balik (*two-way verified review*) yang terikat langsung pada entitas proyek nyata.
5. **Komunikasi yang Terfragmentasi**: Saluran koordinasi proyek sering terpecah di berbagai aplikasi pihak ketiga tanpa pencatatan riwayat (*audit trail*) dan sistem notifikasi terintegrasi.

### 1.1.3 Solusi yang Diusulkan (Proposed Solution)
Sebagai penyelesaian atas permasalahan yang teridentifikasi, platform **SkillBridge Hub** dibangun dengan mengintegrasikan arsitektur web modern fullstack dan mesin kecerdasan buatan (*Artificial Intelligence Engine*). Solusi teknis yang diusulkan meliputi:
1. **Modul AI-Powered Matchmaking Engine**: Mengintegrasikan model *Large Language Model* (Google Gemini 2.5 Flash API) untuk menganalisis taksonomi keterampilan mahasiswa terhadap deskripsi, sasaran, dan *tags* proyek guna menghasilkan skor kecocokan persentase (*match percentage score*), analisis rasionalisasi kompetensi, dan rekomendasi langkah tindak lanjut secara instan.
2. **Dynamic Skill Taxonomy & Verification Center**: Menyediakan profil komprehensif bagi mahasiswa untuk mengelola keahlian terstruktur, sertifikat, tautan repositori proyek, serta skor reputasi portofolio otomatis.
3. **Interactive Collaborative Workspace**: Menyediakan ruang kerja kolaboratif khusus per proyek yang dilengkapi dengan fitur *interactive milestone checklist*, kalkulasi persentase kemajuan pengerjaan otomatis (*real-time progress tracking*), dan form penyerahan *deliverables*.
4. **Two-Way Verified Review & Portfolio Scoring System**: Mekanisme penilaian dua arah di akhir siklus proyek di mana UMKM memberikan umpan balik bintang dan ulasan performa kerja mahasiswa (yang secara otomatis mendongkrak skor portofolio mahasiswa), sementara mahasiswa dapat memberikan ulasan kredibilitas mitra bisnis.
5. **Contextual In-App Messaging & Multi-Channel Notification Hub**: Layanan pesan instan internal yang terikat pada konteks *workspace* aktif beserta laci notifikasi terpusat untuk setiap perubahan status lamaran, pembaruan tugas, dan pengumuman sistem.
6. **Admin Governance & Oversight Center**: Dasbor analitik bagi pengelola platform untuk memoderasi proyek, memvalidasi legalitas profil UMKM/institusi mahasiswa, memantau metrik performa sistem, dan melacak log audit keamanan (*security audit logs*).

### 1.1.4 Tujuan Proyek (Project Objectives)
Tujuan dari perencanaan dan pengembangan perangkat lunak SkillBridge Hub adalah:
1. Merancang dan membangun arsitektur perangkat lunak berbasis web yang andal, modular, dan terukur (*scalable*) menggunakan tumpukan teknologi modern (React 19, Express 5, TypeScript, Prisma ORM, MySQL/PostgreSQL).
2. Mengembangkan algoritma penjodohan berbasis AI (*AI Matchmaking Engine*) yang mampu mengevaluasi kecocokan pelamar dan proyek dengan waktu komputasi sub-detik.
3. Mengembangkan modul manajemen proyek kolaboratif (*Workspace & Task Management*) dengan pelacakan persentase kemajuan dinamis guna memastikan proyek selesai tepat waktu.
4. Menyediakan sistem reputasi dan portofolio akademik digital yang terverifikasi dan terlindungi dari manipulasi data melalui skema relasional yang ketat.
5. Menerapkan kontrol akses berbasis peran (*Role-Based Access Control / RBAC*) yang aman dengan otentikasi JSON Web Token (JWT) dan validasi skema berlapis (*fail-fast Zod validation*).

### 1.1.5 Manfaat Proyek (Benefits)
Implementasi sistem SkillBridge Hub memberikan dampak dan manfaat strategis bagi berbagai entitas:
1. **Bagi Mitra UMKM & Pemilik Bisnis**:
   - Mempercepat proses akuisisi talenta digital yang relevan dan siap pakai tanpa biaya rekrutmen yang mahal.
   - Memperoleh solusi digitalisasi nyata (pembuatan landing page, e-commerce, desain visual, kampanye digital) untuk meningkatkan daya saing pasar.
   - Memiliki visibilitas penuh dan kontrol terhadap tahapan pengerjaan proyek secara terstruktur.
2. **Bagi Mahasiswa / Talenta Muda**:
   - Mendapatkan akses ke proyek industri nyata yang relevan dengan minat dan bidang keahlian.
   - Membangun rekam jejak portofolio profesional yang terverifikasi langsung oleh pemilik usaha.
   - Mengasah kompetensi teknis, disiplin tenggat waktu, dan kemampuan komunikasi bisnis.
3. **Bagi Institusi Pendidikan Tinggi**:
   - Memperkuat implementasi program kolaborasi kampus merdeka dan kemitraan industri nyata.
   - Mempermudah pemantauan kualitas luaran praktikum atau magang mandiri mahasiswa berbasis data digital.
4. **Bagi Pengelola Platform (Administrator)**:
   - Memiliki sistem kendali mutu terpusat untuk memastikan ekosistem kolaborasi berjalan etis, aman, dan produktif melalui dasbor analitik dan log audit.

### 1.1.6 Ruang Lingkup Proyek (Project Scope)
Batasan ruang lingkup pengembangan sistem didefinisikan secara tegas untuk menjamin ketercapaian target fungsional:
- **Fitur dalam Lingkup Pengembangan (In-Scope)**:
  1. Otentikasi pengguna terpadu (Registrasi, Login, Forgot Password, Reset Password, JWT Access Token & Refresh/Revocation via Token Versioning).
  2. Manajemen profil multi-peran (Mahasiswa dengan keahlian/sertifikat; UMKM dengan profil usaha dan skala bisnis; Admin dengan hak tata kelola).
  3. Katalog dan Marketplace Proyek dengan filter dinamis (Kategori, Tingkat Kesulitan, Durasi, Besaran Stipend, Status).
  4. Publikasi brief proyek oleh UMKM beserta sasaran (*objectives*), luaran (*deliverables*), dan label keahlian (*skill tags*).
  5. Mesin AI Matchmaking berbasis Google GenAI SDK (Gemini 2.5 Flash) untuk analisis kecocokan profil pelamar secara otomatis.
  6. Alur pendaftaran proyek (*1-click application*), peninjauan daftar pelamar, serta mekanisme penerimaan/penolakan lamaran.
  7. Inisialisasi otomatis ruang kerja kolaboratif (*Workspace*) saat lamaran disetujui.
  8. Modul manajemen tugas terstruktur (*task checklist*, *assigned member*, *due date*, kalkulasi persentase progres dinamis).
  9. Modul penyerahan luaran akhir proyek (*final project deliverables submission*) dan validasi persetujuan oleh UMKM.
  10. Sistem ulasan timbal balik (*two-way reviews*) dengan rating bintang 1-5 dan kalkulasi otomatis skor portofolio mahasiswa.
  11. Komunikasi percakapan kontekstual internal (*contextual in-app messaging*) antaranggota workspace.
  12. Sistem notifikasi instan berbasis peristiwa (*event-driven notification drawer*).
  13. Dasbor tata kelola Administrator (manajemen kategori, moderasi status proyek, verifikasi identitas, ringkasan analitik, audit log aktivitas).
- **Fitur di Luar Lingkup Pengembangan (Out-of-Scope)**:
  1. Integrasi gerbang pembayaran otomatis (*Payment Gateway Escrow*) untuk penahanan dana stipend (pembayaran stipend dilakukan melalui kesepakatan langsung di luar sistem pada fase ini).
  2. Lingkungan eksekusi kode terintegrasi (*In-browser Code Execution Sandbox / IDE*).
  3. Layanan panggilan video (*video conferencing*) internal (komunikasi video diarahkan ke platform eksternal seperti Google Meet/Zoom).
  4. Aplikasi mobile *native* (iOS/Android) — fokus fase ini adalah *Progressive Responsive Web Application*.

---

# BAB 2 — SOFTWARE REQUIREMENTS

## 2.1 Pemangku Kepentingan (Stakeholders)

##### Tabel 2.1 Matriks Analisis Pemangku Kepentingan (Stakeholder Analysis)
| ID | Nama Pemangku Kepentingan | Peran dalam Proyek | Kepentingan terhadap Sistem | Tanggung Jawab Utama |
| :---: | :--- | :--- | :--- | :--- |
| **SH-01** | **Mahasiswa (Talenta Muda)** | Pengguna Akhir (*End User*) | Memperoleh akses proyek industri, membangun portofolio terverifikasi, dan mendapatkan kompensasi/stipend. | Mendaftarkan profil keahlian valid, melamar proyek sesuai kualifikasi, menyelesaikan tugas sesuai tenggat waktu di *workspace*. |
| **SH-02** | **Pelaku UMKM / Mitra Bisnis** | Pengguna Akhir (*End User*) | Mendapatkan solusi digitalisasi bisnis yang berkualitas melalui talenta mahasiswa yang terkurasi. | Menerbitkan *brief* proyek terstruktur, meninjau pelamar, mengelola koordinasi *workspace*, memvalidasi luaran, memberikan ulasan. |
| **SH-03** | **Administrator Platform** | Pengelola Sistem (*System Controller*) | Menjaga keamanan, kepatuhan konten, integritas data, dan kelancaran operasional platform secara menyeluruh. | Memoderasi proyek, memverifikasi akun, mengelola master kategori, mengawasi log audit, menangani eskalasi isu teknis. |
| **SH-04** | **Pihak Akademik / Universitas** | Pembina & Verifikator | Memastikan luaran kerja mahasiswa sesuai standar kompetensi pendidikan tinggi dan menunjang capaian pembelajaran. | Memberikan rekomendasi keahlian mahasiswa, memantau perkembangan program kemitraan industri. |
| **SH-05** | **Tim Rekayasa Perangkat Lunak** | Pengembang (*Developer Team*) | Mengembangkan, menguji, menyebarkan, dan memelihara sistem sesuai spesifikasi kebutuhan yang disepakati. | Melakukan analisis sistem, perancangan UI/UX, pengkodean frontend/backend, pengujian QA, dan deployment produksi. |

---

## 2.2 Peran Pengguna (User Roles & Access Levels)

##### Tabel 2.2 Matriks Peran Pengguna dan Hak Akses Sistem (Role-Based Access Control)
| Nama Peran (*Role*) | Tingkat Akses (*Access Level*) | Tanggung Jawab Utama | Lingkup Fitur yang Dapat Diakses |
| :--- | :---: | :--- | :--- |
| **GUEST (Pengunjung)** | Publik (*Unauthenticated*) | Menjelajahi informasi umum platform sebelum mendaftar. | Halaman Landing Page, Eksplorasi Katalog Proyek Publik, Halaman Tentang Kami, Form Registrasi & Login, Form Lupa Password. |
| **STUDENT (Mahasiswa)** | Terotentikasi (*Authenticated User*) | Mencari proyek, mengirim lamaran, mengeksekusi tugas, membangun portofolio. | Manajemen Profil & Keahlian, Unggah Sertifikat, Pendaftaran Proyek, Dasbor Mahasiswa, Akses Workspace Aktif, Manajemen Task Checklist, Penyerahan Deliverables, Chat Contextual, Submit Review UMKM, Notifikasi Pribadi. |
| **UMKM (Pemilik Proyek)** | Terotentikasi (*Authenticated User*) | Menerbitkan proyek, menyeleksi kandidat, mengawasi pengerjaan, menilai luaran. | Manajemen Profil Usaha, Pembuatan & Pengeditan Draft/Publish Proyek, Manajemen Pelamar, Penilaian AI Match Pelamar, Akses Workspace Proyek, Pengelolaan Task Milestone, Persetujuan/Revisi Deliverables, Chat Contextual, Submit Review Mahasiswa, Notifikasi Pribadi. |
| **ADMIN (Administrator)** | Tata Kelola Penuh (*Privileged User*) | Memelihara ekosistem platform, audit keamanan, tata kelola data master. | Dasbor Analitik Utama, Manajemen Master Kategori, Moderasi Proyek Publik, Pusat Verifikasi Akun Pengguna, Manajemen Pengguna (Suspend/Activate), Pemantauan Log Audit Keamanan (*Security Audit Logs*). |

---

## 2.3 Kebutuhan Fungsional (Functional Requirements)

##### Tabel 2.3 Spesifikasi Kebutuhan Fungsional (Functional Requirements Matrix)
| Kode Kebutuhan | Nama Fitur | Deskripsi Kebutuhan Sistem | Aktor Utama | Tingkat Prioritas |
| :---: | :--- | :--- | :---: | :---: |
| **FR-AUTH-01** | Registrasi Multi-Peran | Sistem harus mampu mendaftarkan akun baru dengan memilih peran (Mahasiswa atau UMKM) disertai enkripsi password menggunakan Bcrypt. | Guest | **Tinggi (High)** |
| **FR-AUTH-02** | Otentikasi Login JWT | Sistem harus mampu memvalidasi kredensial pengguna dan menerbitkan JSON Web Token (JWT) yang memuat identitas dan peran pengguna. | Semua Aktor | **Tinggi (High)** |
| **FR-AUTH-03** | Pemulihan Kata Sandi | Sistem harus menyediakan alur permintaan reset password berbasis token unik yang aman dan kedaluwarsa otomatis. | Semua Aktor | **Sedang (Medium)** |
| **FR-PROF-01** | Manajemen Profil Mahasiswa | Sistem harus memungkinkan mahasiswa mengelola profil, institusi pendidikan, biografi, daftar taksonomi keahlian, dan tautan sertifikat. | Mahasiswa | **Tinggi (High)** |
| **FR-PROF-02** | Manajemen Profil UMKM | Sistem harus memungkinkan UMKM mengelola data profil perusahaan, logo, bidang industri, lokasi, skala usaha, dan tautan media sosial/web. | UMKM | **Tinggi (High)** |
| **FR-PROJ-01** | Pembuatan Brief Proyek | Sistem harus menyediakan formulir bagi UMKM untuk menyusun brief proyek (judul, kategori, durasi, stipend, tingkat kesulitan, sasaran, luaran, dan label keahlian). | UMKM | **Tinggi (High)** |
| **FR-PROJ-02** | Manajemen Status Proyek | Sistem harus memungkinkan pemilik proyek mengubah status proyek (Draft, Published, Active, Completed, Cancelled). | UMKM, Admin | **Tinggi (High)** |
| **FR-PROJ-03** | Eksplorasi & Filter Marketplace | Sistem harus menyediakan katalog pencarian proyek dengan filter multi-parameter (kategori, level, durasi, rentang stipend, kata kunci pencarian). | Mahasiswa, Guest | **Tinggi (High)** |
| **FR-AI-01** | Analisis AI Matchmaking | Sistem harus mampu menghitung persentase kecocokan pelamar terhadap proyek secara otomatis menggunakan Google Gemini AI berdasarkan taksonomi keahlian dan riwayat portofolio. | UMKM, Sistem | **Tinggi (High)** |
| **FR-APP-01** | Pengajuan Lamaran Proyek | Sistem harus memungkinkan mahasiswa mengajukan lamaran ke proyek aktif dengan melampirkan profil dan pitch pengantar (1 lamaran per proyek). | Mahasiswa | **Tinggi (High)** |
| **FR-APP-02** | Manajemen & Seleksi Pelamar | Sistem harus menampilkan daftar pelamar proyek beserta skor AI Matchmaking, serta memungkinkan UMKM menerima (*Accept*) atau menolak (*Reject*) pelamar. | UMKM | **Tinggi (High)** |
| **FR-WORK-01** | Otomatisasi Inisiasi Workspace | Sistem harus secara otomatis membuat entitas ruang kerja (*Workspace*) bersama saat UMKM menyetujui lamaran mahasiswa. | Sistem | **Tinggi (High)** |
| **FR-WORK-02** | Manajemen Checklist Tugas | Sistem harus memungkinkan pembuatan, pengeditan, penghapusan, penugasan anggota, penetapan tenggat waktu, dan penandaan status selesai pada tugas proyek (*tasks*). | Mahasiswa, UMKM | **Tinggi (High)** |
| **FR-WORK-03** | Pelacakan Kemajuan Dinamis | Sistem harus menghitung ulang persentase kemajuan pengerjaan proyek (*progress percent*) secara otomatis setiap kali status tugas diperbarui. | Sistem | **Tinggi (High)** |
| **FR-WORK-04** | Penyerahan Luaran Proyek | Sistem harus menyediakan antarmuka bagi mahasiswa untuk menyerahkan tautan luaran akhir proyek dan memungkinkan UMKM menyetujui atau meminta revisi. | Mahasiswa, UMKM | **Tinggi (High)** |
| **FR-REV-01** | Evaluasi Timbal Balik (2-Way Review)| Sistem harus memfasilitasi pemberian rating bintang (1-5) dan ulasan tekstual antara mahasiswa dan UMKM setelah proyek dinyatakan selesai. | Mahasiswa, UMKM | **Tinggi (High)** |
| **FR-REV-02** | Kalkulasi Skor Portofolio | Sistem harus secara otomatis memperbarui akumulasi skor portofolio (*portfolio score*) mahasiswa berdasarkan rating ulasan proyek yang diterima. | Sistem | **Sedang (Medium)** |
| **FR-CHAT-01** | Percakapan Kontekstual In-App | Sistem harus menyediakan modul perpesanan langsung (*direct messaging*) antaranggota yang terikat pada konteks workspace proyek. | Mahasiswa, UMKM | **Sedang (Medium)** |
| **FR-NOTIF-01**| Pusat Notifikasi Pengguna | Sistem harus mencatat dan menampilkan notifikasi instan saat terjadi perubahan status lamaran, pembaruan tugas, dan pesan baru. | Semua Aktor | **Sedang (Medium)** |
| **FR-ADM-01** | Dasbor Analitik Administratif | Sistem harus menampilkan visualisasi metrik ringkasan platform (total pengguna, proyek aktif, workspace berjalan, tingkat keberhasilan penyelesaian). | Admin | **Sedang (Medium)** |
| **FR-ADM-02** | Moderasi Proyek & Kategori | Sistem harus memungkinkan admin menambah/mengubah master kategori serta mempublikasikan atau mencabut publikasi proyek. | Admin | **Sedang (Medium)** |
| **FR-ADM-03** | Verifikasi & Manajemen Pengguna | Sistem harus memungkinkan admin memverifikasi status keabsahan profil UMKM/Mahasiswa serta menonaktifkan akun yang melanggar ketentuan. | Admin | **Sedang (Medium)** |
| **FR-ADM-04** | Pencatatan Audit Log Keamanan | Sistem harus merekam seluruh tindakan administratif penting ke dalam tabel audit log yang tidak dapat diubah (*immutable audit log*). | Admin, Sistem | **Sedang (Medium)** |

---

## 2.4 Kebutuhan Non-Fungsional (Non-Functional Requirements)

##### Tabel 2.4 Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements Matrix)
| Parameter Kebutuhan | Kode NFR | Spesifikasi Target Terukur |
| :--- | :---: | :--- |
| **Performa (*Performance*)** | **NFR-P-01** | Waktu respons pemanggilan RESTful API rata-rata $\le 200\text{ ms}$ untuk operasi basis data standar pada beban normal. |
| | **NFR-P-02** | Waktu pemrosesan rekomendasi AI Matchmaking via Google Gemini API tuntas dalam $\le 2.5\text{ detik}$. |
| | **NFR-P-03** | Waktu pemuatan halaman awal (*First Contentful Paint / FCP*) pada browser klien $\le 1.2\text{ detik}$. |
| **Keamanan (*Security*)** | **NFR-S-01** | Seluruh kata sandi pengguna wajib dienkripsi searah menggunakan algoritma **Bcrypt** dengan minimum *salt factor* 10. |
| | **NFR-S-02** | Otentikasi sesi menggunakan stateless JSON Web Token (JWT) yang ditandatangani dengan algoritma HMAC-SHA256 dan dilengkapi mekanisme *Token Versioning* untuk mengantisipasi kebocoran token. |
| | **NFR-S-03** | Penerapan validasi skema masukan (*fail-fast boundary validation*) pada semua rute API menggunakan pustaka **Zod** guna mencegah serangan *SQL/NoSQL Injection* dan *Cross-Site Scripting (XSS)*. |
| | **NFR-S-04** | Pembatasan frekuensi akses (*Rate Limiting*) pada titik akhir kritis (login, registrasi, AI prompt) untuk memitigasi serangan *Brute Force* dan *Denial of Service (DoS)*. |
| **Kegunaan (*Usability*)** | **NFR-U-01** | Antarmuka pengguna (*User Interface*) mengadopsi desain responsif (*Fluid Responsive Grid*) berbasis Tailwind CSS v4 yang optimal diakses pada layar desktop, tablet, dan smartphone. |
| | **NFR-U-02** | Tata letak antarmuka memiliki skor aksesibilitas (*Web Content Accessibility Guidelines / WCAG 2.1 Level AA*) dengan rasio kontras warna minimum 4.5:1. |
| **Keandalan (*Reliability*)**| **NFR-R-01** | Penanganan galat terpusat (*Global Error Handling Middleware*) yang memastikan sistem tidak pernah *crash* saat terjadi galat tak terduga (*uncaught exceptions*) dan selalu mengembalikan respons JSON terstruktur dengan format `{"success": false, "error": "Message"}`. |
| **Skalabilitas (*Scalability*)**| **NFR-SC-01**| Arsitektur backend stateless yang mendukung penskalaan horizontal (*horizontal scaling*) di lingkungan kontainer atau serverless. |
| **Ketersediaan (*Availability*)**| **NFR-A-01** | Tingkat ketersediaan sistem operasional (*uptime availability*) ditargetkan mencapai $99.5\%$ per bulan di luar jadwal pemeliharaan rutin. |
| **Kompatibilitas (*Compatibility*)**| **NFR-C-01** | Antarmuka web kompatibel penuh pada peramban modern utama (Google Chrome $\ge v110$, Mozilla Firefox $\ge v110$, Microsoft Edge $\ge v110$, Apple Safari $\ge v16$). |
| **Kemudahan Pemeliharaan (*Maintainability*)**| **NFR-M-01** | Seluruh basis kode ditulis menggunakan **TypeScript** bertipe ketat (*Strict Mode*) dengan pemisahan lapisan arsitektur *Controller-Service-Repository* untuk kemudahan pengujian dan refaktor. |

---

## 2.5 Kebutuhan Lingkungan Pengembangan (Development Requirements)

##### Tabel 2.5 Spesifikasi Kebutuhan Lingkungan Pengembangan (Development Environment)
| Komponen Lingkungan | Spesifikasi Perangkat Keras / Perangkat Lunak | Keterangan & Peruntukan |
| :--- | :--- | :--- |
| **Perangkat Keras (*Hardware*)** | - Prosesor: Intel Core i5/i7 Generasi ke-11 ke atas / AMD Ryzen 5/7 / Apple Silicon M-Series<br>- RAM: Minimum 16 GB DDR4/DDR5<br>- Penyimpanan: 512 GB NVMe SSD<br>- Koneksi Internet: Broadband $\ge 20\text{ Mbps}$ | Menjalankan server pengembangan lokal, kompilasi TypeScript, eksekusi Vite HMR, dan container database secara simultan. |
| **Sistem Operasi (*OS*)** | Windows 11 Pro 64-bit / macOS Sonoma / Ubuntu Linux 22.04 LTS | Lingkungan eksekusi perkakas pengembangan. |
| **Runtime & Bahasa** | - **Node.js**: Versi 20.x LTS / 22.x LTS<br>- **TypeScript**: Versi 5.8+ | Mesin eksekusi JavaScript sisi server dan bahasa pemrograman bertipe statis. |
| **Framework Backend** | **Express.js v5.x** (*Next-generation Web Framework*) | Router REST API, middleware HTTP, dan arsitektur backend. |
| **Framework Frontend** | - **React v19.0**<br>- **Vite v6.2** (*Build Tool & Dev Server*)<br>- **Tailwind CSS v4.1** | Pustaka antarmuka komponen reaktif, bundling secepat kilat, dan styling modern. |
| **Basis Data & ORM** | - **MySQL v8.0** / **PostgreSQL v16**<br>- **Prisma ORM v5.22** | RDBMS transaksional dan Object-Relational Mapper bertipe aman (*Type-Safe DB Queries*). |
| **SDK Kecerdasan Buatan** | **Google GenAI SDK** (`@google/genai` - Gemini 2.5 Flash) | Integrasi AI Matchmaking Engine. |
| **Perkakas & Editor (*Tools*)** | - Visual Studio Code (dengan ekstensi Prisma, ESLint, Tailwind, TypeScript)<br>- Git v2.45+ (Version Control)<br>- Postman / Insomnia (Pengujian Endpoint API)<br>- Laragon / Docker Desktop (Local Web & Database Server) | Alat bantu rekayasa kode, debugging, dan pengujian API. |

---

## 2.6 Kebutuhan Lingkungan Penerapan (Deployment Requirements)

##### Tabel 2.6 Spesifikasi Kebutuhan Lingkungan Produksi (Deployment Environment)
| Kategori Infrastruktur | Spesifikasi Lingkungan Produksi |
| :--- | :--- |
| **Web Server & Hosting Frontend** | Vercel Edge Network / Cloudflare Pages / NGINX Reverse Proxy dengan kompresi Gzip/Brotli dan distribusi CDN global. |
| **Server Komputasi Backend** | Node.js Runtime Container (Render / Railway / AWS ECS Fargate / Virtual Private Server) dengan konfigurasi `NODE_ENV=production`. |
| **Hosting Basis Data Cloud** | Managed Relational Database Service (Supabase PostgreSQL / PlanetScale MySQL / AWS RDS) dengan kapasitas penyimpanan auto-scaling dan koneksi terenkripsi SSL. |
| **Domain & Enkripsi Jaringan** | Domain terdaftar dengan sertifikat SSL/TLS (Let's Encrypt / Cloudflare SSL) untuk protokol aman HTTPS penuh (*HSTS Enabled*). |
| **Manajemen Variabel Lingkungan** | Konfigurasi terisolasi melalui *Environment Secrets*: `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `PORT`, `CORS_ORIGIN`. |

---

# BAB 3 — SOFTWARE DEVELOPMENT PLANNING

## 3.1 Metodologi Pengembangan (Development Methodology)
Pengembangan perangkat lunak SkillBridge Hub menerapkan metodologi **Agile Software Development** dengan kerangka kerja **Scrum**. Metodologi ini dipilih secara spesifik karena karakteristik proyek yang melibatkan integrasi kecerdasan buatan (*AI API*), kebutuhan antarmuka kolaboratif dinamis, serta iterasi umpan balik yang cepat.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AGILE SCRUM LIFECYCLE                                 │
│                                                                             │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────┐  │
│   │ Product      │ ──▶ │ Sprint       │ ──▶ │ Sprint       │ ──▶ │ Pot.  │  │
│   │ Backlog      │     │ Planning     │     │ Execution    │     │ Ship. │  │
│   │ Refinement   │     │ (Sprint Goal)│     │ (Daily Stand)│     │ Incr. │  │
│   └──────────────┘     └──────────────┘     └──────────────┘     └───────┘  │
│                                                     │                       │
│                                                     ▼                       │
│                        ┌──────────────┐     ┌──────────────┐                │
│                        │ Sprint       │ ◀── │ Sprint       │                │
│                        │ Retrospective│     │ Review / Demo│                │
│                        └──────────────┘     └──────────────┘                │
└─────────────────────────────────────────────────────────────────────────────┘
```
#### Gambar 3.1 Diagram Alur Kerja Metodologi Agile Scrum

**Alasan Pemilihan Agile Scrum untuk SkillBridge Hub**:
1. **Fleksibilitas terhadap Integrasi AI**: Eksperimen *prompt engineering* pada Google Gemini 2.5 Flash membutuhkan penyesuaian iteratif agar menghasilkan luaran rasionalisasi kecocokan yang presisi.
2. **Pengembangan Berbasis Modul Mandiri (*Feature-Driven Increment*)**: Fitur-fitur seperti Auth, Marketplace, AI Matchmaking, Workspace, Chat, dan Review dapat diselesaikan dalam *Sprint Backlog* mandiri yang langsung dapat diuji (*potentially shippable product*).
3. **Manajemen Risiko Dini**: Evaluasi berkala pada akhir setiap siklus sprint memungkinkan deteksi dini terhadap *bottleneck* performa basis data atau inkonsistensi API.

---

## 3.2 Struktur Tim Rekayasa Perangkat Lunak (Development Team Structure)
Pengembangan perangkat lunak SkillBridge Hub dilaksanakan secara mandiri (*Solo Fullstack Engineering*) oleh **Ahmad Dhafin Al Farisy** yang memegang tanggung jawab penuh secara *end-to-end* dalam seluruh dimensi rekayasa sistem:

```
                    ┌────────────────────────────────────────────────────────┐
                    │               FULLSTACK SOFTWARE ENGINEER              │
                    │                 (Ahmad Dhafin Al Farisy)               │
                    └───────────────────────────┬────────────────────────────┘
                                                │
         ┌──────────────────────────────┬───────┴───────┬──────────────────────────────┐
         │                              │               │                              │
┌────────┴─────────────┐ ┌──────────────┴─────┐ ┌───────┴──────────────┐ ┌─────────────┴────────────┐
│   System Analysis    │ │   UI/UX Design &   │ │ Backend Architecture │ │ Database Administration  │
│   & Requirements     │ │ Frontend Reaktif   │ │ & AI GenAI Engine    │ │ & Quality Assurance (QA) │
└──────────────────────┘ └────────────────────┘ └──────────────────────┘ └──────────────────────────┘
```

---

## 3.3 Peran dan Tanggung Jawab (Roles and Responsibilities)

##### Tabel 3.1 Struktur Peran, Tanggung Jawab, dan Luaran Tim Pengembang
| Peran Tim (*Team Role*) | Tanggung Jawab Utama (*Main Responsibilities*) | Luaran Kerja (*Deliverables*) |
| :--- | :--- | :--- |
| **Lead Software Architect & Project Manager** | - Mengarahkan arsitektur teknis sistem secara menyeluruh.<br>- Mengorkestrasi pembagian tugas sprint backlog dan mitigasi risiko teknis.<br>- Memimpin integrasi fullstack dan code review. | - Dokumen Arsitektur Sistem.<br>- Konfigurasi Repository & CI/CD.<br>- Source Code Backend & Frontend Terintegrasi. |
| **System & Business Analyst** | - Mengidentifikasi proses bisnis dan menganalisis kebutuhan fungsional/non-fungsional.<br>- Menyusun spesifikasi use case scenario dan diagram BPMN/DFD.<br>- Menyusun dokumentasi akademik formal. | - Software Requirements Specification (SRS).<br>- Diagram BPMN & DFD Level 0/1.<br>- Use Case Narrative Document. |
| **UI/UX & Frontend Engineer** | - Merancang antarmuka pengguna interaktif (Figma Wireframes & Prototype).<br>- Mengimplementasikan komponen modular React 19 dengan Tailwind CSS v4.<br>- Menghubungkan antarmuka dengan RESTful API melalui TanStack Query. | - Desain Prototipe UI/UX.<br>- Pustaka Komponen Reaktif Frontend.<br>- Halaman Modul Mahasiswa, UMKM, dan Admin. |
| **Backend & AI Integration Engineer** | - Mengembangkan API RESTful Express 5 dengan arsitektur Controller-Service-Repository.<br>- Mengimplementasikan otentikasi JWT dan middleware validasi Zod.<br>- Merancang prompt dan mengintegrasikan Google Gemini 2.5 Flash SDK. | - REST API Endpoints & Middleware.<br>- Modul Integrasi AI Engine.<br>- Dokumentasi API (Postman Collection). |
| **Database Administrator & QA Specialist** | - Merancang skema relasional basis data, indeks, dan relasi foreign key via Prisma.<br>- Menyusun skrip migrasi dan data awal (*database seeding*).<br>- Menyusun rencana pengujian (*test plan*) dan mengeksekusi pengujian fungsional serta audit celah keamanan. | - Prisma Schema & Migration Files.<br>- Data Seeding Script.<br>- Dokumen Rencana & Laporan Pengujian (QA Report). |

---

## 3.4 Alur Kerja Pengembangan (Development Workflow)
Alur kerja rekayasa perangkat lunak SkillBridge Hub dijalankan melalui 11 tahapan sistematis:

```
[1. Penggalian Kebutuhan] ──▶ [2. Analisis Sistem] ──▶ [3. Desain Arsitektur]
                                                              │
                                                              ▼
[6. Pemrograman Frontend] ◀── [5. Desain Basis Data] ◀── [4. Desain UI/UX]
         │
         ▼
[7. Pemrograman Backend & AI] ──▶ [8. Integrasi Fullstack] ──▶ [9. Pengujian QA]
                                                                    │
                                                                    ▼
[11. Pemeliharaan & Monitoring] ◀── [10. Penerapan Produksi (Deploy)]
```

1. **Tahap 1: Penggalian Kebutuhan (*Requirement Gathering*)**: Wawancara dengan representasi mahasiswa dan pelaku UMKM untuk mengidentifikasi *pain points* kolaborasi proyek nyata.
2. **Tahap 2: Analisis Sistem (*System Analysis*)**: Formalisasi kebutuhan ke dalam matriks Kebutuhan Fungsional (FR) dan Non-Fungsional (NFR).
3. **Tahap 3: Desain Arsitektur Sistem (*System Architecture Design*)**: Perancangan pola arsitektur 3-tier, penetapan kontrak antarmuka API, dan pemilihan teknologi.
4. **Tahap 4: Perancangan UI/UX (*UI/UX Design*)**: Penyusunan alur pengguna (*user flow*), *wireframe* tata letak, dan desain interaktif antarmuka bertema modern/profesional.
5. **Tahap 5: Perancangan Basis Data (*Database Design*)**: Pemodelan ERD, CDM, PDM, dan skema Prisma dengan integritas referensial penuh.
6. **Tahap 6: Pemrograman Frontend (*Frontend Development*)**: Pengkodean komponen modular React 19, sistem navigasi React Router v7, dan state caching TanStack Query.
7. **Tahap 7: Pemrograman Backend & AI (*Backend & AI Development*)**: Pengkodean rute Express 5, logika bisnis service, Prisma repository, validasi Zod, dan integrasi Google GenAI SDK.
8. **Tahap 8: Integrasi Sistem (*System Integration*)**: Penyatuan modul frontend dan backend, pengikatan otentikasi JWT Bearer, dan pengujian alur data *end-to-end*.
9. **Tahap 9: Pengujian & Jaminan Kualitas (*Testing & QA*)**: Pelaksanaan pengujian unit, integrasi, fungsional matriks, uji keamanan otorisasi, dan uji beban.
10. **Tahap 10: Penerapan Produksi (*Deployment & Release*)**: Konfigurasi lingkungan produksi di cloud hosting, migrasi basis data online, dan konfigurasi domain/SSL.
11. **Tahap 11: Pemeliharaan & Monitoring (*Maintenance & Monitoring*)**: Pemantauan log server, perbaikan kutu pasca-rilis, dan optimasi query basis data.

---

## 3.5 Rencana Tahapan Pengembangan (Project Timeline & Sprints)

##### Tabel 3.2 Rencana Pembagian Tahapan Siklus Pengembangan (Development Phases Matrix)
| Tahap Pengembangan | Fokus Aktivitas Utama | Periode Target | Luaran yang Dihasilkan |
| :---: | :--- | :---: | :--- |
| **Fase 1: Inisiasi & Analisis Kebutuhan** | - Wawancara stakeholder & studi literatur.<br>- Penyusunan dokumen ruang lingkup dan matriks FR/NFR.<br>- Pembuatan diagram proses bisnis BPMN dan Context Diagram DFD. | **Siklus 1** | Dokumen Spesifikasi Kebutuhan Sistem (SRS) & Diagram BPMN. |
| **Fase 2: Perancangan Arsitektur & UI/UX** | - Perancangan skema relasional basis data (ERD/CDM/PDM).<br>- Desain antarmuka sistem di Figma (Mahasiswa, UMKM, Admin).<br>- Penyusunan kontrak API RESTful JSON. | **Siklus 2** | Desain Figma, Skema Prisma Awal, Spesifikasi OpenAPI/Postman. |
| **Fase 3: Pondasi Backend, Database & Auth** | - Inisialisasi basis data MySQL/PostgreSQL & skrip seeding data.<br>- Pembuatan modul otentikasi JWT, password hashing Bcrypt, dan middleware RBAC.<br>- Implementasi Zod schema boundary validation. | **Siklus 3** | Backend Auth Subsystem, Seed Data, Rute Profil Pengguna. |
| **Fase 4: Core Marketplace & AI Engine** | - Pembuatan API publikasi proyek & manajemen katalog.<br>- Integrasi SDK Google Gemini 2.5 Flash untuk skor AI Matchmaking.<br>- Pembangunan halaman Marketplace, Detail Proyek, dan Form Brief Proyek di frontend. | **Siklus 4** | Fitur Marketplace Proyek & AI Matchmaking Engine Berfungsi. |
| **Fase 5: Modul Aplikasi & Workspace Kolaboratif** | - Pembuatan alur pendaftaran proyek (*1-click apply*).<br>- Modul seleksi pelamar oleh UMKM.<br>- Inisiasi otomatis entitas Workspace.<br>- Modul checklist tugas (*Task Management*) dan kalkulasi progres dinamis. | **Siklus 5** | Modul Lamaran & Shared Workspace Interaktif Berfungsi. |
| **Fase 6: Deliverables, Review & Perpesanan** | - Implementasi form penyerahan luaran proyek (*deliverables submission*).<br>- Sistem evaluasi dua arah (*Two-Way Review*) & pembaruan skor portofolio.<br>- Modul perpesanan kontekstual (*In-App Chat*) dan laci notifikasi. | **Siklus 6** | Siklus Proyek Selesai (Deliverables, Rating, Chat, Notifikasi). |
| **Fase 7: Admin Center & Audit Governance** | - Pembangunan Dasbor Analitik Admin (KPI ringkasan platform).<br>- Fitur moderasi proyek & verifikasi pengguna.<br>- Implementasi sistem pencatatan log audit keamanan (*AuditLog*). | **Siklus 7** | Admin Governance Center & Security Audit Logging Aktif. |
| **Fase 8: Pengujian Komprehensif & Deployment** | - Eksekusi Matriks Uji Fungsional & UAT.<br>- Optimasi performa frontend & query basis data.<br>- Deployment produksi cloud (Vercel & Cloud Database) + Konfigurasi SSL. | **Siklus 8** | Platform SkillBridge Hub Siap Digunakan di Lingkungan Produksi. |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 VISUALISASI STRUKTUR TAHAPAN (GANTT CHART)                  │
├────────────────────────┬──┬──┬──┬──┬──┬──┬──┬──┤                            │
│ Tahap Pengembangan     │S1│S2│S3│S4│S5│S6│S7│S8│                            │
├────────────────────────┼──┼──┼──┼──┼──┼──┼──┼──┤                            │
│ 1. Inisiasi & Analisis │██│  │  │  │  │  │  │  │                            │
│ 2. Desain & UI/UX      │  │██│  │  │  │  │  │  │                            │
│ 3. Database & Auth     │  │  │██│  │  │  │  │  │                            │
│ 4. Marketplace & AI    │  │  │  │██│  │  │  │  │                            │
│ 5. App & Workspace     │  │  │  │  │██│  │  │  │                            │
│ 6. Review, Chat, Notif │  │  │  │  │  │██│  │  │                            │
│ 7. Admin Governance    │  │  │  │  │  │  │██│  │                            │
│ 8. Testing & Deployment│  │  │  │  │  │  │  │██│                            │
└────────────────────────┴──┴──┴──┴──┴──┴──┴──┴──┘                            │
```
#### Gambar 3.2 Visualisasi Gantt Chart Tahapan Iterasi Proyek SkillBridge

---

## 3.6 Tonggak Pencapaian Proyek (Project Milestones)

##### Tabel 3.3 Daftar Tonggak Pencapaian Proyek (Project Milestones)
| Kode Milestone | Nama Tonggak Pencapaian | Kriteria Keberhasilan (*Acceptance Criteria*) |
| :---: | :--- | :--- |
| **M1** | **Spesifikasi & Desain Terverifikasi** | Dokumen kebutuhan (SRS), diagram proses bisnis (BPMN/DFD), dan desain antarmuka Figma telah disetujui. |
| **M2** | **Infrastruktur Basis Data & Auth Siap** | Skema basis data terimplementasi via Prisma migration, skrip seeding berhasil dieksekusi, endpoint login/register JWT berjalan valid. |
| **M3** | **Marketplace & AI Matchmaking MVP** | UMKM dapat menerbitkan brief proyek, mahasiswa dapat mencari proyek, dan Google Gemini API berhasil menghitung skor kecocokan pelamar. |
| **M4** | **Ekosistem Workspace & Task Berjalan** | Lamaran yang disetujui memicu pembuatan workspace otomatis, tugas dapat dibuat dan diperbarui, persentase progres terkalkulasi otomatis. |
| **M5** | **Siklus Proyek Selesai & Review Aktif** | Penyerahan deliverables dapat diverifikasi, mahasiswa dan UMKM dapat saling memberikan rating ulasan, skor portofolio bertambah. |
| **M6** | **Tata Kelola Admin & Audit Lengkap** | Admin dapat memantau statistik metrik, mengelola kategori, memoderasi proyek, dan memeriksa riwayat audit log. |
| **M7** | **Produksi Siap Rilis (*Release Ready*)** | Pengujian fungsional dan keamanan lulus 100%, sistem berhasil di-deploy ke cloud hosting dengan HTTPS aktif. |

---

## 3.7 Luaran Proyek (Deliverables)

##### Tabel 3.4 Rincian Luaran Proyek Perangkat Lunak (Deliverables)
| No | Kategori Luaran | Deskripsi Luaran Fisik / Digital |
| :---: | :--- | :--- |
| 1 | **Dokumentasi Perencanaan** | Dokumen Software Development Planning (SDP) dan Software Requirement Specification (SRS) lengkap format akademik. |
| 2 | **Berkas Desain Sistem** | File master diagram BPMN, DFD Level 0 & 1, Use Case Diagram & Scenarios, ERD, CDM, PDM, dan Class Diagram. |
| 3 | **Prototipe Desain UI/UX** | File desain antarmuka Figma yang memuat komponen wireframe dan interaktif prototype resolusi tinggi (*Hi-Fi*). |
| 4 | **Kode Sumber (*Source Code*)** | Repositori Git terstruktur yang memuat kode sumber Frontend (React 19) dan Backend API (Express 5 TypeScript). |
| 5 | **Skema Basis Data & Migrasi** | File skema `schema.prisma`, riwayat migrasi SQL, dan skrip penyemai data awal (`seed.ts`). |
| 6 | **Dokumentasi API** | Koleksi Postman (*Postman API Collection & Environment*) dan dokumentasi rute RESTful API terperinci. |
| 7 | **Laporan Pengujian (QA Report)** | Rekapitulasi hasil pengujian kasus uji fungsional, pengujian integrasi, dan laporan pengujian penerimaan pengguna (UAT). |
| 8 | **Panduan Pengguna (*User Manual*)** | Panduan operasional penggunaan platform untuk peran Mahasiswa, Mitra UMKM, dan Administrator. |

---

# BAB 4 — SOFTWARE ARCHITECTURE AND DESIGN PLAN

## 4.1 Arsitektur Sistem (System Architecture)
Sistem SkillBridge Hub dirancang menggunakan pola **3-Tier Layered Architecture** yang memisahkan tanggung jawab antara lapisan presentasi (*Presentation Tier*), lapisan logika aplikasi (*Application Logic Tier*), dan lapisan persistensi data (*Data Tier*):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           LAPISAN PRESENTASI                                │
│        SkillBridge Client Web App (React 19 · Vite 6 · TypeScript)          │
│       Tailwind CSS v4 · Motion · TanStack Query · React Router v7           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / REST API (JSON + JWT Bearer)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                         LAPISAN LOGIKA APLIKASI                             │
│       SkillBridge API Gateway & Service Engine (Express 5 · TypeScript)     │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ Middleware: JWT Auth Filter · RBAC · Zod Schema · Rate Limiter      │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
│                                      │                                      │
│   ┌──────────────────────────────────▼──────────────────────────────────┐   │
│   │ Controllers: Request Boundary & HTTP Response Serialization         │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
│                                      │                                      │
│   ┌──────────────────────────────────▼──────────────────────────────────┐   │
│   │ Services Layer: Domain Logic · AI Match Engine · Progress Calculator│   │
│   └─────────────────┬─────────────────────────────────┬─────────────────┘   │
│                     │                                 │                     │
│                     ▼                                 ▼                     │
│   ┌──────────────────────────────────┐ ┌────────────────────────────────┐   │
│   │ Repositories: Prisma Data Access │ │ AI Adapter: Google GenAI SDK   │   │
│   └─────────────────┬────────────────┘ │ (Gemini 2.5 Flash Model API)   │   │
│                     │                  └────────────────────────────────┘   │
└─────────────────────┼───────────────────────────────────────────────────────┘
                      │ Type-Safe Query Protocol
┌─────────────────────▼───────────────────────────────────────────────────────┐
│                           LAPISAN PERSISTENSI DATA                          │
│                   Relational Database Engine (MySQL 8 / PostgreSQL)         │
│           Tables: Users, Profiles, Projects, Workspaces, Tasks, Reviews     │
└─────────────────────────────────────────────────────────────────────────────┘
```
#### Gambar 4.1 Diagram Arsitektur Sistem 3-Tier Layered SkillBridge

**Karakteristik Arsitektur**:
1. **Frontend Client**: Berjalan di browser klien sebagai *Single Page Application (SPA)* berbasis React 19. Mengelola antarmuka, validasi masukan lokal, dan *server state cache* via TanStack Query.
2. **Backend API Gateway**: Menerapkan arsitektur *Controller-Service-Repository* (CSR). Controller menangani protokol HTTP dan serialisasi respons; Service mengisolasi seluruh logika bisnis murni; Repository mengenkapsulasi query basis data melalui Prisma ORM.
3. **AI External Integration**: Layanan Service berkomunikasi secara asinkron dengan Google GenAI SDK untuk melakukan inferensi pencocokan profil talenta terhadap deskripsi proyek.
4. **Data Persistence Tier**: Basis data relasional yang menjamin integritas data ACID (*Atomicity, Consistency, Isolation, Durability*) dengan relasi *foreign key cascade* yang ketat.

---

## 4.2 Proses Bisnis Utama (Business Process & BPMN)

Alur proses bisnis utama kolaborasi proyek di dalam sistem digambarkan melalui diagram BPMN berikut:

```
 Mahasiswa / Talenta            Sistem SkillBridge Hub            Mitra UMKM / Owner
         │                                │                                │
         │                                │   1. Susun & Terbitkan Proyek  │
         │                                │ ◀──────────────────────────────│
         │                                │                                │
         │   2. Jelajahi Marketplace      │                                │
         │ ─────────────────────────────▶ │                                │
         │                                │                                │
         │   3. Ajukan Lamaran Proyek     │                                │
         │ ─────────────────────────────▶ │                                │
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 4. Analisis Kecocokan       │
         │                                │  │    via Gemini AI API        │
         │                                │◀─┘                             │
         │                                │                                │
         │                                │   5. Tinjau Pelamar & AI Score │
         │                                │ ─────────────────────────────▶ │
         │                                │                                │
         │                                │   6. Setujui Lamaran Mahasiswa │
         │                                │ ◀──────────────────────────────│
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 7. Inisialisasi Otomatis    │
         │                                │  │    Workspace Bersama        │
         │                                │◀─┘                             │
         │                                │                                │
         │   8. Kerjakan & Update Task    │      Kelola Task & Monitoring  │
         │ ◀────────────────────────────▶ │ ◀────────────────────────────▶ │
         │                                │                                │
         │   9. Serahkan Deliverables     │                                │
         │ ─────────────────────────────▶ │   10. Validasi Hasil Kerja     │
         │                                │ ─────────────────────────────▶ │
         │                                │                                │
         │                                │   11. Setujui Hasil & Selesai  │
         │                                │ ◀──────────────────────────────│
         │                                │                                │
         │   12. Beri Review Mitra UMKM   │   13. Beri Review Mahasiswa    │
         │ ─────────────────────────────▶ │ ◀──────────────────────────────│
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 14. Perbarui Skor Portofolio│
         │                                │  │     Mahasiswa Otomatis      │
         │                                │◀─┘                             │
         ▼                                ▼                                ▼
```
#### Gambar 4.2 BPMN Alur Proses Bisnis Kolaborasi Proyek Terpadu

---

## 4.3 Perancangan Use Case (Use Case Plan & Scenarios)

```
                    ┌─────────────────────────────────────────┐
                    │            SkillBridge Hub              │
                    │                                         │
                    │   ┌─────────────────────────────────┐   │
                    │   │        Otentikasi & Profil      │   │
                    │   └─────────────────────────────────┘   │
                    │                    ▲                    │
                    │                    │ <<include>>        │
                    │   ┌────────────────┴────────────────┐   │
   (Mahasiswa) ───▶ │   │     Pendaftaran Proyek          │   │ ◀─── (Mitra UMKM)
                    │   └────────────────┬────────────────┘   │
                    │                    │ <<include>>        │
                    │                    ▼                    │
                    │   ┌─────────────────────────────────┐   │
                    │   │     AI Matchmaking Analysis     │   │
                    │   └────────────────┬────────────────┘   │
                    │                    │ <<include>>        │
                    │                    ▼                    │
                    │   ┌─────────────────────────────────┐   │
   (Mahasiswa) ───▶ │   │   Workspace & Task Tracking     │   │ ◀─── (Mitra UMKM)
                    │   └────────────────┬────────────────┘   │
                    │                    │ <<include>>        │
                    │                    ▼                    │
                    │   ┌─────────────────────────────────┐   │
   (Mahasiswa) ───▶ │   │  Deliverables & 2-Way Review    │   │ ◀─── (Mitra UMKM)
                    │   └─────────────────────────────────┘   │
                    │                                         │
                    │   ┌─────────────────────────────────┐   │
                    │   │    Moderasi, Analitik & Audit   │   │ ◀─── (Administrator)
                    │   └─────────────────────────────────┘   │
                    └─────────────────────────────────────────┘
```
#### Gambar 4.3 Use Case Diagram Sistem Informasi SkillBridge Hub

---

### Skenario Use Case Rinci

##### Tabel 4.1 Skenario Use Case: Pendaftaran dan Verifikasi Profil Mahasiswa/UMKM
| Komponen | Spesifikasi Skenario |
| :--- | :--- |
| **Nama Use Case** | **Pendaftaran dan Pengelolaan Profil Pengguna** |
| **Aktor** | Mahasiswa, Pelaku UMKM, Administrator |
| **Deskripsi** | Menjelaskan bagaimana pengguna mendaftar akun baru, melengkapi data profil spesifik peran, dan diverifikasi oleh sistem. |
| **Kondisi Awal** | Pengguna berada di halaman registrasi dan belum terotentikasi di sistem. |
| **Kondisi Akhir** | Profil pengguna tersimpan di basis data dan siap digunakan untuk bertransaksi di platform. |
| **Skenario Normal** | 1. Pengguna membuka form registrasi dan memilih peran (Mahasiswa / UMKM).<br>2. Pengguna mengisi nama lengkap, email unik, dan kata sandi.<br>3. Sistem memvalidasi skema data via Zod, mengenkripsi password dengan Bcrypt, dan membuat record User.<br>4. Sistem membuat profil terikat (`StudentProfile` atau `UmkmProfile`).<br>5. Pengguna melengkapi data keahlian (Mahasiswa) atau profil bisnis (UMKM).<br>6. Sistem menyimpan data dan mengembalikan status sukses. |
| **Skenario Alternatif** | **3a. Email telah terdaftar sebelumnya**:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Sistem mendeteksi duplikasi *unique constraint* pada tabel User.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Sistem mengembalikan status HTTP 409 Conflict dengan pesan "Email sudah digunakan".<br>&nbsp;&nbsp;&nbsp;&nbsp;3. Pengguna diarahkan untuk login atau menggunakan email lain. |

##### Tabel 4.2 Skenario Use Case: Penerbitan Brief Proyek oleh Mitra UMKM
| Komponen | Spesifikasi Skenario |
| :--- | :--- |
| **Nama Use Case** | **Penerbitan Brief Proyek Baru (Create Project Brief)** |
| **Aktor** | Mitra UMKM |
| **Deskripsi** | Menjelaskan alur pembuatan dan publikasi brief kebutuhan digitalisasi oleh pemilik usaha. |
| **Kondisi Awal** | Mitra UMKM telah login dan memiliki profil usaha yang valid. |
| **Kondisi Akhir** | Proyek tersimpan dengan status `PUBLISHED` dan tampil di katalog publik Marketplace. |
| **Skenario Normal** | 1. UMKM mengakses menu "Post New Project".<br>2. UMKM mengisi judul, memilih kategori, menentukan durasi, stipend, tingkat kesulitan, deskripsi, sasaran, luaran, dan label keahlian.<br>3. UMKM menekan tombol "Publish Project".<br>4. Sistem memvalidasi kelengkapan atribut wajib.<br>5. Sistem menyimpan entitas Proyek ke basis data dengan status `PUBLISHED`.<br>6. Sistem menampilkan notifikasi sukses dan mengarahkan ke halaman detail proyek. |
| **Skenario Alternatif** | **4a. Atribut wajib tidak lengkap**:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Sistem mendeteksi adanya field kosong pada validasi backend Zod.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Sistem menampilkan pesan peringatan spesifik pada field yang belum valid. |

##### Tabel 4.3 Skenario Use Case: Rekomendasi dan Pengajuan Lamaran Proyek dengan AI Matchmaking
| Komponen | Spesifikasi Skenario |
| :--- | :--- |
| **Nama Use Case** | **Pengajuan Lamaran Proyek & AI Match Scoring** |
| **Aktor** | Mahasiswa, Sistem AI |
| **Deskripsi** | Mahasiswa mengajukan diri pada proyek yang diminati, dan sistem mengevaluasi tingkat kecocokan pelamar menggunakan Google Gemini AI. |
| **Kondisi Awal** | Mahasiswa telah login dan menemukan proyek berstatus `PUBLISHED` di Marketplace. |
| **Kondisi Akhir** | Lamaran tersimpan dengan status `PENDING` beserta kalkulasi skor AI Match. |
| **Skenario Normal** | 1. Mahasiswa membuka halaman detail proyek dan menekan tombol "Apply Now".<br>2. Mahasiswa mengonfirmasi kesiapan profil keahlian.<br>3. Sistem memeriksa apakah mahasiswa sudah pernah melamar proyek tersebut.<br>4. Sistem membuat record `ProjectApplication` dengan status `PENDING`.<br>5. Sistem memicu modul AI Matchmaking untuk membandingkan JSON keahlian mahasiswa dengan deskripsi & tags proyek.<br>6. Google Gemini AI mengembalikan persentase kecocokan dan analisis rasionalisasi.<br>7. Sistem memperbarui atribut `matchScore` pada aplikasi dan mengirim notifikasi ke UMKM. |
| **Skenario Alternatif** | **3a. Mahasiswa telah melamar sebelumnya**:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Sistem mendeteksi pelanggaran *unique constraint* `[projectId, studentId]`.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Sistem menampilkan pesan peringatan "Anda sudah mengajukan lamaran pada proyek ini". |

##### Tabel 4.4 Skenario Use Case: Seleksi Pelamar dan Inisiasi Workspace Kolaboratif
| Komponen | Spesifikasi Skenario |
| :--- | :--- |
| **Nama Use Case** | **Seleksi Pelamar & Inisiasi Workspace (Accept Application)** |
| **Aktor** | Mitra UMKM, Mahasiswa, Sistem |
| **Deskripsi** | UMKM meninjau pelamar dan menyetujui kandidat terbaik untuk memulai kolaborasi. |
| **Kondisi Awal** | Terdapat lamaran berstatus `PENDING` pada proyek milik UMKM. |
| **Kondisi Akhir** | Lamaran berstatus `ACCEPTED`, ruang kerja `Workspace` aktif terbentuk. |
| **Skenario Normal** | 1. UMKM membuka tab "Applications" pada dasbor proyek.<br>2. UMKM melihat daftar kandidat yang diurutkan berdasarkan skor AI Match.<br>3. UMKM menekan tombol "Accept Candidate".<br>4. Sistem memperbarui status lamaran menjadi `ACCEPTED`.<br>5. Sistem secara otomatis membuat entitas `Workspace` baru (`status: ACTIVE`, `progressPercent: 0`).<br>6. Sistem mengirimkan notifikasi instan kepada mahasiswa bahwa lamarannya telah diterima.<br>7. Mahasiswa dan UMKM dapat langsung mengakses workspace kolaboratif. |
| **Skenario Alternatif** | **3a. UMKM menolak kandidat**:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. UMKM menekan tombol "Reject Candidate".<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Sistem memperbarui status lamaran menjadi `REJECTED`.<br>&nbsp;&nbsp;&nbsp;&nbsp;3. Sistem mengirim notifikasi penolakan secara sopan kepada mahasiswa. |

##### Tabel 4.5 Skenario Use Case: Pengelolaan Milestone Tugas dan Pelacakan Progres
| Komponen | Spesifikasi Skenario |
| :--- | :--- |
| **Nama Use Case** | **Manajemen Tugas Milestone & Kalkulasi Progres Dinamis** |
| **Aktor** | Mahasiswa, Mitra UMKM, Sistem |
| **Deskripsi** | Mengatur pembagian tugas (*task checklist*) dalam workspace dan memantau kemajuan pengerjaan. |
| **Kondisi Awal** | Workspace aktif telah terinisialisasi. |
| **Kondisi Akhir** | Daftar tugas tersimpan dan persentase kemajuan workspace terbarui secara otomatis. |
| **Skenario Normal** | 1. Mahasiswa atau UMKM menambahkan tugas baru (judul, tenggat waktu, PIC) di workspace.<br>2. Mahasiswa mengeksekusi pengerjaan dan mencentang tugas yang telah selesai (`completed: true`).<br>3. Sistem mencatat pembaruan status tugas pada tabel `ProjectTask`.<br>4. Sistem menghitung ulang rasio: $\text{progressPercent} = \left(\frac{\text{Jumlah Task Selesai}}{\text{Total Task}}\right) \times 100\%$.<br>5. Sistem memperbarui kolom `progressPercent` pada tabel `Workspace`.<br>6. Sistem mengirim notifikasi pembaruan tugas kepada mitra UMKM. |
| **Skenario Alternatif** | **1a. Tidak ada tugas yang dibuat**:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. Sistem menetapkan default persentase progres sebesar 0% hingga tugas pertama dibuat. |

##### Tabel 4.6 Skenario Use Case: Penyerahan Deliverables dan Evaluasi Timbal Balik (Two-Way Review)
| Komponen | Spesifikasi Skenario |
| :--- | :--- |
| **Nama Use Case** | **Penyerahan Deliverables & Evaluasi Timbal Balik (Two-Way Review)** |
| **Aktor** | Mahasiswa, Mitra UMKM, Sistem |
| **Deskripsi** | Penyerahan hasil akhir proyek, persetujuan oleh UMKM, dan pemberian rating timbal balik. |
| **Kondisi Awal** | Seluruh tugas utama dalam workspace telah diselesaikan (progres 100%). |
| **Kondisi Akhir** | Workspace & Proyek berstatus `COMPLETED`, ulasan tersimpan, skor portofolio mahasiswa meningkat. |
| **Skenario Normal** | 1. Mahasiswa menyerahkan tautan luaran akhir (tautan repositori GitHub, URL live demo, atau Google Drive).<br>2. UMKM meninjau luaran dan menekan tombol "Approve & Complete Project".<br>3. Sistem mengubah status `Workspace` dan `Project` menjadi `COMPLETED`.<br>4. Sistem membuka modal formulir evaluasi ulasan timbal balik.<br>5. UMKM mengisi rating bintang (1-5) dan ulasan performa kerja mahasiswa.<br>6. Mahasiswa mengisi rating bintang (1-5) dan ulasan profesionalisme UMKM.<br>7. Sistem menyimpan record `Review` dan menghitung penambahan `portfolioScore` mahasiswa secara otomatis. |
| **Skenario Alternatif** | **2a. Luaran membutuhkan revisi**:<br>&nbsp;&nbsp;&nbsp;&nbsp;1. UMKM menekan tombol "Request Revisions" disertai catatan revisi.<br>&nbsp;&nbsp;&nbsp;&nbsp;2. Sistem mengubah status tugas terkait kembali aktif dan mengirimkan notifikasi perbaikan ke mahasiswa. |

---

## 4.4 Perancangan Basis Data (Database Design Plan)

### 4.4.1 Entity Relationship Diagram (ERD)

```
┌─────────────────┐       1:1       ┌─────────────────────┐
│   StudentProfile│ ◀────────────── │        User         │
└─────────────────┘                 │  (id, email, role,  │
                                    │   passwordHash...)  │
┌─────────────────┐       1:1       │                     │
│   UmkmProfile   │ ◀────────────── │                     │
└─────────────────┘                 └──────────┬──────────┘
                                               │
                   ┌───────────────────────────┼───────────────────────────┐
                   │ 1:N (Owns)                │ 1:N (Applies)             │ 1:N (Reviews)
                   ▼                           ▼                           ▼
        ┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
        │       Project       │ 1:N │ ProjectApplication  │     │       Review        │
        │ (id, title, status, │ ──▶ │ (id, projectId,     │     │ (id, projectId,     │
        │  stipend, tags...)  │     │  studentId, status) │     │  authorId, rating)  │
        └──────────┬──────────┘     └─────────────────────┘     └─────────────────────┘
                   │
                   │ 1:N (Instantiates)
                   ▼
        ┌─────────────────────┐     1:N     ┌─────────────────────┐
        │      Workspace      │ ──────────▶ │     ProjectTask     │
        │ (id, projectId,     │             │ (id, workspaceId,   │
        │  progressPercent...)│             │  title, completed)  │
        └──────────┬──────────┘             └─────────────────────┘
                   │
                   │ 1:N (Channels)
                   ▼
        ┌─────────────────────┐
        │       Message       │
        │ (id, text, senderId,│
        │  receiverId...)     │
        └─────────────────────┘
```
#### Gambar 4.4 Entity Relationship Diagram (ERD) Basis Data Relasional SkillBridge

---

### 4.4.2 Conceptual Data Model (CDM)
Secara konseptual, sistem memodelkan **User** sebagai entitas induk autentikasi yang dapat terspesialisasi menjadi profil **Mahasiswa** (*StudentProfile*) atau profil **Mitra Bisnis** (*UmkmProfile*). Entitas **UMKM** bertindak sebagai inisiator yang menerbitkan **Project** di bawah klasifikasi **Category**. Mahasiswa berinteraksi dengan proyek melalui entitas asosiatif **ProjectApplication**. Saat lamaran disetujui, terbentuk entitas kolaborasi **Workspace** yang menaungi koleksi **ProjectTask** dan saluran komunikasi **Message**. Di akhir siklus, interaksi diformalkan dalam entitas **Review** untuk mengevaluasi kinerja antar-User serta entitas **AuditLog** untuk mencatat jejak aktivitas pengawasan oleh Admin.

---

### 4.4.3 Physical Data Model (PDM) & Kamus Data

##### Tabel 4.7 Kamus Data Entitas Basis Data Relasional SkillBridge
| Nama Tabel | Nama Kolom / Field | Tipe Data | Keterangan Constraint & Kegunaan |
| :--- | :--- | :--- | :--- |
| **User** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4 unik). |
| | `email` | `VARCHAR(191)` | **Unique**, Indeks pencarian login pengguna. |
| | `passwordHash` | `VARCHAR(255)` | Hash kata sandi terenkripsi Bcrypt. |
| | `name` | `VARCHAR(191)` | Nama lengkap pengguna / perwakilan. |
| | `role` | `VARCHAR(20)` | Nilai enum peran: `'STUDENT'`, `'UMKM'`, `'ADMIN'`. |
| | `isVerified` | `BOOLEAN` | Status verifikasi akun oleh admin (default `false`). |
| | `tokenVersion` | `INT` | Versi token JWT untuk mekanisme *instant revocation*. |
| | `createdAt`, `updatedAt` | `DATETIME` | Audit timestamp pencatatan sistem. |
| **StudentProfile** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `userId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (*On Delete Cascade, Unique*). |
| | `institution` | `VARCHAR(191)` | Nama universitas / perguruan tinggi asal. |
| | `portfolioScore` | `INT` | Akumulasi skor reputasi portofolio terverifikasi. |
| | `skills` | `TEXT (JSON)` | Serialisasi JSON daftar taksonomi keahlian teknis. |
| | `certificates` | `TEXT (JSON)` | Serialisasi JSON data tautan sertifikat kompetensi. |
| **UmkmProfile** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `userId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (*On Delete Cascade, Unique*). |
| | `companyName` | `VARCHAR(191)` | Nama resmi unit usaha / UMKM. |
| | `industry` | `VARCHAR(100)` | Sektor industri (F&B, Agribisnis, Retail, Jasa, dll). |
| | `businessScale` | `VARCHAR(50)` | Skala usaha (*Micro / Small / Medium Enterprise*). |
| **Project** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `title` | `VARCHAR(255)` | Judul brief kebutuhan proyek digital. |
| | `categoryId` | `VARCHAR(36)` | **Foreign Key** $\to$ `Category.id`. |
| | `ownerId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (Pemilik UMKM). |
| | `level` | `VARCHAR(50)` | Tingkat kesulitan (`Beginner`, `Intermediate`, `Expert`). |
| | `duration` | `VARCHAR(50)` | Estimasi durasi pengerjaan (misal: "4 Weeks"). |
| | `stipend` | `VARCHAR(100)` | Besaran uang saku / kompensasi proyek. |
| | `description` | `TEXT` | Penjelasan komprehensif latar belakang proyek. |
| | `objectives` | `TEXT (JSON)` | Daftar sasaran pencapaian proyek (JSON Array). |
| | `deliverables` | `TEXT (JSON)` | Daftar luaran wajib yang harus diserahkan (JSON Array). |
| | `tags` | `TEXT (JSON)` | Label keahlian yang dibutuhkan untuk AI matching. |
| | `status` | `VARCHAR(30)` | Status: `'DRAFT'`, `'PUBLISHED'`, `'ACTIVE'`, `'COMPLETED'`. |
| **ProjectApplication** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `projectId` | `VARCHAR(36)` | **Foreign Key** $\to$ `Project.id` (*On Delete Cascade*). |
| | `studentId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (*On Delete Cascade*). |
| | `status` | `VARCHAR(30)` | Status: `'PENDING'`, `'ACCEPTED'`, `'REJECTED'`. |
| | *Constraint* | `UNIQUE(projectId, studentId)` | Mencegah pendaftaran ganda pada proyek yang sama. |
| **Workspace** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `projectId` | `VARCHAR(36)` | **Foreign Key** $\to$ `Project.id` (*On Delete Cascade*). |
| | `studentId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (Mahasiswa terpilih). |
| | `umkmId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (Pemilik UMKM). |
| | `status` | `VARCHAR(30)` | Status workspace: `'ACTIVE'`, `'ON_HOLD'`, `'COMPLETED'`. |
| | `progressPercent` | `INT` | Persentase kemajuan pengerjaan ($0 - 100\%$). |
| **ProjectTask** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `workspaceId` | `VARCHAR(36)` | **Foreign Key** $\to$ `Workspace.id` (*On Delete Cascade*). |
| | `title` | `VARCHAR(255)` | Deskripsi rincian tugas milestone. |
| | `completed` | `BOOLEAN` | Status penyelesaian tugas (default `false`). |
| | `dueDate` | `DATETIME` | Batas waktu penyelesaian tugas. |
| **Review** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `projectId` | `VARCHAR(36)` | **Foreign Key** $\to$ `Project.id` (*On Delete Cascade*). |
| | `authorId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (Pemberi ulasan). |
| | `targetId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (Penerima ulasan). |
| | `rating` | `INT` | Nilai rating bintang ($1 - 5$). |
| | `comment` | `TEXT` | Ulasan kualitatif performa kerja / kerja sama. |
| **AuditLog** | `id` | `VARCHAR(36)` | **Primary Key** (UUID v4). |
| | `adminId` | `VARCHAR(36)` | **Foreign Key** $\to$ `User.id` (Admin pelaku aksi). |
| | `action` | `VARCHAR(100)` | Jenis aksi (`VERIFY_USER`, `DELETE_PROJECT`, dll). |
| | `entityType` | `VARCHAR(50)` | Entitas target (`USER`, `PROJECT`, `CATEGORY`). |
| | `entityId` | `VARCHAR(36)` | ID unik entitas yang dimanipulasi. |

---

## 4.5 Arsitektur Frontend (Frontend Architecture)
Frontend SkillBridge Hub dibangun dengan paradigma komponen modular reaktif berbasis **React 19** dan **TypeScript**:
1. **Module-Based Directory Structure**: Pengelompokan antarmuka berdasarkan domain fungsional:
   - `modules/auth/`: Komponen login, registrasi, lupa password, reset password.
   - `modules/projects/`: Marketplace, katalog eksplorasi, detail proyek, form brief proyek baru.
   - `modules/workspace/`: Dasbor workspace interaktif, task checklist, form submit deliverables.
   - `modules/user/`: Manajemen profil keahlian mahasiswa, profil UMKM, pengaturan akun.
   - `modules/admin/`: Dasbor analitik, manajemen pengguna, moderasi proyek, audit log viewer.
2. **State & Server Cache Management**: Menggunakan **TanStack Query (React Query)** untuk mengotomatisasi *query caching*, *background refetching*, dan *optimistic updates* tanpa memerlukan *boilerplate* Redux yang rumit.
3. **Routing & Route Protection**: Dikelola oleh **React Router v7** dengan komponen pembungkus `ProtectedRoute` yang memverifikasi token JWT dan hak akses peran (*Role Guards*).
4. **Styling & Micro-Interactions**: Menggunakan utilitas **Tailwind CSS v4** yang dipadukan dengan **Motion (Framer Motion)** untuk menghasilkan transisi halaman dan animasi mikro yang halus dan modern.

---

## 4.6 Arsitektur Backend (Backend Architecture)
Backend SkillBridge dirancang dengan prinsip pemisahan tanggung jawab berlapis (*Layered Architecture*) menggunakan **Express 5** dan **TypeScript**:

```
[HTTP Client Request]
         │
         ▼
[1. Middleware Pipeline] ──▶ (Rate Limiter ──▶ CORS ──▶ JWT Auth ──▶ Zod Schema Validator)
                                                                            │
                                                                            ▼
[2. Controller Layer]   ◀──────────────────────────────────────────────────┘
    (Deserialisasi Parameter HTTP & Format Response Standard)
         │
         ▼
[3. Service Layer]      ──▶ (Logika Bisnis Murni · Integrasi AI Gemini 2.5 Flash SDK)
         │
         ▼
[4. Repository Layer]   ──▶ (Prisma ORM Type-Safe Query Builder)
         │
         ▼
[5. Relational Database] (MySQL / PostgreSQL Database Engine)
```
#### Gambar 4.10 Diagram Pipeline Controller-Service-Repository Backend Express 5

1. **Routing & Boundary Validation**: Setiap rute HTTP melewati middleware validasi skema **Zod** yang memvalidasi *body*, *query*, dan *params*. Jika data tidak valid, proses langsung diputus (*fail-fast*) dengan kode status 400 Bad Request.
2. **Authentication & Authorization Guard**: Middleware `authenticateToken` mengekstrak token Bearer JWT dari header permintaan, memverifikasi tanda tangan kriptografi, mencocokkan `tokenVersion` dengan basis data, serta melampirkan objek identitas pengguna ke dalam objek request.
3. **Service Layer Isolation**: Logika perhitungan progres, pembuatan workspace otomatis, dan pemanggilan inferensi AI dienkapsulasi penuh dalam service murni tanpa dependensi pada objek Express `req/res`, memungkinkan unit testing yang mudah.
4. **Repository Data Access**: Semua interaksi basis data dieksekusi melalui metode terisolasi pada repository menggunakan Prisma Client bertipe statis.

---

# BAB 5 — IMPLEMENTATION PLAN

## 5.1 Tumpukan Teknologi (Technology Stack)

##### Tabel 5.1 Rincian Tumpukan Teknologi (Technology Stack Breakdown)
| Lapisan Sistem (*Layer*) | Teknologi yang Digunakan | Versi | Peruntukan & Justifikasi Teknis |
| :--- | :--- | :---: | :--- |
| **Frontend Framework** | **React** | 19.0 | Pustaka antarmuka berbasis komponen deklaratif tercepat dengan fitur Server Action & Concurrent Rendering. |
| **Frontend Build Tool** | **Vite** | 6.2 | Server pengembangan kilat dengan *Hot Module Replacement (HMR)* dan bundling produksi teroptimasi. |
| **Frontend Styling** | **Tailwind CSS** | 4.1 | Framework utility-first CSS generasi terbaru dengan performa kompilasi instan dan fleksibilitas desain tinggi. |
| **Frontend Animation** | **Motion (Framer Motion)** | 12.x | Pustaka animasi deklaratif untuk micro-interactions antarmuka pengguna. |
| **Data Fetching & Cache** | **TanStack Query** | 5.x | Pengelolaan server state, caching otomatis, dan sinkronisasi data asinkron. |
| **Routing** | **React Router DOM** | 7.x | Pengelolaan rute client-side SPA dan proteksi hak akses peran (*Role-Based Guards*). |
| **Backend Runtime** | **Node.js** | 20/22 LTS | Mesin eksekusi JavaScript sisi server dengan performa I/O asinkron non-blocking yang tinggi. |
| **Backend Framework** | **Express.js** | 5.0 | Framework web minimalis dengan penanganan rute asinkron bawaan (*native async error handling*). |
| **Bahasa Pemrograman** | **TypeScript** | 5.8 | Pengetikan statis ketat pada seluruh lapisan aplikasi untuk mencegah galat runtime (*Type Safety*). |
| **ORM & Data Modeling** | **Prisma ORM** | 5.22 | Pemodelan skema deklaratif, generator migrasi otomatis, dan query database bertipe aman. |
| **Basis Data Relasional** | **MySQL / PostgreSQL** | 8.0 / 16 | RDBMS standar industri dengan integritas referensial dan dukungan transaksi ACID penuh. |
| **Mesin Kecerdasan Buatan**| **Google GenAI SDK** | Gemini 2.5 | Evaluasi kecocokan pelamar dan proyek melalui pemrosesan bahasa alami berkecepatan tinggi. |
| **Keamanan & Validasi** | **Zod, Bcrypt.js, JWT** | Latest | Enkripsi kata sandi (Bcrypt), otentikasi token stateless (JWT), validasi skema masukan (Zod). |
| **Version Control** | **Git & GitHub** | 2.45+ | Manajemen kode sumber kolaboratif, code review, dan pelacakan riwayat perubahan. |
| **Platform Deployment** | **Vercel & Cloud RDBMS** | Cloud | Deployment frontend/serverless backend global dan hosting basis data terkelola. |

---

## 5.2 Rencana Pengembangan Frontend (Frontend Development Plan)
Pengembangan antarmuka dibagi ke dalam modul-modul fungsional utama:
1. **Modul Autentikasi (`src/modules/auth/`)**:
   - `Login.tsx`: Formulir login dengan validasi email/password dan penyimpanan token JWT di local storage/memory.
   - `Register.tsx`: Formulir registrasi dua langkah dengan pemilihan peran interaktif (Mahasiswa / UMKM).
   - `ForgotPassword.tsx` & `ResetPassword.tsx`: Alur pemulihan kata sandi dengan verifikasi token email.
2. **Modul Marketplace & Proyek (`src/modules/projects/`)**:
   - `ProjectCatalog.tsx`: Grid katalog proyek dengan komponen pencarian, filter kategori, badge level, dan stipend.
   - `ProjectDetail.tsx`: Halaman detail brief proyek yang memuat sasaran, deliverables, tags, dan tombol *1-Click Apply*.
   - `CreateProjectModal.tsx`: Antarmuka modal interaktif bagi UMKM untuk menerbitkan proyek baru.
3. **Modul Ruang Kerja Kolaboratif (`src/modules/workspace/`)**:
   - `WorkspaceDashboard.tsx`: Tampilan utama workspace yang memuat bilah progres persentase dinamis.
   - `TaskChecklist.tsx`: Komponen daftar tugas interaktif dengan checkbox penyelesaian, tanggal jatuh tempo, dan penugasan PIC.
   - `DeliverablesSection.tsx`: Komponen penyerahan luaran akhir dan validasi persetujuan proyek.
4. **Modul Pengguna & Profil (`src/modules/user/`)**:
   - `StudentProfileView.tsx`: Halaman etalase portofolio mahasiswa dengan badge keahlian terverifikasi dan riwayat ulasan bintang.
   - `UmkmProfileView.tsx`: Profil bisnis UMKM beserta daftar proyek aktif yang sedang dibuka.
5. **Modul Tata Kelola Admin (`src/modules/admin/`)**:
   - `AdminDashboard.tsx`: Dasbor ringkasan metrik statistik operasional sistem.
   - `CategoryManagement.tsx`: Tabel manajemen master kategori proyek.
   - `UserVerification.tsx` & `AuditLogViewer.tsx`: Antarmuka verifikasi identitas dan penampil riwayat audit keamanan.

---

## 5.3 Rencana Pengembangan Backend (Backend Development Plan)

##### Tabel 5.2 Rencana Endpoint RESTful API SkillBridge Backend
| Metode HTTP | Endpoint URL | Hak Akses (*RBAC*) | Fungsi & Logika Bisnis |
| :---: | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | Publik | Mendaftarkan akun baru, mengenkripsi password, membuat entitas profil peran. |
| `POST` | `/api/auth/login` | Publik | Memvalidasi kredensial pengguna dan menerbitkan JWT token. |
| `POST` | `/api/auth/forgot-password`| Publik | Menerbitkan token unik pemulihan kata sandi. |
| `POST` | `/api/auth/reset-password` | Publik | Memvalidasi token dan memperbarui password pengguna. |
| `GET` | `/api/users/me` | Authenticated | Mengambil data profil lengkap pengguna yang sedang aktif login. |
| `PATCH`| `/api/users/profile` | Authenticated | Memperbarui informasi profil (keahlian, bio, profil perusahaan). |
| `GET` | `/api/projects` | Publik | Mengambil katalog proyek publik dengan filter pencarian dan paginasi. |
| `POST` | `/api/projects` | `UMKM` | Menerbitkan brief proyek baru dengan validasi skema data Zod. |
| `GET` | `/api/projects/:id` | Publik | Mengambil detail lengkap suatu proyek berdasarkan ID unik. |
| `POST` | `/api/projects/:id/apply` | `STUDENT` | Mengajukan lamaran pada proyek dan memicu komputasi AI Match Score. |
| `GET` | `/api/projects/:id/applications`| `UMKM`, `ADMIN`| Mengambil daftar pelamar suatu proyek terurut berdasarkan skor AI Match. |
| `PATCH`| `/api/applications/:id/status` | `UMKM` | Menerima atau menolak pelamar (penerimaan memicu inisiasi Workspace). |
| `GET` | `/api/workspaces/:id` | Anggota Workspace | Mengambil data detail workspace, daftar tasks, dan persentase progres. |
| `POST` | `/api/workspaces/:id/tasks` | Anggota Workspace | Menambahkan item tugas milestone baru ke dalam workspace. |
| `PATCH`| `/api/workspaces/:id/tasks/:taskId`| Anggota Workspace| Mengubah status penyelesaian tugas dan menghitung ulang progress percent. |
| `POST` | `/api/workspaces/:id/complete`| `UMKM` | Menandai proyek dan workspace selesai setelah luaran disetujui. |
| `POST` | `/api/reviews` | Authenticated | Menyimpan ulasan timbal balik dan memperbarui skor portofolio mahasiswa. |
| `GET` | `/api/notifications` | Authenticated | Mengambil daftar notifikasi terbaru milik pengguna. |
| `GET` | `/api/admin/metrics` | `ADMIN` | Mengambil data analitik dan statistik operasional platform. |
| `GET` | `/api/admin/audit-logs` | `ADMIN` | Mengambil riwayat log audit keamanan sistem. |

---

## 5.4 Rencana Implementasi Basis Data (Database Implementation Plan)
1. **Pembuatan Skema Deklaratif**: Menyusun seluruh entitas model, kolom, tipe data, indeks, dan relasi di dalam file `backend/prisma/schema.prisma`.
2. **Eksekusi Migrasi Basis Data**:
   ```bash
   npx prisma migrate dev --name init_skillbridge_schema
   ```
   Perintah ini secara otomatis menghasilkan file migrasi SQL berekstensi `.sql` dan memperbarui struktur tabel di RDBMS lokal.
3. **Penyemaian Data Awal (*Database Seeding*)**: Membuat file `backend/prisma/seed.ts` yang mengisi data master kategori standar (Web Development, Mobile App, UI/UX Design, Branding, Digital Marketing), akun demonstrasi Mahasiswa, UMKM, dan Admin.

---

## 5.5 Rencana Integrasi Sistem (Integration Plan)
1. **Integrasi Frontend ke Backend**: Menggunakan HTTP Client (Axios / Fetch) dengan konfigurasi *base URL* terpusat. Menggunakan interceptor untuk menyisipkan header otentikasi secara otomatis:
   ```http
   Authorization: Bearer <jwt_access_token>
   ```
2. **Integrasi Mesin AI Google Gemini**: Memanfaatkan `@google/genai` dengan konfigurasi API Key server-side:
   - Input: JSON profil keahlian mahasiswa + JSON deskripsi & sasaran proyek.
   - Prompt: Format terstruktur meminta output JSON berupa `{"matchScore": 85, "reasoning": "...", "recommendations": "..."}`.
3. **Integrasi Penyimpanan Berkas (*File Upload*)**: Menggunakan middleware **Multer** pada backend untuk menerima berkas logo UMKM, avatar mahasiswa, dan lampiran deliverables dengan pembatasan tipe file (JPG, PNG, PDF) dan ukuran maksimum 5 MB.

---

## 5.6 Rencana Manajemen Kode Sumber (Version Control Plan)

Pengembangan sistem menggunakan alur kerja **Git Feature Branch Workflow**:

```
 [main]       ───────────────────────────────────────────────●── (Production Release)
                                                             ▲
                                                             │ Pull Request Merge
 [develop]    ──●──────────────●──────────────●──────────────●── (Staging / Testing)
                │              ▲              ▲
                │ Feature Fork │ Merge        │ Feature Merge
 [feature/*]    └──●───────────┘              │
                   (feature/ai-matchmaking)   │
                                              │
 [feature/*]    ──────────────────────────────●
                   (feature/workspace-milestones)
```
#### Gambar 5.1 Diagram Strategi Percabangan Git (Git Feature Branch Workflow)

- **`main` Branch**: Cabang produksi yang selalu berada dalam kondisi stabil (*production-ready*).
- **`develop` Branch**: Cabang integrasi utama di mana seluruh fitur baru digabungkan sebelum pengujian rilis.
- **`feature/<nama-fitur>` Branch**: Cabang pengerjaan fitur spesifik (misal: `feature/ai-matchmaking`, `feature/workspace-task`).
- **Konvensi Pesan Commit (Semantic Commits)**:
  - `feat: implement google gemini ai matching service`
  - `fix: resolve task progress calculation zero-division error`
  - `style: update workspace milestone badge contrast`
  - `refactor: extract zod validation schemas to shared modules`

---

# BAB 6 — TESTING AND QUALITY ASSURANCE PLAN

## 6.1 Strategi Pengujian (Testing Strategy)
Strategi pengujian kualitas perangkat lunak SkillBridge Hub mengadopsi konsep **Software Testing Pyramid**:

```
                     / \
                    /   \
                   / UAT \  ──▶ Pengujian Penerimaan Pengguna Akhir (Manual Exploratory)
                  /───────\
                 /  Integ  \ ──▶ Pengujian Alur Antar-Komponen & REST API Endpoint
                /───────────\
               /  Unit Test  \ ──▶ Pengujian Logika Bisnis Murni (Zod, Helpers, Scoring)
              /───────────────\
```
#### Gambar 6.1 Piramida Pengujian Kualitas Perangkat Lunak (Software Testing Pyramid)

1. **Unit Testing**: Memverifikasi unit kode terkecil secara terisolasi (misal: fungsi kalkulasi persentase tugas, pemodelan skema Zod, transformasi string JSON).
2. **Integration Testing**: Memverifikasi interaksi antar-modul, keabsahan query Prisma ORM terhadap basis data, serta integrasi respons API Google Gemini.
3. **Functional & System Testing**: Memverifikasi kesesuaian perilaku fungsional sistem terhadap seluruh butir Kebutuhan Fungsional (FR-01 s/d FR-23).
4. **User Acceptance Testing (UAT)**: Validasi langsung skenario operasional oleh pengguna representatif (Mahasiswa dan Pelaku UMKM).

---

## 6.2 Pengujian Fungsional (Functional Testing Matrix)

##### Tabel 6.1 Matriks Kasus Uji Fungsional Sistem (Functional Test Cases Matrix)
| Kode Uji | Fitur yang Diuji | Skenario Kasus Pengujian | Hasil yang Diharapkan | Status |
| :---: | :--- | :--- | :--- | :---: |
| **TC-01** | Registrasi Akun | Mendaftarkan pengguna baru dengan data valid dan memilih peran STUDENT. | Akun berhasil terdaftar di basis data, password ter-hash Bcrypt, mengembalikan kode HTTP 201 Created. | **Valid** |
| **TC-02** | Registrasi Duplikat | Mendaftarkan akun baru menggunakan email yang sudah terdaftar sebelumnya. | Sistem menolak registrasi, menampilkan pesan galat "Email sudah terdaftar", kode HTTP 409 Conflict. | **Valid** |
| **TC-03** | Otentikasi Login | Memasukkan email dan password yang sesuai. | Sistem mengembalikan token JWT valid dan data profil peran, kode HTTP 200 OK. | **Valid** |
| **TC-04** | Login Kredensial Salah | Memasukkan email valid dengan password yang salah. | Sistem menolak login, menampilkan pesan "Kredensial tidak valid", kode HTTP 401 Unauthorized. | **Valid** |
| **TC-05** | Publikasi Brief Proyek | UMKM mengisi formulir brief proyek lengkap dan menekan tombol publish. | Proyek tersimpan dengan status `PUBLISHED`, muncul di katalog marketplace, kode HTTP 201 Created. | **Valid** |
| **TC-06** | Validasi Input Zod | Mengirim brief proyek tanpa menyertakan atribut judul dan kategori. | Middleware Zod memutus request, mengembalikan rincian field yang wajib diisi, kode HTTP 400 Bad Request. | **Valid** |
| **TC-07** | Pencarian Marketplace | Mencari proyek menggunakan kata kunci "React" dan filter kategori "Web". | Sistem menampilkan daftar proyek yang sesuai dengan kata kunci dan kategori yang dipilih. | **Valid** |
| **TC-08** | Pengajuan Lamaran Proyek | Mahasiswa menekan tombol apply pada proyek yang sedang dibuka. | Lamaran tersimpan dengan status `PENDING`, notifikasi terkirim ke pemilik proyek, kode HTTP 201 Created. | **Valid** |
| **TC-09** | Pencegahan Lamaran Ganda | Mahasiswa mencoba melamar kembali pada proyek yang sama. | Sistem menolak lamaran dengan pesan "Anda sudah melamar proyek ini", kode HTTP 400 Bad Request. | **Valid** |
| **TC-10** | Inferensi AI Matchmaking | Menjalankan analisis kecocokan profil pelamar terhadap brief proyek. | Google Gemini API mengembalikan skor persentase (0-100) dan teks rasionalisasi kompetensi. | **Valid** |
| **TC-11** | Penerimaan Pelamar | UMKM menekan tombol accept pada salah satu pelamar proyek. | Status lamaran berubah menjadi `ACCEPTED`, entitas Workspace terbuat otomatis, kode HTTP 200 OK. | **Valid** |
| **TC-12** | Pembaruan Status Tugas | Mahasiswa mencentang salah satu checklist tugas pada workspace. | Status tugas berubah `completed: true`, kolom `progressPercent` workspace terhitung ulang otomatis. | **Valid** |
| **TC-13** | Penyerahan Deliverables | Mahasiswa mengirimkan URL tautan luaran akhir pada workspace. | Tautan luaran tersimpan, notifikasi verifikasi penyerahan terkirim ke dasbor UMKM. | **Valid** |
| **TC-14** | Penyelesaian Proyek | UMKM menyetujui hasil kerja dan menandai proyek selesai. | Status proyek dan workspace berubah menjadi `COMPLETED`, modal rating review terbuka. | **Valid** |
| **TC-15** | Evaluasi Two-Way Review | Mahasiswa dan UMKM saling mengirimkan rating bintang dan ulasan. | Record Review tersimpan, skor `portfolioScore` mahasiswa bertambah sesuai rating yang diperoleh. | **Valid** |
| **TC-16** | Moderasi Admin | Admin mencabut publikasi (*unpublish*) proyek yang melanggar ketentuan. | Status proyek berubah menjadi `DRAFT`/nonaktif, tindakan tercatat pada tabel `AuditLog`. | **Valid** |

---

## 6.3 Pengujian Integrasi (Integration Testing)

##### Tabel 6.2 Matriks Pengujian Integrasi Antar-Modul Sistem
| Kode Uji | Modul Terintegrasi | Skenario Integrasi | Kriteria Keberhasilan |
| :---: | :--- | :--- | :--- |
| **IT-01** | **Auth Middleware $\leftrightarrow$ RBAC Router** | Mengakses endpoint admin (`/api/admin/metrics`) menggunakan token JWT milik peran STUDENT. | Sistem menolak akses dengan kode status **403 Forbidden** dan pesan "Akses ditolak: Memerlukan peran Admin". |
| **IT-02** | **Application Service $\leftrightarrow$ Workspace Service** | Menyetujui lamaran mahasiswa pada Application Controller. | Status lamaran diperbarui menjadi `ACCEPTED` dan secara atomik memicu pembuatan Workspace baru di basis data. |
| **IT-03** | **Task Controller $\leftrightarrow$ Workspace Progress** | Mengubah 2 dari 4 task menjadi selesai via endpoint PATCH. | Workspace progress percent otomatis terkalkulasi dan bernilai tepat $50\%$. |
| **IT-04** | **Review Service $\leftrightarrow$ Student Profile Score** | Memasukkan review bintang 5 dari UMKM kepada mahasiswa. | Nilai `portfolioScore` pada tabel `StudentProfile` bertambah secara proporsional. |

---

## 6.4 Pengujian Penerimaan Pengguna (User Acceptance Testing / UAT)
UAT dilaksanakan menggunakan metode pengujian kotak hitam (*Black-Box Testing*) dengan melibatkan kelompok uji pengguna:
1. **Kelompok Mahasiswa (5 Responden)**: Menguji kemudahan pencarian proyek, kejelasan skor kecocokan AI, interaktivitas task checklist di workspace, dan penyerahan luaran.
2. **Kelompok Pelaku UMKM (3 Responden)**: Menguji kemudahan pembuatan brief proyek, keakuratan rekomendasi pelamar oleh AI, serta alur persetujuan luaran dan pemberian review.
3. **Kriteria Kelulusan UAT**: Tingkat kepuasan pengguna (*User Satisfaction Score*) mencapai minimum **85%** dan tidak ditemukan adanya defek dengan kategori *Blocker* atau *Critical*.

---

## 6.5 Manajemen Defek dan Kutu (Bug Management Lifecycle)

```
[Kutu Ditemukan (Open)] ──▶ [Analisis & Triase] ──▶ [Sedang Diperbaiki (In Progress)]
                                                              │
                                                              ▼
[Selesai & Ditutup (Closed)] ◀── [Verifikasi QA (Resolved)] ◀─┘
```
#### Gambar 6.2 Alur Siklus Hidup Penanganan Defek (Bug Life Cycle Workflow)

##### Tabel 6.3 Panduan Klasifikasi Tingkat Keparahan Kutu (Bug Severity & Priority)
| Tingkat (*Severity*) | Definisi Dampak Sistem | Batas Waktu Penanganan (*SLA*) |
| :--- | :--- | :---: |
| **Blocker / Critical** | Sistem mengalami *crash*, kegagalan autentikasi global, atau kebocoran data sensitif. | $\le 4\text{ Jam}$ |
| **Major** | Fitur inti tidak berfungsi (misal: AI matchmaking gagal inferensi, task checklist tidak tersimpan). | $\le 24\text{ Jam}$ |
| **Minor** | Gangguan visual minor, ketidaksesuaian tata letak antarmuka, atau teks pesan yang salah eja (*typo*). | $\le 72\text{ Jam}$ |

---

# BAB 7 — DEPLOYMENT AND MAINTENANCE PLAN

## 7.1 Strategi Deployment (Deployment Strategy)
Sistem SkillBridge Hub menerapkan strategi **Continuous Integration & Continuous Deployment (CI/CD)** otomatis yang terhubung ke repositori GitHub:

```
[Git Push ke Branch 'main'] ──▶ [GitHub Actions: Lint & Type Check]
                                                │
                                                ▼
[Vercel: Build & Optimize Assets] ◀── [Prisma: DB Migration Check]
                │
                ▼
[Production Deployment Live via Global CDN (HTTPS)]
```
#### Gambar 7.1 Diagram Alur Pipeline Deployment Otomatis (CI/CD Architecture)

- **Zero-Downtime Deployment**: Pembaruan kode frontend di Vercel didistribusikan secara instan ke *edge network* tanpa menghentikan sesi aktif pengguna.
- **Automated Database Migration**: Skrip migrasi Prisma dijalankan secara otomatis saat proses *build* sebelum container backend melayani lalu lintas jaringan.

---

## 7.2 Lingkungan Produksi (Production Environment)
Konfigurasi infrastruktur lingkungan produksi meliputi:
1. **Frontend Hosting**: Vercel Edge Network dengan optimasi aset statis (Vite build output), kompresi Brotli, dan HTTP/2.
2. **Backend API Compute**: Node.js Containerized Environment pada cloud platform dengan fitur *auto-restart* saat terjadi kegagalan sistem.
3. **Database Hosting**: Cloud Managed PostgreSQL / MySQL dengan enkripsi SSL aktif (`sslmode=require`) dan *Connection Pooling* untuk efisiensi koneksi konkuren.
4. **Keamanan Jaringan**: Konfigurasi CORS ketat yang hanya mengizinkan domain resmi produksi, perlindungan terhadap serangan CSRF, dan header keamanan HTTP (*Content Security Policy, X-Frame-Options, X-Content-Type-Options*).

---

## 7.3 Rencana Cadangan Data dan Keamanan (Backup and Security Plan)
1. **Pencadangan Data Otomatis (*Automated Database Backup*)**:
   - Pencadangan penuh (*Full Backup*) harian yang dieksekusi setiap pukul 02:00 WIB dan disimpan di cloud storage terenkripsi terpisah.
   - Retensi data cadangan disimpan selama 30 hari kalender untuk kebutuhan pemulihan bencana (*Disaster Recovery*).
2. **Perlindungan Kredensial & Secrets**: Seluruh kunci privat (kunci JWT, API Key Google Gemini, URL Database) diisolasi melalui variabel lingkungan terenkripsi dan tidak pernah dimasukkan ke dalam repositori Git publik.
3. **Manajemen Sesi & Revokasi Instan**: Penggunaan field `tokenVersion` pada tabel User memungkinkan administrator membatalkan seluruh sesi login aktif pengguna secara instan jika terdeteksi aktivitas mencurigakan.

---

## 7.4 Rencana Pemeliharaan Sistem (Maintenance & Monitoring Plan)
1. **Pemantauan Kinerja Aplikasi (*Application Performance Monitoring*)**: Pemantauan waktu respons API, *error rate*, dan utilisasi memori secara real-time.
2. **Pencatatan Log Galat Terpusat (*Error Logging*)**: Setiap galat runtime pada backend dicatat lengkap dengan *stack trace* dan metadata permintaan untuk mempercepat proses debugging.
3. **Pemeliharaan Dependensi Berkala**: Pembaruan berkala paket npm setiap bulan untuk menutup celah keamanan dependensi (*npm audit & security patch updates*).

---

## 7.5 Rencana Pengembangan Masa Depan (Future Enhancements)
Untuk meningkatkan kapabilitas dan nilai guna platform di masa mendatang, beberapa inisiatif pengembangan lanjutan direncanakan:
1. **Integrasi Gerbang Pembayaran Terkelola (*Escrow Payment Gateway*)**: Sistem penampungan dana stipend otomatis menggunakan Midtrans/Xendit untuk menjamin keamanan pembayaran antara UMKM dan mahasiswa.
2. **Aplikasi Mobile Native (React Native / Flutter)**: Menghadirkan aplikasi mobile untuk mempermudah akses notifikasi dan komunikasi instan.
3. **Automated Skill Assessment Sandbox**: Fitur uji kompetensi teknis otomatis (coding test & design challenge) bagi mahasiswa untuk memperoleh lencana keahlian terverifikasi secara sistemik.
4. **Integrasi Video Conference Internal**: Modul pertemuan daring langsung di dalam ruang kerja workspace menggunakan WebRTC.

---

# BAB 8 — RISK MANAGEMENT

## 8.1 Identifikasi Risiko Teknis (Technical Risks)
1. **Risiko Batasan Kuota API AI (*AI API Rate Limit & Latency*)**: Terjadinya lonjakan permintaan ke Google Gemini API yang melampaui kuota batas frekuensi atau mengalami latensi tinggi dari jaringan eksternal.
2. **Risiko Inkonsistensi Format Output AI**: Model AI mengembalikan teks yang tidak sesuai dengan skema JSON yang diharapkan oleh backend.
3. **Risiko Bottleneck Basis Data pada Relasi Kompleks**: Penurunan performa query saat melakukan agregasi data multi-tabel (User, Workspace, Tasks, Reviews) secara bersamaan.
4. **Risiko Keamanan Unggah Berkas (*Malicious File Upload*)**: Pengguna mengunggah berkas berbahaya yang menyamar sebagai avatar, logo, atau dokumen luaran.

---

## 8.2 Identifikasi Risiko Proyek & Operasional (Project Risks)
1. **Perubahan Ruang Lingkup Kebutuhan (*Scope Creep*)**: Penambahan fitur baru di luar rencana awal yang berpotensi menunda target rilis.
2. **Inkonsistensi Kontrak Data Frontend-Backend**: Perbedaan format payload data antara pengembang antarmuka dan pengembang API.
3. **Rendahnya Partisipasi Awal Mitra UMKM**: Tantangan dalam menarik minat pelaku usaha kecil untuk mempublikasikan brief proyek pada fase awal peluncuran.

---

## 8.3 Matriks Mitigasi dan Penanganan Risiko (Risk Mitigation Plan)

##### Tabel 8.1 Matriks Analisis dan Mitigasi Risiko Pengembangan Perangkat Lunak
| Kode Risiko | Deskripsi Risiko | Tingkat Probabilitas | Tingkat Dampak | Level Risiko | Strategi Mitigasi dan Rencana Kontinjensi (*Mitigation Strategy*) |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **TR-01** | Kuota API Gemini Terlampaui / Latensi Jaringan Tinggi | Sedang | Tinggi | **Tinggi** | Menerapkan mekanisme *caching* skor kecocokan pada basis data lokal sehingga komputasi AI hanya dieksekusi 1 kali per pasangan pelamar-proyek; serta menyediakan *fallback matching algorithm* berbasis overlap kata kunci jika API eksternal mengalami gangguan. |
| **TR-02** | Inkonsistensi Output JSON dari Model AI | Sedang | Sedang | **Sedang** | Merancang teknik *structured prompt engineering* yang ketat dengan instruksi JSON murni serta memvalidasi output AI menggunakan skema Zod sebelum diproses oleh service backend. |
| **TR-03** | Penurunan Performa Query Basis Data Relasional | Rendah | Tinggi | **Sedang** | Membuat indeks (*indexing*) pada kolom foreign key dan kolom pencarian utama (`email`, `status`, `projectId`, `studentId`), serta memanfaatkan fitur `include`/`select` spesifik Prisma untuk menghindari *over-fetching*. |
| **TR-04** | Ancaman Keamanan Berkas Unggahan | Rendah | Tinggi | **Sedang** | Menerapkan filter validasi tipe MIME (*magic number validation*), membatasi ekstensi file yang diizinkan (hanya JPG, PNG, PDF), membatasi ukuran maksimal 5 MB, dan menyimpan berkas di direktori terisolasi. |
| **PR-01** | Perubahan Ruang Lingkup Kebutuhan (*Scope Creep*) | Sedang | Sedang | **Sedang** | Menerapkan kontrol perubahan ruang lingkup formal (*Change Control Procedure*) di mana setiap penambahan fitur baru harus melalui evaluasi dampak sprint backlog. |
| **PR-02** | Inkonsistensi Kontrak API Frontend-Backend | Sedang | Tinggi | **Tinggi** | Menyusun dokumentasi kontrak REST API terpusat (TypeScript Shared Interfaces & Postman Collection) sebelum implementasi pengkodean dimulai. |
| **PR-03** | Keterbatasan Akun UMKM Aktif pada Fase Awal | Sedang | Sedang | **Sedang** | Menyiapkan data awal percontohan (*seed data projects*) yang realistis dan menarik untuk keperluan demonstrasi serta menjalin kerja sama pilot project dengan komunitas inkubator bisnis kampus. |

---

<br>

**Ditetapkan di**: Surabaya, Jawa Timur  
**Tanggal**: 1 September 2026  
**Disahkan Oleh**: Ahmad Dhafin Al Farisy *(Pengembang Utama SkillBridge Hub)*  

*(Dokumen ini disusun sebagai pedoman teknis dan operasional resmi dalam pelaksanaan seluruh siklus rekayasa perangkat lunak SkillBridge Hub).*
