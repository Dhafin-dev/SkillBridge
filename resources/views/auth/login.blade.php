@extends('layouts.app')

@section('title', 'Masuk Akun — SkillBridge Hub')

@section('content')
<div style="max-width: 440px; margin: 2rem auto;">
    <div class="card" style="padding: 2rem;">
        <div style="text-align: center; margin-bottom: 1.75rem;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: #eef2ff; border-radius: 12px; margin-bottom: 0.75rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
            </div>
            <h1 style="font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em;">Masuk ke Akun</h1>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">
                Akses dashboard kolaborasi dan proyek Anda.
            </p>
        </div>

        <form action="{{ route('login') }}" method="POST">
            @csrf

            <div class="form-group">
                <label for="email" class="form-label">Alamat Email</label>
                <input type="email" name="email" id="email" class="form-control" value="{{ old('email') }}" required autofocus placeholder="nama@email.com">
                @error('email')
                    <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                    <label for="password" class="form-label" style="margin-bottom: 0;">Kata Sandi</label>
                </div>
                <input type="password" name="password" id="password" class="form-control" required placeholder="••••••••">
                @error('password')
                    <div style="color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;">{{ $message }}</div>
                @enderror
            </div>

            <div style="display: flex; align-items: center; margin-bottom: 1.25rem;">
                <input type="checkbox" name="remember" id="remember" style="margin-right: 0.5rem;">
                <label for="remember" style="font-size: 0.85rem; color: var(--text-muted); cursor: pointer;">Ingat sesi login saya</label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem;">
                Masuk Sekarang
            </button>
        </form>

        <!-- Quick Demo Account Switcher -->
        <div style="margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px dashed var(--border-color);">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem; text-align: center;">
                Akun Percontohan Demo (1-Click Fill)
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <button type="button" onclick="fillCreds('student@skillbridge.id', 'password')" class="btn btn-secondary btn-sm" style="justify-content: flex-start;">
                    🎓 <span><strong>Mahasiswa:</strong> student@skillbridge.id</span>
                </button>
                <button type="button" onclick="fillCreds('umkm@skillbridge.id', 'password')" class="btn btn-secondary btn-sm" style="justify-content: flex-start;">
                    🏢 <span><strong>Mitra UMKM:</strong> umkm@skillbridge.id</span>
                </button>
                <button type="button" onclick="fillCreds('admin@skillbridge.id', 'password')" class="btn btn-secondary btn-sm" style="justify-content: flex-start;">
                    🛡️ <span><strong>Administrator:</strong> admin@skillbridge.id</span>
                </button>
            </div>
        </div>

        <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-muted);">
            Belum punya akun? <a href="{{ route('register') }}" style="color: var(--primary); font-weight: 700;">Daftar di sini</a>
        </div>
    </div>
</div>

<script>
    function fillCreds(email, password) {
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
    }
</script>
@endsection
