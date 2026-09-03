@extends('layouts.app')

@section('title', 'Admin Governance Center — SkillBridge Hub')

@section('content')
<div style="display: flex; flex-direction: column; gap: 2rem;">

    <!-- Dashboard Header -->
    <div style="background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); padding: 2rem; box-shadow: var(--shadow-sm);">
        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #fef3c7; color: #92400e; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">
            🛡️ Platform Governance & Oversight Center
        </div>
        <h1 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em;">
            Dasbor Tata Kelola Administrator
        </h1>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
            Monitoring statistik ekosistem, moderasi konten brief proyek, dan pencatatan audit aktivitas keamanan.
        </p>
    </div>

    <!-- Platform Stats Cards -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
        <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Pengguna</div>
            <div style="font-size: 1.75rem; font-weight: 800; margin-top: 0.25rem;">{{ $stats['total_users'] }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                {{ $stats['total_students'] }} Mahasiswa • {{ $stats['total_umkm'] }} UMKM
            </div>
        </div>

        <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Proyek</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: #4f46e5; margin-top: 0.25rem;">{{ $stats['total_projects'] }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Semua brief terdaftar</div>
        </div>

        <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Workspace Aktif</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: #0284c7; margin-top: 0.25rem;">{{ $stats['active_workspaces'] }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Sedang berkolaborasi</div>
        </div>

        <div class="card" style="padding: 1.25rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Proyek Tuntas</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: #16a34a; margin-top: 0.25rem;">{{ $stats['completed_projects'] }}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Terselesaikan & diulas</div>
        </div>
    </div>

    <!-- Project Moderation Center -->
    <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <div>
                <h2 style="font-size: 1.25rem; font-weight: 700;">Moderasi & Manajemen Proyek Publik</h2>
                <p style="font-size: 0.825rem; color: var(--text-muted);">Ubah status publikasi proyek untuk menjaga standar konten platform.</p>
            </div>
        </div>

        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem; text-align: left;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
                        <th style="padding: 0.75rem 0.5rem;">ID</th>
                        <th style="padding: 0.75rem 0.5rem;">Judul Proyek</th>
                        <th style="padding: 0.75rem 0.5rem;">Pemilik UMKM</th>
                        <th style="padding: 0.75rem 0.5rem;">Kategori</th>
                        <th style="padding: 0.75rem 0.5rem;">Status</th>
                        <th style="padding: 0.75rem 0.5rem; text-align: right;">Aksi Moderasi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($projects as $p)
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 0.75rem 0.5rem; font-weight: 700;">#{{ $p->id }}</td>
                            <td style="padding: 0.75rem 0.5rem; font-weight: 600;">
                                <a href="{{ route('projects.show', $p->id) }}" style="color: var(--primary);">{{ $p->title }}</a>
                            </td>
                            <td style="padding: 0.75rem 0.5rem;">{{ $p->owner->name }}</td>
                            <td style="padding: 0.75rem 0.5rem;"><span class="badge badge-secondary">{{ $p->category->name }}</span></td>
                            <td style="padding: 0.75rem 0.5rem;">
                                @if($p->status === 'PUBLISHED')
                                    <span class="badge badge-success">PUBLISHED</span>
                                @elseif($p->status === 'DRAFT')
                                    <span class="badge badge-warning">DRAFT (OFF)</span>
                                @elseif($p->status === 'ACTIVE')
                                    <span class="badge badge-primary">ACTIVE</span>
                                @else
                                    <span class="badge badge-secondary">{{ $p->status }}</span>
                                @endif
                            </td>
                            <td style="padding: 0.75rem 0.5rem; text-align: right;">
                                <form action="{{ route('admin.projects.toggle', $p->id) }}" method="POST" style="display: inline;">
                                    @csrf
                                    <button type="submit" class="btn btn-secondary btn-sm" style="font-size: 0.75rem;">
                                        {{ $p->status === 'PUBLISHED' ? 'Nonaktifkan' : 'Aktifkan' }}
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <!-- Security Audit Logs Table -->
    <div class="card">
        <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Log Audit Aktivitas Administratif</h2>
        <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1.25rem;">Rekam jejak tindakan penting untuk keperluan audit keamanan sistem.</p>

        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
                        <th style="padding: 0.6rem 0.5rem;">Waktu</th>
                        <th style="padding: 0.6rem 0.5rem;">Aktor Pengguna</th>
                        <th style="padding: 0.6rem 0.5rem;">Aksi</th>
                        <th style="padding: 0.6rem 0.5rem;">Keterangan Rinci</th>
                        <th style="padding: 0.6rem 0.5rem;">IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($auditLogs as $log)
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 0.6rem 0.5rem; color: var(--text-muted);">{{ $log->created_at->format('d/m/Y H:i:s') }}</td>
                            <td style="padding: 0.6rem 0.5rem; font-weight: 600;">{{ $log->user->name ?? 'Sistem' }}</td>
                            <td style="padding: 0.6rem 0.5rem;"><span class="badge badge-secondary">{{ $log->action }}</span></td>
                            <td style="padding: 0.6rem 0.5rem; color: #334155;">{{ $log->details }}</td>
                            <td style="padding: 0.6rem 0.5rem; font-family: monospace; font-size: 0.75rem;">{{ $log->ip_address ?? '127.0.0.1' }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 1.5rem; color: var(--text-muted);">Belum ada catatan audit log.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection
