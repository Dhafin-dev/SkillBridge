@extends('layouts.app')

@section('title', 'Ubah Profil — SkillBridge Hub')

@section('content')
<div style="max-width: 680px; margin: 1rem auto;">
    <div style="margin-bottom: 1.5rem;">
        <a href="{{ route('profile.show') }}" style="color: var(--primary); font-size: 0.85rem;">← Kembali ke Profil</a>
        <h1 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 0.5rem;">
            Perbarui Informasi Profil
        </h1>
    </div>

    <div class="card">
        <form action="{{ route('profile.update') }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="name" class="form-label">Nama Lengkap</label>
                <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $user->name) }}" required>
            </div>

            <div class="form-group">
                <label for="bio" class="form-label">Bio Singkat / Ringkasan</label>
                <textarea name="bio" id="bio" rows="3" class="form-control" placeholder="Tuliskan perkenalan singkat mengenai keahlian atau latar belakang Anda...">{{ old('bio', $user->bio) }}</textarea>
            </div>

            @if($user->isStudent())
                @php $profile = $user->studentProfile; @endphp
                <div style="border-top: 1px solid var(--border-color); padding-top: 1.25rem; margin-top: 1.25rem;">
                    <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 1rem;">Data Mahasiswa & Keahlian</h3>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label for="institution" class="form-label">Institusi Pendidikan</label>
                            <input type="text" name="institution" id="institution" class="form-control" value="{{ old('institution', $profile->institution ?? '') }}" required>
                        </div>
                        <div class="form-group">
                            <label for="major" class="form-label">Program Studi</label>
                            <input type="text" name="major" id="major" class="form-control" value="{{ old('major', $profile->major ?? '') }}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="skills" class="form-label">Daftar Keahlian Teknis (Pisahkan dengan koma)</label>
                        <input type="text" name="skills" id="skills" class="form-control" value="{{ old('skills', $profile->skills ?? '') }}" placeholder="Contoh: Laravel, Blade, PostgreSQL, HTML/CSS, Python">
                        <small style="color: var(--text-muted); font-size: 0.75rem;">
                            Teks keahlian ini dianalisis oleh modul NLP SkillMatch untuk mencocokkan kualifikasi proyek.
                        </small>
                    </div>

                    <div class="form-group">
                        <label for="resume_url" class="form-label">Tautan Berkas Resume PDF (Supabase Storage)</label>
                        <input type="url" name="resume_url" id="resume_url" class="form-control" value="{{ old('resume_url', $profile->resume_url ?? '') }}" placeholder="https://...supabase.co/storage/v1/object/public/resumes/cv.pdf">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label for="github_url" class="form-label">URL GitHub</label>
                            <input type="url" name="github_url" id="github_url" class="form-control" value="{{ old('github_url', $profile->github_url ?? '') }}">
                        </div>
                        <div class="form-group">
                            <label for="linkedin_url" class="form-label">URL LinkedIn</label>
                            <input type="url" name="linkedin_url" id="linkedin_url" class="form-control" value="{{ old('linkedin_url', $profile->linkedin_url ?? '') }}">
                        </div>
                    </div>
                </div>
            @elseif($user->isUmkm())
                @php $umkm = $user->umkmProfile; @endphp
                <div style="border-top: 1px solid var(--border-color); padding-top: 1.25rem; margin-top: 1.25rem;">
                    <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 1rem;">Data Unit Usaha UMKM</h3>

                    <div class="form-group">
                        <label for="company_name" class="form-label">Nama Unit Usaha</label>
                        <input type="text" name="company_name" id="company_name" class="form-control" value="{{ old('company_name', $umkm->company_name ?? '') }}" required>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label for="industry" class="form-label">Bidang Industri</label>
                            <input type="text" name="industry" id="industry" class="form-control" value="{{ old('industry', $umkm->industry ?? '') }}" required>
                        </div>
                        <div class="form-group">
                            <label for="business_scale" class="form-label">Skala Usaha</label>
                            <select name="business_scale" id="business_scale" class="form-control" required>
                                <option value="Usaha Mikro" {{ old('business_scale', $umkm->business_scale ?? '') == 'Usaha Mikro' ? 'selected' : '' }}>Usaha Mikro</option>
                                <option value="Usaha Kecil" {{ old('business_scale', $umkm->business_scale ?? '') == 'Usaha Kecil' ? 'selected' : '' }}>Usaha Kecil</option>
                                <option value="Usaha Menengah" {{ old('business_scale', $umkm->business_scale ?? '') == 'Usaha Menengah' ? 'selected' : '' }}>Usaha Menengah</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="location" class="form-label">Lokasi / Kota</label>
                        <input type="text" name="location" id="location" class="form-control" value="{{ old('location', $umkm->location ?? '') }}">
                    </div>

                    <div class="form-group">
                        <label for="description" class="form-label">Deskripsi Usaha</label>
                        <textarea name="description" id="description" rows="3" class="form-control">{{ old('description', $umkm->description ?? '') }}</textarea>
                    </div>

                    <div class="form-group">
                        <label for="website" class="form-label">Tautan Website (Opsional)</label>
                        <input type="url" name="website" id="website" class="form-control" value="{{ old('website', $umkm->website ?? '') }}">
                    </div>
                </div>
            @endif

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
                <a href="{{ route('profile.show') }}" class="btn btn-secondary">Batal</a>
                <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</div>
@endsection
