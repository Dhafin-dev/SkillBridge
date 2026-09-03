@extends('layouts.app')

@section('title', 'Ranking Pelamar Proyek (SkillMatch Engine) — ' . $project->title)

@section('content')
<div style="display: flex; flex-direction: column; gap: 2rem;">

    <!-- Header Section -->
    <div style="background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); padding: 2rem; box-shadow: var(--shadow-sm);">
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            <a href="{{ route('projects.show', $project->id) }}" style="color: var(--primary);">← Kembali ke Detail Proyek</a>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
            <div>
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #eef2ff; color: #4338ca; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">
                    ⚡ SkillMatch NLP Decision Support Engine
                </div>
                <h1 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em;">
                    Pemeringkatan Pelamar: {{ $project->title }}
                </h1>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
                    Total Pelamar: <strong>{{ count($applications) }} Mahasiswa</strong> • Model Komputasi: <em>TF-IDF Vectorizer & Cosine Similarity</em>
                </p>
            </div>

            <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.85rem 1.25rem;">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Required Skills Proyek</div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem;">
                    @foreach($project->skills_array as $skill)
                        <span style="font-size: 0.75rem; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 4px;">
                            {{ $skill }}
                        </span>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    <!-- Candidate Ranking List -->
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        @forelse($applications as $index => $app)
            @php
                $student = $app->student;
                $profile = $student->studentProfile;
                $score = $app->match_score;
                $scoreColor = ($score >= 70) ? '#10b981' : (($score >= 40) ? '#3b82f6' : '#f59e0b');
                $scoreBg = ($score >= 70) ? '#ecfdf5' : (($score >= 40) ? '#eff6ff' : '#fffbeb');
                $isTop = ($index === 0 && $score > 0);
            @endphp

            <div class="card" style="border-left: 6px solid {{ $scoreColor }}; position: relative; {{ $isTop ? 'box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.1);' : '' }}">
                @if($isTop)
                    <div style="position: absolute; top: -10px; right: 24px; background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: #ffffff; font-size: 0.7rem; font-weight: 800; padding: 2px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        ⭐ Rekomendasi Utama (Rank #1)
                    </div>
                @endif

                <div style="display: grid; grid-template-columns: auto 1fr auto; gap: 1.5rem; align-items: center;">
                    
                    <!-- Rank Number Circle -->
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: {{ $scoreBg }}; color: {{ $scoreColor }}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem; border: 2px solid {{ $scoreColor }};">
                        #{{ $index + 1 }}
                    </div>

                    <!-- Candidate Details -->
                    <div>
                        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                            <h2 style="font-size: 1.25rem; font-weight: 700; color: #0f172a;">
                                {{ $student->name }}
                            </h2>
                            <span class="badge badge-secondary">
                                🎓 {{ $profile->institution ?? 'Mahasiswa' }} • {{ $profile->major ?? 'S1' }}
                            </span>
                            @if($profile && $profile->portfolio_score)
                                <span class="badge badge-primary">
                                    ⭐ Skor Portofolio: {{ $profile->portfolio_score }}
                                </span>
                            @endif
                        </div>

                        <!-- Match Score Bar -->
                        <div style="margin: 0.85rem 0; max-width: 450px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                                <span style="color: {{ $scoreColor }};">Kesesuaian SkillMatch</span>
                                <span>{{ $score }}% Cocok</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
                                <div style="width: {{ min(100, $score) }}%; height: 100%; background: {{ $scoreColor }}; border-radius: 999px; transition: width 0.5s ease;"></div>
                            </div>
                        </div>

                        <!-- Pitch message -->
                        @if($app->pitch)
                            <div style="background: #f8fafc; border-left: 3px solid var(--border-color); padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.85rem; color: #475569; margin-bottom: 0.75rem;">
                                <em>"{{ $app->pitch }}"</em>
                            </div>
                        @endif

                        <!-- Candidate Skills -->
                        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center;">
                            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Keahlian Profil:</span>
                            @if($profile && $profile->skills_array)
                                @foreach($profile->skills_array as $sk)
                                    @php
                                        $isMatched = in_array(strtolower(trim($sk)), array_map('strtolower', $project->skills_array));
                                    @endphp
                                    <span style="font-size: 0.725rem; font-weight: 600; padding: 2px 8px; border-radius: 4px; {{ $isMatched ? 'background: #dcfce7; color: #15803d; border: 1px solid #86efac;' : 'background: #f1f5f9; color: #475569;' }}">
                                        {{ $sk }} {{ $isMatched ? '✓' : '' }}
                                    </span>
                                @endforeach
                            @endif
                        </div>
                    </div>

                    <!-- Action Controls -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; min-width: 160px; text-align: right;">
                        @if($app->status === 'ACCEPTED')
                            <span class="badge badge-success" style="padding: 0.5rem 1rem; font-size: 0.85rem; justify-content: center;">
                                ✓ Kandidat Diterima
                            </span>
                            @php
                                $ws = \App\Models\Workspace::where('project_id', $project->id)->where('student_id', $student->id)->first();
                            @endphp
                            @if($ws)
                                <a href="{{ route('workspaces.show', $ws->id) }}" class="btn btn-outline-primary btn-sm" style="margin-top: 0.25rem;">
                                    Buka Ruang Kerja &rarr;
                                </a>
                            @endif
                        @elseif($app->status === 'REJECTED')
                            <span class="badge badge-secondary" style="padding: 0.5rem 1rem; font-size: 0.85rem; justify-content: center;">
                                ✕ Ditolak
                            </span>
                        @else
                            <form action="{{ route('applications.accept', $app->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-success btn-sm" style="width: 100%;" onclick="return confirm('Terima kandidat {{ $student->name }} dan otomatis buka ruang kerja (Workspace)?')">
                                    ✓ Terima & Buat Workspace
                                </button>
                            </form>
                            <form action="{{ route('applications.reject', $app->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-secondary btn-sm" style="width: 100%; color: #dc2626;" onclick="return confirm('Tolak lamaran kandidat ini?')">
                                    Tolak Pelamar
                                </button>
                            </form>
                        @endif

                        @if($profile && $profile->resume_url)
                            <a href="{{ $profile->resume_url }}" target="_blank" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; justify-content: center;">
                                📄 Unduh Resume CV
                            </a>
                        @endif
                    </div>

                </div>
            </div>
        @empty
            <div class="card" style="text-align: center; padding: 3rem;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📥</div>
                <h3 style="font-size: 1.15rem; font-weight: 700;">Belum ada pelamar untuk proyek ini</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
                    Kandidat mahasiswa yang melamar akan otomatis dianalisis dan diperingkatkan di sini.
                </p>
            </div>
        @endforelse
    </div>

</div>
@endsection
