# DOKUMEN PERENCANAAN PENGEMBANGAN PERANGKAT LUNAK
## (SOFTWARE DEVELOPMENT PLANNING DOCUMENT)

---

# SISTEM INFORMASI KOLABORASI PROYEK AKADEMIK DAN UMKM BERBASIS KECERDASAN BUATAN
## (SkillBridge Hub: Intelligent Academic & Industry Project Collaboration Platform)

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
  - [1.6 Ruang Lingkup & Kategorisasi Fitur (MVP, Core, Future)](#16-ruang-lingkup--kategorisasi-fitur-mvp-core-future)
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
  - [4.1 Perencanaan Arsitektur Sistem (High-Level 3-Tier Architecture)](#41-perencanaan-arsitektur-sistem-high-level-3-tier-architecture)
  - [4.2 Perancangan Alur Proses Bisnis (Business Process & BPMN)](#42-perancangan-alur-proses-bisnis-business-process--bpmn)
  - [4.3 Perancangan Use Case dan Skenario (Use Case Plan & Scenarios)](#43-perancangan-use-case-dan-skenario-use-case-plan--scenarios)
  - [4.4 Perancangan Basis Data Tingkat Tinggi (Database Design Plan)](#44-perancangan-basis-data-tingkat-tinggi-database-design-plan)
  - [4.5 Perancangan Modul Frontend (Frontend Modular Plan)](#45-perancangan-modul-frontend-frontend-modular-plan)
  - [4.6 Perancangan Modul Backend (Backend Service Plan)](#46-perancangan-modul-backend-backend-service-plan)
- [BAB 5 — IMPLEMENTATION PLAN](#bab-5--implementation-plan)
  - [5.1 Keputusan Tumpukan Teknologi (Technology Stack Decision)](#51-keputusan-tumpukan-teknologi-technology-stack-decision)
  - [5.2 Rencana Implementasi Antarmuka (Frontend Plan)](#52-rencana-implementasi-antarmuka-frontend-plan)
  - [5.3 Rencana Implementasi Layanan Backend & Kontrak API](#53-rencana-implementasi-layanan-backend--kontrak-api)
  - [5.4 Rencana Implementasi Basis Data (Database Plan)](#54-rencana-implementasi-basis-data-database-plan)
  - [5.5 Rencana Integrasi Mesin Rekomendasi AI (AI Integration Plan)](#55-rencana-integrasi-mesin-rekomendasi-ai-ai-integration-plan)
  - [5.6 Rencana Manajemen Kode Sumber (Version Control Plan)](#56-rencana-manajemen-kode-sumber-version-control-plan)
- [BAB 6 — TESTING AND QUALITY ASSURANCE PLAN](#bab-6--testing-and-quality-assurance-plan)
  - [6.1 Strategi Pengujian (Testing Strategy)](#61-strategi-pengujian-testing-strategy)
  - [6.2 Rencana Kasus Uji Fungsional (Functional Test Cases Plan)](#62-rencana-kasus-uji-fungsional-functional-test-cases-plan)
  - [6.3 Rencana Pengujian Integrasi (Integration Test Plan)](#63-rencana-pengujian-integrasi-integration-test-plan)
  - [6.4 Rencana Pengujian Penerimaan Pengguna (User Acceptance Testing / UAT Plan)](#64-rencana-pengujian-penerimaan-pengguna-user-acceptance-testing--uat-plan)
  - [6.5 Manajemen Defect dan Bug Perangkat Lunak (Bug Management Lifecycle)](#65-manajemen-defect-dan-bug-perangkat-lunak-bug-management-lifecycle)
  - [6.6 Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix)](#66-matriks-penelusuran-kebutuhan-requirement-traceability-matrix)
- [BAB 7 — DEPLOYMENT AND MAINTENANCE PLAN](#bab-7--deployment-and-maintenance-plan)
  - [7.1 Rencana Deployment Saat Ini (Current Deployment Plan)](#71-rencana-deployment-saat-ini-current-deployment-plan)
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
- **Tabel 2.2** Matriks Peran Pengguna dan Hak Akses Sistem
- **Tabel 2.3** Matriks Spesifikasi Kebutuhan Fungsional (Functional Requirements)
- **Tabel 2.4** Matriks Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **Tabel 2.5** Spesifikasi Kebutuhan Lingkungan Pengembangan (Development Environment)
- **Tabel 2.6** Spesifikasi Kebutuhan Lingkungan Penerapan Target (Target Deployment)
- **Tabel 3.1** Pembagian Peran dan Tanggung Jawab dalam Solo Development
- **Tabel 3.2** Rencana Pembagian Tahapan Siklus Pengembangan Iteratif
- **Tabel 3.3** Daftar Tonggak Pencapaian Proyek (Project Milestones)
- **Tabel 3.4** Rincian Luaran Proyek Perangkat Lunak (Deliverables)
- **Tabel 4.1** Skenario Use Case: Pendaftaran dan Pengelolaan Profil Pengguna
- **Tabel 4.2** Skenario Use Case: Penerbitan Brief Proyek oleh Mitra UMKM
- **Tabel 4.3** Skenario Use Case: Pengajuan Lamaran Proyek dan Analisis Rekomendasi AI
- **Tabel 4.4** Skenario Use Case: Seleksi Pelamar dan Inisiasi Workspace Kolaboratif
- **Tabel 4.5** Skenario Use Case: Pengelolaan Tugas Milestone dan Pelacakan Progres
- **Tabel 4.6** Skenario Use Case: Penyerahan Luaran Proyek dan Evaluasi Ulasan Dua Arah
- **Tabel 4.7** Kamus Data Rencana Entitas Basis Data Relasional SkillBridge
- **Tabel 5.1** Keputusan Tumpukan Teknologi Proyek SkillBridge Hub
- **Tabel 5.2** Rencana Endpoint RESTful API Backend
- **Tabel 6.1** Matriks Rencana Kasus Uji Fungsional Sistem (Functional Test Plan)
- **Tabel 6.2** Matriks Rencana Kasus Uji Integrasi Antar-Modul
- **Tabel 6.3** Panduan Klasifikasi Tingkat Keparahan Bug (Bug Severity & Priority)
- **Tabel 6.4** Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix / RTM)
- **Tabel 8.1** Matriks Analisis, Pemilik, dan Rencana Mitigasi Risiko

---

# DAFTAR GAMBAR

- **Gambar 3.1** Diagram Alur Kerja Metodologi Agile Iterative / Sprint-Based
- **Gambar 3.2** Visualisasi Tahapan Pengembangan Iteratif (Gantt Chart)
- **Gambar 4.1** Diagram Konsep Arsitektur Tiga Lapis (High-Level 3-Tier Architecture)
- **Gambar 4.2** BPMN Alur Proses Bisnis Kolaborasi Proyek Terpadu
- **Gambar 4.3** Use Case Diagram Sistem Informasi SkillBridge Hub
- **Gambar 4.4** Entity Relationship Diagram (ERD) Basis Data Relasional
- **Gambar 5.1** Diagram Strategi Percabangan Git Alur Kerja Mandiri
- **Gambar 6.1** Piramida Pengujian Kualitas Perangkat Lunak
- **Gambar 6.2** Alur Siklus Hidup Penanganan Bug (Bug Lifecycle)

---

# BAB 1 — PROJECT OVERVIEW

## 1.1 Latar Belakang (Background)
Integrasi antara dunia akademik dan sektor industri riil merupakan aspek fundamental dalam mempersiapkan lulusan perguruan tinggi agar memiliki keterampilan praktis yang relevan dengan kebutuhan pasar kerja. Mahasiswa dituntut tidak hanya menguasai teori formal di ruang perkuliahan, tetapi juga memiliki pengalaman pengerjaan proyek nyata yang dapat dibuktikan melalui portofolio terpercaya. Di sisi lain, sektor Usaha Mikro, Kecil, dan Menengah (UMKM) sering menghadapi kendala dalam melakukan digitalisasi bisnis—seperti pembuatan landing page, pengelolaan media sosial, perancangan antarmuka pengguna, maupun branding produk—akibat keterbatasan anggaran operasional dan akses ke tenaga profesional.

Kondisi eksisting menunjukkan bahwa proses kolaborasi antara mahasiswa dan UMKM masih berlangsung secara informal dan terfragmentasi. Mahasiswa kesulitan menemukan mitra usaha yang membutuhkan keahlian mereka secara transparan, sedangkan pemilik UMKM kesulitan menyaring pelamar secara manual karena keterbatasan waktu dan latar belakang teknis. Selain itu, pengerjaan proyek sering kali tidak memiliki ruang pemantauan kemajuan yang terstruktur sehingga rawan terjadi keterlambatan atau ketidaksesuaian hasil akhir. Di akhir proyek, mahasiswa juga jarang mendapatkan rekam jejak formal yang dapat divalidasi oleh pihak luar.

Untuk menjawab permasalahan tersebut, dirancang sistem informasi **SkillBridge Hub**. Platform web ini bertujuan menghubungkan mahasiswa pencari proyek industri dengan UMKM yang membutuhkan solusi digitalisasi melalui mekanisme rekomendasi berbasis kecerdasan buatan, ruang kerja kolaboratif terstruktur, dan sistem evaluasi portofolio terverifikasi.

## 1.2 Rumusan Masalah (Problem Statement)
Rumusan masalah utama yang ditangani dalam proyek rekayasa perangkat lunak ini adalah:
1. **Ketidaksesuaian Kualifikasi Pelamar dan Kebutuhan Proyek**: UMKM kesulitan mencocokkan keterampilan teknis mahasiswa pelamar dengan kualifikasi pekerjaan yang dibutuhkan.
2. **Inefisiensi Seleksi Kandidat**: Kurasi pelamar secara manual membutuhkan waktu lama dan rawan menghasilkan keputusan yang kurang tepat.
3. **Ketiadaan Media Kolaborasi dan Pelacakan Terpusat**: Kurangnya wadah terpadu untuk memantau tahapan pengerjaan tugas, tenggat waktu, dan penyerahan hasil kerja antara mahasiswa dan UMKM.
4. **Minimnya Mekanisme Validasi Portofolio**: Mahasiswa kesulitan membuktikan keabsahan pengalaman kerja nyata kepada pihak industri karena ketiadaan rekam jejak dan ulasan terverifikasi.
5. **Komunikasi yang Terpencar**: Koordinasi proyek sering dilakukan di luar platform tanpa dokumentasi riwayat pengerjaan yang rapi.

## 1.3 Solusi yang Diusulkan (Proposed Solution)
Solusi yang diusulkan melalui platform **SkillBridge Hub** meliputi:
1. **Modul Rekomendasi Kecerdasan Buatan (AI Matchmaking Engine)**: Memanfaatkan model Large Language Model (Google Gemini 2.5 Flash API) untuk menganalisis kecocokan profil keterampilan mahasiswa terhadap deskripsi brief proyek, menghasilkan persentase kecocokan dan analisis kesesuaian sebagai *decision support* bagi UMKM.
2. **Manajemen Profil dan Keahlian Mahasiswa**: Menyediakan wadah terstruktur bagi mahasiswa untuk mencantumkan keterampilan teknis, institusi asal, sertifikat, dan rekam jejak portofolio.
3. **Katalog Marketplace Proyek**: Antarmuka terpusat bagi UMKM untuk menerbitkan kebutuhan digitalisasi dan bagi mahasiswa untuk mencari proyek sesuai kategori, durasi, dan stipend.
4. **Ruang Kerja Kolaboratif (Workspace)**: Ruang kerja bersama yang terinisialisasi otomatis saat lamaran disetujui, dilengkapi daftar tugas (*task checklist*), pelacakan persentase progres dinamis, dan form penyerahan luaran (*deliverables*).
5. **Sistem Ulasan Dua Arah (Two-Way Review)**: Fitur penilaian dan umpan balik timbal balik di akhir proyek yang memengaruhi akumulasi skor portofolio mahasiswa.
6. **Modul Pengelolaan Administrator**: Dasbor analitik ringkasan platform, moderasi kategori/proyek, dan pencatatan audit log aktivitas.

## 1.4 Tujuan Proyek (Project Objectives)
Tujuan dari perencanaan dan pengembangan perangkat lunak SkillBridge Hub adalah:
1. Merancang dan mengimplementasikan sistem informasi berbasis web fullstack menggunakan tumpukan teknologi modern (React 19, Express.js 5, TypeScript, Prisma ORM, dan MySQL).
2. Mengembangkan mekanisme rekomendasi berbasis kecerdasan buatan yang mampu membantu mengevaluasi tingkat kecocokan antara profil mahasiswa dan kebutuhan proyek secara otomatis dalam waktu respons yang wajar.
3. Membangun ruang kerja kolaboratif yang memudahkan mahasiswa dan UMKM dalam mengelola daftar tugas milestone dan memantau kemajuan proyek secara transparan.
4. Menyediakan sistem reputasi portofolio digital mahasiswa yang terverifikasi berdasarkan hasil evaluasi kerja nyata dari mitra usaha.
5. Menerapkan sistem kontrol akses berbasis peran (RBAC) yang aman menggunakan otentikasi JSON Web Token (JWT) dan validasi masukan skema Zod.

## 1.5 Manfaat Proyek (Benefits)
1. **Bagi Mahasiswa**: Memperoleh akses ke proyek industri nyata, mengasah kemampuan profesional, dan membangun portofolio kredibel yang terbukti di lapangan.
2. **Bagi Mitra UMKM**: Mempercepat proses penemuan talenta muda yang kompeten untuk membantu digitalisasi usaha dengan biaya yang terjangkau.
3. **Bagi Institusi Pendidikan**: Membantu mendukung program kemitraan industri dan mempermudah dokumentasi karya praktis mahasiswa.
4. **Bagi Pengembang**: Menguji kemampuan rekayasa perangkat lunak secara *end-to-end* mulai dari analisis, perancangan, pengkodean fullstack, hingga pengujian sistem.

## 1.6 Ruang Lingkup & Kategorisasi Fitur (MVP, Core, Future)
Untuk menjamin ketercapaian pengembangan secara realistis dalam skema pengembang mandiri, seluruh fitur sistem dikelompokkan ke dalam tiga tingkatan prioritas:

##### Tabel 1.1 Matriks Pengelompokan Fitur Sistem (MVP, Core, Future Enhancements)
| Kelompok Fitur | Nama Fitur / Modul | Deskripsi Lingkup Fungsional | Target Rilis |
| :--- | :--- | :--- | :---: |
| **1. MVP (Minimum Viable Product)** | **Autentikasi & Akun** | Registrasi peran Mahasiswa & UMKM, Login berbasis JWT, dan penyimpanan sesi aman. | Fase 1 |
| | **Profil Pengguna Dasar** | Profil Mahasiswa (keahlian, institusi) dan Profil UMKM (data usaha, kontak). | Fase 1 |
| | **Katalog Proyek** | Publikasi brief proyek oleh UMKM dan pencarian proyek dengan filter kategori. | Fase 1 |
| | **Pengajuan Lamaran** | Form lamaran proyek (*apply*) oleh mahasiswa (1 lamaran per proyek). | Fase 1 |
| | **Inisiasi Workspace Dasar** | Penerimaan pelamar oleh UMKM yang otomatis memicu pembuatan entitas workspace bersama. | Fase 1 |
| **2. Core Features (Fitur Utama Kolaborasi)** | **AI Matchmaking Engine** | Analisis rekomendasi kecocokan pelamar terhadap proyek via Gemini AI (*Decision Support*). | Fase 2 |
| | **Milestone & Task Checklist** | Pembuatan checklist tugas, penetapan batas waktu, dan kalkulasi persentase progres dinamis. | Fase 2 |
| | **Penyerahan Deliverables** | Pengunggahan tautan hasil kerja akhir proyek dan validasi persetujuan oleh UMKM. | Fase 2 |
| | **Two-Way Review & Scoring** | Penilaian rating bintang (1-5) timbal balik dan kalkulasi penambahan skor portofolio. | Fase 2 |
| | **Perpesanan & Notifikasi** | Pesan langsung antaranggota workspace aktif dan laci pemberitahuan status. | Fase 2 |
| | **Dasbor Tata Kelola Admin** | Metrik statistik platform, moderasi kategori proyek, dan pencatatan audit log aktivitas. | Fase 2 |
| **3. Future Enhancements (Lanjutan)** | **Payment Gateway Escrow** | Penampungan dana stipend terintegrasi (Midtrans) dengan rilis dana pasca-persetujuan kerja. | Fase 3 |
| | **Aplikasi Mobile Native** | Aplikasi Android/iOS menggunakan React Native / Flutter. | Fase 3 |
| | **Automated Skill Assessment** | Uji kompetensi teknis otomatis (coding test) untuk validasi keahlian mahasiswa. | Fase 3 |
| | **Video Conference Terintegrasi** | Modul panggilan video langsung di dalam workspace menggunakan WebRTC. | Fase 3 |

## 1.7 Asumsi Proyek (Project Assumptions)
1. Pengguna (Mahasiswa dan UMKM) memiliki perangkat komputer/smartphone dengan koneksi internet dan peramban web modern.
2. Mitra UMKM menyediakan informasi deskripsi kebutuhan proyek secara jelas dan objektif.
3. Layanan eksternal Google Gemini API dapat diakses dengan stabil selama proses pengujian dan demonstrasi.
4. Pengguna mengisi informasi profil keahlian dan profil usaha secara akurat.

## 1.8 Batasan Proyek (Project Constraints)
1. **Batasan Sumber Daya**: Proyek dikembangkan secara mandiri oleh satu orang pengembang (*Solo Developer*).
2. **Batasan Waktu**: Jadwal pengembangan diselesaikan dalam durasi kalender perkuliahan satu semester.
3. **Batasan Biaya**: Infrastruktur hosting dan basis data memprioritaskan paket *free/hobby tier* yang efisien.
4. **Batasan Platform**: Sistem difokuskan sebagai *Responsive Web Application* tanpa aplikasi mobile native pada rilis awal.

---

# BAB 2 — SOFTWARE REQUIREMENTS

## 2.1 Pemangku Kepentingan (Stakeholders)

##### Tabel 2.1 Matriks Analisis Pemangku Kepentingan (Stakeholder Analysis)
| ID | Pemangku Kepentingan | Peran dalam Sistem | Kepentingan & Kebutuhan |
| :---: | :--- | :--- | :--- |
| **SH-01** | **Mahasiswa (Talenta)** | Pengguna Utama | Mencari proyek industri nyata, mengunggah keahlian, berkolaborasi dalam workspace, dan membangun portofolio terverifikasi. |
| **SH-02** | **Mitra UMKM** | Pengguna Utama | Menerbitkan brief kebutuhan digitalisasi, menyeleksi pelamar dengan bantuan rekomendasi AI, memantau tugas, dan menilai hasil kerja. |
| **SH-03** | **Administrator** | Pengelola Platform | Memantau statistik kesehatan sistem, mengelola kategori proyek, memoderasi konten, dan memeriksa catatan aktivitas keamanan. |
| **SH-04** | **Dosen / Evaluator Akademik** | Pengawas & Penilai | Menilai kualitas perancangan sistem informasi, metodologi pengembangan, dan luaran teknis proyek perangkat lunak. |
| **SH-05** | **Pengembang Mandiri** | Rekayasawan Sistem | Merancang arsitektur, mengimplementasikan kode frontend/backend, merancang basis data, dan menguji fungsionalitas aplikasi. |

---

## 2.2 Peran Pengguna dan Hak Akses (User Roles & Access Control)

##### Tabel 2.2 Matriks Peran Pengguna dan Hak Akses Sistem
| Peran (*Role*) | Tingkat Akses | Hak Akses Utama dalam Sistem |
| :--- | :---: | :--- |
| **GUEST** | Publik | Menjelajahi landing page, melihat katalog proyek publik, membaca detail proyek, mengakses form registrasi dan login. |
| **STUDENT** | Pengguna Terotentikasi | Mengelola profil keahlian dan sertifikat, melamar proyek terbuka, mengakses workspace proyek aktif, memperbarui status tugas, mengirim luaran akhir, memberi ulasan UMKM. |
| **UMKM** | Pengguna Terotentikasi | Mengelola profil usaha, membuat dan mempublikasikan brief proyek, meninjau pelamar dan skor rekomendasi AI, mengelola tugas di workspace, menyetujui hasil kerja, memberi ulasan mahasiswa. |
| **ADMIN** | Administrator Penuh | Mengakses dasbor statistik platform, menambah/mengubah kategori proyek, memoderasi status publikasi proyek, memverifikasi akun pengguna, memantau audit log. |

---

## 2.3 Kebutuhan Fungsional (Functional Requirements)

##### Tabel 2.3 Matriks Spesifikasi Kebutuhan Fungsional (Functional Requirements)
| Kode FR | Nama Fitur | Deskripsi Kebutuhan Sistem | Aktor Utama | Kategori |
| :---: | :--- | :--- | :---: | :---: |
| **FR-AUTH-01** | Registrasi Multi-Peran | Sistem memungkinkan pendaftaran akun baru dengan peran Mahasiswa atau UMKM (password Bcrypt). | Guest | **MVP** |
| **FR-AUTH-02** | Login Berbasis JWT | Sistem memvalidasi kredensial login dan menerbitkan JSON Web Token untuk otentikasi sesi. | Semua Pengguna | **MVP** |
| **FR-AUTH-03** | Pemulihan Kata Sandi | Sistem menyediakan alur permintaan reset password berbasis token email. | Semua Pengguna | **Core** |
| **FR-PROF-01** | Profil Mahasiswa | Sistem memfasilitasi pengelolaan profil mahasiswa, institusi, taksonomi keahlian, dan sertifikat. | Mahasiswa | **MVP** |
| **FR-PROF-02** | Profil UMKM | Sistem memfasilitasi pengelolaan profil usaha UMKM, logo, bidang industri, lokasi, dan skala usaha. | UMKM | **MVP** |
| **FR-PROJ-01** | Publikasi Brief Proyek | Sistem menyediakan form bagi UMKM untuk menerbitkan brief proyek (judul, kategori, durasi, stipend, tags). | UMKM | **MVP** |
| **FR-PROJ-02** | Katalog & Filter Proyek | Sistem menyediakan halaman pencarian proyek dengan filter berdasarkan kategori, level, dan kata kunci. | Semua Pengguna | **MVP** |
| **FR-AI-01** | Rekomendasi AI Matchmaking | Sistem menghitung skor kecocokan profil pelamar terhadap brief proyek via Google Gemini API (*decision support*). | UMKM, Sistem | **Core** |
| **FR-APP-01** | Pengajuan Lamaran | Sistem memungkinkan mahasiswa mengajukan lamaran ke proyek terbuka (1 lamaran per proyek). | Mahasiswa | **MVP** |
| **FR-APP-02** | Seleksi Pelamar | Sistem menampilkan daftar pelamar proyek berurutan skor AI dan memungkinkan UMKM menerima/menolak pelamar. | UMKM | **MVP** |
| **FR-WORK-01** | Inisiasi Workspace Otomatis | Sistem menginisialisasi entitas ruang kerja kolaboratif saat UMKM menyetujui lamaran mahasiswa. | Sistem | **MVP** |
| **FR-WORK-02** | Checklist Tugas Milestone | Sistem memungkinkan pembuatan, penugasan, penentuan tenggat waktu, dan penandaan selesai pada item tugas. | Mahasiswa, UMKM | **Core** |
| **FR-WORK-03** | Pelacakan Kemajuan Dinamis | Sistem memperbarui persentase progres workspace secara otomatis berdasarkan rasio tugas selesai. | Sistem | **Core** |
| **FR-WORK-04** | Penyerahan Luaran Kerja | Sistem menyediakan antarmuka bagi mahasiswa untuk menyerahkan tautan luaran akhir dan UMKM memvalidasinya. | Mahasiswa, UMKM | **Core** |
| **FR-REV-01** | Ulasan Dua Arah | Sistem memfasilitasi pengisian rating bintang (1-5) dan komentar evaluasi antara mahasiswa dan UMKM. | Mahasiswa, UMKM | **Core** |
| **FR-REV-02** | Pembaruan Skor Portofolio | Sistem mengakumulasi skor portofolio mahasiswa secara otomatis berdasarkan ulasan yang diterima. | Sistem | **Core** |
| **FR-CHAT-01** | Perpesanan Internal Workspace | Sistem menyediakan fitur pesan teks langsung antaranggota yang terikat pada workspace aktif. | Mahasiswa, UMKM | **Core** |
| **FR-NOTIF-01**| Pusat Notifikasi | Sistem mencatat dan menampilkan pemberitahuan saat status lamaran berubah, tugas diperbarui, atau pesan masuk. | Semua Pengguna | **Core** |
| **FR-ADM-01** | Dasbor Analitik Admin | Sistem menyajikan statistik ringkasan total pengguna, proyek aktif, workspace berjalan, dan tingkat penyelesaian. | Admin | **Core** |
| **FR-ADM-02** | Manajemen Kategori & Moderasi | Sistem memungkinkan admin mengelola master kategori dan mengubah status visibilitas proyek publik. | Admin | **Core** |
| **FR-ADM-03** | Pencatatan Audit Log | Sistem merekam aktivitas administratif penting ke dalam tabel audit log untuk keperluan audit keamanan. | Admin, Sistem | **Core** |

---

## 2.4 Kebutuhan Non-Fungsional (Non-Functional Requirements)

##### Tabel 2.4 Matriks Spesifikasi Kebutuhan Non-Fungsional (Non-Functional Requirements)
| Parameter | Kode NFR | Spesifikasi Target Terukur |
| :--- | :---: | :--- |
| **Performa** | **NFR-P-01** | Waktu respons rata-rata REST API backend $\le 300\text{ ms}$ untuk operasi query data standar pada lingkungan lokal/staging. |
| | **NFR-P-02** | Waktu respons inferensi analisis rekomendasi AI via Google Gemini API selesai dalam rentang waktu wajar ($\le 3.5\text{ detik}$). |
| **Keamanan** | **NFR-S-01** | Seluruh kata sandi pengguna dienkripsi searah menggunakan algoritma **Bcrypt** dengan salt factor minimal 10. |
| | **NFR-S-02** | Sesi pengguna divalidasi menggunakan JSON Web Token (JWT) yang dilengkapi mekanisme versi token (*Token Versioning*). |
| | **NFR-S-03** | Seluruh input dari pengguna pada rute API divalidasi menggunakan skema **Zod** untuk mencegah masukan tidak valid. |
| **Kegunaan** | **NFR-U-01** | Antarmuka web responsif dan dapat diakses dengan baik pada layar desktop, tablet, maupun ponsel pintar menggunakan Tailwind CSS v4. |
| **Keandalan** | **NFR-R-01** | Sistem menerapkan penanganan galat terpusat (*Global Error Handler*) pada backend sehingga galat tidak menyebabkan server *crash*. |
| **Kompatibilitas** | **NFR-C-01** | Aplikasi web kompatibel dengan peramban modern standar (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari). |
| **Kemudahan Rawat**| **NFR-M-01** | Basis kode ditulis menggunakan **TypeScript** bertipe ketat (*strict mode*) dan menerapkan pemisahan Controller, Service, dan Repository. |

---

## 2.5 Kebutuhan Lingkungan Pengembangan (Development Requirements)

##### Tabel 2.5 Spesifikasi Kebutuhan Lingkungan Pengembangan (Development Environment)
| Komponen | Spesifikasi yang Digunakan | Kegunaan |
| :--- | :--- | :--- |
| **Perangkat Keras** | Komputer PC / Laptop (RAM $\ge 8\text{ GB}$, Penyimpanan SSD, Koneksi Internet) | Lingkungan pengkodean dan pengujian lokal. |
| **Sistem Operasi** | Windows 11 / Linux Ubuntu / macOS | Menjalankan perkakas pengembangan dan runtime. |
| **Runtime & Bahasa**| Node.js (v20+ LTS) dan TypeScript (v5.8+) | Runtime backend dan bahasa pemrograman bertipe statis. |
| **Framework Backend**| Express.js v5.x | Pengelolaan rute API, middleware, dan penanganan HTTP. |
| **Framework Frontend**| React v19.0 dipadukan dengan Vite v6.2 | Pustaka antarmuka pengguna reaktif dan build tool cepat. |
| **Styling & UI** | Tailwind CSS v4.1 dan Lucide React Icons | Tata letak antarmuka modern dan ikonografi aplikasi. |
| **Basis Data & ORM**| MySQL v8.0 dan Prisma ORM v5.22 | Penyimpanan data relasional dan query builder bertipe aman. |
| **Integrasi AI** | Google GenAI SDK (`@google/genai` - Gemini 2.5 Flash) | Eksekusi prompt evaluasi kecocokan pelamar. |
| **Perkakas Bantu** | Visual Studio Code, Git, Postman, Laragon / MySQL Server | Text editor, version control, dan pengujian endpoint. |

---

## 2.6 Kebutuhan Lingkungan Penerapan Target (Target Deployment Requirements)

##### Tabel 2.6 Spesifikasi Kebutuhan Lingkungan Penerapan Target (Target Deployment)
| Komponen Target | Pilihan Lingkungan Penerapan Terencana |
| :--- | :--- |
| **Hosting Frontend** | Vercel Platform (Distribusi CDN global dan optimasi otomatis aset Vite build). |
| **Hosting Backend & API** | Node.js Environment (Vercel Serverless Functions / Render Web Service / VPS). |
| **Hosting Basis Data** | Managed Cloud Database (MySQL Cloud Instance / Supabase PostgreSQL / Cloud RDBMS) dengan enkripsi SSL. |
| **Protokol Jaringan** | Protokol HTTPS penuh dengan sertifikat SSL/TLS aktif. |
| **Konfigurasi Keamanan**| Pengelolaan kredensial rahasia melalui Variabel Lingkungan (`DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`). |

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
│   │ Backlog      │     │ Iterasi/Modul│     │ Fullstack    │     │ Review│  │
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
1. **Pengembangan Berbasis Kenaikan Bertahap (*Incremental Progress*)**: Fitur dikembangkan dari fondasi data, modul MVP, fitur inti kolaborasi, hingga integrasi AI secara bertahap.
2. **Evaluasi Berulang pada Modul Kritis**: Penyesuaian format prompt Google Gemini AI dilakukan secara berulang pada fase iterasi AI hingga menghasilkan keluaran yang konsisten.
3. **Efisiensi Pengembang Tunggal**: Memangkas waktu koordinasi tim formal dan mengalokasikan fokus maksimal pada perancangan arsitektur, penulisan kode berkualitas, dan pengujian.

---

## 3.2 Peran dan Tanggung Jawab dalam Solo Development
Karena proyek SkillBridge Hub dikembangkan dalam skema **solo development**, satu pengembang menjalankan seluruh peran dalam siklus rekayasa perangkat lunak. Pembagian peran dalam dokumen ini digunakan untuk menggambarkan tanggung jawab dan tahapan pekerjaan secara terstruktur, bukan menunjukkan jumlah anggota tim yang terpisah.

##### Tabel 3.1 Pembagian Peran dan Tanggung Jawab dalam Solo Development
| Peran (*Project Role*) | Pelaksana | Tanggung Jawab Utama | Luaran Kerja (*Deliverables*) |
| :--- | :---: | :--- | :--- |
| **Project Manager** | Ahmad Dhafin Al Farisy | Menyusun rencana kerja, menetapkan prioritas fitur backlog, dan memantau pemenuhan milestone. | Dokumen Perencanaan & Timeline Proyek. |
| **System Analyst** | Ahmad Dhafin Al Farisy | Mengidentifikasi kebutuhan fungsional/non-fungsional, merancang alur proses BPMN, dan skenario use case. | Software Requirements Specification (SRS) & Diagram Analisis. |
| **UI/UX Designer** | Ahmad Dhafin Al Farisy | Merancang wireframe antarmuka, tata letak visual, dan skema navigasi pengguna. | Desain Antarmuka & Pustaka Komponen UI. |
| **Frontend Developer** | Ahmad Dhafin Al Farisy | Mengimplementasikan komponen modular React 19, sistem routing, dan integrasi API via TanStack Query. | Kode Sumber Antarmuka Frontend Reaktif. |
| **Backend & AI Engineer** | Ahmad Dhafin Al Farisy | Membangun REST API Express 5, middleware otentikasi JWT, validasi Zod, dan integrasi Google Gemini API. | Kode Sumber RESTful API & Modul AI Engine. |
| **Database Designer** | Ahmad Dhafin Al Farisy | Merancang skema relasional, indeks basis data, dan skrip migrasi/seeding Prisma. | Skema Prisma & Skrip Seeding Data Awal. |
| **QA & Tester** | Ahmad Dhafin Al Farisy | Menyusun skenario pengujian, mengeksekusi uji fungsional, dan memverifikasi kelayakan rilis. | Matriks Pengujian Fungsional & UAT Plan. |

---

## 3.3 Alur Kerja Pengembangan (Development Workflow)
Alur kerja pengembangan perangkat lunak dijalankan melalui 6 fase terstruktur:
1. **Analisis Kebutuhan**: Mengumpulkan daftar kebutuhan mahasiswa dan UMKM serta menyusun matriks FR/NFR.
2. **Perancangan Sistem**: Merancang alur proses bisnis (BPMN), Use Case, skema basis data, dan antarmuka pengguna.
3. **Pengembangan Basis Data & Backend**: Menyiapkan skema Prisma, membuat rute REST API, middleware, dan modul integrasi AI.
4. **Pengembangan Frontend**: Membangun modul antarmuka React 19 dan menghubungkannya ke endpoint backend.
5. **Pengujian Sistem**: Menjalankan pengujian fungsional modul, pengujian integrasi, dan perbaikan bug.
6. **Deployment & Dokumentasi**: Menerapkan sistem ke lingkungan target dan melengkapi dokumentasi teknis.

---

## 3.4 Work Breakdown Structure (WBS)
Berikut adalah struktur rincian kerja (*Work Breakdown Structure*) proyek SkillBridge Hub:

```text
1.0 Inisiasi dan Analisis Kebutuhan
    1.1 Identifikasi Masalah & Studi Lapangan
    1.2 Analisis Pemangku Kepentingan
    1.3 Penyusunan Spesifikasi Kebutuhan (FR & NFR)
    1.4 Pengelompokan Fitur (MVP, Core, Future)

2.0 Perancangan Sistem (System Design)
    2.1 Pemodelan Alur Proses Bisnis (BPMN)
    2.2 Perancangan Use Case & Skenario
    2.3 Perancangan Skema Basis Data Relasional (ERD & Kamus Data)
    2.4 Perancangan Antarmuka Pengguna Modular
    2.5 Perancangan Kontrak RESTful API

3.0 Implementasi Perangkat Lunak (Development)
    3.1 Inisialisasi Repositori & Konfigurasi TypeScript Fullstack
    3.2 Implementasi Skema Prisma, Migrasi SQL, dan Seeding Data
    3.3 Implementasi Modul Autentikasi JWT & Profil Peran (MVP)
    3.4 Implementasi Modul Katalog & Publikasi Brief Proyek (MVP)
    3.5 Implementasi Modul Lamaran Proyek & Inisiasi Workspace (MVP)
    3.6 Implementasi Integrasi Mesin Rekomendasi Google Gemini AI (Core)
    3.7 Implementasi Manajemen Tugas Milestone & Pelacakan Progres (Core)
    3.8 Implementasi Penyerahan Luaran & Ulasan Dua Arah (Core)
    3.9 Implementasi Perpesanan Internal & Notifikasi (Core)
    3.10 Implementasi Dasbor Admin & Audit Logging (Core)

4.0 Pengujian dan Penjaminan Mutu (Testing & QA)
    4.1 Pengujian Unit Logika Bisnis & Validasi Skema
    4.2 Pengujian Integrasi Antar-Modul Backend
    4.3 Pengujian Kasus Uji Fungsional Sistem (Functional Test Cases)
    4.4 Rencana Uji Penerimaan Pengguna (UAT Planning)
    4.5 Perbaikan Defect dan Bug

5.0 Deployment dan Pelaporan Akhir
    5.1 Konfigurasi Lingkungan Penerapan Target (Target Deployment)
    5.2 Migrasi Basis Data Lingkungan Cloud
    5.3 Penyusunan Dokumen Perencanaan & Panduan Penggunaan
```

---

## 3.5 Rencana Tahapan Iterasi dan Timeline (Sprint Schedule)

##### Tabel 3.2 Rencana Pembagian Tahapan Siklus Pengembangan Iteratif
| Iterasi / Tahap | Fokus Pekerjaan Utama | Target Luaran Terukur |
| :---: | :--- | :--- |
| **Iterasi 1: Inisiasi & Desain** | Analisis kebutuhan, perancangan BPMN, Use Case, ERD, dan struktur UI. | Dokumen SRS dan Desain Basis Data. |
| **Iterasi 2: Fondasi & Auth (MVP)**| Setup project TypeScript, migrasi Prisma, modul login/register JWT. | Autentikasi & Profil Pengguna Berjalan. |
| **Iterasi 3: Marketplace & Proyek (MVP)**| Katalog proyek, form brief proyek baru, dan alur pendaftaran proyek. | Marketplace & Pendaftaran Proyek Aktif. |
| **Iterasi 4: Workspace & Task (MVP/Core)**| Inisiasi workspace otomatis, checklist tugas, dan kalkulasi progres. | Ruang Kerja Kolaboratif Berfungsi. |
| **Iterasi 5: AI Engine & Rekomendasi (Core)**| Integrasi Google Gemini API untuk analisis kecocokan pelamar. | Rekomendasi AI Matchmaking Aktif. |
| **Iterasi 6: Deliverables & Review (Core)**| Form submit luaran akhir, ulasan dua arah, dan skor portofolio. | Siklus Proyek Tuntas & Ulasan Berjalan. |
| **Iterasi 7: Admin Center & Notif (Core)**| Dasbor metrik platform, moderasi kategori/proyek, dan audit log. | Modul Admin & Notifikasi Lengkap. |
| **Iterasi 8: QA, Deployment & Release** | Eksekusi kasus uji, perbaikan bug, penyiapan deployment target. | Platform Teruji & Siap Rilis. |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 VISUALISASI STRUKTUR TAHAPAN (GANTT CHART)                  │
├────────────────────────┬──┬──┬──┬──┬──┬──┬──┬──┤                            │
│ Tahap Iterasi          │I1│I2│I3│I4│I5│I6│I7│I8│                            │
├────────────────────────┼──┼──┼──┼──┼──┼──┼──┼──┤                            │
│ 1. Inisiasi & Desain   │██│  │  │  │  │  │  │  │                            │
│ 2. Fondasi & Auth (MVP)│  │██│  │  │  │  │  │  │                            │
│ 3. Marketplace (MVP)   │  │  │██│  │  │  │  │  │                            │
│ 4. Workspace & Task    │  │  │  │██│  │  │  │  │                            │
│ 5. AI Recommendation   │  │  │  │  │██│  │  │  │                            │
│ 6. Review & Portofolio │  │  │  │  │  │██│  │  │                            │
│ 7. Admin & Notifikasi  │  │  │  │  │  │  │██│  │                            │
│ 8. QA & Deployment     │  │  │  │  │  │  │  │██│                            │
└────────────────────────┴──┴──┴──┴──┴──┴──┴──┴──┘                            │
```
#### Gambar 3.2 Visualisasi Tahapan Pengembangan Iteratif (Gantt Chart)

---

## 3.6 Tonggak Pencapaian Proyek (Project Milestones)

##### Tabel 3.3 Daftar Tonggak Pencapaian Proyek (Project Milestones)
| Kode | Nama Milestone | Kriteria Keberhasilan (*Acceptance Criteria*) |
| :---: | :--- | :--- |
| **M1** | **Spesifikasi & Desain Terverifikasi** | Dokumen kebutuhan, use case, dan perancangan skema basis data telah selesai dan konsisten. |
| **M2** | **Pondasi Database & Auth Siap (MVP)** | Skema Prisma berhasil dimigrasi, skrip seeding berjalan sukses, dan endpoint login/register berfungsi. |
| **M3** | **Marketplace & Lamaran Selesai (MVP)**| UMKM dapat menerbitkan brief proyek dan mahasiswa dapat mengajukan lamaran. |
| **M4** | **Workspace Kolaboratif Berfungsi** | Persetujuan pelamar menginisiasi ruang kerja bersama, tugas dapat dibuat dan progres terkalkulasi otomatis. |
| **M5** | **Rekomendasi AI & Review Berjalan** | Google Gemini AI menghasilkan skor rekomendasi dan ulasan dua arah berhasil memperbarui skor portofolio. |
| **M6** | **Pengujian Fungsional Selesai** | Seluruh kasus uji fungsional terencana (TC-01 s/d TC-16) telah dieksekusi tanpa adanya bug berstatus Blocker. |
| **M7** | **Dokumentasi & Siap Rilis** | Dokumen perencanaan pengembangan perangkat lunak lengkap dan kode sumber siap dideploy ke lingkungan target. |

---

## 3.7 Luaran Proyek (Deliverables)

##### Tabel 3.4 Rincian Luaran Proyek Perangkat Lunak (Deliverables)
| No | Kategori Luaran | Bentuk Luaran |
| :---: | :--- | :--- |
| 1 | **Dokumen Perencanaan** | Dokumen Software Development Planning (SDP) lengkap format akademik. |
| 2 | **Berkas Desain Sistem** | Diagram BPMN, Use Case, ERD, dan Kamus Data terstruktur. |
| 3 | **Kode Sumber Aplikasi** | Repositori kode Frontend (React 19) dan Backend REST API (Express 5 TypeScript). |
| 4 | **Skema & Migrasi Basis Data** | Berkas `schema.prisma`, file migrasi SQL, dan skrip pengisian data awal (`seed.ts`). |
| 5 | **Dokumentasi API** | Daftar rute RESTful API dan spesifikasi parameter request/response. |
| 6 | **Rencana & Hasil Pengujian** | Matriks pengujian fungsional (Test Cases) dan panduan pengujian UAT. |

---

## 3.8 Rencana Manajemen Perubahan (Change Management Plan)
Untuk mencegah perubahan ruang lingkup berlebih (*scope creep*) selama fase pengembangan mandiri, diterapkan prosedur manajemen perubahan sederhana:
1. **Pencatatan Usulan**: Setiap ide fitur tambahan dicatat terlebih dahulu dalam daftar *Future Enhancements Backlog*.
2. **Evaluasi Dampak**: Mengevaluasi apakah penambahan fitur berisiko mengganggu jadwal penyelesaian fitur utama yang disyaratkan.
3. **Keputusan Prioritas**: Fitur di luar lingkup inti ditunda hingga seluruh kebutuhan fungsional primer selesai diuji dengan baik.

---

# BAB 4 — HIGH-LEVEL ARCHITECTURE AND DESIGN PLANNING

## 4.1 Perencanaan Arsitektur Sistem (High-Level 3-Tier Architecture)
Arsitektur sistem SkillBridge Hub direncanakan menggunakan pendekatan **Three-Tier Layered Architecture** untuk memastikan pemisahan tanggung jawab yang jelas antara lapisan antarmuka pengguna, logika aplikasi, dan penyimpanan data:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LAPISAN PRESENTASI (FRONTEND CLIENT)                  │
│       Aplikasi Web Reaktif: React 19 · TypeScript · Vite · Tailwind CSS     │
│             State Caching & Fetching: TanStack Query · Router: v7           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Protokol HTTP/REST (JSON + JWT Bearer)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    LAPISAN LOGIKA APLIKASI (BACKEND API SERVER)             │
│                 Framework Web: Express.js 5 · Bahasa: TypeScript            │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ Middleware: Otentikasi JWT · RBAC Filter · Validasi Skema Zod       │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
│                                      │                                      │
│   ┌──────────────────────────────────▼──────────────────────────────────┐   │
│   │ Controller Layer: Penanganan Permintaan HTTP & Format Respons JSON  │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
│                                      │                                      │
│   ┌──────────────────────────────────▼──────────────────────────────────┐   │
│   │ Service Layer: Logika Bisnis Kolaborasi · Kalkulasi Progres Tugas   │   │
│   └─────────────────┬─────────────────────────────────┬─────────────────┘   │
│                     │                                 │                     │
│                     ▼                                 ▼                     │
│   ┌──────────────────────────────────┐ ┌────────────────────────────────┐   │
│   │ Repository: Prisma Data Access   │ │ Modul AI: Google GenAI SDK     │   │
│   └─────────────────┬────────────────┘ │ (Gemini 2.5 Flash API Adapter) │   │
│                     │                  └────────────────────────────────┘   │
└─────────────────────┼───────────────────────────────────────────────────────┘
                      │ Type-Safe Query Protocol (SQL)
┌─────────────────────▼───────────────────────────────────────────────────────┐
│                       LAPISAN PERSISTENSI BASIS DATA                        │
│                   Relational Database Engine: MySQL 8.0                     │
│           Tabel: User, Profiles, Project, Workspace, Task, Review           │
└─────────────────────────────────────────────────────────────────────────────┘
```
#### Gambar 4.1 Diagram Konsep Arsitektur Tiga Lapis (High-Level 3-Tier Architecture)

---

## 4.2 Perancangan Alur Proses Bisnis (Business Process & BPMN)

Alur proses bisnis utama kolaborasi proyek direncanakan berjalan melalui tahapan terpadu:

```
 Mahasiswa (Talenta)            Sistem SkillBridge Hub            Mitra UMKM
         │                                │                                │
         │                                │   1. Terbitkan Brief Proyek    │
         │                                │ ◀──────────────────────────────│
         │                                │                                │
         │   2. Jelajahi Proyek           │                                │
         │ ─────────────────────────────▶ │                                │
         │                                │                                │
         │   3. Kirim Lamaran Proyek      │                                │
         │ ─────────────────────────────▶ │                                │
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 4. Analisis Rekomendasi     │
         │                                │  │    Kecocokan via Gemini AI  │
         │                                │◀─┘                             │
         │                                │                                │
         │                                │   5. Tinjau Pelamar & Skor AI  │
         │                                │ ─────────────────────────────▶ │
         │                                │                                │
         │                                │   6. Setujui Pelamar Terpilih  │
         │                                │ ◀──────────────────────────────│
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 7. Inisiasi Ruang Kerja     │
         │                                │  │    (Workspace) Bersama      │
         │                                │◀─┘                             │
         │                                │                                │
         │   8. Kerjakan & Update Tugas   │      Kelola Milestone Tugas    │
         │ ◀────────────────────────────▶ │ ◀────────────────────────────▶ │
         │                                │                                │
         │   9. Serahkan Hasil Kerja      │                                │
         │ ─────────────────────────────▶ │   10. Validasi Hasil Kerja     │
         │                                │ ─────────────────────────────▶ │
         │                                │                                │
         │                                │   11. Setujui & Selesaikan     │
         │                                │ ◀──────────────────────────────│
         │                                │                                │
         │   12. Beri Review Mitra UMKM   │   13. Beri Review Mahasiswa    │
         │ ─────────────────────────────▶ │ ◀──────────────────────────────│
         │                                │                                │
         │                                │──┐                             │
         │                                │  │ 14. Akumulasi Skor          │
         │                                │  │     Portofolio Mahasiswa    │
         │                                │◀─┘                             │
         ▼                                ▼                                ▼
```
#### Gambar 4.2 BPMN Alur Proses Bisnis Kolaborasi Proyek Terpadu

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
                    │   │   Analisis Rekomendasi AI       │   │
                    │   │   (Decision Support)            │   │
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
| **Deskripsi** | Menjelaskan alur pendaftaran akun baru, verifikasi format, dan pengisian data profil peran. |
| **Kondisi Awal** | Pengguna belum terdaftar atau belum login di sistem. |
| **Kondisi Akhir** | Akun pengguna tersimpan di basis data dengan peran terkonfigurasi. |
| **Skenario Normal** | 1. Pengguna memilih menu registrasi dan menentukan peran (Mahasiswa/UMKM).<br>2. Pengguna mengisi nama, email, dan kata sandi.<br>3. Sistem memvalidasi data via skema Zod dan mengenkripsi kata sandi dengan Bcrypt.<br>4. Sistem membuat data `User` dan profil terikat (`StudentProfile`/`UmkmProfile`).<br>5. Pengguna melengkapi keahlian atau identitas usaha. |
| **Skenario Alternatif** | **3a. Email sudah terdaftar**: Sistem menampilkan pesan peringatan dan meminta pengguna menggunakan email lain. |

##### Tabel 4.2 Skenario Use Case: Penerbitan Brief Proyek oleh Mitra UMKM
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Penerbitan Brief Proyek Baru** |
| **Aktor** | Mitra UMKM |
| **Deskripsi** | Menjelaskan alur pembuatan brief kebutuhan digitalisasi oleh pemilik usaha. |
| **Kondisi Awal** | Mitra UMKM telah login dengan akun yang valid. |
| **Kondisi Akhir** | Data proyek tersimpan dan tampil pada katalog proyek publik. |
| **Skenario Normal** | 1. UMKM membuka formulir "Post Project".<br>2. UMKM mengisi judul, kategori, durasi, stipend, tingkat kesulitan, sasaran, luaran, dan label keahlian.<br>3. UMKM menekan tombol publikasikan proyek.<br>4. Sistem memvalidasi kelengkapan data dan menyimpan data proyek dengan status `PUBLISHED`. |
| **Skenario Alternatif** | **4a. Form tidak lengkap**: Sistem memberi penanda pada field yang belum diisi. |

##### Tabel 4.3 Skenario Use Case: Pengajuan Lamaran Proyek dan Analisis Rekomendasi AI
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Pengajuan Lamaran & Rekomendasi AI Matchmaking** |
| **Aktor** | Mahasiswa, Sistem AI |
| **Deskripsi** | Mahasiswa melamar proyek dan sistem menganalisis kecocokan profil sebagai pendukung keputusan bagi UMKM. |
| **Kondisi Awal** | Mahasiswa telah login dan memilih salah satu proyek terbuka. |
| **Kondisi Akhir** | Data lamaran tersimpan dengan status `PENDING` beserta estimasi skor kecocokan. |
| **Skenario Normal** | 1. Mahasiswa membuka halaman detail proyek dan menekan tombol lamar.<br>2. Sistem memverifikasi mahasiswa belum pernah melamar proyek tersebut.<br>3. Sistem menyimpan entitas `ProjectApplication`.<br>4. Sistem memanggil Google Gemini API untuk membandingkan data keahlian mahasiswa dengan deskripsi proyek.<br>5. Gemini API mengembalikan skor kecocokan persentase dan teks analisis kesesuaian.<br>6. Skor kecocokan ditampilkan pada dasbor peninjauan pelamar milik UMKM. |
| **Prinsip Desain AI**| *Skor kecocokan yang dihasilkan AI berfungsi sebagai decision support (alat bantu pendukung keputusan) bagi mitra UMKM. Keputusan penerimaan atau penolakan tetap berada sepenuhnya pada pengguna UMKM.* |

##### Tabel 4.4 Skenario Use Case: Seleksi Pelamar dan Inisiasi Workspace Kolaboratif
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Seleksi Pelamar dan Inisiasi Workspace** |
| **Aktor** | Mitra UMKM, Mahasiswa, Sistem |
| **Deskripsi** | UMKM meninjau pelamar dan menyetujui kandidat untuk memulai kerja sama. |
| **Kondisi Awal** | Terdapat lamaran berstatus `PENDING` pada proyek milik UMKM. |
| **Kondisi Akhir** | Status lamaran menjadi `ACCEPTED` dan ruang kerja `Workspace` aktif terbentuk. |
| **Skenario Normal** | 1. UMKM membuka daftar pelamar proyek dan meninjau profil serta skor kecocokan AI.<br>2. UMKM menekan tombol terima kandidat.<br>3. Sistem memperbarui status lamaran menjadi `ACCEPTED`.<br>4. Sistem secara otomatis membuat entitas `Workspace` baru dengan status aktif.<br>5. Sistem mengirim notifikasi penerimaan ke akun mahasiswa. |
| **Skenario Alternatif** | **2a. UMKM menolak kandidat**: Sistem mengubah status lamaran menjadi `REJECTED` dan mengirim notifikasi pemberitahuan. |

##### Tabel 4.5 Skenario Use Case: Pengelolaan Tugas Milestone dan Pelacakan Progres
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Manajemen Tugas Milestone & Pelacakan Progres** |
| **Aktor** | Mahasiswa, Mitra UMKM, Sistem |
| **Deskripsi** | Mengelola daftar tugas dalam workspace dan menghitung persentase kemajuan pengerjaan. |
| **Kondisi Awal** | Ruang kerja bersama (Workspace) telah berstatus aktif. |
| **Kondisi Akhir** | Tugas tersimpan dan persentase progres workspace terbarui. |
| **Skenario Normal** | 1. Mahasiswa atau UMKM menambahkan item tugas (judul dan batas waktu) di workspace.<br>2. Mahasiswa menandai tugas yang telah selesai dikerjakan.<br>3. Sistem memperbarui data `ProjectTask`.<br>4. Sistem menghitung ulang rasio tugas selesai terhadap total tugas: $\text{Progres} = \left(\frac{\text{Tugas Selesai}}{\text{Total Tugas}}\right) \times 100\%$.<br>5. Sistem memperbarui nilai `progressPercent` pada entitas `Workspace`. |
| **Skenario Alternatif** | **1a. Belum ada tugas**: Sistem menampilkan persentase progres 0%. |

##### Tabel 4.6 Skenario Use Case: Penyerahan Luaran Proyek dan Evaluasi Ulasan Dua Arah
| Komponen | Deskripsi Rencana Skenario |
| :--- | :--- |
| **Nama Use Case** | **Penyerahan Luaran Proyek & Ulasan Dua Arah** |
| **Aktor** | Mahasiswa, Mitra UMKM, Sistem |
| **Deskripsi** | Penyerahan hasil akhir pekerjaan, persetujuan oleh UMKM, dan pemberian evaluasi ulasan timbal balik. |
| **Kondisi Awal** | Seluruh tugas utama di workspace telah tuntas. |
| **Kondisi Akhir** | Workspace dan proyek berstatus selesai, ulasan tersimpan, dan skor portofolio bertambah. |
| **Skenario Normal** | 1. Mahasiswa menyerahkan tautan luaran akhir pekerjaan di workspace.<br>2. UMKM memeriksa hasil kerja dan menekan tombol setujui proyek.<br>3. Sistem memperbarui status `Workspace` dan `Project` menjadi `COMPLETED`.<br>4. UMKM mengisi rating bintang (1-5) dan ulasan performa kerja mahasiswa.<br>5. Mahasiswa mengisi rating bintang (1-5) dan ulasan kerja sama UMKM.<br>6. Sistem menyimpan data `Review` dan mengakumulasikan nilai rating ke dalam `portfolioScore` mahasiswa. |
| **Skenario Alternatif** | **2a. Hasil kerja membutuhkan perbaikan**: UMKM menekan tombol minta revisi dan mencantumkan catatan perbaikan. |

---

## 4.4 Perancangan Basis Data Tingkat Tinggi (Database Design Plan)

### 4.4.1 Entity Relationship Diagram (ERD)

```
┌─────────────────┐       1:1       ┌─────────────────────┐
│  StudentProfile │ ◀────────────── │        User         │
└─────────────────┘                 │  (id, email, role,  │
                                    │   passwordHash...)  │
┌─────────────────┐       1:1       │                     │
│   UmkmProfile   │ ◀────────────── │                     │
└─────────────────┘                 └──────────┬──────────┘
                                               │
                   ┌───────────────────────────┼───────────────────────────┐
                   │ 1:N (Pemilik)             │ 1:N (Pelamar)             │ 1:N (Ulasan)
                   ▼                           ▼                           ▼
        ┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
        │       Project       │ 1:N │ ProjectApplication  │     │       Review        │
        │ (id, title, status, │ ──▶ │ (id, projectId,     │     │ (id, projectId,     │
        │  stipend, tags...)  │     │  studentId, status) │     │  authorId, rating)  │
        └──────────┬──────────┘     └─────────────────────┘     └─────────────────────┘
                   │
                   │ 1:N (Ruang Kerja)
                   ▼
        ┌─────────────────────┐     1:N     ┌─────────────────────┐
        │      Workspace      │ ──────────▶ │     ProjectTask     │
        │ (id, projectId,     │             │ (id, workspaceId,   │
        │  progressPercent...)│             │  title, completed)  │
        └──────────┬──────────┘             └─────────────────────┘
                   │
                   │ 1:N (Pesan)
                   ▼
        ┌─────────────────────┐
        │       Message       │
        │ (id, text, senderId,│
        │  receiverId...)     │
        └─────────────────────┘
```
#### Gambar 4.4 Entity Relationship Diagram (ERD) Basis Data Relasional

---

### 4.4.2 Kamus Data Rencana Entitas

##### Tabel 4.7 Kamus Data Rencana Entitas Basis Data Relasional SkillBridge
| Nama Entitas | Nama Atribut | Tipe Data | Keterangan & Batasan |
| :--- | :--- | :--- | :--- |
| **User** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `email` | `VARCHAR(191)` | Unique, email login akun. |
| | `passwordHash` | `VARCHAR(255)` | Hash kata sandi hasil enkripsi Bcrypt. |
| | `name` | `VARCHAR(191)` | Nama lengkap pengguna. |
| | `role` | `VARCHAR(20)` | Nilai peran: `'STUDENT'`, `'UMKM'`, `'ADMIN'`. |
| | `tokenVersion` | `INT` | Versi token JWT untuk kontrol pembatalan sesi. |
| **StudentProfile** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `userId` | `VARCHAR(36)` | Foreign Key ke `User.id` (Unique, 1-to-1). |
| | `institution` | `VARCHAR(191)` | Asal perguruan tinggi/institusi. |
| | `portfolioScore` | `INT` | Akumulasi skor reputasi portofolio. |
| | `skills` | `TEXT (JSON)` | Daftar taksonomi keahlian teknis (JSON String). |
| | `certificates` | `TEXT (JSON)` | Daftar tautan sertifikat (JSON String). |
| **UmkmProfile** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `userId` | `VARCHAR(36)` | Foreign Key ke `User.id` (Unique, 1-to-1). |
| | `companyName` | `VARCHAR(191)` | Nama resmi unit usaha/UMKM. |
| | `industry` | `VARCHAR(100)` | Sektor bidang usaha. |
| | `businessScale` | `VARCHAR(50)` | Skala usaha (Mikro/Kecil/Menengah). |
| **Project** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `title` | `VARCHAR(255)` | Judul brief kebutuhan proyek. |
| | `categoryId` | `VARCHAR(36)` | Foreign Key ke tabel kategori. |
| | `ownerId` | `VARCHAR(36)` | Foreign Key ke `User.id` pemilik proyek. |
| | `duration` | `VARCHAR(50)` | Estimasi durasi pengerjaan. |
| | `stipend` | `VARCHAR(100)` | Besaran kompensasi/stipend. |
| | `description` | `TEXT` | Penjelasan rincian proyek. |
| | `objectives` | `TEXT (JSON)` | Sasaran pencapaian proyek (JSON Array). |
| | `deliverables` | `TEXT (JSON)` | Luaran wajib yang harus diserahkan (JSON Array). |
| | `tags` | `TEXT (JSON)` | Label keahlian yang dibutuhkan (JSON Array). |
| | `status` | `VARCHAR(30)` | Status: `'DRAFT'`, `'PUBLISHED'`, `'ACTIVE'`, `'COMPLETED'`. |
| **ProjectApplication** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `projectId` | `VARCHAR(36)` | Foreign Key ke `Project.id`. |
| | `studentId` | `VARCHAR(36)` | Foreign Key ke `User.id` mahasiswa pelamar. |
| | `status` | `VARCHAR(30)` | Status: `'PENDING'`, `'ACCEPTED'`, `'REJECTED'`. |
| **Workspace** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `projectId` | `VARCHAR(36)` | Foreign Key ke `Project.id`. |
| | `studentId` | `VARCHAR(36)` | Foreign Key ke `User.id` mahasiswa. |
| | `umkmId` | `VARCHAR(36)` | Foreign Key ke `User.id` UMKM. |
| | `status` | `VARCHAR(30)` | Status: `'ACTIVE'`, `'COMPLETED'`. |
| | `progressPercent` | `INT` | Persentase kemajuan pengerjaan (0-100%). |
| **ProjectTask** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `workspaceId` | `VARCHAR(36)` | Foreign Key ke `Workspace.id`. |
| | `title` | `VARCHAR(255)` | Deskripsi tugas yang harus diselesaikan. |
| | `completed` | `BOOLEAN` | Status penyelesaian tugas (true/false). |
| | `dueDate` | `DATETIME` | Batas waktu penyelesaian tugas. |
| **Review** | `id` | `VARCHAR(36)` | Primary Key (UUID v4). |
| | `projectId` | `VARCHAR(36)` | Foreign Key ke `Project.id`. |
| | `authorId` | `VARCHAR(36)` | Foreign Key ke `User.id` pemberi nilai. |
| | `targetId` | `VARCHAR(36)` | Foreign Key ke `User.id` penerima nilai. |
| | `rating` | `INT` | Nilai rating bintang (1-5). |
| | `comment` | `TEXT` | Ulasan tertulis mengenai hasil kerja sama. |

---

## 4.5 Perancangan Modul Frontend (Frontend Modular Plan)
Frontend direncanakan menggunakan struktur komponen berbasis domain fitur:
1. **Modul Autentikasi**: Halaman Login, Registrasi dengan pemilihan peran, dan Lupa Password.
2. **Modul Proyek & Marketplace**: Katalog Proyek interaktif, Modal Detail Proyek, dan Form Brief Proyek Baru.
3. **Modul Ruang Kerja Kolaboratif**: Dasbor Workspace, Checklist Tugas, Form Penyerahan Luaran, dan Komponen Chat.
4. **Modul Profil Pengguna**: Tampilan portofolio mahasiswa dengan badge keahlian terverifikasi dan profil bisnis UMKM.
5. **Modul Tata Kelola Administrator**: Dasbor analitik ringkasan sistem, manajemen kategori, dan audit log.

---

## 4.6 Perancangan Modul Backend (Backend Service Plan)
Backend direncanakan menerapkan pola arsitektur **Controller-Service-Repository**:
1. **Controller Layer**: Menerima request HTTP, memanggil skema validasi Zod, dan mengembalikan format JSON standar:
   ```json
   {
     "success": true,
     "data": { ... }
   }
   ```
2. **Service Layer**: Mengisolasi aturan bisnis (kalkulasi persentase progres tugas, validasi status lamaran, dan pemanggilan API Gemini).
3. **Repository Layer**: Mengisolasi operasi query basis data menggunakan Prisma Client bertipe data aman.

---

# BAB 5 — IMPLEMENTATION PLAN

## 5.1 Keputusan Tumpukan Teknologi (Technology Stack Decision)

##### Tabel 5.1 Keputusan Tumpukan Teknologi Proyek SkillBridge Hub
| Lapisan Sistem | Pilihan Teknologi Utama | Peruntukan Teknis |
| :--- | :--- | :--- |
| **Frontend Framework** | **React v19.0 + Vite v6.2** | Pustaka antarmuka komponen reaktif dan build tool cepat. |
| **Bahasa Pemrograman** | **TypeScript v5.8+** | Pengetikan statis ketat pada frontend dan backend guna mencegah galat runtime. |
| **Frontend Styling** | **Tailwind CSS v4.1** | Penataan gaya antarmuka modern yang responsif dan konsisten. |
| **State & Cache Data** | **TanStack Query v5.x** | Pengelolaan data asinkron dan caching otomatis respons API di sisi klien. |
| **Routing** | **React Router DOM v7.x** | Navigasi halaman Single Page Application (SPA) dan pengamanan rute. |
| **Backend Framework** | **Express.js v5.x (Node.js)** | Router REST API, middleware otentikasi, dan penanganan permintaan HTTP. |
| **ORM & Database Tool** | **Prisma ORM v5.22** | Pemodelan skema relasional deklaratif dan eksekusi query bertipe aman. |
| **Basis Data Relasional** | **MySQL v8.0** | RDBMS utama untuk persistensi data pengguna, proyek, dan workspace. |
| **Mesin Kecerdasan Buatan**| **Google GenAI SDK (Gemini 2.5 Flash)** | Eksekusi prompt evaluasi kesesuaian pelamar terhadap brief proyek. |
| **Keamanan & Validasi** | **Bcrypt.js, JWT, Zod** | Enkripsi kata sandi (Bcrypt), otentikasi token (JWT), validasi input (Zod). |
| **Version Control** | **Git & GitHub** | Manajemen kode sumber mandiri dan pelacakan riwayat perubahan. |
| **Target Deployment** | **Vercel + Cloud Database** | Rencana target lingkungan hosting frontend/API dan database cloud. |

---

## 5.2 Rencana Implementasi Antarmuka (Frontend Plan)
Pengembangan antarmuka dibagi menjadi tahapan pembuatan komponen:
1. **Komponen Bersama**: Navbar navigasi dinamis, Footer, Status Badge, Modal Dialog, dan Laci Notifikasi.
2. **Antarmuka Pengguna Utama**:
   - Formulir Login & Registrasi dengan penanganan error visual.
   - Grid Katalog Marketplace dengan bilah pencarian dan filter dropdown kategori.
   - Dasbor Workspace Kolaboratif dengan checklist tugas interaktif yang otomatis memperbarui bilah progres.
   - Halaman Portofolio Mahasiswa dan Profil Bisnis UMKM.

---

## 5.3 Rencana Implementasi Layanan Backend & Kontrak API

##### Tabel 5.2 Rencana Endpoint RESTful API Backend
| Metode | Endpoint URL | Akses (*Role*) | Fungsi Utama | Kategori |
| :---: | :--- | :---: | :--- | :---: |
| `POST` | `/api/auth/register` | Publik | Mendaftarkan akun baru dan membuat data profil. | **MVP** |
| `POST` | `/api/auth/login` | Publik | Memvalidasi kredensial dan menerbitkan token JWT. | **MVP** |
| `GET` | `/api/users/me` | Terotentikasi | Mengambil profil pengguna yang sedang login. | **MVP** |
| `PATCH`| `/api/users/profile` | Terotentikasi | Memperbarui data profil (keahlian, bio, profil UMKM). | **MVP** |
| `GET` | `/api/projects` | Publik | Mengambil katalog proyek dengan filter pencarian. | **MVP** |
| `POST` | `/api/projects` | `UMKM` | Menerbitkan brief proyek baru. | **MVP** |
| `GET` | `/api/projects/:id` | Publik | Mengambil detail lengkap suatu proyek. | **MVP** |
| `POST` | `/api/projects/:id/apply` | `STUDENT` | Mengajukan lamaran dan memicu kalkulasi skor AI. | **MVP** |
| `GET` | `/api/projects/:id/applications`| `UMKM` | Mengambil daftar pelamar terurut skor rekomendasi AI. | **Core** |
| `PATCH`| `/api/applications/:id/status` | `UMKM` | Menerima/menolak pelamar (penerimaan membuat Workspace). | **MVP** |
| `GET` | `/api/workspaces/:id` | Anggota Workspace | Mengambil data workspace, daftar tugas, dan progres. | **MVP** |
| `POST` | `/api/workspaces/:id/tasks` | Anggota Workspace | Menambahkan item tugas milestone baru. | **Core** |
| `PATCH`| `/api/workspaces/:id/tasks/:taskId`| Anggota Workspace| Mengubah status tugas dan menghitung ulang progres. | **Core** |
| `POST` | `/api/workspaces/:id/complete`| `UMKM` | Menandai proyek selesai setelah luaran disetujui. | **Core** |
| `POST` | `/api/reviews` | Terotentikasi | Menyimpan ulasan dua arah dan menambah skor portofolio. | **Core** |
| `GET` | `/api/notifications` | Terotentikasi | Mengambil daftar notifikasi pengguna. | **Core** |
| `GET` | `/api/admin/metrics` | `ADMIN` | Mengambil data ringkasan analitik platform. | **Core** |

---

## 5.4 Rencana Implementasi Basis Data (Database Plan)
1. **Penyusunan Skema**: Mendefinisikan seluruh model entitas pada berkas `backend/prisma/schema.prisma`.
2. **Eksekusi Migrasi SQL**: Menjalankan perintah `npx prisma migrate dev` untuk menghasilkan tabel pada basis data MySQL lokal.
3. **Penyemaian Data Awal (*Seeding*)**: Menyusun skrip `backend/prisma/seed.ts` untuk mengisi data kategori standar (Web Development, Mobile App, UI/UX Design, Branding, Digital Marketing) serta akun contoh untuk pengujian.

---

## 5.5 Rencana Integrasi Mesin Rekomendasi AI (AI Integration Plan)
1. **Inisialisasi SDK**: Memanfaatkan library resmi `@google/genai` dengan konfigurasi API Key tersimpan di variabel lingkungan.
2. **Format Prompt Terstruktur**: Merancang instruksi prompt yang meminta keluaran strictly dalam format JSON:
   ```json
   {
     "matchScore": 85,
     "reasoning": "Mahasiswa memiliki keahlian React dan TypeScript yang sesuai dengan kebutuhan brief proyek...",
     "recommendations": "Disarankan meninjau portofolio proyek sebelumnya..."
   }
   ```
3. **Mekanisme Fallback**: Jika layanan AI eksternal mengalami timeout atau gangguan koneksi, sistem secara otomatis menjalankan algoritma pencocokan cadangan (*fallback*) berbasis overlap kata kunci label keahlian (*skill tags*) agar alur pendaftaran tidak terhenti.

---

## 5.6 Rencana Manajemen Kode Sumber (Version Control Plan)
Pengembangan mandiri menggunakan alur kerja cabang fitur sederhana:

```text
main (Cabang Utama Stabil)
│
├── feature/auth-and-profile
├── feature/project-marketplace
├── feature/ai-matchmaking
├── feature/workspace-and-tasks
└── feature/review-and-admin
```
#### Gambar 5.1 Diagram Strategi Percabangan Git Alur Kerja Mandiri

- **Alur Kerja**: Pengerjaan fitur dilakukan pada cabang `feature/*` $\to$ Pengujian fungsional lokal $\to$ Penggabungan (*merge*) ke cabang `main`.

---

# BAB 6 — TESTING AND QUALITY ASSURANCE PLAN

## 6.1 Strategi Pengujian (Testing Strategy)
Strategi pengujian direncanakan menggunakan pendekatan bertingkat:
1. **Pengujian Unit**: Memverifikasi fungsi utilitas murni (validasi skema Zod dan rumus perhitungan persentase progres).
2. **Pengujian Integrasi**: Memverifikasi alur antar-lapisan (Controller $\to$ Service $\to$ Repository Basis Data).
3. **Pengujian Fungsional (Black-Box)**: Menguji kesesuaian fungsi aplikasi terhadap skenario kebutuhan pengguna.
4. **Pengujian Penerimaan Pengguna (UAT)**: Evaluasi kemudahan penggunaan oleh partisipan perwakilan.

```
                     / \
                    /   \
                   / UAT \  ──▶ Rencana Evaluasi Pengguna Representatif
                  /───────\
                 /  Integ  \ ──▶ Rencana Pengujian Antar-Modul REST API
                /───────────\
               /  Unit Test  \ ──▶ Rencana Pengujian Logika Bisnis & Validasi Skema
              /───────────────\
```
#### Gambar 6.1 Piramida Pengujian Kualitas Perangkat Lunak

---

## 6.2 Rencana Kasus Uji Fungsional (Functional Test Cases Plan)

##### Tabel 6.1 Matriks Rencana Kasus Uji Fungsional Sistem (Functional Test Plan)
| Kode Uji | Fitur yang Diuji | Skenario Kasus Pengujian | Hasil yang Diharapkan | Status Rencana |
| :---: | :--- | :--- | :--- | :---: |
| **TC-01** | Registrasi Akun | Mendaftar akun baru dengan data lengkap dan peran STUDENT. | Akun tersimpan, password terenkripsi Bcrypt, HTTP 201 Created. | **Planned** |
| **TC-02** | Registrasi Email Duplikat | Mendaftar menggunakan email yang sudah terdaftar sebelumnya. | Sistem menolak registrasi, menampilkan pesan error, HTTP 409 Conflict. | **Planned** |
| **TC-03** | Login Berhasil | Memasukkan email dan password yang sesuai. | Sistem mengembalikan token JWT valid dan data profil, HTTP 200 OK. | **Planned** |
| **TC-04** | Login Kredensial Salah | Memasukkan kata sandi yang salah. | Sistem menolak autentikasi dengan pesan "Kredensial tidak valid", HTTP 401. | **Planned** |
| **TC-05** | Publikasi Brief Proyek | UMKM mengisi brief proyek lengkap dan mempublikasikannya. | Proyek tersimpan berstatus `PUBLISHED` dan muncul di katalog marketplace. | **Planned** |
| **TC-06** | Validasi Masukan Zod | Mengirim form proyek tanpa field judul dan kategori. | Middleware Zod memutus request, mengembalikan rincian error, HTTP 400. | **Planned** |
| **TC-07** | Pencarian Katalog | Mencari proyek berdasarkan kata kunci dan kategori tertentu. | Sistem menampilkan daftar proyek yang sesuai dengan parameter filter. | **Planned** |
| **TC-08** | Pengajuan Lamaran | Mahasiswa menekan tombol apply pada proyek terbuka. | Lamaran tersimpan berstatus `PENDING` dan notifikasi terkirim ke pemilik UMKM. | **Planned** |
| **TC-09** | Pencegahan Lamaran Ganda| Mahasiswa melamar kembali pada proyek yang sama. | Sistem menolak lamaran dengan pesan "Anda sudah melamar proyek ini". | **Planned** |
| **TC-10** | Rekomendasi AI Match | Sistem memicu evaluasi kecocokan pelamar via Gemini API. | Skor persentase (0-100%) dan teks rasionalisasi berhasil dihasilkan. | **Planned** |
| **TC-11** | Penerimaan Pelamar | UMKM menerima salah satu pelamar pada proyeknya. | Status lamaran berubah `ACCEPTED` dan entitas Workspace terbuat otomatis. | **Planned** |
| **TC-12** | Checklist Tugas | Mahasiswa mencentang tugas yang telah selesai di workspace. | Status tugas berubah selesai dan progress bar workspace terhitung otomatis. | **Planned** |
| **TC-13** | Penyerahan Luaran | Mahasiswa menyerahkan tautan luaran akhir di workspace. | Tautan luaran tersimpan dan notifikasi verifikasi terkirim ke UMKM. | **Planned** |
| **TC-14** | Penyelesaian Proyek | UMKM menyetujui hasil kerja dan menyelesaikan proyek. | Status workspace dan proyek berubah `COMPLETED`, form review terbuka. | **Planned** |
| **TC-15** | Ulasan Dua Arah | Mahasiswa dan UMKM saling mengisi rating dan ulasan. | Review tersimpan dan skor portofolio mahasiswa bertambah otomatis. | **Planned** |
| **TC-16** | Moderasi Proyek Admin | Admin mengubah status publikasi proyek yang melanggar. | Status proyek dinonaktifkan dan aktivitas tercatat di tabel audit log. | **Planned** |

---

## 6.3 Rencana Pengujian Integrasi (Integration Test Plan)

##### Tabel 6.2 Matriks Rencana Kasus Uji Integrasi Antar-Modul
| Kode Uji | Komponen Terintegrasi | Skenario Pengujian | Kriteria Keberhasilan | Status |
| :---: | :--- | :--- | :--- | :---: |
| **IT-01** | **Auth JWT $\leftrightarrow$ Rute Admin** | Mengakses endpoint admin menggunakan token milik mahasiswa. | Sistem mengembalikan kode status **403 Forbidden**. | **Planned** |
| **IT-02** | **Lamaran $\leftrightarrow$ Inisiasi Workspace** | Menyetujui lamaran mahasiswa pada service lamaran. | Lamaran berubah status dan record Workspace baru terbuat di basis data. | **Planned** |
| **IT-03** | **Checklist Task $\leftrightarrow$ Progres Workspace**| Mengubah 1 dari 2 task menjadi selesai. | Persentase kemajuan workspace otomatis terhitung menjadi 50%. | **Planned** |
| **IT-04** | **Ulasan $\leftrightarrow$ Skor Portofolio** | Memasukkan rating ulasan bintang 5 dari UMKM. | Nilai `portfolioScore` pada profil mahasiswa bertambah. | **Planned** |

---

## 6.4 Rencana Pengujian Penerimaan Pengguna (User Acceptance Testing / UAT Plan)
- **Target Partisipan**: UAT direncanakan melibatkan pengguna representatif dari kelompok mahasiswa (target awal minimal 5 responden) dan mitra UMKM (target awal minimal 3 responden). Jumlah responden disesuaikan dengan ketersediaan partisipan pada fase pengujian.
- **Metode Pengujian**: Responden diberikan panduan skenario tugas (*task scenarios*) untuk mencoba alur registrasi, publikasi proyek, lamaran, pemantauan tugas di workspace, hingga pengisian ulasan.
- **Kriteria Keberhasilan UAT**: Rata-rata tingkat kepuasan pengguna (*User Satisfaction*) mencapai $\ge 80\%$ dan seluruh alur tugas utama dapat diselesaikan tanpa kendala fatal.

---

## 6.5 Manajemen Defect dan Bug Perangkat Lunak (Bug Management Lifecycle)

```
[Bug Ditemukan] ──▶ [Analisis & Klasifikasi] ──▶ [Proses Perbaikan] ──▶ [Verifikasi & Ditutup]
```
#### Gambar 6.2 Alur Siklus Hidup Penanganan Bug (Bug Lifecycle)

##### Tabel 6.3 Panduan Klasifikasi Tingkat Keparahan Bug (Bug Severity & Priority)
| Tingkat Keparahan | Definisi Dampak | Prioritas Penanganan |
| :--- | :--- | :---: |
| **Blocker / Critical** | Sistem mengalami error fatal, server berhenti, atau autentikasi gagal total. | Segera ($\le 12\text{ Jam}$) |
| **Major** | Fitur utama tidak berjalan (misal: tugas tidak tersimpan, rekomendasi AI error). | Tinggi ($\le 24\text{ Jam}$) |
| **Minor** | Gangguan tampilan antarmuka, kesalahan penulisan teks (*typo*), atau layout bergeser. | Sedang ($\le 48\text{ Jam}$) |

---

## 6.6 Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix)

##### Tabel 6.4 Matriks Penelusuran Kebutuhan (Requirement Traceability Matrix / RTM)
| Kode Kebutuhan (FR) | Deskripsi Kebutuhan | Modul Terkait | Kategori | Rencana Kasus Uji |
| :---: | :--- | :--- | :---: | :---: |
| **FR-AUTH-01** | Registrasi Akun Multi-Peran | Modul Autentikasi | **MVP** | **TC-01, TC-02** |
| **FR-AUTH-02** | Login Berbasis JWT & Token Version | Modul Autentikasi | **MVP** | **TC-03, TC-04** |
| **FR-PROF-01** | Pengelolaan Profil & Keahlian Mahasiswa | Modul Profil Pengguna | **MVP** | **TC-01, TC-15** |
| **FR-PROF-02** | Pengelolaan Profil Usaha UMKM | Modul Profil Pengguna | **MVP** | **TC-05** |
| **FR-PROJ-01** | Penerbitan Brief Proyek Baru | Modul Proyek & Marketplace | **MVP** | **TC-05, TC-06** |
| **FR-PROJ-02** | Katalog Pencarian dan Filter Proyek | Modul Proyek & Marketplace | **MVP** | **TC-07** |
| **FR-AI-01** | Analisis Rekomendasi AI Matchmaking | Modul AI Engine | **Core** | **TC-10** |
| **FR-APP-01** | Pengajuan Lamaran Proyek Mahasiswa | Modul Lamaran Proyek | **MVP** | **TC-08, TC-09** |
| **FR-APP-02** | Seleksi dan Peninjauan Pelamar | Modul Lamaran Proyek | **MVP** | **TC-11** |
| **FR-WORK-01** | Inisiasi Otomatis Ruang Kerja Workspace | Modul Workspace | **MVP** | **TC-11, IT-02** |
| **FR-WORK-02** | Manajemen Checklist Tugas Milestone | Modul Workspace | **Core** | **TC-12, IT-03** |
| **FR-WORK-03** | Pelacakan Persentase Progres Dinamis | Modul Workspace | **Core** | **TC-12, IT-03** |
| **FR-WORK-04** | Penyerahan dan Validasi Luaran Kerja | Modul Workspace | **Core** | **TC-13, TC-14** |
| **FR-REV-01** | Sistem Evaluasi Ulasan Dua Arah | Modul Review & Rating | **Core** | **TC-15** |
| **FR-REV-02** | Akumulasi Skor Portofolio Mahasiswa | Modul Review & Rating | **Core** | **TC-15, IT-04** |
| **FR-ADM-01** | Dasbor Statistik Ringkasan Platform | Modul Administrator | **Core** | **TC-16, IT-01** |
| **FR-ADM-02** | Manajemen Kategori & Moderasi Proyek | Modul Administrator | **Core** | **TC-16** |
| **FR-ADM-03** | Pencatatan Log Audit Keamanan | Modul Administrator | **Core** | **TC-16** |

---

# BAB 7 — DEPLOYMENT AND MAINTENANCE PLAN

## 7.1 Rencana Deployment Saat Ini (Current Deployment Plan)
Untuk kebutuhan pengujian, demonstrasi fungsional, dan evaluasi akademik, rencana deployment saat ini mencakup:
1. **Lingkungan Lokal Terintegrasi**: Menjalankan server frontend Vite dan server backend Express.js di lingkungan lokal dengan koneksi ke basis data MySQL lokal (Laragon / MySQL Server).
2. **Target Deployment Web**:
   - Frontend dideploy ke platform **Vercel** dengan pengaturan root direktori dan perintah *build* `npm run build`.
   - Backend API dikonfigurasi agar dapat dijalankan sebagai layanan web terkelola (Vercel Serverless / Node.js cloud runtime).
   - Pengaturan variabel lingkungan (`DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`) diatur melalui dasbor penyedia hosting.
3. **Catatan Penerapan**: *Platform deployment akan ditentukan pada fase deployment berdasarkan kebutuhan biaya, performa, dan kompatibilitas infrastruktur cloud.*

---

## 7.2 Rekomendasi Strategi Produksi Masa Depan (Recommended Production Strategy)
Jika sistem dikembangkan lebih lanjut untuk operasional skala luas dengan ribuan pengguna aktif, berikut adalah rekomendasi arsitektur produksi yang disarankan:
1. **Continuous Deployment (CI/CD)**: Mengintegrasikan GitHub Actions untuk menjalankan pemeriksaan *linter* dan *build* otomatis setiap kali ada kode baru yang digabungkan ke cabang `main`.
2. **Basis Data Terkelola Cloud**: Menggunakan layanan database cloud terkelola (seperti Supabase PostgreSQL atau Managed MySQL) yang mendukung *automatic vertical scaling* dan koneksi terenkripsi SSL.
3. **Optimasi Aset Statis**: Memanfaatkan jaringan distribusi konten (*Content Delivery Network / CDN*) untuk mempercepat pemuatan aset visual antarmuka.

---

## 7.3 Rencana Keamanan dan Pencadangan Data (Security & Backup Plan)
1. **Pengamanan Variabel Rahasia**: Kunci privat JWT, API Key Google Gemini, dan URL basis data diisolasi dalam file `.env` lokal dan tidak pernah diunggah ke repositori publik.
2. **Pencadangan Data Basis Data Terencana**:
   - Selama fase pengembangan dan pengujian, pencadangan skema dan data dilakukan secara berkala menggunakan utilitas ekspor SQL (`mysqldump` / Prisma seed snapshot).
   - Salinan berkas cadangan disimpan di media penyimpanan sekunder terpisah.
3. **Kontrol Sesi Pengguna**: Penerapan field `tokenVersion` pada tabel `User` memungkinkan pembatalan sesi login secara instan dari sisi server jika terjadi anomali akun.

---

## 7.4 Rencana Pemeliharaan Sistem (Maintenance Plan)
1. **Pemantauan Galat Server**: Memeriksa log konsol backend secara berkala saat pengujian untuk mengidentifikasi query database yang lambat atau kesalahan validasi.
2. **Pembaruan Dependensi**: Memeriksa keamanan paket dependensi npm secara berkala melalui perintah `npm audit` guna memperbarui pustaka yang memiliki celah keamanan.
3. **Optimalisasi Query**: Memanfaatkan fitur relasi `select` pada Prisma untuk memastikan query data hanya mengambil kolom yang diperlukan oleh antarmuka.

---

## 7.5 Rencana Pengembangan Lanjutan (Future Enhancements)
Beberapa rencana fitur lanjutan yang dapat diimplementasikan pada pengembangan masa depan:
1. **Integrasi Gerbang Pembayaran Terkelola (Escrow Payment Gateway)**: Mengintegrasikan payment gateway (seperti Midtrans) untuk menampung dana kompensasi stipend secara aman hingga luaran proyek disetujui.
2. **Aplikasi Mobile (React Native / Flutter)**: Menghadirkan aplikasi mobile untuk mempermudah akses notifikasi dan perpesanan instan.
3. **Fitur Uji Kompetensi Teknis Mandiri**: Menyediakan mini-kuis atau tes coding terotomatisasi bagi mahasiswa untuk memvalidasi keahlian sebelum melamar proyek.

---

# BAB 8 — RISK MANAGEMENT

## 8.1 Identifikasi Risiko Teknis (Technical Risks)
1. **Keterbatasan Kuota dan Latensi API AI**: Kemungkinan lonjakan permintaan ke Google Gemini API yang melampaui batas kuota harian (*rate limit*) atau mengalami keterlambatan respons akibat latensi jaringan eksternal.
2. **Inkonsistensi Format Keluaran AI**: Model AI berpotensi mengembalikan format teks yang tidak sepenuhnya sesuai dengan skema JSON yang diharapkan.
3. **Penurunan Performa Query Relasional**: Potensi keterlambatan respons data saat memuat relasi multi-tabel (User, Workspace, Tasks, Review).
4. **Keamanan Berkas Unggahan**: Risiko berkas yang diunggah pengguna memiliki ukuran terlalu besar atau format yang tidak didukung.

---

## 8.2 Identifikasi Risiko Proyek (Project Risks)
1. **Keterbatasan Waktu Pengembangan Mandiri**: Waktu pengembangan yang terbatas untuk menyelesaikan seluruh modul secara mandiri.
2. **Perubahan Ruang Lingkup Kebutuhan (*Scope Creep*)**: Munculnya ide fitur tambahan di tengah proses pengerjaan yang dapat mengganggu jadwal penyelesaian.
3. **Keterbatasan Partisipan Pengujian**: Tantangan dalam merekrut pengguna representatif untuk pengujian UAT pada fase akhir.

---

## 8.3 Matriks Mitigasi dan Penanganan Risiko (Risk Mitigation Plan)

##### Tabel 8.1 Matriks Analisis, Pemilik, dan Rencana Mitigasi Risiko
| Kode Risiko | Deskripsi Risiko | Probabilitas | Dampak | Level Risiko | Penanggung Jawab (*Risk Owner*) | Strategi Mitigasi dan Rencana Kontinjensi |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **TR-01** | Kuota API AI Terlampaui / Latensi Jaringan Eksternal | Sedang | Tinggi | **Tinggi** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menerapkan mekanisme penyimpanan cache skor kecocokan pada basis data lokal sehingga analisis AI hanya dipanggil 1 kali per lamaran; menyediakan *fallback algorithm* berbasis overlap kata kunci label keahlian jika API eksternal mengalami timeout. |
| **TR-02** | Format Output AI Tidak Sesuai Skema JSON | Sedang | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Merancang prompt terstruktur dengan instruksi JSON murni dan memvalidasi output menggunakan *parser / try-catch* sebelum disimpan ke basis data. |
| **TR-03** | Penurunan Performa Query Basis Data | Rendah | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Membuat indeks pada kolom pencarian dan foreign key (`email`, `status`, `projectId`, `studentId`) serta menggunakan fitur `select` spesifik Prisma untuk menghindari *over-fetching*. |
| **TR-04** | Berkas Unggahan Tidak Sesuai / Terlalu Besar | Rendah | Sedang | **Rendah** | Ahmad Dhafin Al Farisy *(Project Developer)* | Membatasi ukuran maksimal berkas unggahan ($\le 5\text{ MB}$) dan membatasi jenis ekstensi yang diizinkan (JPG, PNG, PDF) melalui middleware Multer. |
| **PR-01** | Keterbatasan Waktu Pengembangan Mandiri | Sedang | Tinggi | **Tinggi** | Ahmad Dhafin Al Farisy *(Project Developer)* | Memprioritaskan penyelesaian fitur MVP (Fase 1) dan Core (Fase 2) serta menunda fitur lanjutan (Future) ke rilis berikutnya. |
| **PR-02** | Perubahan Ruang Lingkup (*Scope Creep*) | Sedang | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menerapkan kontrol perubahan rencana kerja formal; fitur baru di luar spesifikasi awal dicatat pada daftar *future enhancements*. |
| **PR-03** | Keterbatasan Partisipan UAT | Sedang | Sedang | **Sedang** | Ahmad Dhafin Al Farisy *(Project Developer)* | Menyiapkan data awal percontohan (*seed data*) yang lengkap dan realistis untuk mempermudah simulasi alur kerja oleh partisipan uji. |

---

<br>

**Ditetapkan di**: Surabaya, Jawa Timur  
**Tanggal**: 1 September 2026  
**Disahkan Oleh**: Ahmad Dhafin Al Farisy *(Pengembang Mandiri SkillBridge Hub)*  

*(Dokumen ini disusun sebagai pedoman teknis dan operasional resmi dalam pelaksanaan seluruh siklus rekayasa perangkat lunak SkillBridge Hub).*
