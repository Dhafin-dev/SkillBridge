@extends('layouts.app')

@section('title', 'SkillBridge Hub — Hubungkan Talenta Mahasiswa & Digitalisasi UMKM')

@section('content')
<div style="display: flex; flex-direction: column; gap: 3rem;">

    <!-- Hero Section -->
    <section style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); border-radius: 24px; padding: 4rem 3rem; color: #ffffff; position: relative; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(30, 27, 75, 0.25);">
        <div style="position: absolute; right: -5%; top: -20%; width: 450px; height: 450px; background: radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>

        <div style="position: relative; z-index: 2; max-width: 780px;">
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.35rem 0.95rem; border-radius: 999px; font-size: 0.825rem; font-weight: 600; margin-bottom: 1.5rem;">
                <span style="color: #38bdf8;">⚡ Berbasis NLP SkillMatch Engine</span>
                <span style="opacity: 0.6;">•</span>
                <span>Supabase Cloud PostgreSQL</span>
            </div>

            <h1 style="font-size: 2.85rem; font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 1.25rem;">
                Jembatani Talenta Akademik dengan <span style="background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Kebutuhan Riil UMKM</span>
            </h1>

            <p style="font-size: 1.125rem; line-height: 1.6; opacity: 0.9; margin-bottom: 2rem; max-width: 650px;">
                Platform kolaborasi proyek terpadu. Bantu digitalisasi unit usaha lokal, peroleh kompensasi stipend nyata, dan bangun rekam jejak portofolio terverifikasi industri.
            </p>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="{{ route('projects.index') }}" class="btn btn-primary btn-lg" style="background: #38bdf8; color: #0f172a; border: none; font-weight: 700;">
                    🚀 Eksplorasi Katalog Proyek
                </a>
                @auth
                    @if(Auth::user()->isUmkm())
                        <a href="{{ route('projects.create') }}" class="btn btn-secondary btn-lg" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3);">
                            + Pasang Kebutuhan Proyek
                        </a>
                    @endif
                @else
                    <a href="{{ route('register') }}" class="btn btn-secondary btn-lg" style="background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3);">
                        Daftar Sebagai Mitra / Mahasiswa
                    </a>
                @endauth
            </div>
        </div>
    </section>

    <!-- Platform Stats Counters -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem;">
        <div class="card" style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;">
            <div style="width: 52px; height: 52px; border-radius: 12px; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                🎓
            </div>
            <div>
                <div style="font-size: 1.75rem; font-weight: 800; line-height: 1.1;">{{ $stats['students'] ?? 0 }}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">Talenta Mahasiswa</div>
            </div>
        </div>

        <div class="card" style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;">
            <div style="width: 52px; height: 52px; border-radius: 12px; background: #dbeafe; color: #1d4ed8; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                🏢
            </div>
            <div>
                <div style="font-size: 1.75rem; font-weight: 800; line-height: 1.1;">{{ $stats['umkm'] ?? 0 }}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">Mitra UMKM Aktif</div>
            </div>
        </div>

        <div class="card" style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;">
            <div style="width: 52px; height: 52px; border-radius: 12px; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                💼
            </div>
            <div>
                <div style="font-size: 1.75rem; font-weight: 800; line-height: 1.1;">{{ $stats['projects'] ?? 0 }}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">Brief Proyek Publik</div>
            </div>
        </div>

        <div class="card" style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem;">
            <div style="width: 52px; height: 52px; border-radius: 12px; background: #fef3c7; color: #b45309; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                ⚡
            </div>
            <div>
                <div style="font-size: 1.75rem; font-weight: 800; line-height: 1.1;">{{ $stats['workspaces'] ?? 0 }}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">Workspace Berjalan</div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section>
        <div style="text-align: center; max-width: 600px; margin: 0 auto 2.5rem;">
            <h2 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Alur Kolaborasi Modern</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Tiga langkah terstruktur dari pencarian brief hingga penilaian hasil kerja terverifikasi.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <div class="card" style="position: relative; border-top: 4px solid #4f46e5;">
                <div style="display: inline-block; padding: 0.25rem 0.65rem; background: #e0e7ff; color: #4338ca; border-radius: 6px; font-weight: 800; font-size: 0.8rem; margin-bottom: 1rem;">
                    LANGKAH 01
                </div>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Publikasi Brief & Required Skills</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">
                    UMKM mempublikasikan deskripsi proyek, luaran yang diharapkan, durasi, stipend, dan taksonomi keterampilan teknis yang diperlukan.
                </p>
            </div>

            <div class="card" style="position: relative; border-top: 4px solid #0ea5e9;">
                <div style="display: inline-block; padding: 0.25rem 0.65rem; background: #dbeafe; color: #0369a1; border-radius: 6px; font-weight: 800; font-size: 0.8rem; margin-bottom: 1rem;">
                    LANGKAH 02
                </div>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">NLP SkillMatch & Candidate Ranking</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">
                    Layanan FastAPI memproses teks resume/profil kandidat via algoritma TF-IDF dan Cosine Similarity untuk menghasilkan rekomendasi pemeringkatan objektif.
                </p>
            </div>

            <div class="card" style="position: relative; border-top: 4px solid #10b981;">
                <div style="display: inline-block; padding: 0.25rem 0.65rem; background: #d1fae5; color: #047857; border-radius: 6px; font-weight: 800; font-size: 0.8rem; margin-bottom: 1rem;">
                    LANGKAH 03
                </div>
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Workspace & Ulasan Dua Arah</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">
                    Kolaborasi dimulai di ruang kerja otomatis dengan checklist milestone dinamis, penyerahan luaran, dan review rating 1-5 bintang yang menambah skor portofolio mahasiswa.
                </p>
            </div>
        </div>
    </section>

    <!-- Featured Projects Grid -->
    <section>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
                <h2 style="font-size: 1.65rem; font-weight: 800; letter-spacing: -0.02em;">Proyek Terbuka Pilihan</h2>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Temukan peluang kolaborasi nyata yang sesuai dengan minat dan keahlian Anda.</p>
            </div>
            <a href="{{ route('projects.index') }}" style="color: var(--primary); font-weight: 700; font-size: 0.9rem;">
                Lihat Semua ({{ count($featuredProjects) }}) &rarr;
            </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
            @forelse($featuredProjects as $project)
                <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                            <span class="badge badge-secondary">{{ $project->category->name ?? 'Proyek' }}</span>
                            <span style="font-size: 0.8rem; font-weight: 700; color: #059669; background: #ecfdf5; padding: 2px 8px; border-radius: 6px;">
                                {{ $project->stipend }}
                            </span>
                        </div>

                        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.35;">
                            <a href="{{ route('projects.show', $project->id) }}" style="color: #0f172a;">
                                {{ $project->title }}
                            </a>
                        </h3>

                        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                            {{ $project->description }}
                        </p>

                        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.25rem;">
                            @foreach($project->skills_array as $skill)
                                <span style="font-size: 0.725rem; font-weight: 600; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px;">
                                    #{{ $skill }}
                                </span>
                            @endforeach
                        </div>
                    </div>

                    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-size: 0.8rem; color: var(--text-muted);">
                            Oleh <strong>{{ $project->owner->umkmProfile->company_name ?? $project->owner->name }}</strong>
                        </div>
                        <a href="{{ route('projects.show', $project->id) }}" class="btn btn-outline-primary btn-sm">
                            Detail Proyek
                        </a>
                    </div>
                </div>
            @empty
                <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <p style="color: var(--text-muted);">Belum ada proyek yang dipublikasikan saat ini.</p>
                </div>
            @endforelse
        </div>
    </section>

</div>
@endsection
