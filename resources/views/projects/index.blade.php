@extends('layouts.app')

@section('title', 'Katalog Kebutuhan Proyek — SkillBridge Hub')

@section('content')
<div style="display: flex; flex-direction: column; gap: 2rem;">

    <!-- Header & Search Banner -->
    <div style="background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); padding: 2rem; box-shadow: var(--shadow-sm);">
        <div style="max-width: 650px; margin-bottom: 1.5rem;">
            <h1 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem;">Katalog Proyek Terbuka</h1>
            <p style="color: var(--text-muted); font-size: 0.95rem;">
                Jelajahi berbagai kebutuhan proyek digitalisasi UMKM. Setiap proyek dirancang untuk pengerjaan terstruktur dengan stipend dan sertifikat pengalaman kerja.
            </p>
        </div>

        <form action="{{ route('projects.index') }}" method="GET" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <input type="text" name="q" value="{{ request('q') }}" placeholder="Cari berdasarkan judul, keterampilan (misal: Laravel), atau kata kunci..." class="form-control" style="flex: 1; min-width: 260px;">
            
            @if(request('category'))
                <input type="hidden" name="category" value="{{ request('category') }}">
            @endif

            <button type="submit" class="btn btn-primary">
                🔍 Cari Proyek
            </button>
            @if(request('q') || request('category'))
                <a href="{{ route('projects.index') }}" class="btn btn-secondary">Reset Filter</a>
            @endif
        </form>

        <!-- Category Filter Pills -->
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.25rem;">
            <a href="{{ route('projects.index', ['q' => request('q')]) }}" 
               class="badge {{ !request('category') ? 'badge-primary' : 'badge-secondary' }}"
               style="padding: 0.4rem 0.9rem; font-size: 0.8rem; cursor: pointer;">
               Semua Kategori
            </a>
            @foreach($categories as $cat)
                <a href="{{ route('projects.index', ['category' => $cat->id, 'q' => request('q')]) }}"
                   class="badge {{ request('category') == $cat->id ? 'badge-primary' : 'badge-secondary' }}"
                   style="padding: 0.4rem 0.9rem; font-size: 0.8rem; cursor: pointer;">
                   {{ $cat->name }} ({{ $cat->projects_count }})
                </a>
            @endforeach
        </div>
    </div>

    <!-- Project Listings -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
        @forelse($projects as $project)
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                        <span class="badge badge-secondary">{{ $project->category->name ?? 'Kategori' }}</span>
                        <span style="font-size: 0.8rem; font-weight: 700; color: #059669; background: #ecfdf5; padding: 2px 8px; border-radius: 6px;">
                            {{ $project->stipend }}
                        </span>
                    </div>

                    <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.35;">
                        <a href="{{ route('projects.show', $project->id) }}" style="color: #0f172a;">
                            {{ $project->title }}
                        </a>
                    </h2>

                    <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                        <span>⏱️ Durasi: <strong>{{ $project->duration }}</strong></span>
                        <span>👥 <strong>{{ $project->applications_count ?? $project->applications->count() }}</strong> Pelamar</span>
                    </div>

                    <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                        {{ $project->description }}
                    </p>

                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.25rem;">
                        @foreach($project->skills_array as $skill)
                            <span style="font-size: 0.725rem; font-weight: 600; background: #eef2ff; color: #4338ca; padding: 2px 8px; border-radius: 4px;">
                                #{{ $skill }}
                            </span>
                        @endforeach
                    </div>
                </div>

                <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        🏢 {{ $project->owner->umkmProfile->company_name ?? $project->owner->name }}
                    </div>
                    <a href="{{ route('projects.show', $project->id) }}" class="btn btn-outline-primary btn-sm">
                        Lihat Rincian &rarr;
                    </a>
                </div>
            </div>
        @empty
            <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
                <h3 style="font-size: 1.15rem; font-weight: 700;">Tidak ditemukan proyek yang cocok</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
                    Coba ubah kata kunci pencarian Anda atau pilih kategori lain.
                </p>
                <a href="{{ route('projects.index') }}" class="btn btn-secondary btn-sm" style="margin-top: 1rem;">Lihat Semua Proyek</a>
            </div>
        @endforelse
    </div>

    <div style="margin-top: 1rem;">
        {{ $projects->links() }}
    </div>

</div>
@endsection
