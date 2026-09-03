@extends('layouts.app')

@section('title', $project->title . ' — SkillBridge Hub')

@section('content')
<div style="display: flex; flex-direction: column; gap: 2rem;">

    <!-- Breadcrumb & Status -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="font-size: 0.85rem; color: var(--text-muted);">
            <a href="{{ route('projects.index') }}" style="color: var(--primary);">← Kembali ke Katalog Proyek</a>
            <span style="margin: 0 0.5rem;">/</span>
            <span>{{ $project->category->name ?? 'Detail' }}</span>
        </div>
        <div>
            @if($project->status === 'PUBLISHED')
                <span class="badge badge-success">Terbuka untuk Lamaran</span>
            @elseif($project->status === 'ACTIVE')
                <span class="badge badge-primary">Pengerjaan Berjalan</span>
            @elseif($project->status === 'COMPLETED')
                <span class="badge badge-secondary">Proyek Tuntas</span>
            @endif
        </div>
    </div>

    <!-- Main Project Card -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        
        <!-- Left: Project Information -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="card">
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
                    <span class="badge badge-secondary">{{ $project->category->name }}</span>
                    <span class="badge badge-primary">⏱️ {{ $project->duration }}</span>
                </div>

                <h1 style="font-size: 1.85rem; font-weight: 800; line-height: 1.25; margin-bottom: 1rem;">
                    {{ $project->title }}
                </h1>

                <h3 style="font-size: 1rem; font-weight: 700; margin-top: 1.25rem; margin-bottom: 0.5rem;">
                    Deskripsi Kebutuhan Proyek
                </h3>
                <p style="color: #334155; font-size: 0.95rem; line-height: 1.7; white-space: pre-line;">
                    {{ $project->description }}
                </p>

                @if($project->deliverables_brief)
                    <h3 style="font-size: 1rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem;">
                        Target Luaran yang Diharapkan (Deliverables)
                    </h3>
                    <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; font-size: 0.9rem; color: #334155;">
                        {{ $project->deliverables_brief }}
                    </div>
                @endif

                <h3 style="font-size: 1rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;">
                    Keahlian Teknis Wajib (Required Skills)
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    @foreach($project->skills_array as $skill)
                        <span style="background: #eef2ff; color: #4338ca; font-weight: 700; font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: 999px;">
                            {{ $skill }}
                        </span>
                    @endforeach
                </div>
            </div>

            <!-- Workspace Banner if available -->
            @if($activeWorkspace)
                <div class="card" style="background: linear-gradient(135deg, #eff6ff, #dbeafe); border-color: #93c5fd;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                        <div>
                            <div style="font-weight: 800; color: #1e3a8a; font-size: 1.1rem;">Workspace Kolaboratif Aktif</div>
                            <div style="font-size: 0.85rem; color: #1d4ed8; margin-top: 0.25rem;">
                                Progres pengerjaan saat ini: <strong>{{ $activeWorkspace->progress_percent }}%</strong>
                            </div>
                        </div>
                        <a href="{{ route('workspaces.show', $activeWorkspace->id) }}" class="btn btn-primary">
                            Buka Ruang Kerja &rarr;
                        </a>
                    </div>
                </div>
            @endif
        </div>

        <!-- Right: Actions & UMKM Profile -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Action Card -->
            <div class="card">
                <div style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin-bottom: 0.25rem;">
                    Besaran Kompensasi (Stipend)
                </div>
                <div style="font-size: 1.75rem; font-weight: 800; color: #059669; margin-bottom: 1.25rem;">
                    {{ $project->stipend }}
                </div>

                @auth
                    @if(Auth::id() === $project->owner_id || Auth::user()->isAdmin())
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <a href="{{ route('projects.candidates', $project->id) }}" class="btn btn-primary" style="width: 100%;">
                                ⚡ Lihat Ranking Pelamar ({{ $project->applications->count() }})
                            </a>
                            <small style="color: var(--text-muted); font-size: 0.75rem; text-align: center;">
                                Didukung NLP SkillMatch Engine (FastAPI)
                            </small>
                        </div>
                    @elseif(Auth::user()->isStudent())
                        @if($hasApplied)
                            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-md); padding: 1rem; text-align: center;">
                                <div style="font-weight: 700; color: #166534; margin-bottom: 0.25rem;">✓ Anda Telah Melamar</div>
                                <div style="font-size: 0.8rem; color: #15803d;">
                                    Status saat ini: <strong class="badge badge-warning">{{ $userApplication->status }}</strong>
                                </div>
                            </div>
                        @elseif($project->status === 'PUBLISHED')
                            <form action="{{ route('projects.apply', $project->id) }}" method="POST">
                                @csrf
                                <div class="form-group">
                                    <label for="pitch" class="form-label">Pesan Singkat Lamaran (Pitch)</label>
                                    <textarea name="pitch" id="pitch" rows="3" class="form-control" placeholder="Jelaskan secara singkat kesiapan dan keahlian Anda untuk mengerjakan proyek ini..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" style="width: 100%;">
                                    Ajukan Lamaran Proyek
                                </button>
                            </form>
                        @else
                            <div class="alert alert-info" style="margin-bottom: 0;">
                                Proyek ini sedang tidak menerima lamaran baru.
                            </div>
                        @endif
                    @endif
                @else
                    <div style="text-align: center;">
                        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">
                            Silakan masuk untuk mengajukan lamaran ke proyek ini.
                        </p>
                        <a href="{{ route('login') }}" class="btn btn-primary" style="width: 100%;">
                            Masuk untuk Melamar
                        </a>
                    </div>
                @endauth
            </div>

            <!-- UMKM Profile Card -->
            <div class="card">
                <div style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); margin-bottom: 0.75rem;">
                    Profil Mitra Pengusul
                </div>
                
                <div style="font-weight: 800; font-size: 1.15rem; margin-bottom: 0.25rem;">
                    {{ $project->owner->umkmProfile->company_name ?? $project->owner->name }}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                    Sektor: <strong>{{ $project->owner->umkmProfile->industry ?? 'Retail' }}</strong> • {{ $project->owner->umkmProfile->business_scale ?? 'Usaha Kecil' }}
                </div>

                @if($project->owner->umkmProfile && $project->owner->umkmProfile->location)
                    <div style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                        📍 {{ $project->owner->umkmProfile->location }}
                    </div>
                @endif

                @if($project->owner->umkmProfile && $project->owner->umkmProfile->description)
                    <p style="font-size: 0.85rem; color: #475569; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
                        {{ $project->owner->umkmProfile->description }}
                    </p>
                @endif
            </div>
        </div>

    </div>

</div>
@endsection
