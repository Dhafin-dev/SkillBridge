<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\StudentProfile;
use App\Models\UmkmProfile;
use App\Models\Category;
use App\Models\Project;
use App\Models\ProjectApplication;
use App\Models\Workspace;
use App\Models\ProjectTask;
use App\Models\Review;
use App\Models\AuditLog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Admin
        $admin = User::create([
            'name' => 'Admin SkillBridge Hub',
            'email' => 'admin@skillbridge.id',
            'password' => Hash::make('password'),
            'role' => 'ADMIN',
            'bio' => 'Pengawas dan Administrator Tata Kelola Platform Kolaborasi Akademik & UMKM.',
        ]);

        // 2. Akun Mahasiswa Utama (Persona Solo Developer: Ahmad Dhafin Al Farisy)
        $studentDhafin = User::create([
            'name' => 'Ahmad Dhafin Al Farisy',
            'email' => 'student@skillbridge.id',
            'password' => Hash::make('password'),
            'role' => 'STUDENT',
            'bio' => 'Mahasiswa S1 Sistem Informasi Universitas Airlangga (NIM: 187241057). Fullstack Software Engineer menguasai Laravel, Blade, PostgreSQL, dan FastAPI.',
        ]);

        StudentProfile::create([
            'user_id' => $studentDhafin->id,
            'institution' => 'Universitas Airlangga',
            'major' => 'S1 Sistem Informasi',
            'portfolio_score' => 450,
            'skills' => 'Laravel, Blade, PHP, PostgreSQL, FastAPI, Python, HTML/CSS, Tailwind CSS, REST API',
            'resume_url' => 'https://supabase.skillbridge.id/storage/v1/object/public/resumes/ahmad_dhafin_cv.pdf',
            'github_url' => 'https://github.com/dhafinn',
            'linkedin_url' => 'https://linkedin.com/in/dhafinn',
        ]);

        // Mahasiswa Pendukung 1: UI/UX Talent
        $studentCitra = User::create([
            'name' => 'Citra Lestari',
            'email' => 'citra@skillbridge.id',
            'password' => Hash::make('password'),
            'role' => 'STUDENT',
            'bio' => 'UI/UX Designer dan Mahasiswa Desain Produk. Spesialis perancangan antarmuka pengguna interaktif dan design system modern.',
        ]);

        StudentProfile::create([
            'user_id' => $studentCitra->id,
            'institution' => 'Universitas Airlangga',
            'major' => 'S1 Sistem Informasi',
            'portfolio_score' => 320,
            'skills' => 'Figma, UI/UX Design, Wireframing, CSS, Design System, User Research',
            'resume_url' => 'https://supabase.skillbridge.id/storage/v1/object/public/resumes/citra_cv.pdf',
        ]);

        // Mahasiswa Pendukung 2: Digital Marketing
        $studentBudi = User::create([
            'name' => 'Budi Pratama',
            'email' => 'budi@skillbridge.id',
            'password' => Hash::make('password'),
            'role' => 'STUDENT',
            'bio' => 'Spesialis Digital Marketing & Konten Kreatif. Berpengalaman dalam strategi kampanye media sosial dan branding UMKM.',
        ]);

        StudentProfile::create([
            'user_id' => $studentBudi->id,
            'institution' => 'Universitas Airlangga',
            'major' => 'Manajemen Bisnis',
            'portfolio_score' => 210,
            'skills' => 'Digital Marketing, Canva, Copywriting, Social Media Strategy, Ads Campaign',
            'resume_url' => 'https://supabase.skillbridge.id/storage/v1/object/public/resumes/budi_cv.pdf',
        ]);

        // 3. Akun Mitra UMKM 1: CV Kreasi Digital Nusantara
        $umkmHendra = User::create([
            'name' => 'Hendra Setiawan',
            'email' => 'umkm@skillbridge.id',
            'password' => Hash::make('password'),
            'role' => 'UMKM',
            'bio' => 'Pemilik CV Kreasi Digital Nusantara, berfokus pada digitalisasi unit usaha lokal dan transformasi bisnis.',
        ]);

        UmkmProfile::create([
            'user_id' => $umkmHendra->id,
            'company_name' => 'CV Kreasi Digital Nusantara',
            'industry' => 'Teknologi & Solusi Digital',
            'business_scale' => 'Usaha Kecil',
            'location' => 'Surabaya, Jawa Timur',
            'description' => 'Mitra usaha yang memproduksi dan mendistribusikan produk perlengkapan kantor serta solusi digital bisnis lokal.',
            'website' => 'https://kreasidigital.co.id',
        ]);

        // Mitra UMKM 2: Kopi Kenangan Rasa
        $umkmSari = User::create([
            'name' => 'Sari Wahyuni',
            'email' => 'kopi@skillbridge.id',
            'password' => Hash::make('password'),
            'role' => 'UMKM',
            'bio' => 'Founder Kedai Kopi Kenangan Rasa. Menyajikan cita rasa kopi arabika lokal khas Jawa Timur.',
        ]);

        UmkmProfile::create([
            'user_id' => $umkmSari->id,
            'company_name' => 'Kedai Kopi Kenangan Rasa',
            'industry' => 'Food & Beverage (F&B)',
            'business_scale' => 'Usaha Mikro',
            'location' => 'Malang, Jawa Timur',
            'description' => 'Kedai kopi artisan yang mengutamakan bahan lokal organik dan pengalaman tempat santai komunitas muda.',
            'website' => 'https://kopikenanganrasa.id',
        ]);

        // 4. Kategori Proyek
        $catWeb = Category::create([
            'name' => 'Web Development',
            'slug' => 'web-development',
            'icon' => 'code',
            'description' => 'Pembangunan aplikasi web responsif, landing page, sistem manajemen inventaris, dan platform e-commerce.',
        ]);

        $catDesign = Category::create([
            'name' => 'UI/UX & Graphic Design',
            'slug' => 'ui-ux-design',
            'icon' => 'palette',
            'description' => 'Perancangan antarmuka pengguna, wireframe aplikasi, visual identity, dan aset grafis pemasaran.',
        ]);

        $catMarketing = Category::create([
            'name' => 'Digital Marketing & Branding',
            'slug' => 'digital-marketing',
            'icon' => 'megaphone',
            'description' => 'Kampanye media sosial, optimasi visibilitas brand, copywriting, dan strategi promosi produk UMKM.',
        ]);

        $catData = Category::create([
            'name' => 'Data & AI Solutions',
            'slug' => 'data-ai-solutions',
            'icon' => 'cpu',
            'description' => 'Otomasi alur kerja, pengolahan data inventaris, analisis performa penjualan, dan integrasi API cerdas.',
        ]);

        // 5. Proyek Percontohan
        // Proyek A: Terbuka untuk Dilamar (Menampilkan fitur SkillMatch Ranking)
        $projectA = Project::create([
            'owner_id' => $umkmHendra->id,
            'category_id' => $catWeb->id,
            'title' => 'Pengembangan Website Katalog Digital & Sistem Order Produk UMKM',
            'slug' => 'website-katalog-digital-umkm',
            'duration' => '4 Minggu',
            'stipend' => 'Rp 2.000.000',
            'description' => 'Kami membutuhkan talenta mahasiswa untuk merancang dan mengimplementasikan website katalog produk digital berbasis Laravel dan Blade. Website harus memiliki katalog interaktif, filter kategori produk, formulir pemesanan otomatis terhubung ke WhatsApp bisnis, dan panel pengelolaan barang.',
            'required_skills' => 'Laravel, Blade, PHP, PostgreSQL, HTML/CSS, Web Development',
            'deliverables_brief' => 'Source code repository aplikasi Laravel, panduan konfigurasi basis data, dan dokumentasi singkat cara unggah produk.',
            'status' => 'PUBLISHED',
        ]);

        // Lamaran untuk Proyek A dari ketiga mahasiswa
        ProjectApplication::create([
            'project_id' => $projectA->id,
            'student_id' => $studentDhafin->id,
            'pitch' => 'Saya berpengalaman membangun aplikasi Laravel 11 dengan performa tinggi dan tata letak Blade responsif. Portofolio saya siap diaplikasikan langsung untuk katalog UMKM Anda.',
            'match_score' => 92.5,
            'status' => 'PENDING',
        ]);

        ProjectApplication::create([
            'project_id' => $projectA->id,
            'student_id' => $studentCitra->id,
            'pitch' => 'Tertarik untuk membantu perancangan antarmuka katalog yang bersih, nyaman dilihat, dan mudah digunakan pembeli.',
            'match_score' => 54.0,
            'status' => 'PENDING',
        ]);

        ProjectApplication::create([
            'project_id' => $projectA->id,
            'student_id' => $studentBudi->id,
            'pitch' => 'Saya dapat membantu mengintegrasikan penulisan copy produk yang menarik minat calon pembeli di website.',
            'match_score' => 28.5,
            'status' => 'PENDING',
        ]);

        // Proyek B: Proyek Sedang Berjalan (ACTIVE Workspace)
        $projectB = Project::create([
            'owner_id' => $umkmSari->id,
            'category_id' => $catDesign->id,
            'title' => 'Redesain UI/UX Aplikasi Web & Desain Kemasan Kopi Kenangan Rasa',
            'slug' => 'redesain-ui-ux-kopi-kenangan-rasa',
            'duration' => '3 Minggu',
            'stipend' => 'Rp 1.500.000',
            'description' => 'Membuat perancangan antarmuka pengguna untuk web menu kopi digital dan pembaharuan kemasan pouch produk kopi kemasan 250g.',
            'required_skills' => 'Figma, UI/UX Design, Branding, Wireframing',
            'deliverables_brief' => 'File Figma prototipe siap eksekusi dan berkas desain kemasan vektor siap cetak.',
            'status' => 'ACTIVE',
        ]);

        // Workspace untuk Proyek B bersama Citra Lestari
        $workspaceB = Workspace::create([
            'project_id' => $projectB->id,
            'student_id' => $studentCitra->id,
            'umkm_id' => $umkmSari->id,
            'status' => 'ACTIVE',
            'progress_percent' => 67,
            'deliverable_url' => 'https://figma.com/file/sample-kopi-kenangan-redesign',
            'deliverable_notes' => 'Telah diselesaikan rancangan draf utama UI menu digital dan mockup packaging pouch kopi.',
        ]);

        ProjectTask::create([
            'workspace_id' => $workspaceB->id,
            'title' => 'Kick-off dan Pengumpulan Aset Identitas Brand Kopi',
            'completed' => true,
            'due_date' => now()->subDays(10),
        ]);
        ProjectTask::create([
            'workspace_id' => $workspaceB->id,
            'title' => 'Penyusunan User Flow dan Wireframe Antarmuka Menu',
            'completed' => true,
            'due_date' => now()->subDays(5),
        ]);
        ProjectTask::create([
            'workspace_id' => $workspaceB->id,
            'title' => 'Perancangan Visual High-Fidelity & Desain Kemasan Vektor',
            'completed' => false,
            'due_date' => now()->addDays(4),
        ]);

        // Proyek C: Proyek Tuntas (COMPLETED dengan Review Dua Arah & Skor Portofolio)
        $projectC = Project::create([
            'owner_id' => $umkmHendra->id,
            'category_id' => $catWeb->id,
            'title' => 'Implementasi Dashboard Pencatatan Penjualan Harian Berbasis Cloud',
            'slug' => 'dashboard-penjualan-harian-cloud',
            'duration' => '3 Minggu',
            'stipend' => 'Rp 1.800.000',
            'description' => 'Pembuatan modul ringkasan transaksi kas harian untuk mempermudah pemantauan omset toko cabang secara terpusat.',
            'required_skills' => 'Laravel, PostgreSQL, Blade, Charts',
            'deliverables_brief' => 'Modul dashboard Laravel terpasang dengan grafik visual penjualan bulanan.',
            'status' => 'COMPLETED',
        ]);

        $workspaceC = Workspace::create([
            'project_id' => $projectC->id,
            'student_id' => $studentDhafin->id,
            'umkm_id' => $umkmHendra->id,
            'status' => 'COMPLETED',
            'progress_percent' => 100,
            'deliverable_url' => 'https://github.com/dhafinn/umkm-sales-dashboard',
            'deliverable_notes' => 'Seluruh modul pencatatan transaksi dan grafik analytics omset telah berhasil diimplementasikan.',
            'completed_at' => now()->subDays(2),
        ]);

        ProjectTask::create([
            'workspace_id' => $workspaceC->id,
            'title' => 'Inisialisasi Database dan Skema Transaksi Penjualan',
            'completed' => true,
            'due_date' => now()->subDays(18),
        ]);
        ProjectTask::create([
            'workspace_id' => $workspaceC->id,
            'title' => 'Pembuatan Formulir Input Kas dan Laporan Harian',
            'completed' => true,
            'due_date' => now()->subDays(10),
        ]);
        ProjectTask::create([
            'workspace_id' => $workspaceC->id,
            'title' => 'Finalisasi Dashboard Analytics & Testing UAT Bersama UMKM',
            'completed' => true,
            'due_date' => now()->subDays(2),
        ]);

        // Ulasan Dua Arah untuk Proyek C
        Review::create([
            'project_id' => $projectC->id,
            'workspace_id' => $workspaceC->id,
            'author_id' => $umkmHendra->id,
            'target_id' => $studentDhafin->id,
            'rating' => 5,
            'comment' => 'Kinerja Ahmad Dhafin sangat memuaskan! Kode Laravel bersih, sangat responsif dalam komunikasi, dan hasil dashboard melebihi ekspektasi kami. Sangat direkomendasikan!',
        ]);

        Review::create([
            'project_id' => $projectC->id,
            'workspace_id' => $workspaceC->id,
            'author_id' => $studentDhafin->id,
            'target_id' => $umkmHendra->id,
            'rating' => 5,
            'comment' => 'Kerja sama yang sangat profesional bersama CV Kreasi. Kebutuhan proyek dijelaskan dengan detail dan proses verifikasi tugas berlangsung cepat.',
        ]);

        // Audit Logs Awal
        AuditLog::create([
            'user_id' => $admin->id,
            'action' => 'PLATFORM_INITIALIZATION',
            'details' => 'Sistem SkillBridge Hub resmi diinisialisasi dengan master data akademik dan profil mitra UMKM.',
            'ip_address' => '127.0.0.1',
        ]);
    }
}
