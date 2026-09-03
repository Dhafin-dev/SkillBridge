@extends('layouts.app')

@section('title', 'Pendaftaran Akun Baru — SkillBridge Hub')

@section('content')
<div style="max-width: 540px; margin: 2rem auto;">
    <div class="card" style="padding: 2rem;">
        <div style="text-align: center; margin-bottom: 1.75rem;">
            <h1 style="font-size: 1.65rem; font-weight: 800; letter-spacing: -0.02em;">Buat Akun Baru</h1>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">
                Bergabunglah dengan ekosistem kolaborasi talenta dan industri lokal.
            </p>
        </div>

        <form action="{{ route('register') }}" method="POST">
            @csrf

            <!-- Role Selector -->
            <div class="form-group">
                <label class="form-label">Daftar Sebagai:</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <label style="border: 2px solid var(--border-color); border-radius: var(--radius-md); padding: 0.85rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: all 0.2s;" id="label-student">
                        <input type="radio" name="role" value="STUDENT" {{ old('role', 'STUDENT') === 'STUDENT' ? 'checked' : '' }} onchange="updateRoleFields()">
                        <div>
                            <div style="font-weight: 700; font-size: 0.9rem;">🎓 Mahasiswa</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Pencari proyek & portofolio</div>
                        </div>
                    </label>

                    <label style="border: 2px solid var(--border-color); border-radius: var(--radius-md); padding: 0.85rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: all 0.2s;" id="label-umkm">
                        <input type="radio" name="role" value="UMKM" {{ old('role') === 'UMKM' ? 'checked' : '' }} onchange="updateRoleFields()">
                        <div>
                            <div style="font-weight: 700; font-size: 0.9rem;">🏢 Mitra UMKM</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">Pemilik brief kebutuhan proyek</div>
                        </div>
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="name" class="form-label">Nama Lengkap / Nama Kontak</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name') }}" required placeholder="Contoh: Ahmad Dhafin Al Farisy">
                @error('name')
                    <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="email" class="form-label">Alamat Email</label>
                <input type="email" name="email" id="email" class="form-control" value="{{ old('email') }}" required placeholder="nama@email.com">
                @error('email')
                    <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                @enderror
            </div>

            <!-- Dynamic Student Fields -->
            <div id="student-fields">
                <div class="form-group">
                    <label for="institution" class="form-label">Asal Universitas / Perguruan Tinggi</label>
                    <input type="text" name="institution" id="institution" class="form-control" value="{{ old('institution', 'Universitas Airlangga') }}" placeholder="Contoh: Universitas Airlangga">
                </div>
                <div class="form-group">
                    <label for="skills" class="form-label">Keahlian Teknis (Pisahkan dengan koma)</label>
                    <input type="text" name="skills" id="skills" class="form-control" value="{{ old('skills') }}" placeholder="Contoh: Laravel, Blade, PostgreSQL, HTML/CSS, Python">
                    <small style="color: var(--text-muted); font-size: 0.75rem;">Data ini digunakan oleh SkillMatch Engine untuk menghitung skor kecocokan.</small>
                </div>
            </div>

            <!-- Dynamic UMKM Fields -->
            <div id="umkm-fields" style="display: none;">
                <div class="form-group">
                    <label for="company_name" class="form-label">Nama Unit Usaha / UMKM</label>
                    <input type="text" name="company_name" id="company_name" class="form-control" value="{{ old('company_name') }}" placeholder="Contoh: CV Kreasi Mandiri">
                </div>
                <div class="form-group">
                    <label for="industry" class="form-label">Sektor Industri</label>
                    <input type="text" name="industry" id="industry" class="form-control" value="{{ old('industry') }}" placeholder="Contoh: Kuliner (F&B), Retail, Jasa, Digital">
                </div>
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Kata Sandi</label>
                <input type="password" name="password" id="password" class="form-control" required placeholder="Minimal 6 karakter">
                @error('password')
                    <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="password_confirmation" class="form-label">Ulangi Kata Sandi</label>
                <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" required placeholder="Konfirmasi kata sandi">
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem; margin-top: 0.5rem;">
                Daftar & Mulai Kolaborasi
            </button>
        </form>

        <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-muted);">
            Sudah memiliki akun? <a href="{{ route('login') }}" style="color: var(--primary); font-weight: 700;">Masuk di sini</a>
        </div>
    </div>
</div>

<script>
    function updateRoleFields() {
        const isStudent = document.querySelector('input[name="role"]:checked').value === 'STUDENT';
        const studentFields = document.getElementById('student-fields');
        const umkmFields = document.getElementById('umkm-fields');
        const labelStudent = document.getElementById('label-student');
        const labelUmkm = document.getElementById('label-umkm');

        if (isStudent) {
            studentFields.style.display = 'block';
            umkmFields.style.display = 'none';
            labelStudent.style.borderColor = 'var(--primary)';
            labelStudent.style.background = '#eef2ff';
            labelUmkm.style.borderColor = 'var(--border-color)';
            labelUmkm.style.background = 'transparent';
        } else {
            studentFields.style.display = 'none';
            umkmFields.style.display = 'block';
            labelUmkm.style.borderColor = 'var(--primary)';
            labelUmkm.style.background = '#eef2ff';
            labelStudent.style.borderColor = 'var(--border-color)';
            labelStudent.style.background = 'transparent';
        }
    }
    // Inisialisasi saat load
    document.addEventListener('DOMContentLoaded', updateRoleFields);
</script>
@endsection
