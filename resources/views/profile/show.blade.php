@extends('layouts.app')

@section('title', 'Profil Pengguna — ' . $user->name)

@section('content')
<div style="max-width: 860px; margin: 1rem auto; display: flex; flex-direction: column; gap: 2rem;">

    <!-- Profile Header Card -->
    <div class="card" style="padding: 2.5rem; position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem;">
            <div style="display: flex; gap: 1.5rem; align-items: center;">
                <div style="width: 80px; height: 80px; border-radius: 20px; background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 2.25rem; font-weight: 800; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);">
                    {{ substr($user->name, 0, 1) }}
                </div>
                <div>
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem;">
                        <h1 style="font-size: 1.65rem; font-weight: 800; letter-spacing: -0.02em;">{{ $user->name }}</h1>
                        <span class="badge {{ $user->isStudent() ? 'badge-primary' : ($user->isUmkm() ? 'badge-success' : 'badge-warning') }}">
                            {{ $user->role }}
                        </span>
                    </div>
                    <div style="color: var(--text-muted); font-size: 0.9rem;">
                        {{ $user->email }}
                    </div>
                </div>
            </div>

            <a href="{{ route('profile.edit') }}" class="btn btn-secondary btn-sm">
                ✏️ Edit Profil
            </a>
        </div>

        @if($user->bio)
            <p style="margin-top: 1.5rem; font-size: 0.925rem; color: #334155; line-height: 1.6; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
                {{ $user->bio }}
            </p>
        @endif
    </div>

    <!-- Role-Specific Details -->
    @if($user->isStudent())
        @php $profile = $user->studentProfile; @endphp
        <div class="card">
            <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem;">Informasi Akademik & Portofolio</h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Institusi Pendidikan</div>
                    <div style="font-size: 1rem; font-weight: 700; margin-top: 0.25rem;">{{ $profile->institution ?? '-' }}</div>
                </div>
                <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Program Studi</div>
                    <div style="font-size: 1rem; font-weight: 700; margin-top: 0.25rem;">{{ $profile->major ?? '-' }}</div>
                </div>
                <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Akumulasi Skor Portofolio</div>
                    <div style="font-size: 1.25rem; font-weight: 800; color: #4f46e5; margin-top: 0.25rem;">⭐ {{ $profile->portfolio_score ?? 0 }} Poin</div>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">
                    Keahlian Teknis Terdaftar (Skill Tags)
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    @if($profile && $profile->skills_array)
                        @foreach($profile->skills_array as $sk)
                            <span style="background: #eef2ff; color: #4338ca; font-weight: 700; font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: 999px;">
                                {{ $sk }}
                            </span>
                        @endforeach
                    @else
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Belum ada keahlian yang ditambahkan.</span>
                    @endif
                </div>
            </div>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
                @if($profile && $profile->resume_url)
                    <a href="{{ $profile->resume_url }}" target="_blank" class="btn btn-outline-primary btn-sm">
                        📄 Unduh Resume CV (PDF)
                    </a>
                @endif
                @if($profile && $profile->github_url)
                    <a href="{{ $profile->github_url }}" target="_blank" class="btn btn-secondary btn-sm">
                        🔗 Profil GitHub
                    </a>
                @endif
                @if($profile && $profile->linkedin_url)
                    <a href="{{ $profile->linkedin_url }}" target="_blank" class="btn btn-secondary btn-sm">
                        🔗 Profil LinkedIn
                    </a>
                @endif
            </div>
        </div>
    @elseif($user->isUmkm())
        @php $umkm = $user->umkmProfile; @endphp
        <div class="card">
            <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem;">Informasi Unit Usaha UMKM</h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Nama Unit Usaha</div>
                    <div style="font-size: 1rem; font-weight: 700; margin-top: 0.25rem;">{{ $umkm->company_name ?? '-' }}</div>
                </div>
                <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Bidang Industri</div>
                    <div style="font-size: 1rem; font-weight: 700; margin-top: 0.25rem;">{{ $umkm->industry ?? '-' }}</div>
                </div>
                <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Skala Usaha</div>
                    <div style="font-size: 1rem; font-weight: 700; margin-top: 0.25rem;">{{ $umkm->business_scale ?? '-' }}</div>
                </div>
            </div>

            @if($umkm && $umkm->description)
                <div style="margin-bottom: 1.25rem;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.25rem; text-transform: uppercase;">Deskripsi Usaha</div>
                    <p style="font-size: 0.9rem; color: #334155;">{{ $umkm->description }}</p>
                </div>
            @endif

            @if($umkm && $umkm->website)
                <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <a href="{{ $umkm->website }}" target="_blank" class="btn btn-secondary btn-sm">
                        🌐 Kunjungi Website Unit Usaha
                    </a>
                </div>
            @endif
        </div>
    @endif

    <!-- Reviews Received Card -->
    @if($user->reviewsReceived->isNotEmpty())
        <div class="card">
            <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem;">Ulasan & Evaluasi Terverifikasi ({{ $user->reviewsReceived->count() }})</h2>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                @foreach($user->reviewsReceived as $review)
                    <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <strong>{{ $review->author->name }}</strong>
                            <span>{{ str_repeat('⭐', $review->rating) }}</span>
                        </div>
                        <p style="font-size: 0.875rem; color: #334155;">
                            "{{ $review->comment }}"
                        </p>
                        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">
                            Proyek: {{ $review->project->title ?? 'Kolaborasi' }}
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif

</div>
@endsection
