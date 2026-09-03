@extends('layouts.app')

@section('title', 'Ruang Kerja Kolaboratif (Workspace) — ' . $workspace->project->title)

@section('content')
<div style="display: flex; flex-direction: column; gap: 2rem;">

    <!-- Workspace Header Card -->
    <div style="background: #ffffff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); padding: 2rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #e0e7ff; color: #3730a3; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">
                    💼 Ruang Kerja Kolaboratif (Workspace #{{ $workspace->id }})
                </div>
                <h1 style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.02em;">
                    {{ $workspace->project->title }}
                </h1>
                <div style="display: flex; gap: 1.25rem; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem; flex-wrap: wrap;">
                    <span>Mitra UMKM: <strong>{{ $workspace->umkm->umkmProfile->company_name ?? $workspace->umkm->name }}</strong></span>
                    <span>•</span>
                    <span>Talenta Mahasiswa: <strong>{{ $workspace->student->name }}</strong> ({{ $workspace->student->studentProfile->institution ?? 'UNAIR' }})</span>
                    <span>•</span>
                    <span>Kompensasi: <strong style="color: #059669;">{{ $workspace->project->stipend }}</strong></span>
                </div>
            </div>

            <div>
                @if($workspace->status === 'ACTIVE')
                    <span class="badge badge-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                        ⚡ Sedang Berjalan
                    </span>
                @else
                    <span class="badge badge-success" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                        ✓ Proyek Selesai & Tuntas
                    </span>
                @endif
            </div>
        </div>

        <!-- Dynamic Progress Bar -->
        <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem;">
                <span>Pelacakan Kemajuan Proyek (Dynamic Progress)</span>
                <span style="color: var(--primary);">{{ $workspace->progress_percent }}% Tuntas</span>
            </div>
            <div style="width: 100%; height: 12px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
                <div style="width: {{ $workspace->progress_percent }}%; height: 100%; background: linear-gradient(90deg, #4f46e5, #0ea5e9); border-radius: 999px; transition: width 0.4s ease;"></div>
            </div>
        </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">

        <!-- Left Column: Milestone Checklist -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                    <div>
                        <h2 style="font-size: 1.2rem; font-weight: 700;">Checklist Tugas Milestone</h2>
                        <p style="font-size: 0.825rem; color: var(--text-muted);">Centang tugas yang telah diselesaikan untuk memperbarui persentase kemajuan secara otomatis.</p>
                    </div>
                    @if($workspace->status === 'ACTIVE')
                        <button onclick="document.getElementById('task-form').style.display = 'block'" class="btn btn-primary btn-sm">
                            + Tambah Tugas
                        </button>
                    @endif
                </div>

                <!-- Add Task Inline Form -->
                <div id="task-form" style="display: none; background: #f8fafc; border: 1px dashed var(--primary); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
                    <form action="{{ route('workspaces.tasks.store', $workspace->id) }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label class="form-label" style="font-size: 0.8rem;">Judul Tugas Milestone</label>
                            <input type="text" name="title" required class="form-control" placeholder="Contoh: Pembuatan mockup halaman checkout">
                        </div>
                        <div class="form-group">
                            <label class="form-label" style="font-size: 0.8rem;">Tenggat Waktu (Due Date)</label>
                            <input type="date" name="due_date" class="form-control">
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                            <button type="button" onclick="document.getElementById('task-form').style.display = 'none'" class="btn btn-secondary btn-sm">Batal</button>
                            <button type="submit" class="btn btn-primary btn-sm">Simpan Tugas</button>
                        </div>
                    </form>
                </div>

                <!-- Task Items -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    @forelse($workspace->tasks as $task)
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: {{ $task->completed ? '#f8fafc' : '#ffffff' }};">
                            <form action="{{ route('tasks.toggle', $task->id) }}" method="POST" style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
                                @csrf
                                @method('PATCH')
                                <input type="checkbox" onchange="this.form.submit()" {{ $task->completed ? 'checked' : '' }} style="width: 18px; height: 18px; cursor: pointer;">
                                <span style="font-size: 0.925rem; font-weight: 500; {{ $task->completed ? 'text-decoration: line-through; color: var(--text-muted);' : 'color: #0f172a;' }}">
                                    {{ $task->title }}
                                </span>
                            </form>

                            @if($task->due_date)
                                <span style="font-size: 0.75rem; color: var(--text-muted); background: #f1f5f9; padding: 2px 8px; border-radius: 4px;">
                                    Tenggat: {{ $task->due_date->format('d M Y') }}
                                </span>
                            @endif
                        </div>
                    @empty
                        <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.9rem;">
                            Belum ada tugas milestone yang dibuat.
                        </div>
                    @endforelse
                </div>
            </div>

            <!-- Deliverables Submission Card -->
            <div class="card">
                <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Penyerahan Hasil Kerja (Deliverables)</h2>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    Mahasiswa dapat menyerahkan tautan repositori kode sumber, tautan dokumen, atau berkas final proyek di sini.
                </p>

                @if($workspace->deliverable_url)
                    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span class="badge badge-success" style="margin-bottom: 0.5rem;">✓ Berkas Telah Diserahkan</span>
                                <div style="font-size: 0.9rem; font-weight: 700;">
                                    <a href="{{ $workspace->deliverable_url }}" target="_blank" style="color: #059669; text-decoration: underline;">
                                        🔗 Buka Tautan Luaran Proyek
                                    </a>
                                </div>
                                @if($workspace->deliverable_notes)
                                    <p style="font-size: 0.85rem; color: #166534; margin-top: 0.5rem;">
                                        <strong>Catatan Mahasiswa:</strong> {{ $workspace->deliverable_notes }}
                                    </p>
                                @endif
                            </div>
                        </div>
                    </div>
                @endif

                @if(Auth::id() === $workspace->student_id && $workspace->status === 'ACTIVE')
                    <form action="{{ route('workspaces.deliverable', $workspace->id) }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="deliverable_url" class="form-label">Tautan Berkas / Repositori Hasil Kerja (URL)</label>
                            <input type="url" name="deliverable_url" id="deliverable_url" class="form-control" value="{{ old('deliverable_url', $workspace->deliverable_url) }}" required placeholder="https://github.com/... atau https://drive.google.com/...">
                        </div>
                        <div class="form-group">
                            <label for="deliverable_notes" class="form-label">Catatan Penjelasan Hasil Kerja</label>
                            <textarea name="deliverable_notes" id="deliverable_notes" rows="3" class="form-control" placeholder="Jelaskan ringkasan pekerjaan yang telah Anda selesaikan...">{{ old('deliverable_notes', $workspace->deliverable_notes) }}</textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            Serahkan Hasil Kerja ke Mitra UMKM
                        </button>
                    </form>
                @endif

                @if(Auth::id() === $workspace->umkm_id && $workspace->status === 'ACTIVE')
                    <div style="border-top: 1px solid var(--border-color); padding-top: 1.25rem; margin-top: 1rem;">
                        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;">Validasi Penyelesaian Proyek</h3>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
                            Jika hasil kerja telah diperiksa dan disetujui, klik tombol di bawah untuk menyelesaikan proyek dan membuka evaluasi ulasan dua arah.
                        </p>
                        <form action="{{ route('workspaces.complete', $workspace->id) }}" method="POST">
                            @csrf
                            <button type="submit" class="btn btn-success" style="width: 100%;" onclick="return confirm('Apakah Anda yakin menyetujui seluruh luaran dan menyatakan proyek ini tuntas?')">
                                ✓ Setujui Luaran & Selesaikan Proyek
                            </button>
                        </form>
                    </div>
                @endif
            </div>

        </div>

        <!-- Right Column: Two-Way Review & Info -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <!-- Two-Way Review Card -->
            <div class="card">
                <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Evaluasi Ulasan Dua Arah</h2>
                <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    Penilaian timbal balik setelah proyek diselesaikan untuk membangun rekam jejak portofolio terverifikasi.
                </p>

                @if($workspace->status === 'COMPLETED')
                    @if(!$userReview)
                        <!-- Form Review -->
                        <form action="{{ route('reviews.store') }}" method="POST">
                            @csrf
                            <input type="hidden" name="workspace_id" value="{{ $workspace->id }}">

                            <div class="form-group">
                                <label for="rating" class="form-label">Rating Penilaian (1 - 5 Bintang)</label>
                                <select name="rating" id="rating" class="form-control" required>
                                    <option value="5">⭐⭐⭐⭐⭐ 5 Bintang (Sangat Memuaskan)</option>
                                    <option value="4">⭐⭐⭐⭐ 4 Bintang (Baik)</option>
                                    <option value="3">⭐⭐⭐ 3 Bintang (Cukup)</option>
                                    <option value="2">⭐⭐ 2 Bintang (Kurang)</option>
                                    <option value="1">⭐ 1 Bintang (Tidak Memuaskan)</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="comment" class="form-label">Komentar & Ulasan Rekomendasi</label>
                                <textarea name="comment" id="comment" rows="4" class="form-control" required placeholder="Tuliskan apresiasi atau umpan balik konstruktif selama pengerjaan proyek..."></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width: 100%;">
                                Kirim Evaluasi Ulasan
                            </button>
                        </form>
                    @else
                        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: var(--radius-md); padding: 1rem; text-align: center;">
                            <div style="font-weight: 700; color: #166534;">✓ Anda Telah Memberikan Ulasan</div>
                            <div style="font-size: 1.1rem; margin: 0.25rem 0;">
                                {{ str_repeat('⭐', $userReview->rating) }}
                            </div>
                            <p style="font-size: 0.85rem; color: #15803d;">
                                "{{ $userReview->comment }}"
                            </p>
                        </div>
                    @endif
                @else
                    <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                        🔒 Fitur ulasan dua arah akan aktif secara otomatis setelah pihak UMKM menyatakan proyek tuntas (Status COMPLETED).
                    </div>
                @endif

                <!-- List of Reviews in this Workspace -->
                @if($workspace->reviews->isNotEmpty())
                    <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                        <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.75rem;">Riwayat Ulasan Tersimpan:</div>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            @foreach($workspace->reviews as $rev)
                                <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem; font-size: 0.85rem;">
                                    <div style="display: flex; justify-content: space-between; font-weight: 700;">
                                        <span>{{ $rev->author->name }}</span>
                                        <span>{{ str_repeat('⭐', $rev->rating) }}</span>
                                    </div>
                                    <p style="color: #475569; margin-top: 0.25rem; font-size: 0.8rem;">
                                        "{{ $rev->comment }}"
                                    </p>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif
            </div>

            <!-- Workspace Member Info -->
            <div class="card">
                <h3 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; color: var(--text-muted);">
                    Anggota Kolaborasi
                </h3>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                            M
                        </div>
                        <div>
                            <div style="font-weight: 700; font-size: 0.9rem;">{{ $workspace->student->name }}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Talenta Mahasiswa</div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                            U
                        </div>
                        <div>
                            <div style="font-weight: 700; font-size: 0.9rem;">{{ $workspace->umkm->name }}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">{{ $workspace->umkm->umkmProfile->company_name ?? 'Mitra UMKM' }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>
@endsection
