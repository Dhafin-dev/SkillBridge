# DOKUMEN PERENCANAAN PENGEMBANGAN PERANGKAT LUNAK
## (SOFTWARE DEVELOPMENT PLANNING DOCUMENT)

---

# SISTEM INFORMASI KOLABORASI PROYEK AKADEMIK DAN UMKM BERBASIS NLP SKILLMATCH
## (SkillBridge Hub: Academic & Industry Project Collaboration Platform with NLP SkillMatch Engine)

<br>

**Disusun Oleh:**
### PENGEMBANG MANDIRI (SOLO DEVELOPER)
**187241057** | Ahmad Dhafin Al Farisy *(Fullstack Software Engineer)*

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
  - [1.1 Latar Belakang (Background)](#11-latar-belakang-background)
  - [1.2 Rumusan Masalah (Problem Statement)](#12-rumusan-masalah-problem-statement)
  - [1.3 Solusi yang Diusulkan (Proposed Solution)](#13-solusi-yang-diusulkan-proposed-solution)
  - [1.4 Tujuan Proyek (Project Objectives)](#14-tujuan-proyek-project-objectives)
  - [1.5 Manfaat Proyek (Benefits)](#15-manfaat-proyek-benefits)
  - [1.6 Ruang Lingkup & Pengelompokan Fitur (MVP, Core, Future)](#16-ruang-lingkup--pengelompokan-fitur-mvp-core-future)
  - [1.7 Asumsi Proyek (Project Assumptions)](#17-asumsi-proyek-project-assumptions)
  - [1.8 Batasan Proyek (Project Constraints)](#18-batasan-proyek-project-constraints)
- [BAB 2 — SOFTWARE REQUIREMENTS](#bab-2--software-requirements)
  - [2.1 Pemangku Kepentingan (Stakeholders)](#21-pemangku-kepentingan-stakeholders)
  - [2.2 Peran Pengguna dan Hak Akses (User Roles & Access Control)](#22-peran-pengguna-dan-hak-akses-user-roles--access-control)
  - [2.3 Kebutuhan Fungsional (Functional Requirements)](#23-kebutuhan-fungsional-functional-requirements)
  - [2.4 Kebutuhan Non-Fungsional (Non-Functional Requirements)](#24-kebutuhan-non-fungsional-non-functional-requirements)
  - [2.5 Kebutuhan Lingkungan Pengembangan (Development Requirements)](#25-kebutuhan-lingkungan-pengembangan-development-requirements)
  - [2.6 Kebutuhan Lingkungan Penerapan Target (Target Deployment Requirements)](#26-kebutuhan-lingkungan-penerapan-target-target-deployment-requirements)
- [BAB 3 — SOFTWARE DEVELOPMENT PLANNING](#bab-3--software-development-planning)
  - [3.1 Metodologi Pengembangan: Agile Iterative / Sprint-Based](#31-metodologi-pengembangan-agile-iterative--sprint-based)
  - [3.2 Peran dan Tanggung Jawab dalam Solo Development](#32-peran-dan-tanggung-jawab-dalam-solo-development)
  - [3.3 Alur Kerja Pengembangan (Development Workflow)](#33-alur-kerja-pengembangan-development-workflow)
  - [3.4 Work Breakdown Structure (WBS)](#34-work-breakdown-structure-wbs)
  - [3.5 Rencana Tahapan Iterasi dan Timeline (Sprint Schedule)](#35-rencana-tahapan-iterasi-dan-timeline-sprint-schedule)
  - [3.6 Tonggak Pencapaian Proyek (Project Milestones)](#36-tonggak-pencapaian-proyek-project-milestones)
  - [3.7 Luaran Proyek (Deliverables)](#37-luaran-proyek-deliverables)
  - [3.8 Rencana Manajemen Perubahan (Change Management Plan)](#38-rencana-manajemen-perubahan-change-management-plan)
- [BAB 4 — HIGH-LEVEL ARCHITECTURE AND DESIGN PLANNING](#bab-4--high-level-architecture-and-design-planning)
  - [4.1 Perencanaan Arsitektur Sistem (System Architecture Plan)](#41-perencanaan-arsitektur-sistem-system-architecture-plan)
  - [4.2 Perancangan Alur Proses Bisnis & SkillMatch (BPMN)](#42-perancangan-alur-proses-bisnis--skillmatch-bpmn)
  - [4.3 Perancangan Use Case dan Skenario (Use Case Plan & Scenarios)](#43-perancangan-use-case-dan-skenario-use-case-plan--scenarios)
  - [4.4 Perancangan Basis Data Relasional (Database Design Plan)](#44-perancangan-basis-data-relasional-database-design-plan)
  - [4.5 Perancangan Arsitektur Web Laravel & Blade (Frontend & Backend Plan)](#45-perancangan-arsitektur-web-laravel--blade-frontend--backend-plan)
  - [4.6 Perancangan Layanan SkillMatch Engine FastAPI (NLP Matching Plan)](#46-perancangan-layanan-skillmatch-engine-fastapi-nlp-matching-plan)
- [BAB 5 — IMPLEMENTATION PLAN](#bab-5--implementation-plan)
  - [5.1 Keputusan Tumpukan Teknologi (Technology Stack Decision)](#51-keputusan-tumpukan-teknologi-technology-stack-decision)
  - [5.2 Rencana Implementasi Aplikasi Web Laravel & Blade](#52-rencana-implementasi-aplikasi-web-laravel--blade)
  - [5.3 Rencana Implementasi Basis Data Supabase PostgreSQL](#53-rencana-implementasi-basis-data-supabase-postgresql)
  - [5.4 Rencana Implementasi Layanan SkillMatch Engine FastAPI](#54-rencana-implementasi-layanan-skillmatch-engine-fastapi)
  - [5.5 Rencana Integrasi Sistem (Laravel ke FastAPI & Supabase)](#55-rencana-integrasi-sistem-laravel-ke-fastapi--supabase)
  - [5.6 Rencana Manajemen Kode Sumber (Version Control Plan)](#56-rencana-manajemen-kode-sumber-version-control-plan)
- [BAB 6 — TESTING AND QUALITY ASSURANCE PLAN](#bab-6--testing-and-quality-assurance-plan)
  - [6.1 Strategi Pengujian (Testing Strategy)](#61-strategi-pengujian-testing-strategy)
  - [6.2 Rencana Kasus Uji Fungsional (Functional Test Cases Plan)](#62-rencana-kasus-uji-fungsional-functional-test-cases-plan)
  - [6.3 Rencana Pengujian Integrasi & Algoritma NLP SkillMatch](#63-rencana-pengujian-integrasi--algoritma-nlp-skillmatch)
  - [6.4 Rencana Pengujian Penerimaan Pengguna (User Acceptance Testing / UAT Plan)](#64-rencana-pengujian-penerimaan-pengguna-user-acceptance-testing--uat-plan)
  - [6.5 Manajemen Defect dan Bug Perangkat Lunak (Bug Management Lifecycle)](#65-manajemen-defect-dan-bug-perangkat-lunak-bug-management-lifecycle)
  - [6.6 Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix)](#66-matriks-penelusuran-kebutuhan-requirement-traceability-matrix)
- [BAB 7 — DEPLOYMENT AND MAINTENANCE PLAN](#bab-7--deployment-and-maintenance-plan)
  - [7.1 Rencana Target Penerapan (Target Deployment Plan)](#71-rencana-target-penerapan-target-deployment-plan)
  - [7.2 Rekomendasi Strategi Produksi Masa Depan (Recommended Production Strategy)](#72-rekomendasi-strategi-produksi-masa-depan-recommended-production-strategy)
  - [7.3 Rencana Keamanan dan Pencadangan Data (Security & Backup Plan)](#73-rencana-keamanan-dan-pencadangan-data-security--backup-plan)
  - [7.4 Rencana Pemeliharaan Sistem (Maintenance Plan)](#74-rencana-pemeliharaan-sistem-maintenance-plan)
  - [7.5 Rencana Pengembangan Lanjutan (Future Enhancements)](#75-rencana-pengembangan-lanjutan-future-enhancements)
- [BAB 8 — RISK MANAGEMENT](#bab-8--risk-management)
  - [8.1 Identifikasi Risiko Teknis (Technical Risks)](#81-identifikasi-risiko-teknis-technical-risks)
  - [8.2 Identifikasi Risiko Proyek (Project Risks)](#82-identifikasi-risiko-proyek-project-risks)
  - [8.3 Matriks Mitigasi dan Penanganan Risiko (Risk Mitigation Plan)](#83-matriks-mitigasi-dan-penanganan-risiko-risk-mitigation-plan)

---

# DAFTAR TABEL

- **Tabel 1.1** Matriks Pengelompokan Fitur Sistem (MVP, Core, Future Enhancements)
- **Tabel 2.1** Matriks Analisis Pemangku Kepentingan (Stakeholder Analysis)
- **Tabel 2.2** Matriks Peran Pengguna dan Hak Akses Sistem (Role-Based Access Control)
- **Tabel 2.3** Matriks Spesifikasi Kebutuhan Fungsional (Functional Requirements)
- **Tabel 2.4** Matriks Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **Tabel 2.5** Spesifikasi Kebutuhan Lingkungan Pengembangan (Development Environment)
- **Tabel 2.6** Spesifikasi Kebutuhan Lingkungan Penerapan Target (Target Deployment)
- **Tabel 3.1** Pembagian Peran dan Tanggung Jawab dalam Solo Development
- **Tabel 3.2** Rencana Pembagian Tahapan Siklus Pengembangan Iteratif
- **Tabel 3.3** Daftar Tonggak Pencapaian Proyek (Project Milestones)
- **Tabel 3.4** Rincian Luaran Proyek Perangkat Lunak (Deliverables)
- **Tabel 4.1** Skenario Use Case: Pendaftaran dan Pengelolaan Profil Pengguna
- **Tabel 4.2** Skenario Use Case: Penerbitan Brief Proyek & Kebutuhan Posisi oleh UMKM
- **Tabel 4.3** Skenario Use Case: Pemrosesan SkillMatch & Pemeringkatan Kandidat Mahasiswa
- **Tabel 4.4** Skenario Use Case: Seleksi Kandidat dan Inisiasi Workspace Kolaboratif
- **Tabel 4.5** Skenario Use Case: Pengelolaan Tugas Milestone dan Pelacakan Progres
- **Tabel 4.6** Skenario Use Case: Penyerahan Luaran Proyek dan Evaluasi Ulasan Dua Arah
- **Tabel 4.7** Kamus Data Rencana Entitas Basis Data Relasional PostgreSQL
- **Tabel 5.1** Keputusan Tumpukan Teknologi Proyek SkillBridge Hub
- **Tabel 5.2** Rencana Rute Web dan API Aplikasi Laravel
- **Tabel 5.3** Spesifikasi Kontrak REST API Layanan FastAPI SkillMatch Engine
- **Tabel 6.1** Matriks Rencana Kasus Uji Fungsional Sistem (Functional Test Plan)
- **Tabel 6.2** Matriks Rencana Kasus Uji Integrasi & Pemrosesan NLP SkillMatch
- **Tabel 6.3** Panduan Klasifikasi Tingkat Keparahan Bug (Bug Severity & Priority)
- **Tabel 6.4** Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix / RTM)
- **Tabel 8.1** Matriks Analisis, Pemilik, dan Rencana Mitigasi Risiko

---

# DAFTAR GAMBAR

- **Gambar 3.1** Diagram Alur Kerja Metodologi Agile Iterative / Sprint-Based
- **Gambar 3.2** Visualisasi Tahapan Pengembangan Iteratif (Gantt Chart)
- **Gambar 4.1** Diagram Arsitektur Sistem Terintegrasi (Laravel, Supabase, FastAPI)
- **Gambar 4.2** BPMN Alur Proses Bisnis Kolaborasi & SkillMatch Engine
- **Gambar 4.3** Use Case Diagram Sistem Informasi SkillBridge Hub
- **Gambar 4.4** Entity Relationship Diagram (ERD) Basis Data PostgreSQL
- **Gambar 4.5** Diagram Alir Data Pemrosesan NLP SkillMatch Engine (TF-IDF & Cosine Similarity)
- **Gambar 5.1** Diagram Strategi Percabangan Git Alur Kerja Mandiri
- **Gambar 6.1** Piramida Pengujian Kualitas Perangkat Lunak
- **Gambar 6.2** Alur Siklus Hidup Penanganan Bug (Bug Lifecycle)

---

# BAB 1 — PROJECT OVERVIEW

## 1.1 Latar Belakang (Background)
Integrasi antara dunia akademik dan sektor industri riil merupakan aspek fundamental dalam mempersiapkan lulusan perguruan tinggi agar memiliki keterampilan praktis yang relevan dengan kebutuhan pasar kerja. Mahasiswa dituntut tidak hanya menguasai teori formal di ruang perkuliahan, tetapi juga memiliki pengalaman pengerjaan proyek nyata yang dapat dibuktikan melalui portofolio terpercaya. Di sisi lain, sektor Usaha Mikro, Kecil, dan Menengah (UMKM) sering menghadapi kendala dalam melakukan digitalisasi bisnis—seperti pembuatan landing page, pengelolaan media sosial, perancangan antarmuka pengguna, maupun branding produk—akibat keterbatasan anggaran operasional dan akses ke tenaga profesional.

Kondisi eksisting menunjukkan bahwa proses kolaborasi antara mahasiswa dan UMKM masih berlangsung secara informal dan terfragmentasi. Mahasiswa kesulitan menemukan mitra usaha yang membutuhkan keahlian mereka secara transparan, sedangkan pemilik UMKM kesulitan menyaring pelamar secara manual karena keterbatasan waktu dan latar belakang teknis. Selain itu, pengerjaan proyek sering kali tidak memiliki ruang pemantauan kemajuan yang terstruktur sehingga rawan terjadi keterlambatan atau ketidaksesuaian hasil akhir. Di akhir proyek, mahasiswa juga jarang mendapatkan rekam jejak formal yang dapat divalidasi oleh pihak luar.

Untuk menjawab permasalahan tersebut, dirancang sistem informasi **SkillBridge Hub**. Platform web ini bertujuan menghubungkan mahasiswa pencari proyek industri dengan UMKM yang membutuhkan solusi digitalisasi melalui mekanisme rekomendasi berbasis pemrosesan bahasa alami (*Natural Language Processing / NLP*), ruang kerja kolaboratif terstruktur, dan sistem evaluasi portofolio terverifikasi.

## 1.2 Rumusan Masalah (Problem Statement)
Rumusan masalah utama yang ditangani dalam proyek rekayasa perangkat lunak ini adalah:
1. **Ketidaksesuaian Kualifikasi Pelamar dan Kebutuhan Proyek**: UMKM kesulitan mencocokkan keterampilan teknis mahasiswa pelamar dengan kualifikasi pekerjaan yang dibutuhkan.
2. **Inefisiensi Seleksi Kandidat**: Kurasi pelamar secara manual membutuhkan waktu lama dan rawan menghasilkan keputusan yang kurang tepat tanpa metrik penilaian objektif.
3. **Ketiadaan Media Kolaborasi dan Pelacakan Terpusat**: Kurangnya wadah terpadu untuk memantau tahapan pengerjaan tugas, tenggat waktu, dan penyerahan hasil kerja antara mahasiswa dan UMKM.
4. **Minimnya Mekanisme Validasi Portofolio**: Mahasiswa kesulitan membuktikan keabsahan pengalaman kerja nyata kepada pihak industri karena ketiadaan rekam jejak dan ulasan terverifikasi.
5. **Komunikasi yang Terpencar**: Koordinasi proyek sering dilakukan di luar platform tanpa dokumentasi riwayat pengerjaan yang rapi.

## 1.3 Solusi yang Diusulkan (Proposed Solution)
Solusi yang diusulkan melalui platform **SkillBridge Hub** meliputi:
1. **Modul Rekomendasi Kandidat (SkillMatch Engine)**: Mengimplementasikan layanan berbasis Python (FastAPI, Scikit-learn, Pandas) yang memanfaatkan metode pemrosesan teks *TF-IDF (Term Frequency-Inverse Document Frequency)* dan *Cosine Similarity* untuk menghitung kedekatan vektor antara kualifikasi kebutuhan proyek UMKM dan resume/profil keahlian mahasiswa, menghasilkan skor kesesuaian dan pemeringkatan kandidat (*candidate ranking*) sebagai alat bantu pendukung keputusan (*decision support*).
2. **Manajemen Profil dan Dokumen Mahasiswa**: Menyediakan wadah terstruktur bagi mahasiswa untuk mencantumkan keterampilan teknis, institusi asal, sertifikat, serta mengunggah berkas resume (CV) dan dokumen portofolio yang disimpan secara aman di Supabase Storage.
3. **Katalog Marketplace Proyek & Manajemen Posisi**: Antarmuka terpusat bagi UMKM untuk menerbitkan brief kebutuhan proyek beserta target posisi dan daftar *required skills*, serta bagi mahasiswa untuk mencari proyek sesuai kategori, durasi, dan stipend.
4. **Ruang Kerja Kolaboratif (Workspace)**: Ruang kerja bersama yang terinisialisasi otomatis saat UMKM menyetujui kandidat, dilengkapi daftar tugas (*task checklist*), pelacakan persentase progres dinamis, dan form penyerahan luaran (*deliverables*).
5. **Sistem Ulasan Dua Arah (Two-Way Review)**: Fitur penilaian dan umpan balik timbal balik di akhir proyek yang memengaruhi akumulasi skor portofolio mahasiswa.
6. **Modul Pengelolaan Administrator**: Dasbor analitik ringkasan platform, moderasi kategori/proyek, dan pencatatan audit log aktivitas.

## 1.4 Tujuan Proyek (Project Objectives)
Tujuan dari perencanaan dan pengembangan perangkat lunak SkillBridge Hub adalah:
1. Merancang dan mengimplementasikan aplikasi web berbasis **Laravel** (Blade template engine, Eloquent ORM) yang terhubung ke basis data terkelola **Supabase PostgreSQL** dan **Supabase Storage**.
2. Mengembangkan layanan mikro **SkillMatch Engine** berbasis **FastAPI (Python, Scikit-learn, Pandas)** yang mampu mengevaluasi kemiripan teks profil/resume mahasiswa terhadap kebutuhan proyek UMKM menggunakan algoritma *TF-IDF* dan *Cosine Similarity* secara objektif dan efisien.
3. Membangun ruang kerja kolaboratif yang memudahkan mahasiswa dan UMKM dalam mengelola daftar tugas milestone dan memantau kemajuan proyek secara transparan.
4. Menyediakan sistem reputasi portofolio digital mahasiswa yang terverifikasi berdasarkan hasil evaluasi kerja nyata dari mitra usaha.
5. Menerapkan sistem kontrol akses berbasis peran (RBAC) yang aman menggunakan mekanisme autentikasi dan otorisasi bawaan Laravel.

## 1.5 Manfaat Proyek (Benefits)
1. **Bagi Mahasiswa**: Memperoleh akses ke proyek industri nyata, mengasah kemampuan profesional, dan membangun portofolio kredibel yang terbukti di lapangan.
2. **Bagi Mitra UMKM**: Mempercepat proses penemuan talenta muda yang kompeten dan paling sesuai kualifikasi melalui pemeringkatan otomatis SkillMatch Engine dengan biaya terjangkau.
3. **Bagi Institusi Pendidikan**: Membantu mendukung program kemitraan industri dan mempermudah dokumentasi karya praktis mahasiswa.
4. **Bagi Pengembang**: Menguji kemampuan rekayasa perangkat lunak secara *end-to-end* dalam membangun arsitektur web Laravel yang terintegrasi dengan basis data cloud PostgreSQL dan service machine learning/NLP Python.

## 1.6 Ruang Lingkup & Pengelompokan Fitur (MVP, Core, Future)
Seluruh fitur sistem dikelompokkan ke dalam tiga tingkatan prioritas pengembangan:

##### Tabel 1.1 Matriks Pengelompokan Fitur Sistem (MVP, Core, Future Enhancements)
| Kelompok Fitur | Nama Fitur / Modul | Deskripsi Lingkup Fungsional | Target Rilis |
| :--- | :--- | :--- | :---: |
| **1. MVP (Minimum Viable Product)** | **Autentikasi & Akun** | Registrasi peran Mahasiswa & UMKM, Login sesi Laravel, dan manajemen profil dasar. | Fase 1 |
| | **Profil & Unggah Resume** | Form profil keahlian mahasiswa, form identitas UMKM, dan unggah berkas resume PDF ke Supabase Storage. | Fase 1 |
| | **Katalog & Publikasi Proyek**| Pembuatan brief proyek UMKM beserta required skills dan pencarian proyek dengan filter kategori. | Fase 1 |
| | **Pengajuan Lamaran** | Form pengajuan lamaran proyek oleh mahasiswa (1 lamaran per proyek). | Fase 1 |
| | **Inisiasi Workspace Dasar** | Pemilihan dan penerimaan pelamar oleh UMKM yang otomatis memicu pembuatan entitas workspace bersama. | Fase 1 |
| **2. Core Features (Fitur Utama Kolaborasi)** | **NLP SkillMatch Engine** | Komputasi vektor TF-IDF & Cosine Similarity via FastAPI untuk menghasilkan skor kecocokan dan ranking kandidat. | Fase 2 |
| | **Milestone & Task Checklist** | Pembuatan checklist tugas, penetapan batas waktu, dan kalkulasi persentase progres dinamis di workspace. | Fase 2 |
| | **Penyerahan Deliverables** | Pengunggahan tautan/dokumen hasil kerja akhir proyek dan validasi persetujuan oleh UMKM. | Fase 2 |
| | **Two-Way Review & Scoring** | Penilaian rating bintang (1-5) timbal balik dan kalkulasi penambahan skor portofolio mahasiswa. | Fase 2 |
| | **Perpesanan & Notifikasi** | Pesan teks antaranggota workspace aktif dan laci pemberitahuan status proyek. | Fase 2 |
| | **Dasbor Tata Kelola Admin** | Metrik statistik platform, moderasi kategori proyek, dan pencatatan audit log aktivitas. | Fase 2 |
| **3. Future Enhancements (Lanjutan)** | **Payment Gateway Escrow** | Penampungan dana stipend terintegrasi (Midtrans) dengan rilis dana pasca-persetujuan kerja. | Fase 3 |
| | **Aplikasi Mobile Native** | Aplikasi Android/iOS menggunakan React Native / Flutter. | Fase 3 |
| | **Automated Skill Assessment** | Uji kompetensi teknis otomatis (coding test) untuk validasi keahlian mahasiswa. | Fase 3 |
| | **Video Conference Terintegrasi** | Modul panggilan video langsung di dalam workspace menggunakan WebRTC. | Fase 3 |

## 1.7 Asumsi Proyek (Project Assumptions)
1. Pengguna (Mahasiswa dan UMKM) memiliki perangkat komputer/smartphone dengan koneksi internet dan peramban web modern.
2. Mitra UMKM menyediakan informasi deskripsi kebutuhan proyek dan daftar *required skills* secara jelas dan objektif.
3. Mahasiswa mengunggah berkas resume (CV) atau mengisi data teks profil keahlian yang relevan untuk dianalisis oleh modul NLP.
4. Layanan basis data dan penyimpanan file Supabase serta service FastAPI Python dapat diakses dengan stabil selama proses pengujian.

## 1.8 Batasan Proyek (Project Constraints)
1. **Batasan Sumber Daya**: Proyek dikembangkan secara mandiri oleh satu orang pengembang (*Solo Developer*).
2. **Batasan Waktu**: Jadwal pengembangan diselesaikan dalam durasi kalender perkuliahan satu semester.
3. **Batasan Arsitektur NLP**: Model SkillMatch menggunakan pendekatan *Information Retrieval / Text Similarity* berbasis TF-IDF dan Cosine Similarity (bukan *Generative AI* atau *Deep Neural Network Supervised Learning*).
4. **Batasan Platform**: Sistem difokuskan sebagai *Server-Rendered Responsive Web Application* berbasis Laravel Blade.

---

# BAB 2 — SOFTWARE REQUIREMENTS

## 2.1 Pemangku Kepentingan (Stakeholders)

##### Tabel 2.1 Matriks Analisis Pemangku Kepentingan (Stakeholder Analysis)
| ID | Pemangku Kepentingan | Peran dalam Sistem | Kepentingan & Kebutuhan |
| :---: | :--- | :--- | :--- |
| **SH-01** | **Mahasiswa (Talenta)** | Pengguna Utama | Mencari proyek industri nyata, mengunggah resume/keahlian, berkolaborasi dalam workspace, dan membangun portofolio terverifikasi. |
| **SH-02** | **Mitra UMKM** | Pengguna Utama | Menerbitkan brief proyek, mencari kandidat yang cocok via ranking SkillMatch, memantau tugas di workspace, dan menilai hasil kerja. |
| **SH-03** | **Administrator** | Pengelola Platform | Memantau statistik kesehatan sistem, mengelola kategori proyek, memoderasi konten, dan memeriksa catatan audit aktivitas. |
| **SH-04** | **Dosen / Evaluator Akademik** | Pengawas & Penilai | Menilai kualitas perancangan sistem informasi, ketepatan arsitektur perangkat lunak, dan luaran teknis proyek. |
| **SH-05** | **Pengembang Mandiri** | Rekayasawan Sistem | Merancang arsitektur, mengimplementasikan kode Laravel dan FastAPI, merancang skema basis data PostgreSQL, dan menguji fungsionalitas aplikasi. |

---

## 2.2 Peran Pengguna dan Hak Akses (User Roles & Access Control)

##### Tabel 2.2 Matriks Peran Pengguna dan Hak Akses Sistem
| Peran (*Role*) | Tingkat Akses | Hak Akses Utama dalam Sistem |
| :--- | :---: | :--- |
| **GUEST** | Publik | Menjelajahi landing page, melihat katalog proyek publik, membaca detail proyek, mengakses form registrasi dan login. |
| **STUDENT** | Pengguna Terotentikasi | Mengelola profil keahlian, mengunggah resume/portofolio ke Supabase Storage, melamar proyek terbuka, mengakses workspace aktif, memperbarui tugas, menyerahkan luaran, memberi ulasan UMKM. |
| **UMKM** | Pengguna Terotentikasi | Mengelola profil usaha, menerbitkan brief proyek dan required skills, melihat ranking kandidat dari SkillMatch Engine, memilih pelamar, mengelola tugas workspace, menyetujui luaran kerja, memberi ulasan mahasiswa. |
| **ADMIN** | Administrator Penuh | Mengakses dasbor statistik platform, menambah/mengubah kategori proyek, memoderasi status publikasi proyek, memverifikasi akun pengguna, memantau audit log. |

---

## 2.3 Kebutuhan Fungsional (Functional Requirements)

##### Tabel 2.3 Matriks Spesifikasi Kebutuhan Fungsional (Functional Requirements)
| Kode FR | Nama Fitur | Deskripsi Kebutuhan Sistem | Aktor Utama | Kategori |
| :---: | :--- | :--- | :---: | :---: |
| **FR-AUTH-01** | Registrasi Multi-Peran | Sistem memungkinkan pendaftaran akun baru dengan peran Mahasiswa atau UMKM (enkripsi password Bcrypt via Laravel Auth). | Guest | **MVP** |
| **FR-AUTH-02** | Autentikasi Sesi & Login | Sistem memvalidasi kredensial login dan mengelola sesi pengguna secara aman menggunakan middleware bawaan Laravel. | Semua Pengguna | **MVP** |
| **FR-AUTH-03** | Pemulihan Kata Sandi | Sistem menyediakan alur permintaan reset password berbasis token email standar Laravel. | Semua Pengguna | **Core** |
| **FR-PROF-01** | Profil & Resume Mahasiswa | Sistem memfasilitasi pengelolaan profil mahasiswa, institusi, taksonomi keahlian, dan unggah berkas resume (PDF) ke Supabase Storage. | Mahasiswa | **MVP** |
| **FR-PROF-02** | Profil UMKM | Sistem memfasilitasi pengelolaan profil usaha UMKM, logo, bidang industri, lokasi, dan skala usaha. | UMKM | **MVP** |
| **FR-PROJ-01** | Publikasi Brief Proyek | Sistem menyediakan form bagi UMKM untuk menerbitkan brief proyek (judul, kategori, durasi, stipend, sasaran, luaran, required skills). | UMKM | **MVP** |
| **FR-PROJ-02** | Katalog & Filter Proyek | Sistem menyediakan halaman pencarian proyek dengan filter berdasarkan kategori, level, dan kata kunci. | Semua Pengguna | **MVP** |
| **FR-MATCH-01**| Pemrosesan NLP SkillMatch | Sistem mengirimkan data teks kebutuhan proyek dan profil/resume pelamar ke service FastAPI untuk dihitung kemiripannya (TF-IDF + Cosine Similarity). | Sistem, UMKM | **Core** |
| **FR-MATCH-02**| Pemeringkatan Kandidat | Sistem menampilkan daftar pelamar proyek terurut berdasarkan skor kecocokan persentase (*candidate ranking*) sebagai alat bantu keputusan UMKM. | UMKM | **Core** |
| **FR-APP-01** | Pengajuan Lamaran | Sistem memungkinkan mahasiswa mengajukan lamaran ke proyek terbuka (1 lamaran per mahasiswa per proyek). | Mahasiswa | **MVP** |
| **FR-APP-02** | Seleksi & Pemilihan Kandidat| Sistem memfasilitasi UMKM untuk menerima (*Accept*) kandidat terpilih atau menolak (*Reject*) pelamar. | UMKM | **MVP** |
| **FR-WORK-01** | Inisiasi Workspace Otomatis | Sistem secara otomatis membuat entitas ruang kerja kolaboratif saat UMKM menyetujui kandidat mahasiswa. | Sistem | **MVP** |
| **FR-WORK-02** | Checklist Tugas Milestone | Sistem memungkinkan pembuatan, penugasan, penentuan tenggat waktu, dan penandaan selesai pada item tugas dalam workspace. | Mahasiswa, UMKM | **Core** |
| **FR-WORK-03** | Pelacakan Kemajuan Dinamis | Sistem memperbarui persentase progres workspace secara otomatis berdasarkan rasio tugas yang telah diselesaikan. | Sistem | **Core** |
| **FR-WORK-04** | Penyerahan Luaran Kerja | Sistem menyediakan antarmuka bagi mahasiswa untuk menyerahkan tautan/dokumen luaran akhir dan UMKM memvalidasinya. | Mahasiswa, UMKM | **Core** |
| **FR-REV-01** | Ulasan Dua Arah | Sistem memfasilitasi pengisian rating bintang (1-5) dan komentar evaluasi antara mahasiswa dan UMKM setelah proyek tuntas. | Mahasiswa, UMKM | **Core** |
| **FR-REV-02** | Pembaruan Skor Portofolio | Sistem mengakumulasi skor portofolio mahasiswa secara otomatis berdasarkan ulasan yang diterima. | Sistem | **Core** |
| **FR-CHAT-01** | Perpesanan Internal Workspace | Sistem menyediakan fitur pesan teks langsung antaranggota yang terikat pada konteks workspace aktif. | Mahasiswa, UMKM | **Core** |
| **FR-NOTIF-01**| Pusat Notifikasi | Sistem mencatat dan menampilkan pemberitahuan saat status lamaran berubah, tugas diperbarui, atau pesan masuk. | Semua Pengguna | **Core** |
| **FR-ADM-01** | Dasbor Analitik Admin | Sistem menyajikan statistik ringkasan total pengguna, proyek aktif, workspace berjalan, dan tingkat penyelesaian. | Admin | **Core** |
| **FR-ADM-02** | Manajemen Kategori & Moderasi | Sistem memungkinkan admin mengelola master kategori dan mengubah status visibilitas proyek publik. | Admin | **Core** |
| **FR-ADM-03** | Pencatatan Audit Log | Sistem merekam aktivitas administratif penting ke dalam tabel audit log untuk keperluan audit keamanan. | Admin, Sistem | **Core** |

---

## 2.4 Kebutuhan Non-Fungsional (Non-Functional Requirements)

##### Tabel 2.4 Matriks Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements)
| Parameter | Kode NFR | Spesifikasi Target Terukur |
| :--- | :---: | :--- |
| **Performa** | **NFR-P-01** | Waktu pemuatan halaman server-rendered Laravel Blade rata-rata $\le 800\text{ ms}$ pada kondisi jaringan normal. |
| | **NFR-P-02** | Waktu eksekusi proses perbandingan teks dan kalkulasi Cosine Similarity pada FastAPI $\le 1.5\text{ detik}$ untuk 50 kandidat. |
| **Keamanan** | **NFR-S-01** | Kata sandi pengguna dienkripsi searah menggunakan algoritma **Bcrypt** melalui mekanisme hashing standar Laravel. |
| | **NFR-S-02** | Pengamanan terhadap serangan *Cross-Site Request Forgery (CSRF)* menggunakan proteksi token CSRF otomatis pada seluruh formulir Blade. |
| | **NFR-S-03** | Seluruh masukan formulir divalidasi menggunakan *Form Request Validation* Laravel untuk mencegah injeksi SQL dan XSS. |
| **Kegunaan** | **NFR-U-01** | Antarmuka web responsif dan dapat diakses dengan nyaman pada layar desktop, tablet, maupun ponsel pintar menggunakan tata letak CSS modern. |
| **Keandalan** | **NFR-R-01** | Penanganan galat terisolasi: jika service FastAPI tidak dapat dijangkau, sistem Laravel tetap berjalan dan menampilkan pesan penanganan yang ramah pengguna. |
| **Kompatibilitas** | **NFR-C-01** | Aplikasi web kompatibel dengan peramban modern standar (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari). |
| **Kemudahan Rawat**| **NFR-M-01** | Struktur kode mengadopsi pola MVC Laravel standar (Model-View-Controller) dengan kode service Python modular yang mudah diperbarui. |

---

## 2.5 Kebutuhan Lingkungan Pengembangan (Development Requirements)

##### Tabel 2.5 Spesifikasi Kebutuhan Lingkungan Pengembangan (Development Environment)
| Komponen | Spesifikasi yang Digunakan | Kegunaan |
| :--- | :--- | :--- |
| **Perangkat Keras** | Komputer / Laptop (RAM $\ge 8\text{ GB}$, Penyimpanan SSD, Koneksi Internet) | Lingkungan pengkodean dan pengujian lokal. |
| **Sistem Operasi** | Windows 11 / Linux Ubuntu / macOS | Menjalankan web server lokal, PHP runtime, dan Python environment. |
| **Runtime & Bahasa**| PHP (v8.2+) dan Python (v3.10+) | Runtime backend web utama (Laravel) dan runtime service NLP (FastAPI). |
| **Framework Web Utama**| Laravel v11.x (PHP) | Framework backend, routing MVC, Eloquent ORM, autentikasi, dan controller. |
| **Template Engine UI**| Laravel Blade didukung HTML5, CSS3, dan Vanilla JavaScript | Tampilan antarmuka server-rendered reaktif dan interaktif. |
| **Framework Service NLP**| FastAPI (Python) & Uvicorn ASGI Server | API service terpisah untuk komputasi TF-IDF dan Cosine Similarity. |
| **Pustaka Data Science**| Scikit-learn, Pandas, NumPy | Preprocessing teks, ekstraksi fitur TF-IDF, dan kalkulasi kemiripan kosinus. |
| **Basis Data Cloud** | Supabase PostgreSQL (Managed Cloud RDBMS) | Persistensi data relasional aplikasi. |
| **Penyimpanan Berkas** | Supabase Storage Bucket | Penyimpanan berkas resume PDF, sertifikat, dan dokumen luaran. |
| **Manajemen Dependensi**| Composer (PHP) dan pip / virtualenv (Python) | Pengelolaan pustaka eksternal backend dan service NLP. |
| **Perkakas Bantu** | Visual Studio Code, Git, Postman, Laragon / PHP CLI Server | Text editor, version control, dan pengujian API. |

---

## 2.6 Kebutuhan Lingkungan Penerapan Target (Target Deployment Requirements)

##### Tabel 2.6 Spesifikasi Kebutuhan Lingkungan Penerapan Target (Target Deployment)
| Komponen Target | Perencanaan Lingkungan Penerapan |
| :--- | :--- |
| **Aplikasi Web Laravel** | Web Hosting / Cloud Application Platform (VPS / PaaS) dengan web server NGINX / Apache dan PHP 8.2+ runtime. |
| **Layanan NLP FastAPI** | Python Application Container / Cloud Service (Render / Railway / VPS terisolasi). |
| **Basis Data Relasional** | Managed Supabase PostgreSQL dengan koneksi pooler dan enkripsi SSL aktif. |
| **Penyimpanan Berkas** | Supabase Storage Bucket dengan URL publik terproteksi. |
| **Protokol Keamanan** | Protokol HTTPS penuh menggunakan sertifikat SSL/TLS. |
| **Variabel Lingkungan** | Konfigurasi terisolasi via file `.env` (`DB_CONNECTION=pgsql`, `SUPABASE_URL`, `SUPABASE_KEY`, `FASTAPI_MATCH_URL`). |

---

# BAB 3 — SOFTWARE DEVELOPMENT PLANNING

## 3.1 Metodologi Pengembangan: Agile Iterative / Sprint-Based
Pengembangan perangkat lunak SkillBridge Hub menerapkan pendekatan **Agile Iterative / Sprint-Based Development**. Model ini berfokus pada pembagian fitur ke dalam siklus iterasi (sprint) modular tanpa beban seremonial tim besar, sangat cocok untuk pengembang mandiri (*solo developer*) yang mengutamakan kecepatan implementasi, kualitas kode, dan fleksibilitas penyesuaian fungsionalitas.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 ALUR ITERASI PENGEMBANGAN MANDIRI (AGILE ITERATION)         │
│                                                                             │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌───────┐  │
│   │ Product      │ ──▶ │ Rencana      │ ──▶ │ Eksekusi Kode│ ──▶ │ Uji & │  │
│   │ Backlog      │     │ Iterasi/Modul│     │ Laravel & ML │     │ Review│  │
│   └──────────────┘     └──────────────┘     └──────────────┘     └───────┘  │
│                                                     │                │      │
│                                                     ▼                ▼      │
│                                            ┌─────────────────────────────────┐
│                                            │ Integrasi ke Branch 'main'      │
│                                            └─────────────────────────────────┘
└─────────────────────────────────────────────────────────────────────────────┘
```
#### Gambar 3.1 Diagram Alur Kerja Metodologi Agile Iterative / Sprint-Based

**Karakteristik Metodologi**:
1. **Pengembangan Berbasis Kenaikan Bertahap (*Incremental Progress*)**: Fitur dikembangkan dari skema basis data PostgreSQL, modul MVP Laravel Blade, fitur inti kolaborasi, hingga integrasi service NLP FastAPI secara bertahap.
2. **Pengujian Khusus pada Modul NLP**: Preprocessing teks dan matriks TF-IDF diuji secara terisolasi pada Python sebelum dihubungkan ke endpoint Laravel.
3. **Efisiensi Pengembang Tunggal**: Memangkas waktu koordinasi tim formal dan mengalokasikan fokus maksimal pada perancangan arsitektur, penulisan kode berkualitas, dan pengujian.

---

## 3.2 Peran dan Tanggung Jawab dalam Solo Development
Karena proyek SkillBridge Hub dikembangkan dalam skema **solo development**, satu pengembang menjalankan seluruh peran dalam siklus rekayasa perangkat lunak. Pembagian peran dalam dokumen ini digunakan untuk menggambarkan tanggung jawab dan tahapan pekerjaan secara terstruktur, bukan menunjukkan jumlah anggota tim yang terpisah.

##### Tabel 3.1 Pembagian Peran dan Tanggung Jawab dalam Solo Development
| Peran (*Project Role*) | Pelaksana | Tanggung Jawab Utama | Luaran Kerja (*Deliverables*) |
| :--- | :---: | :--- | :--- |
| **Project Manager** | Ahmad Dhafin Al Farisy | Menyusun rencana kerja, menetapkan prioritas fitur backlog, dan memantau pemenuhan milestone. | Dokumen Perencanaan & Timeline Proyek. |
| **System Analyst** | Ahmad Dhafin Al Farisy | Mengidentifikasi kebutuhan fungsional/non-fungsional, merancang alur proses BPMN, dan skenario use case. | Software Requirements Specification (SRS) & Diagram Analisis. |
| **UI/UX Designer** | Ahmad Dhafin Al Farisy | Merancang wireframe antarmuka, tata letak visual Blade, dan skema navigasi pengguna. | Desain Antarmuka & Template Laravel Blade. |
| **Web & Backend Developer** | Ahmad Dhafin Al Farisy | Membangun aplikasi Laravel (Controller, Model Eloquent, Middleware, Blade Views, dan HTTP Guzzle client). | Kode Sumber Aplikasi Web Laravel. |
| **ML & NLP Engineer** | Ahmad Dhafin Al Farisy | Mengembangkan service FastAPI, pipeline preprocessing teks, vektorisasi TF-IDF, dan Cosine Similarity. | Kode Sumber Layanan Python SkillMatch Engine. |
| **Database Designer** | Ahmad Dhafin Al Farisy | Merancang skema relasional di Supabase PostgreSQL, migrasi Laravel, dan skrip seeding data. | File Migrasi Laravel & Skema Database. |
| **QA & Tester** | Ahmad Dhafin Al Farisy | Menyusun skenario pengujian, mengeksekusi uji fungsional, dan memverifikasi kelayakan integrasi sistem. | Matriks Pengujian Fungsional & UAT Plan. |

---

## 3.3 Alur Kerja Pengembangan (Development Workflow)
Alur kerja pengembangan perangkat lunak dijalankan melalui 6 fase terstruktur:
1. **Analisis Kebutuhan**: Mengumpulkan daftar kebutuhan mahasiswa dan UMKM serta menyusun matriks FR/NFR.
2. **Perancangan Sistem**: Merancang alur proses bisnis (BPMN), Use Case, skema basis data PostgreSQL, dan antarmuka Blade.
3. **Pengembangan Database & Service NLP**: Menyiapkan tabel di Supabase PostgreSQL, membangun service FastAPI Python, dan menguji modul similarity.
4. **Pengembangan Aplikasi Web Laravel**: Membangun Controller, Model Eloquent, form Blade, dan integrasi HTTP request ke FastAPI.
5. **Pengujian Sistem**: Menjalankan pengujian fungsional modul, pengujian integrasi Laravel-FastAPI, dan perbaikan bug.
6. **Deployment & Dokumentasi**: Menerapkan sistem ke lingkungan target dan melengkapi dokumentasi teknis.

---

## 3.4 Work Breakdown Structure (WBS)
Berikut adalah struktur rincian kerja (*Work Breakdown Structure*) proyek SkillBridge Hub:

```text
1.0 Inisiasi dan Analisis Kebutuhan
    1.1 Identifikasi Masalah Kolaborasi Mahasiswa & UMKM
    1.2 Analisis Pemangku Kepentingan
    1.3 Penyusunan Spesifikasi Kebutuhan (FR & NFR)
    1.4 Pengelompokan Fitur (MVP, Core, Future)

2.0 Perancangan Sistem (System Design)
    2.1 Pemodelan Alur Proses Bisnis & SkillMatch (BPMN)
    2.2 Perancangan Use Case & Skenario
    2.3 Perancangan Skema Basis Data PostgreSQL (ERD & Kamus Data)
    2.4 Perancangan Tata Letak Antarmuka Laravel Blade
    2.5 Perancangan Kontrak REST API Layanan FastAPI

3.0 Implementasi Perangkat Lunak (Development)
    3.1 Inisialisasi Project Laravel 11 & Konfigurasi Supabase PostgreSQL
    3.2 Implementasi Migrasi Basis Data Laravel & Seeding Data Awal
    3.3 Implementasi Modul Autentikasi Laravel & Profil Peran (MVP)
    3.4 Implementasi Integrasi Unggah Resume ke Supabase Storage (MVP)
    3.5 Implementasi Modul Publikasi Brief Proyek & Katalog (MVP)
    3.6 Implementasi Layanan SkillMatch Engine FastAPI (TF-IDF & Cosine Similarity) (Core)
    3.7 Implementasi Integrasi Laravel ke FastAPI untuk Pemeringkatan Kandidat (Core)
    3.8 Implementasi Modul Ruang Kerja Kolaboratif (Workspace & Task Checklist) (Core)
    3.9 Implementasi Penyerahan Luaran Kerja & Ulasan Dua Arah (Core)
    3.10 Implementasi Modul Perpesanan Internal & Dasbor Admin (Core)

4.0 Pengujian dan Penjaminan Mutu (Testing & QA)
    4.1 Pengujian Preprocessing Teks & Perhitungan Cosine Similarity
    4.2 Pengujian Integrasi HTTP Laravel $\leftrightarrow$ FastAPI
    4.3 Pengujian Kasus Uji Fungsional Aplikasi Web Laravel
    4.4 Rencana Uji Penerimaan Pengguna (UAT Planning)
    4.5 Manajemen Perbaikan Defect dan Bug

5.0 Deployment dan Pelaporan Akhir
    5.1 Konfigurasi Lingkungan Penerapan Target (Target Deployment)
    5.2 Migrasi Basis Data Supabase Cloud
    5.3 Penyusunan Dokumen Perencanaan & Panduan Penggunaan
```

---

## 3.5 Rencana Tahapan Iterasi dan Timeline (Sprint Schedule)

##### Tabel 3.2 Rencana Pembagian Tahapan Siklus Pengembangan Iteratif
| Iterasi / Tahap | Fokus Pekerjaan Utama | Target Luaran Terukur |
| :---: | :--- | :--- |
| **Iterasi 1: Inisiasi & Desain** | Analisis kebutuhan, perancangan BPMN, Use Case, ERD, dan mockup Blade. | Dokumen SRS dan Desain Basis Data. |
| **Iterasi 2: Fondasi & Auth (MVP)**| Setup Laravel 11, koneksi Supabase PostgreSQL, migrasi, modul login/register. | Autentikasi & Profil Pengguna Berjalan. |
| **Iterasi 3: Storage & Proyek (MVP)**| Integrasi Supabase Storage untuk resume PDF, form brief proyek, katalog. | Unggah Resume & Katalog Proyek Aktif. |
| **Iterasi 4: Service NLP FastAPI (Core)**| Pembangunan service FastAPI, modul preprocessing teks, TF-IDF, Cosine Similarity. | Layanan SkillMatch Engine Berfungsi. |
| **Iterasi 5: Integrasi & Ranking (Core)**| Integrasi HTTP Laravel ke FastAPI, penampilan ranking kandidat ke UMKM. | Pemeringkatan Pelamar Terintegrasi. |
| **Iterasi 6: Workspace & Task (Core)**| Pembuatan workspace otomatis, task checklist, kalkulasi progres dinamis. | Ruang Kerja Kolaboratif Berfungsi. |
| **Iterasi 7: Deliverables & Review (Core)**| Penyerahan luaran akhir, ulasan dua arah, skor portofolio, dasbor admin. | Siklus Proyek Lengkap & Ulasan Aktif. |
| **Iterasi 8: QA & Finalisasi Rilis** | Eksekusi kasus uji, perbaikan bug, penyiapan deployment target. | Platform Teruji & Siap Rilis. |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 VISUALISASI STRUKTUR TAHAPAN (GANTT CHART)                  │
├────────────────────────┬──┬──┬──┬──┬──┬──┬──┬──┤                            │
│ Tahap Iterasi          │I1│I2│I3│I4│I5│I6│I7│I8│                            │
├────────────────────────┼──┼──┼──┼──┼──┼──┼──┼──┤                            │
│ 1. Inisiasi & Desain   │██│  │  │  │  │  │  │  │                            │
│ 2. Fondasi & Auth (MVP)│  │██│  │  │  │  │  │  │                            │
│ 3. Storage & Proyek    │  │  │██│  │  │  │  │  │                            │
│ 4. FastAPI NLP Service │  │  │  │██│  │  │  │  │                            │
│ 5. Integrasi & Ranking │  │  │  │  │██│  │  │  │                            │
│ 6. Workspace & Task    │  │  │  │  │  │██│  │  │                            │
│ 7. Review & Admin      │  │  │  │  │  │  │██│  │                            │
│ 8. QA & Finalisasi     │  │  │  │  │  │  │  │██│                            │
└────────────────────────┴──┴──┴──┴──┴──┴──┴──┴──┘                            │
```
#### Gambar 3.2 Visualisasi Tahapan Pengembangan Iteratif (Gantt Chart)

---

## 3.6 Tonggak Pencapaian Proyek (Project Milestones)

##### Tabel 3.3 Daftar Tonggak Pencapaian Proyek (Project Milestones)
| Kode | Nama Milestone | Kriteria Keberhasilan (*Acceptance Criteria*) |
| :---: | :--- | :--- |
| **M1** | **Spesifikasi & Desain Terverifikasi** | Dokumen kebutuhan, use case, dan perancangan skema basis data PostgreSQL telah selesai dan konsisten. |
| **M2** | **Pondasi Database & Auth Siap (MVP)** | Skema tabel berhasil dimigrasi di Supabase PostgreSQL, skrip seeding berjalan sukses, login/register Laravel aktif. |
| **M3** | **Katalog & Unggah Resume Siap (MVP)**| UMKM dapat menerbitkan brief proyek dan mahasiswa dapat mengunggah resume PDF ke Supabase Storage. |
| **M4** | **SkillMatch NLP Engine Berfungsi** | FastAPI berhasil memproses teks kualifikasi proyek dan resume mahasiswa, menghasilkan skor Cosine Similarity. |
| **M5** | **Workspace Kolaboratif Berjalan** | UMKM dapat memilih kandidat dari ranking SkillMatch dan workspace terinisialisasi otomatis dengan checklist tugas. |
| **M6** | **Siklus Proyek Selesai & Review Aktif**| Penyerahan luaran berhasil divalidasi dan fitur ulasan dua arah berhasil memperbarui skor portofolio mahasiswa. |
| **M7** | **Dokumentasi & Siap Rilis** | Seluruh rencana kasus uji (TC-01 s/d TC-16) selesai diuji dan sistem siap dideploy ke lingkungan target. |

---

## 3.7 Luaran Proyek (Deliverables)

##### Tabel 3.4 Rincian Luaran Proyek Perangkat Lunak (Deliverables)
| No | Kategori Luaran | Bentuk Luaran |
| :---: | :--- | :--- |
| 1 | **Dokumen Perencanaan** | Dokumen Software Development Planning (SDP) lengkap format akademik. |
| 2 | **Berkas Desain Sistem** | Diagram BPMN, Use Case, ERD, dan Kamus Data PostgreSQL terstruktur. |
| 3 | **Kode Sumber Aplikasi Web** | Repositori kode aplikasi web Laravel (Blade templates, Controllers, Models, Migrations). |
| 4 | **Kode Sumber Layanan NLP** | Repositori kode service FastAPI Python (Script TF-IDF, Preprocessing, Cosine Similarity). |
| 5 | **Skema Basis Data & Seeding** | File migrasi Laravel untuk Supabase PostgreSQL dan skrip seeding data awal (`DatabaseSeeder.php`). |
| 6 | **Rencana & Hasil Pengujian** | Matriks pengujian fungsional (Test Cases) dan panduan pengujian UAT. |

---

## 3.8 Rencana Manajemen Perubahan (Change Management Plan)
Untuk mencegah perubahan ruang lingkup berlebih (*scope creep*) selama fase pengembangan mandiri, diterapkan prosedur manajemen perubahan sederhana:
1. **Pencatatan Usulan**: Setiap ide fitur tambahan dicatat terlebih dahulu dalam daftar *Future Enhancements Backlog*.
2. **Evaluasi Dampak**: Mengevaluasi apakah penambahan fitur berisiko mengganggu jadwal penyelesaian fitur utama yang disyaratkan.
3. **Keputusan Prioritas**: Fitur di luar lingkup inti ditunda hingga seluruh kebutuhan fungsional primer selesai diuji dengan baik.

---

# BAB 4 — HIGH-LEVEL ARCHITECTURE AND DESIGN PLANNING

## 4.1 Perencanaan Arsitektur Sistem (System Architecture Plan)
Arsitektur sistem SkillBridge Hub direncanakan mengadopsi integrasi modular antara aplikasi web utama berbasis **Laravel**, basis data dan penyimpanan cloud **Supabase**, serta layanan mikro NLP **FastAPI**:

```
                              PENGGUNA (Mahasiswa, UMKM, Admin)
                                             │
                                             ▼
                             ┌───────────────────────────────┐
                             │    APLIKASI WEB LARAVEL       │
                             │  (Server-Rendered MVC Engine) │
                             ├───────────────────────────────┤
                             │ • Laravel Blade Templates     │
                             │ • Autentikasi & RBAC          │
                             │ • Logika Bisnis & Controller  │
                             │ • Eloquent ORM                │
                             │ • HTTP Client (Guzzle)        │
                             └───────────────┬───────────────┘
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      │                                             │
                      ▼                                             ▼
       ┌─────────────────────────────┐               ┌─────────────────────────────┐
       │      SUPABASE CLOUD         │               │     FASTAPI NLP SERVICE     │
       ├─────────────────────────────┤               │       (Python Engine)       │
       │ • Managed PostgreSQL        │               ├─────────────────────────────┤
       │   (Users, Projects, Tasks,  │               │ • REST API: POST /match     │
       │    Reviews, Match Results)  │               │ • Pandas Dataframe          │
       │ • Supabase Storage          │               │ • Text Preprocessing        │
       │   (Resume/CV, Portofolio)   │               │ • TF-IDF Vectorizer         │
       └─────────────────────────────┘               │ • Cosine Similarity Engine  │
                                                     └─────────────────────────────┘
```
#### Gambar 4.1 Diagram Arsitektur Sistem Terintegrasi (Laravel, Supabase, FastAPI)

**Komponen Arsitektur Utama**:
1. **Laravel Web Application**: Bertindak sebagai aplikasi utama yang melayani permintaan pengguna, merender tampilan antarmuka via Laravel Blade, mengelola autentikasi/otorisasi, dan mengeksekusi operasi CRUD data ke basis data.
2. **Supabase PostgreSQL & Storage**: Layanan cloud terkelola untuk menyimpan seluruh entitas relasional dan berkas dokumen resume (PDF) mahasiswa.
3. **FastAPI SkillMatch Service**: Layanan independen berbasis Python yang bertugas mengeksekusi algoritma pemrosesan bahasa alami (TF-IDF + Cosine Similarity) saat UMKM membutuhkan pemeringkatan pelamar. Komunikasi dengan Laravel dilakukan melalui protokol HTTP REST API.

---

## 4.2 Perancangan Alur Proses Bisnis & SkillMatch (BPMN)

Alur proses bisnis utama kolaborasi proyek dan pencarian kandidat via SkillMatch dirancang sebagai berikut:

```
 Mahasiswa (Talenta)            Sistem Laravel & Supabase         Mitra UMKM / Owner
         │                                │                                │
         │   1. Unggah Profil & Resume    │   2. Terbitkan Kebutuhan Proyek│
         │ ─────────────────────────────▶ │ ◀──────────────────────────────│
         │      (Simpan di Supabase)      │      (Posisi & Required Skills)│
         │                                │                                │
         │   3. Ajukan Lamaran Proyek     │                                │
         │ ─────────────────────────────▶ │                                │
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 4. Kirim Data Teks ke       │
         │                                │  │    FastAPI (POST /match)    │
         │                                │  │                             │
         │                                │  │ 5. Eksekusi TF-IDF &        │
         │                                │  │    Cosine Similarity        │
         │                                │  │                             │
         │                                │  │ 6. Kembalikan Ranking Skor  │
         │                                │◀─┘                             │
         │                                │                                │
         │                                │   7. Tampilkan Ranking Kandidat│
         │                                │ ─────────────────────────────▶ │
         │                                │                                │
         │                                │   8. Pilih & Terima Kandidat   │
         │                                │ ◀──────────────────────────────│
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 9. Inisiasi Workspace       │
         │                                │  │    Kolaboratif Otomatis     │
         │                                │◀─┘                             │
         │                                │                                │
         │   10. Kerjakan & Update Tugas  │      Kelola Milestone Tugas    │
         │ ◀────────────────────────────▶ │ ◀────────────────────────────▶ │
         │                                │                                │
         │   11. Serahkan Hasil Kerja     │                                │
         │ ─────────────────────────────▶ │   12. Validasi & Setujui Luaran│
         │                                │ ─────────────────────────────▶ │
         │                                │                                │
         │   13. Beri Review Mitra UMKM   │   14. Beri Review Mahasiswa    │
         │ ─────────────────────────────▶ │ ◀──────────────────────────────│
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 15. Akumulasi Skor          │
         │                                │  │     Portofolio Mahasiswa    │
         │                                │◀─┘                             │
         ▼                                ▼                                ▼
```
#### Gambar 4.2 BPMN Alur Proses Bisnis Kolaborasi & SkillMatch Engine

---

## 4.3 Perancangan Use Case dan Skenario (Use Case Plan & Scenarios)

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
                    │   │   SkillMatch Candidate Ranking  │   │
                    │   │   (NLP Decision Support)        │   │
                    │   └────────────────┬────────────────┘   │
                    │                    │ <<include>>        │
                    │                    ▼                    │
                    │   ┌─────────────────────────────────┐   │
   (Mahasiswa) ───▶ │   │   Workspace & Pelacakan Tugas   │   │ ◀─── (Mitra UMKM)
                    │   └────────────────┬────────────────┘   │
                    │                    │ <<include>>        │
                    │                    ▼                    │
                    │   ┌─────────────────────────────────┐   │
   (Mahasiswa) ───▶ │   │  Deliverables & Review 2-Arah   │   │ ◀─── (Mitra UMKM)
                    │   └─────────────────────────────────┘   │
                    │                                         │
                    │   ┌─────────────────────────────────┐   │
                    │   │    Moderasi, Analitik & Audit   │   │ ◀─── (Administrator)
                    │   └─────────────────────────────────┘   │
                    └─────────────────────────────────────────┘
```
#### Gambar 4.3 Use Case Diagram Sistem Informasi SkillBridge Hub

---

### Rencana Skenario Use Case

##### Tabel 4.1 Skenario Use Case: Pendaftaran dan Pengelolaan Profil Pengguna
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Pendaftaran dan Pengelolaan Profil Pengguna** |
| **Aktor** | Mahasiswa, Mitra UMKM |
| **Deskripsi** | Pendaftaran akun baru, pemilihan peran, dan pengisian profil serta unggah berkas resume ke Supabase Storage. |
| **Kondisi Awal** | Pengguna belum terdaftar atau belum login di sistem. |
| **Kondisi Akhir** | Akun tersimpan di basis data PostgreSQL dan berkas resume tersimpan di Supabase Storage. |
| **Skenario Normal** | 1. Pengguna membuka form registrasi dan memilih peran (Mahasiswa/UMKM).<br>2. Pengguna mengisi nama, email, dan kata sandi.<br>3. Laravel memvalidasi form dan mengenkripsi kata sandi dengan Bcrypt.<br>4. Sistem membuat data `User` dan profil terkait (`StudentProfile`/`UmkmProfile`).<br>5. Mahasiswa mengunggah berkas resume (PDF) yang diteruskan ke Supabase Storage. |
| **Skenario Alternatif** | **3a. Email sudah terdaftar**: Sistem menampilkan pesan validasi error pada form registrasi Blade. |

##### Tabel 4.2 Skenario Use Case: Penerbitan Brief Proyek & Kebutuhan Posisi oleh UMKM
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Penerbitan Brief Proyek & Kualifikasi Posisi** |
| **Aktor** | Mitra UMKM |
| **Deskripsi** | UMKM mempublikasikan kebutuhan proyek baru beserta daftar posisi dan *required skills*. |
| **Kondisi Awal** | Mitra UMKM telah login dengan akun yang valid. |
| **Kondisi Akhir** | Proyek tersimpan di PostgreSQL dan tampil pada katalog proyek publik. |
| **Skenario Normal** | 1. UMKM membuka form "Create Project".<br>2. UMKM mengisi judul, kategori, durasi, stipend, deskripsi, sasaran, luaran, dan daftar *required skills*.<br>3. UMKM menekan tombol publikasikan proyek.<br>4. Controller Laravel memvalidasi data dan menyimpan entitas Proyek dengan status `PUBLISHED`. |
| **Skenario Alternatif** | **4a. Form tidak lengkap**: Sistem menampilkan pesan error validasi pada input yang belum terisi. |

##### Tabel 4.3 Skenario Use Case: Pemrosesan SkillMatch & Pemeringkatan Kandidat Mahasiswa
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Pemrosesan SkillMatch & Pemeringkatan Kandidat (Candidate Ranking)** |
| **Aktor** | Mitra UMKM, Sistem FastAPI |
| **Deskripsi** | UMKM meninjau pelamar proyek dan sistem menampilkan peringkat kecocokan berdasarkan analisis teks NLP. |
| **Kondisi Awal** | Terdapat pelamar berstatus `PENDING` pada proyek milik UMKM. |
| **Kondisi Akhir** | Daftar kandidat ditampilkan terurut berdasarkan persentase skor kesesuaian (*match score*). |
| **Skenario Normal** | 1. UMKM membuka halaman pelamar proyek.<br>2. Laravel mengambil data kualifikasi proyek dan data profil/resume pelamar.<br>3. Laravel mengirimkan permintaan HTTP `POST /match` ke service FastAPI.<br>4. FastAPI melakukan preprocessing teks (lowercasing, tokenizing, stopword removal).<br>5. FastAPI membentuk matriks TF-IDF dan menghitung Cosine Similarity.<br>6. FastAPI mengembalikan ranking kandidat beserta persentase skor kecocokan.<br>7. Laravel merender daftar pelamar berurutan skor kecocokan pada tampilan Blade. |
| **Prinsip Desain** | *Skor kecocokan SkillMatch berfungsi sebagai Information Retrieval & Decision Support bagi UMKM. Keputusan akhir pemilihan kandidat tetap berada sepenuhnya di tangan pengguna UMKM.* |

##### Tabel 4.4 Skenario Use Case: Seleksi Kandidat dan Inisiasi Workspace Kolaboratif
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Seleksi Kandidat dan Inisiasi Workspace** |
| **Aktor** | Mitra UMKM, Mahasiswa, Sistem |
| **Deskripsi** | UMKM memilih kandidat terbaik dan sistem membuat ruang kerja bersama secara otomatis. |
| **Kondisi Awal** | Daftar pelamar telah diberi peringkat oleh SkillMatch Engine. |
| **Kondisi Akhir** | Status lamaran berubah menjadi `ACCEPTED` dan entitas `Workspace` aktif terbuat di PostgreSQL. |
| **Skenario Normal** | 1. UMKM meninjau ranking kandidat dan menekan tombol "Accept Candidate".<br>2. Laravel memperbarui status lamaran menjadi `ACCEPTED`.<br>3. Laravel secara otomatis membuat entitas `Workspace` baru (`status: ACTIVE`, `progressPercent: 0`).<br>4. Sistem mengirimkan notifikasi kepada mahasiswa. |
| **Skenario Alternatif** | **1a. UMKM menolak pelamar**: Status lamaran diubah menjadi `REJECTED` dan notifikasi penolakan dikirimkan. |

##### Tabel 4.5 Skenario Use Case: Pengelolaan Tugas Milestone dan Pelacakan Progres
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Manajemen Tugas Milestone & Pelacakan Progres** |
| **Aktor** | Mahasiswa, Mitra UMKM, Sistem |
| **Deskripsi** | Mengelola checklist tugas pengerjaan dan menghitung persentase kemajuan workspace secara otomatis. |
| **Kondisi Awal** | Workspace kolaboratif telah aktif. |
| **Kondisi Akhir** | Tugas tersimpan dan persentase kemajuan terbarui di basis data. |
| **Skenario Normal** | 1. Mahasiswa atau UMKM menambahkan item tugas milestone (judul dan batas waktu).<br>2. Mahasiswa menandai tugas yang telah selesai.<br>3. Laravel memperbarui kolom `completed: true` pada tabel tugas.<br>4. Laravel menghitung ulang persentase progres: $\text{Progres} = \left(\frac{\text{Tugas Selesai}}{\text{Total Tugas}}\right) \times 100\%$.<br>5. Nilai progres pada tabel workspace terbarui secara otomatis. |
| **Skenario Alternatif** | **1a. Belum ada tugas**: Sistem menampilkan persentase progres 0%. |

##### Tabel 4.6 Skenario Use Case: Penyerahan Luaran Proyek dan Evaluasi Ulasan Dua Arah
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Penyerahan Luaran Proyek & Ulasan Dua Arah** |
| **Aktor** | Mahasiswa, Mitra UMKM, Sistem |
| **Deskripsi** | Penyerahan hasil akhir proyek, persetujuan oleh UMKM, dan pengisian rating evaluasi timbal balik. |
| **Kondisi Awal** | Seluruh tugas di workspace telah selesai (progres 100%). |
| **Kondisi Akhir** | Proyek berstatus `COMPLETED`, ulasan tersimpan, dan skor portofolio mahasiswa terbarui. |
| **Skenario Normal** | 1. Mahasiswa menyerahkan tautan/dokumen hasil kerja akhir di workspace.<br>2. UMKM memeriksa hasil kerja dan menekan tombol setujui proyek.<br>3. Laravel memperbarui status `Workspace` dan `Project` menjadi `COMPLETED`.<br>4. UMKM mengisi rating bintang (1-5) dan komentar evaluasi mahasiswa.<br>5. Mahasiswa mengisi rating bintang (1-5) dan ulasan kerja sama UMKM.<br>6. Laravel menyimpan record `Review` dan memperbarui `portfolioScore` mahasiswa. |
| **Skenario Alternatif** | **2a. Luaran memerlukan revisi**: UMKM menekan tombol minta revisi dan mencantumkan catatan perbaikan. |

---

## 4.4 Perancangan Basis Data Relasional (Database Design Plan)

### 4.4.1 Entity Relationship Diagram (ERD)

```
┌──────────────────┐      1:1       ┌──────────────────────┐
│  StudentProfile  │ ◀───────────── │        User          │
│ (id, userId,     │                │ (id, email, password,│
│  resumeUrl, ...) │                │  name, role, ...)    │
└──────────────────┘                └──────────┬───────────┘
                                               │
                   ┌───────────────────────────┼───────────────────────────┐
                   │ 1:N (Pemilik)             │ 1:N (Pelamar)             │ 1:N (Ulasan)
                   ▼                           ▼                           ▼
        ┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
        │       Project        │1:N │  ProjectApplication  │    │        Review        │
        │ (id, title, status,  │───▶│ (id, projectId,      │    │ (id, projectId,      │
        │  stipend, skills...) │    │  studentId, status)  │    │  authorId, rating)   │
        └──────────┬───────────┘    └──────────────────────┘    └──────────────────────┘
                   │
                   │ 1:N (Ruang Kerja)
                   ▼
        ┌──────────────────────┐    1:N     ┌──────────────────────┐
        │      Workspace       │ ─────────▶ │     ProjectTask      │
        │ (id, projectId,      │            │ (id, workspaceId,    │
        │  progressPercent...) │            │  title, completed)   │
        └──────────┬───────────┘            └──────────────────────┘
                   │
                   │ 1:N (Pesan)
                   ▼
        ┌──────────────────────┐
        │       Message        │
        │ (id, text, senderId, │
        │  receiverId...)      │
        └──────────────────────┘
```
#### Gambar 4.4 Entity Relationship Diagram (ERD) Basis Data PostgreSQL

---

### 4.4.2 Kamus Data Rencana Entitas PostgreSQL

##### Tabel 4.7 Kamus Data Rencana Entitas Basis Data Relasional PostgreSQL
| Nama Entitas | Nama Kolom / Field | Tipe Data PostgreSQL | Keterangan & Batasan |
| :--- | :--- | :--- | :--- |
| **users** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `email` | `VARCHAR(255)` | Unique, email login pengguna. |
| | `password` | `VARCHAR(255)` | Hash kata sandi terenkripsi Bcrypt. |
| | `name` | `VARCHAR(255)` | Nama lengkap pengguna / pemilik usaha. |
| | `role` | `VARCHAR(20)` | Nilai peran: `'STUDENT'`, `'UMKM'`, `'ADMIN'`. |
| | `created_at`, `updated_at` | `TIMESTAMP` | Timestamp pencatatan Laravel. |
| **student_profiles** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `user_id` | `BIGINT / UUID` | Foreign Key ke `users.id` (Unique, 1-to-1). |
| | `institution` | `VARCHAR(255)` | Asal universitas / perguruan tinggi. |
| | `portfolio_score` | `INT` | Akumulasi skor portofolio mahasiswa. |
| | `skills` | `TEXT` | Daftar teks keahlian mahasiswa. |
| | `resume_url` | `VARCHAR(500)` | URL file resume PDF di Supabase Storage. |
| **umkm_profiles** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `user_id` | `BIGINT / UUID` | Foreign Key ke `users.id` (Unique, 1-to-1). |
| | `company_name` | `VARCHAR(255)` | Nama resmi unit usaha UMKM. |
| | `industry` | `VARCHAR(100)` | Sektor bidang industri. |
| | `business_scale` | `VARCHAR(50)` | Skala usaha (Mikro/Kecil/Menengah). |
| **projects** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `owner_id` | `BIGINT / UUID` | Foreign Key ke `users.id` (Pemilik UMKM). |
| | `title` | `VARCHAR(255)` | Judul brief kebutuhan proyek. |
| | `category_id` | `BIGINT / UUID` | Foreign Key ke tabel kategori. |
| | `duration` | `VARCHAR(50)` | Estimasi durasi pengerjaan. |
| | `stipend` | `VARCHAR(100)` | Besaran kompensasi/stipend. |
| | `description` | `TEXT` | Penjelasan rincian proyek. |
| | `required_skills` | `TEXT` | Daftar teks keahlian wajib untuk input SkillMatch. |
| | `status` | `VARCHAR(30)` | Status: `'DRAFT'`, `'PUBLISHED'`, `'ACTIVE'`, `'COMPLETED'`. |
| **project_applications** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `project_id` | `BIGINT / UUID` | Foreign Key ke `projects.id`. |
| | `student_id` | `BIGINT / UUID` | Foreign Key ke `users.id` mahasiswa. |
| | `match_score` | `FLOAT / INT` | Skor kemiripan hasil kalkulasi Cosine Similarity. |
| | `status` | `VARCHAR(30)` | Status: `'PENDING'`, `'ACCEPTED'`, `'REJECTED'`. |
| **workspaces** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `project_id` | `BIGINT / UUID` | Foreign Key ke `projects.id`. |
| | `student_id` | `BIGINT / UUID` | Foreign Key ke `users.id` mahasiswa. |
| | `umkm_id` | `BIGINT / UUID` | Foreign Key ke `users.id` UMKM. |
| | `status` | `VARCHAR(30)` | Status: `'ACTIVE'`, `'COMPLETED'`. |
| | `progress_percent` | `INT` | Persentase kemajuan pengerjaan (0-100%). |
| **project_tasks** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `workspace_id` | `BIGINT / UUID` | Foreign Key ke `workspaces.id`. |
| | `title` | `VARCHAR(255)` | Deskripsi tugas milestone. |
| | `completed` | `BOOLEAN` | Status penyelesaian tugas (true/false). |
| | `due_date` | `DATE / TIMESTAMP`| Batas waktu penyelesaian. |
| **reviews** | `id` | `BIGSERIAL / UUID` | Primary Key. |
| | `project_id` | `BIGINT / UUID` | Foreign Key ke `projects.id`. |
| | `author_id` | `BIGINT / UUID` | Foreign Key ke `users.id` pemberi ulasan. |
| | `target_id` | `BIGINT / UUID` | Foreign Key ke `users.id` penerima ulasan. |
| | `rating` | `INT` | Nilai rating bintang (1-5). |
| | `comment` | `TEXT` | Ulasan tertulis performa kerja sama. |

---

## 4.5 Perancangan Arsitektur Web Laravel & Blade (Frontend & Backend Plan)
Aplikasi web dibangun menggunakan pola **Model-View-Controller (MVC)** standar Laravel:
1. **Views (Laravel Blade Template)**: Mengelola seluruh antarmuka pengguna berbasis server-rendered HTML yang didukung CSS responsif dan JavaScript untuk interaktivitas modal dan form dinamis.
2. **Controllers**: Menangani alur logika request pengguna, validasi form, pemanggilan Model Eloquent, dan komunikasi HTTP ke layanan FastAPI.
3. **Models & Eloquent ORM**: Mengenkapsulasi struktur tabel dan relasi foreign key pada Supabase PostgreSQL.

---

## 4.6 Perancangan Layanan SkillMatch Engine FastAPI (NLP Matching Plan)

```
[Resume Mahasiswa (Teks)] ──▶ [Text Preprocessing] ──▶ [TF-IDF Vectorizer]
                                                              │
                                                              ▼
[Required Skills UMKM]    ──▶ [Text Preprocessing] ──▶ [TF-IDF Vectorizer]
                                                              │
                                                              ▼
                                                   [Cosine Similarity Engine]
                                                              │
                                                              ▼
                                                   [Skor Kecocokan & Ranking]
```
#### Gambar 4.5 Diagram Alir Data Pemrosesan NLP SkillMatch Engine (TF-IDF & Cosine Similarity)

1. **Text Preprocessing**: Teks dari resume/keahlian pelamar dan kualifikasi proyek dibersihkan melalui tahapan *case folding (lowercasing)*, penghapusan tanda baca/angka (*punctuation removal*), dan *stopword removal*.
2. **TF-IDF Vectorization**: Mengubah dokumen teks menjadi representasi vektor numerik berbobot berdasarkan frekuensi kemunculan istilah (*Term Frequency*) dan inversi frekuensi dokumen (*Inverse Document Frequency*).
3. **Cosine Similarity**: Menghitung sudut kosinus antara vektor kebutuhan proyek ($\vec{A}$) dan vektor kandidat ($\vec{B}$):
   $$\text{Similarity}(\vec{A}, \vec{B}) = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \sqrt{\sum_{i=1}^{n} B_i^2}}$$
4. **Ranking Output**: Mengembalikan daftar ID kandidat terurut dari persentase skor tertinggi ke terendah sebagai bahan pertimbangan UMKM.

---

# BAB 5 — IMPLEMENTATION PLAN

## 5.1 Keputusan Tumpukan Teknologi (Technology Stack Decision)

##### Tabel 5.1 Keputusan Tumpukan Teknologi Proyek SkillBridge Hub
| Lapisan Sistem | Pilihan Teknologi Utama | Peruntukan Teknis |
| :--- | :--- | :--- |
| **Framework Web & Backend**| **Laravel v11.x (PHP 8.2+)** | Core application handling (Routing, Auth, Business Logic, Eloquent ORM, Controller). |
| **Frontend & Template Engine**| **Laravel Blade (HTML, CSS, JS)**| Server-rendered user interface dengan penataan gaya CSS modern dan Vanilla JS interaktif. |
| **Basis Data Relasional** | **Supabase PostgreSQL** | Managed cloud relational database untuk seluruh data aplikasi. |
| **Penyimpanan Berkas** | **Supabase Storage** | Penyimpanan cloud untuk file resume PDF mahasiswa dan dokumen pendukung. |
| **Layanan NLP / SkillMatch** | **FastAPI (Python 3.10+)** | Microservice mandiri untuk komputasi TF-IDF dan Cosine Similarity. |
| **Pustaka Data Science** | **Scikit-learn, Pandas, NumPy**| Library machine learning/NLP untuk ekstraksi fitur teks dan kalkulasi kemiripan. |
| **Keamanan & Autentikasi** | **Laravel Auth, CSRF, Bcrypt** | Sistem autentikasi bawaan Laravel, token proteksi CSRF, dan hashing kata sandi. |
| **Version Control** | **Git & GitHub** | Manajemen kode sumber mandiri dan pelacakan riwayat perubahan. |
| **Target Deployment** | **Web Hosting / VPS & Cloud** | Rencana target lingkungan hosting aplikasi Laravel, FastAPI, dan Supabase. |

---

## 5.2 Rencana Implementasi Aplikasi Web Laravel & Blade

##### Tabel 5.2 Rencana Rute Web dan API Aplikasi Laravel
| Metode | Rute URL Web / API | Middleware / Akses | Fungsi Utama | Kategori |
| :---: | :--- | :---: | :--- | :---: |
| `GET/POST`| `/register`, `/login` | `guest` | Formulir pendaftaran akun multi-peran dan autentikasi sesi. | **MVP** |
| `POST` | `/logout` | `auth` | Mengakhiri sesi login pengguna. | **MVP** |
| `GET/PUT` | `/profile` | `auth` | Mengelola data profil keahlian dan unggah resume PDF ke Supabase Storage. | **MVP** |
| `GET` | `/projects` | Publik | Menampilkan katalog pencarian proyek dengan filter kategori. | **MVP** |
| `GET/POST`| `/projects/create` | `auth:umkm` | Menampilkan form dan mempublikasikan brief proyek baru. | **MVP** |
| `GET` | `/projects/{id}` | Publik | Menampilkan detail lengkap brief proyek dan tombol lamar. | **MVP** |
| `POST` | `/projects/{id}/apply` | `auth:student` | Mengajukan lamaran proyek oleh mahasiswa. | **MVP** |
| `GET` | `/projects/{id}/candidates`| `auth:umkm` | Menampilkan daftar pelamar dengan ranking kecocokan dari FastAPI. | **Core** |
| `POST` | `/applications/{id}/accept`| `auth:umkm` | Menerima kandidat dan menginisialisasi Workspace otomatis. | **MVP** |
| `GET` | `/workspaces/{id}` | `auth:workspace` | Menampilkan dasbor ruang kerja bersama dan daftar tugas. | **MVP** |
| `POST` | `/workspaces/{id}/tasks` | `auth:workspace` | Menambahkan item tugas milestone baru. | **Core** |
| `PATCH`| `/tasks/{id}/toggle` | `auth:workspace` | Mengubah status selesai tugas dan memperbarui progres otomatis. | **Core** |
| `POST` | `/workspaces/{id}/complete`| `auth:umkm` | Menyetujui luaran akhir dan menyelesaikan proyek. | **Core** |
| `POST` | `/reviews` | `auth` | Menyimpan rating ulasan timbal balik dan memperbarui skor portofolio. | **Core** |
| `GET` | `/admin/dashboard` | `auth:admin` | Menampilkan dasbor statistik ringkasan dan audit log platform. | **Core** |

---

## 5.3 Rencana Implementasi Basis Data Supabase PostgreSQL
1. **Konfigurasi Koneksi**: Mengonfigurasi file `.env` Laravel untuk terhubung ke Supabase PostgreSQL:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=aws-0-ap-southeast-1.pooler.supabase.com
   DB_PORT=5432
   DB_DATABASE=postgres
   DB_USERNAME=postgres.your_project_id
   DB_PASSWORD=your_secure_password
   ```
2. **Migrasi Laravel**: Menjalankan migrasi database via Artisan CLI:
   ```bash
   php artisan migrate
   ```
3. **Penyemaian Data Awal**: Menjalankan `php artisan db:seed` untuk mengisi kategori standar proyek dan akun percontohan.

---

## 5.4 Rencana Implementasi Layanan SkillMatch Engine FastAPI

##### Tabel 5.3 Spesifikasi Kontrak REST API Layanan FastAPI SkillMatch Engine
| Parameter | Rincian Spesifikasi Endpoint |
| :--- | :--- |
| **Endpoint URL** | `POST /match` |
| **Content-Type** | `application/json` |
| **Format Request JSON** | ```json
{
  "project_requirements": "Dibutuhkan mahasiswa yang menguasai Laravel, Blade, PostgreSQL, dan desain antarmuka responsif...",
  "required_skills": ["Laravel", "PHP", "PostgreSQL", "HTML/CSS"],
  "candidates": [
    {
      "candidate_id": 1,
      "candidate_name": "Ahmad Dhafin",
      "profile_text": "Mahasiswa Sistem Informasi dengan keahlian Laravel, PHP, PostgreSQL, CSS, dan FastAPI..."
    }
  ]
}
``` |
| **Format Response JSON** | ```json
{
  "status": "success",
  "total_candidates": 1,
  "rankings": [
    {
      "candidate_id": 1,
      "match_score": 87.5,
      "rank": 1
    }
  ]
}
``` |

---

## 5.5 Rencana Integrasi Sistem (Laravel ke FastAPI & Supabase)
1. **Komunikasi Laravel ke FastAPI**: Laravel menggunakan *HTTP Client* bawaan (Guzzle wrapper) untuk memanggil service FastAPI secara asinkron tanpa menggunakan fungsi `exec()`:
   ```php
   $response = Http::timeout(5)->post(env('FASTAPI_MATCH_URL') . '/match', [
       'project_requirements' => $project->description,
       'required_skills' => $project->required_skills,
       'candidates' => $candidatesData,
   ]);
   $rankings = $response->json()['rankings'];
   ```
2. **Komunikasi Laravel ke Supabase Storage**: Mengunggah file resume menggunakan Supabase Storage REST API / SDK PHP untuk memperoleh URL berkas publik yang disimpan pada kolom `resume_url`.

---

## 5.6 Rencana Manajemen Kode Sumber (Version Control Plan)
Pengembangan mandiri menggunakan alur kerja cabang fitur sederhana:

```text
main (Cabang Utama Stabil)
│
├── feature/laravel-auth-profile
├── feature/project-marketplace
├── feature/fastapi-skillmatch
├── feature/workspace-milestone
└── feature/review-and-admin
```
#### Gambar 5.1 Diagram Strategi Percabangan Git Alur Kerja Mandiri

---

# BAB 6 — TESTING AND QUALITY ASSURANCE PLAN

## 6.1 Strategi Pengujian (Testing Strategy)
Strategi pengujian kualitas perangkat lunak direncanakan menggunakan pendekatan bertingkat:
1. **Pengujian Unit & NLP**: Menguji fungsi preprocessing teks, tokenisasi, vektorisasi TF-IDF, dan perhitungan Cosine Similarity pada Python.
2. **Pengujian Integrasi**: Menguji komunikasi HTTP antara controller Laravel dan endpoint FastAPI serta pengunggahan file ke Supabase Storage.
3. **Pengujian Fungsional (Black-Box)**: Menguji seluruh alur kerja fitur pada antarmuka web Laravel Blade.
4. **Pengujian Penerimaan Pengguna (UAT)**: Evaluasi kemudahan operasional oleh pengguna representatif.

```
                     / \
                    /   \
                   / UAT \  ──▶ Rencana Evaluasi Pengguna Representatif
                  /───────\
                 /  Integ  \ ──▶ Rencana Pengujian Integrasi Laravel ↔ FastAPI ↔ Supabase
                /───────────\
               /  Unit & NLP \ ──▶ Rencana Pengujian Preprocessing Teks & Cosine Similarity
              /───────────────\
```
#### Gambar 6.1 Piramida Pengujian Kualitas Perangkat Lunak

---

## 6.2 Rencana Kasus Uji Fungsional (Functional Test Cases Plan)

##### Tabel 6.1 Matriks Rencana Kasus Uji Fungsional Sistem (Functional Test Plan)
| Kode Uji | Fitur yang Diuji | Skenario Kasus Pengujian | Hasil yang Diharapkan | Status Rencana |
| :---: | :--- | :--- | :--- | :---: |
| **TC-01** | Registrasi Akun | Mendaftar akun baru dengan data lengkap dan peran STUDENT/UMKM. | Akun tersimpan di PostgreSQL, password terenkripsi Bcrypt, redirect sukses. | **Planned** |
| **TC-02** | Validasi Email Duplikat | Mendaftar menggunakan email yang sudah terdaftar. | Sistem menampilkan pesan error validasi email sudah digunakan. | **Planned** |
| **TC-03** | Login Berhasil | Memasukkan email dan password yang sesuai. | Sesi autentikasi aktif, redirect ke halaman dashboard peran. | **Planned** |
| **TC-04** | Login Kredensial Salah | Memasukkan kata sandi yang salah. | Sistem menolak autentikasi dan menampilkan pesan kredensial tidak cocok. | **Planned** |
| **TC-05** | Unggah Resume PDF | Mahasiswa mengunggah berkas resume PDF pada halaman profil. | Berkas tersimpan di Supabase Storage dan link URL tercatat di database. | **Planned** |
| **TC-06** | Publikasi Brief Proyek | UMKM mengisi brief proyek dan required skills lalu mempublikasikannya. | Proyek tersimpan dengan status `PUBLISHED` dan tampil di katalog. | **Planned** |
| **TC-07** | Pencarian Katalog | Mencari proyek berdasarkan kata kunci dan kategori tertentu. | Daftar proyek terfilter sesuai kriteria yang dipilih. | **Planned** |
| **TC-08** | Pengajuan Lamaran | Mahasiswa menekan tombol apply pada proyek terbuka. | Record lamaran tersimpan dengan status `PENDING` di PostgreSQL. | **Planned** |
| **TC-09** | Pencegahan Lamaran Ganda| Mahasiswa melamar kembali pada proyek yang sama. | Sistem menolak lamaran dan menampilkan peringatan sudah pernah melamar. | **Planned** |
| **TC-10** | Ranking SkillMatch | UMKM membuka halaman pelamar proyek. | FastAPI menghitung kesesuaian dan menampilkan ranking pelamar terurut. | **Planned** |
| **TC-11** | Penerimaan Kandidat | UMKM menerima kandidat dari daftar ranking pelamar. | Status lamaran menjadi `ACCEPTED` dan Workspace terbuat otomatis. | **Planned** |
| **TC-12** | Checklist Tugas | Mahasiswa mencentang tugas selesai di workspace. | Status tugas berubah selesai dan progress bar workspace terhitung otomatis. | **Planned** |
| **TC-13** | Penyerahan Luaran | Mahasiswa menyerahkan tautan/dokumen luaran akhir di workspace. | Tautan luaran tersimpan dan notifikasi verifikasi terkirim ke UMKM. | **Planned** |
| **TC-14** | Penyelesaian Proyek | UMKM menyetujui hasil kerja dan menyelesaikan proyek. | Status workspace dan proyek berubah `COMPLETED`, form review terbuka. | **Planned** |
| **TC-15** | Ulasan Dua Arah | Mahasiswa dan UMKM saling mengisi rating bintang dan ulasan. | Review tersimpan di database dan skor portofolio mahasiswa bertambah. | **Planned** |
| **TC-16** | Moderasi Proyek Admin | Admin mengubah status publikasi proyek yang melanggar ketentuan. | Status proyek dinonaktifkan dan tercatat pada tabel audit log. | **Planned** |

---

## 6.3 Rencana Pengujian Integrasi & Algoritma NLP SkillMatch

##### Tabel 6.2 Matriks Rencana Kasus Uji Integrasi & Pemrosesan NLP SkillMatch
| Kode Uji | Komponen yang Diuji | Skenario Pengujian Khusus | Kriteria Keberhasilan | Status |
| :---: | :--- | :--- | :--- | :---: |
| **IT-01** | **Text Preprocessing** | Memasukkan teks kualifikasi proyek dengan huruf kapital, tanda baca, dan stopwords. | Teks terkonversi huruf kecil, bersih dari simbol, dan token terpisah rapi. | **Planned** |
| **IT-02** | **TF-IDF Vectorization** | Mengekstrak matriks bobot istilah dari korpus teks profil mahasiswa dan requirement. | Vektor numerik TF-IDF terbentuk dengan dimensi fitur yang valid. | **Planned** |
| **IT-03** | **Cosine Similarity Calc** | Menghitung kemiripan antara dua vektor teks dengan keahlian yang identik vs berbeda total. | Nilai similarity berkisar antara 0.0 s/d 1.0 (identik $\approx 1.0$, berbeda $\approx 0.0$). | **Planned** |
| **IT-04** | **Candidate Ranking Sort** | Mengirimkan 5 data kandidat dengan variasi tingkat relevansi keahlian. | FastAPI mengembalikan daftar kandidat terurut dari skor terbesar ke terkecil. | **Planned** |
| **IT-05** | **Laravel $\leftrightarrow$ FastAPI** | Laravel memanggil endpoint `POST /match` via HTTP client. | Laravel menerima respons JSON status 200 dalam waktu $\le 2\text{ detik}$. | **Planned** |
| **IT-06** | **Supabase Storage Upload**| Mengunggah file resume PDF berukuran 2 MB dari form Laravel. | File tersimpan di storage bucket dan dapat diunduh via public URL. | **Planned** |

---

## 6.4 Rencana Pengujian Penerimaan Pengguna (User Acceptance Testing / UAT Plan)
- **Target Partisipan**: UAT direncanakan melibatkan pengguna representatif dari kelompok mahasiswa (target awal minimal 5 responden) dan mitra UMKM (target awal minimal 3 responden).
- **Metode Pengujian**: Responden diberikan panduan skenario tugas (*task scenarios*) untuk mencoba alur registrasi, unggah resume, publikasi brief proyek, melihat ranking kandidat SkillMatch, interaksi workspace, hingga pengisian ulasan.
- **Kriteria Keberhasilan UAT**: Rata-rata tingkat kepuasan pengguna (*User Satisfaction*) mencapai $\ge 80\%$ dan alur utama berjalan lancar tanpa kendala fatal.

---

## 6.5 Manajemen Defect dan Bug Perangkat Lunak (Bug Management Lifecycle)

```
[Bug Ditemukan] ──▶ [Analisis & Klasifikasi] ──▶ [Proses Perbaikan] ──▶ [Verifikasi & Ditutup]
```
#### Gambar 6.2 Alur Siklus Hidup Penanganan Bug (Bug Lifecycle)

##### Tabel 6.3 Panduan Klasifikasi Tingkat Keparahan Bug (Bug Severity & Priority)
| Tingkat Keparahan | Definisi Dampak | Prioritas Penanganan |
| :--- | :--- | :---: |
| **Blocker / Critical** | Error fatal server Laravel/FastAPI berhenti atau basis data tidak dapat diakses. | Segera ($\le 12\text{ Jam}$) |
| **Major** | Fitur utama terganggu (misal: proses ranking SkillMatch gagal, tugas tidak tersimpan). | Tinggi ($\le 24\text{ Jam}$) |
| **Minor** | Gangguan tampilan antarmuka Blade, layout bergeser, atau salah ketik teks (*typo*). | Sedang ($\le 48\text{ Jam}$) |

---

## 6.6 Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix)

##### Tabel 6.4 Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix / RTM)
| Kode Kebutuhan (FR) | Deskripsi Kebutuhan | Modul Terkait | Kategori | Rencana Kasus Uji |
| :---: | :--- | :--- | :---: | :---: |
| **FR-AUTH-01** | Registrasi Akun Multi-Peran | Modul Autentikasi Laravel | **MVP** | **TC-01, TC-02** |
| **FR-AUTH-02** | Login Berbasis Sesi & Middleware | Modul Autentikasi Laravel | **MVP** | **TC-03, TC-04** |
| **FR-PROF-01** | Pengelolaan Profil & Unggah Resume | Modul Profil Mahasiswa | **MVP** | **TC-05, IT-06** |
| **FR-PROF-02** | Pengelolaan Profil Usaha UMKM | Modul Profil UMKM | **MVP** | **TC-06** |
| **FR-PROJ-01** | Penerbitan Brief Proyek & Skills | Modul Proyek & Marketplace | **MVP** | **TC-06** |
| **FR-PROJ-02** | Katalog Pencarian dan Filter Proyek | Modul Proyek & Marketplace | **MVP** | **TC-07** |
| **FR-MATCH-01**| Pemrosesan NLP SkillMatch Engine | Layanan FastAPI Python | **Core** | **IT-01, IT-02, IT-03** |
| **FR-MATCH-02**| Pemeringkatan Kandidat Mahasiswa | Layanan FastAPI & Laravel | **Core** | **TC-10, IT-04, IT-05** |
| **FR-APP-01** | Pengajuan Lamaran Proyek Mahasiswa | Modul Lamaran Proyek | **MVP** | **TC-08, TC-09** |
| **FR-APP-02** | Seleksi dan Pemilihan Pelamar | Modul Lamaran Proyek | **MVP** | **TC-11** |
| **FR-WORK-01** | Inisiasi Otomatis Ruang Kerja Workspace | Modul Workspace Kolaboratif | **MVP** | **TC-11** |
| **FR-WORK-02** | Manajemen Checklist Tugas Milestone | Modul Workspace Kolaboratif | **Core** | **TC-12** |
| **FR-WORK-03** | Pelacakan Persentase Progres Dinamis | Modul Workspace Kolaboratif | **Core** | **TC-12** |
| **FR-WORK-04** | Penyerahan dan Validasi Luaran Kerja | Modul Workspace Kolaboratif | **Core** | **TC-13, TC-14** |
| **FR-REV-01** | Sistem Evaluasi Ulasan Dua Arah | Modul Review & Rating | **Core** | **TC-15** |
| **FR-REV-02** | Akumulasi Skor Portofolio Mahasiswa | Modul Review & Rating | **Core** | **TC-15** |
| **FR-ADM-01** | Dasbor Statistik Ringkasan Platform | Modul Administrator | **Core** | **TC-16** |
| **FR-ADM-02** | Manajemen Kategori & Moderasi Proyek | Modul Administrator | **Core** | **TC-16** |
| **FR-ADM-03** | Pencatatan Log Audit Keamanan | Modul Administrator | **Core** | **TC-16** |

---

# BAB 7 — DEPLOYMENT AND MAINTENANCE PLAN

## 7.1 Rencana Target Penerapan (Target Deployment Plan)
Untuk kebutuhan pengujian fungsional dan evaluasi akademik, rencana penerapan target dirancang sebagai berikut:
1. **Aplikasi Web Laravel**: Diterapkan pada Web Hosting / Cloud Application Platform (seperti VPS atau PaaS yang mendukung PHP 8.2+) dengan web server NGINX.
2. **Layanan SkillMatch Engine FastAPI**: Diterapkan sebagai service mandiri pada platform komputasi Python (seperti Render Web Service / VPS).
3. **Basis Data & Berkas Cloud**: Menggunakan **Supabase Managed PostgreSQL** dan **Supabase Storage** yang terhubung secara online dengan kredensial terenkripsi.
4. **Catatan Penerapan**: *Penyedia hosting spesifik (*Deployment Provider*) akan difinalisasi pada fase deployment berdasarkan kebutuhan biaya dan stabilitas jaringan.*

---

## 7.2 Rekomendasi Strategi Produksi Masa Depan (Recommended Production Strategy)
Jika sistem dikembangkan lebih lanjut untuk skala pengguna yang lebih luas, rekomendasi arsitektur produksi meliputi:
1. **Automated CI/CD Pipeline**: Menggunakan GitHub Actions untuk menjalankan pengetesan unit test PHPUnit dan pytest secara otomatis saat merge ke branch `main`.
2. **Containerization (Docker)**: Mengemas aplikasi Laravel dan FastAPI ke dalam container Docker terpisah untuk menjamin konsistensi lingkungan produksi.
3. **Caching & Queue Processing**: Memanfaatkan Redis untuk caching query katalog proyek dan mengantrekan kalkulasi data teks SkillMatch Engine yang besar (*background queue jobs*).

---

## 7.3 Rencana Keamanan dan Pencadangan Data (Security & Backup Plan)
1. **Pengamanan Kredensial**: Seluruh kunci rahasia (`APP_KEY`, `DB_PASSWORD`, `SUPABASE_KEY`) disimpan di file `.env` dan tidak diunggah ke repositori Git publik.
2. **Pencadangan Basis Data**: Memanfaatkan fitur pencadangan otomatis harian pada Supabase Managed PostgreSQL serta ekspor manual SQL berkala selama tahap pengembangan.
3. **Proteksi Unggah Berkas**: Membatasi format file yang diunggah mahasiswa (hanya PDF untuk resume dan JPG/PNG untuk logo) dengan batas ukuran maksimal 5 MB.

---

## 7.4 Rencana Pemeliharaan Sistem (Maintenance Plan)
1. **Pemantauan Log Galat**: Memeriksa file log Laravel (`storage/logs/laravel.log`) dan log service FastAPI secara rutin untuk mendeteksi kendala runtime.
2. **Pembaruan Paket Dependensi**: Memperbarui pustaka Composer dan dependensi Python secara berkala untuk menutup potensi celah keamanan.
3. **Optimalisasi Query Eloquent**: Menggunakan fitur *eager loading* (`with()`) pada Eloquent untuk mencegah masalah performa *N+1 query*.

---

## 7.5 Rencana Pengembangan Lanjutan (Future Enhancements)
1. **Integrasi Gerbang Pembayaran Terkelola (Escrow Payment Gateway)**: Integrasi Midtrans untuk menampung dana kompensasi stipend secara aman hingga luaran disetujui.
2. **Aplikasi Mobile (React Native / Flutter)**: Menghadirkan aplikasi mobile untuk mempermudah akses notifikasi dan perpesanan.
3. **Automated Skill Assessment Sandbox**: Mini-kuis atau uji koding otomatis untuk memvalidasi keahlian teknis mahasiswa.

---

# BAB 8 — RISK MANAGEMENT

## 8.1 Identifikasi Risiko Teknis (Technical Risks)
1. **Kualitas dan Variasi Format Resume (*Resume Data Quality*)**: Format berkas resume yang tidak seragam (misal: format non-standar atau teks minim) yang dapat memengaruhi akurasi ekstraksi teks.
2. **Inkonsistensi Istilah Keahlian (*Skill Terminology Inconsistency*)**: Perbedaan penulisan istilah keahlian (misal: "JS" vs "JavaScript", "Golang" vs "Go") yang berpotensi menghasilkan skor similarity yang lebih rendah dari sebenarnya.
3. **Ketersediaan Layanan FastAPI (*Service Availability*)**: Kemungkinan service FastAPI mengalami downtime atau timeout saat menerima permintaan kalkulasi dari Laravel.
4. **Batasan Kuota Layanan Supabase (*Supabase Service Limits*)**: Keterbatasan kuota bandwidth atau kapasitas penyimpanan pada tingkatan gratis (*free tier*).

---

## 8.2 Identifikasi Risiko Proyek (Project Risks)
1. **Keterbatasan Waktu Pengembangan Mandiri**: Waktu pengembangan yang terbatas untuk menyelesaikan integrasi fullstack Laravel, Supabase, dan FastAPI secara mandiri.
2. **Perubahan Ruang Lingkup Kebutuhan (*Scope Creep*)**: Penambahan fitur baru di tengah jalan yang dapat mengganggu jadwal rilis utama.
3. **Keterbatasan Partisipan Pengujian**: Tantangan dalam merekrut pengguna representatif untuk pengujian UAT pada fase akhir.

---

## 8.3 Matriks Mitigasi dan Penanganan Risiko (Risk Mitigation Plan)

##### Tabel 8.1 Matriks Analisis, Pemilik, dan Rencana Mitigasi Risiko
| Kode Risiko | Deskripsi Risiko | Probabilitas | Dampak | Level Risiko | Penanggung Jawab (*Risk Owner*) | Strategi Mitigasi dan Rencana Kontinjensi |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **TR-01** | Kualitas Teks Resume Tidak Seragam | Sedang | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menyediakan formulir pengisian daftar keahlian terstruktur (*structured skill tags*) pada profil mahasiswa selain unggah PDF sebagai data teks primer untuk diproses oleh modul NLP. |
| **TR-02** | Inkonsistensi Istilah Keahlian (*Synonym Bias*) | Sedang | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menerapkan normalisasi teks pada tahap preprocessing dan memanfaatkan daftar padanan kata kunci keahlian umum (misal: "JS" $\to$ "JavaScript"). |
| **TR-03** | Gangguan Koneksi Service FastAPI | Rendah | Tinggi | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menerapkan mekanisme penanganan error (*try-catch*) pada Laravel dan menyediakan *fallback matching algorithm* sederhana berbasis pencocokan kata kunci langsung di PHP jika service FastAPI mengalami timeout. |
| **TR-04** | Batasan Kapasitas Supabase Free Tier | Rendah | Sedang | **Rendah** | Ahmad Dhafin Al Farisy *(Project Developer)* | Membatasi ukuran maksimal file resume ($\le 2\text{ MB}$) dan mengompresi data sebelum diunggah ke storage bucket. |
| **PR-01** | Keterbatasan Waktu Solo Development | Sedang | Tinggi | **Tinggi** | Ahmad Dhafin Al Farisy *(Project Developer)* | Memprioritaskan penyelesaian fitur MVP (Fase 1) dan Core (Fase 2) serta menunda fitur lanjutan (Future) ke rilis berikutnya. |
| **PR-02** | Perubahan Ruang Lingkup (*Scope Creep*) | Sedang | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menerapkan kontrol perubahan rencana kerja formal; fitur baru di luar spesifikasi awal dicatat pada daftar *future enhancements*. |
| **PR-03** | Keterbatasan Partisipan UAT | Sedang | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menyiapkan data awal percontohan (*seed data*) yang lengkap dan realistis untuk mempermudah simulasi alur kerja oleh partisipan uji. |

---

<br>

**Ditetapkan di**: Surabaya, Jawa Timur  
**Tanggal**: 1 September 2026  
**Disahkan Oleh**: Ahmad Dhafin Al Farisy *(Pengembang Mandiri SkillBridge Hub)*  

*(Dokumen ini disusun sebagai pedoman teknis dan operasional resmi dalam pelaksanaan seluruh siklus rekayasa perangkat lunak SkillBridge Hub).*
