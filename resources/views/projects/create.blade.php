@extends('layouts.app')

@section('title', 'Publikasikan Brief Kebutuhan Proyek — SkillBridge Hub')

@section('content')
<div style="max-width: 780px; margin: 1rem auto;">
    <div style="margin-bottom: 1.5rem;">
        <a href="{{ route('projects.index') }}" style="color: var(--primary); font-size: 0.85rem;">← Kembali ke Katalog Proyek</a>
        <h1 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 0.5rem;">
            Publikasikan Kebutuhan Proyek Baru
        </h1>
        <p style="color: var(--text-muted); font-size: 0.9rem;">
            Deskripsikan kebutuhan digitalisasi usaha Anda. Sistem SkillMatch Engine akan membantu menemukan dan merangking talenta mahasiswa yang paling relevan.
        </p>
    </div>

    <div class="card">
        <form action="{{ route('projects.store') }}" method="POST">
            @csrf

            <div class="form-group">
                <label for="title" class="form-label">Judul Brief Proyek</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ old('title') }}" required placeholder="Contoh: Pembuatan Website Katalog Produk Digital & WhatsApp Order">
                @error('title')
                    <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                @enderror
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label for="category_id" class="form-label">Kategori Proyek</label>
                    <select name="category_id" id="category_id" class="form-control" required>
                        <option value="">-- Pilih Kategori --</option>
                        @foreach($categories as $cat)
                            <option value="{{ $cat->id }}" {{ old('category_id') == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('category_id')
                        <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="duration" class="form-label">Estimasi Durasi Pengerjaan</label>
                    <input type="text" name="duration" id="duration" class="form-control" value="{{ old('duration', '4 Minggu') }}" required placeholder="Contoh: 3 Minggu, 1 Bulan">
                </div>
            </div>

            <div class="form-group">
                <label for="stipend" class="form-label">Besaran Kompensasi / Stipend</label>
                <input type="text" name="stipend" id="stipend" class="form-control" value="{{ old('stipend', 'Rp 1.500.000') }}" required placeholder="Contoh: Rp 2.000.000">
            </div>

            <div class="form-group">
                <label for="required_skills" class="form-label">Keahlian Teknis yang Dibutuhkan (Pisahkan dengan koma)</label>
                <input type="text" name="required_skills" id="required_skills" class="form-control" value="{{ old('required_skills') }}" required placeholder="Contoh: Laravel, Blade, PostgreSQL, HTML/CSS, PHP">
                <small style="color: var(--text-muted); font-size: 0.75rem;">
                    Keahlian ini akan dianalisis secara semantik oleh algoritma TF-IDF & Cosine Similarity untuk memeringkatkan pelamar.
                </small>
            </div>

            <div class="form-group">
                <label for="description" class="form-label">Deskripsi Lengkap Kebutuhan Proyek</label>
                <textarea name="description" id="description" rows="5" class="form-control" required placeholder="Jelaskan latar belakang unit usaha, permasalahan yang ingin diselesaikan, dan rincian fitur atau tugas yang harus dikerjakan mahasiswa...">{{ old('description') }}</textarea>
                @error('description')
                    <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="deliverables_brief" class="form-label">Target Hasil Luaran (Deliverables) yang Diharapkan</label>
                <textarea name="deliverables_brief" id="deliverables_brief" rows="3" class="form-control" placeholder="Contoh: Source code di GitHub, panduan instalasi, dan video demonstrasi singkat...">{{ old('deliverables_brief') }}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
                <a href="{{ route('projects.index') }}" class="btn btn-secondary">Batal</a>
                <button type="submit" class="btn btn-primary">
                    🚀 Publikasikan Brief Proyek
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
