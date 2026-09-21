/* ─── SkillBridge Hub: Screens & Interactive Mobile Data ─────────────────────── */

const I = {
  home: '<path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z"/>',
  spark: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19.5c.5-3.4 3.2-5.4 6.2-5.4s5.7 2 6.2 5.4"/><path d="M16.5 5.6a3.2 3.2 0 010 5.6M18 14.4c2 .7 3.3 2.4 3.6 5.1"/>',
  grad: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 01-11.9 7.6L4 20.5l1.4-4.6A8.4 8.4 0 1121 11.5z"/><path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',
  doc: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
  badge: '<path d="M12 2l3 6 6 .8-4.5 4.5 1 6.2-5.5-3.2-5.5 3.2 1-6.2L2 8.8l6-.8z"/>',
  pin: '<path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  chevronR: '<path d="M9 5l7 7-7 7"/>',
  arrowUpRight: '<path d="M7 17L17 7M7 7h10v10"/>',
  shield: '<path d="M12 3l7.5 3.5v5c0 4.3-3.1 8.2-7.5 9.5-4.4-1.3-7.5-5.2-7.5-9.5v-5z"/>',
  building: '<path d="M4 21V5.5L12 3l8 2.5V21"/><path d="M2.5 21h19M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
  download: '<path d="M12 4v12M7 11l5 5 5-5M4 19h16"/>',
  send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>'
};

const ic = (n, c = 'i') => `<svg class="${c}" viewBox="0 0 24 24">${I[n] || ''}</svg>`;
const rp = (n) => 'Rp' + n.toLocaleString('id-ID');

/* ─── Hero Wallpaper Engine ─────────────────────────────────────────────── */
let WP = 'vibrant';
const HERO_BG = {
  vibrant: () => `
    <div class="wp wp1">
      <div class="glow"></div>
      <div class="ring"></div>
      <div class="scrim"></div>
    </div>`,
  unair: () => `
    <div class="wp wp2">
      <div class="gold-circle"></div>
      <div class="scrim"></div>
    </div>`,
  emerald: () => `
    <div class="wp wp3">
      <div class="pat"></div>
      <div class="scrim"></div>
    </div>`,
  slate: () => `
    <div class="wp wp4">
      <div class="grid-line"></div>
      <div class="scrim"></div>
    </div>`,
  white: () => `
    <div class="wp wp5">
      <div class="soft-blob"></div>
      <div class="scrim" style="background:linear-gradient(180deg,rgba(255,255,255,.2),rgba(241,245,249,.85))"></div>
    </div>`,
  violet: () => `
    <div class="wp wp6">
      <div class="glow"></div>
      <div class="scrim"></div>
    </div>`
};

const WP_MODE = {
  white: { light: true }
};

function setWp(w) {
  WP = w;
  ['vibrant', 'unair', 'emerald', 'slate', 'white', 'violet'].forEach(x => {
    const el = document.getElementById('wp-' + x);
    if (el) el.classList.toggle('on', x === w);
  });
  renderMobile();
}

/* ══════════════════════════════════════════════════════════════════════════════
   ROLE 1: MAHASISWA / TALENTA (STUDENT)
   ══════════════════════════════════════════════════════════════════════════════ */
const STUDENT_SCREENS = [
  {
    name: 'Beranda Talenta',
    note: {
      tag: 'Mahasiswa · Peluang & AI Match',
      h: 'Personalisasi Proyek Berbasis Profil NLP',
      p: [
        '<b>Masalah nyata:</b> Mahasiswa sering bingung memilih proyek yang cocok dengan keahliannya di antara ratusan lowongan acak.',
        'Di SkillBridge Hub, mesin <b>NLP SkillMatch</b> menganalisis kata kunci keahlian, minat, dan riwayat tugas kuliah untuk menghitung skor kecocokan persentase (*Cosine Similarity*).',
        '<b>Kartu Fokus</b> terdepan langsung menjawab status lamaran aktif tanpa perlu bolak-balik cek email.'
      ],
      src: 'Referensi: Algoritma TF-IDF & Cosine Similarity pada Dokumen Perencanaan (BAB 4.6).'
    },
    tabs: 0,
    html: `
    <div class="hero">
      <div class="fg">
        <div class="greet">Selamat Pagi, Mahasiswa 👋</div>
        <div class="name">Ahmad Dhafin</div>
        <div class="sub-meta">
          <span>S1 Sistem Informasi · UNAIR</span>
          <span class="badge">IPK 3.89</span>
        </div>
      </div>
    </div>

    <div class="focus-card">
      <div class="head">
        <span>LAMARAN BERJALAN</span>
        <span class="pill ok" style="background:rgba(255,255,255,.25);color:#fff">Wawancara Online</span>
      </div>
      <div class="title">CV Tanggulangin Leather Goods</div>
      <div class="desc">Redesain UI/UX &amp; Katalog E-Commerce Pengrajin</div>
      <div style="margin-top:10px">
        <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;opacity:.9">
          <span>Proses Seleksi</span>
          <span>Tahap 2 dari 3</span>
        </div>
        <div class="bar" style="height:5px;background:rgba(255,255,255,.25)"><i style="width:66%;background:#fff"></i></div>
      </div>
      <div class="act">
        <div class="btn-solid" onclick="go(1)">${ic('doc','i-sm')} Lihat Detail Proyek</div>
        <div class="btn-ghost" onclick="go(2)">Ruang Kerja</div>
      </div>
    </div>

    <div class="m-pad">
      <div class="m-sec-h">
        <h3>Rekomendasi NLP SkillMatch</h3>
        <a href="javascript:void(0)" onclick="go(1)">Lihat Semua (8)</a>
      </div>

      <!-- Proyek 1 (Top Match) -->
      <div class="m-card" style="border-left:4px solid var(--ok);cursor:pointer" onclick="go(1)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="match-score high">${ic('spark','i-xs')} 94% MATCH</span>
          <span style="font-size:11.5px;font-weight:700;color:var(--brand)">${rp(2500000)}</span>
        </div>
        <div style="font-size:14px;font-weight:800;color:var(--ink);margin-top:8px">
          Redesain UI/UX &amp; Katalog Digital
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">
          CV Tanggulangin Leather · Sidoarjo
        </div>
        <div class="skill-tags">
          <span class="skill-pill match">${ic('check','i-xs')} Figma</span>
          <span class="skill-pill match">${ic('check','i-xs')} UI/UX Design</span>
          <span class="skill-pill match">${ic('check','i-xs')} Tailwind</span>
          <span class="skill-pill missing">SEO Dasar</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted);margin-top:10px;padding-top:8px;border-top:1px solid var(--line-soft)">
          <span>⏱️ Durasi: 4 Minggu</span>
          <span style="font-weight:700;color:var(--ok)">🎓 Ekuivalensi 3 SKS</span>
        </div>
      </div>

      <!-- Proyek 2 -->
      <div class="m-card" style="cursor:pointer" onclick="go(1)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="match-score med">${ic('spark','i-xs')} 88% MATCH</span>
          <span style="font-size:11.5px;font-weight:700;color:var(--brand)">${rp(2000000)}</span>
        </div>
        <div style="font-size:14px;font-weight:800;color:var(--ink);margin-top:8px">
          Sistem Kasir &amp; Stok Jamu Herbal
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">
          UD Jamu Barokah · Surabaya
        </div>
        <div class="skill-tags">
          <span class="skill-pill match">${ic('check','i-xs')} Laravel</span>
          <span class="skill-pill match">${ic('check','i-xs')} PostgreSQL</span>
          <span class="skill-pill missing">Thermal Printer</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted);margin-top:10px;padding-top:8px;border-top:1px solid var(--line-soft)">
          <span>⏱️ Durasi: 6 Minggu</span>
          <span style="font-weight:700;color:var(--ok)">🎓 Ekuivalensi 4 SKS</span>
        </div>
      </div>
    </div>`
  },
  {
    name: 'Detail Proyek & AI Match',
    note: {
      tag: 'Kecerdasan Buatan · Rekomendasi',
      h: 'Transparansi Analisis SkillMatch 94%',
      p: [
        '<b>Bukan sekadar angka:</b> Algoritma membedah kecocokan keterampilan yang sudah dimiliki (*Matched Skills*) dan memberi tahu keterampilan tambahan yang perlu dipelajari (*Missing Skills*).',
        'Mahasiswa mendapatkan kepastian bobot <b>Ekuivalensi SKS (MBKM)</b> yang telah disetujui kurikulum program studi sebelum melamar.',
        'Tombol lamaran mengirimkan ringkasan portofolio terverifikasi langsung ke dasbor kurasi UMKM.'
      ],
      src: 'Implementasi FastAPI service dengan Cosine Similarity terhadap deskripsi profil (BAB 4.6).'
    },
    tabs: 1,
    html: `
    <div class="m-appbar">
      <div onclick="go(0)" style="cursor:pointer;padding:4px">${ic('chevronR','i-sm','style="transform:rotate(180deg)"')}</div>
      <div>
        <h1>Detail Kebutuhan Proyek</h1>
        <div class="sub">CV Tanggulangin Leather · Sidoarjo</div>
      </div>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <!-- AI Match Box -->
      <div class="m-card" style="background:linear-gradient(135deg,#EFF6FF,#F5F3FF);border:1px solid #BFDBFE">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="width:34px;height:34px;border-radius:10px;background:var(--brand);color:#fff;display:flex;align-items:center;justify-content:center">${ic('cpu','i-sm')}</span>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--brand-ink)">Analisis NLP SkillMatch</div>
              <div style="font-size:10.5px;color:var(--muted)">Cosine Similarity: 0.942</div>
            </div>
          </div>
          <span class="match-score high" style="font-size:13px;font-weight:900">94% MATCH</span>
        </div>
        <div style="font-size:12px;color:var(--body);line-height:1.5;margin-top:10px">
          Profil keahlian dan riwayat proyek Figma Anda sangat cocok dengan kebutuhan digitalisasi katalog pengrajin ini.
        </div>
      </div>

      <!-- Breakdown Skills -->
      <div class="m-card">
        <div style="font-size:13px;font-weight:750;color:var(--ink);margin-bottom:8px">Keterampilan Terverifikasi:</div>
        <div class="skill-tags">
          <span class="skill-pill match">${ic('check','i-xs')} UI/UX Design System</span>
          <span class="skill-pill match">${ic('check','i-xs')} Wireframing &amp; Testing</span>
          <span class="skill-pill match">${ic('check','i-xs')} Responsive Web</span>
        </div>
        <div style="font-size:12px;font-weight:700;color:#C2410C;margin:12px 0 6px">Saran Nilai Tambah (Missing Skills):</div>
        <div class="skill-tags">
          <span class="skill-pill missing">Katalog Fotografi Ponsel</span>
          <span class="skill-pill missing">Copywriting Produk</span>
        </div>
      </div>

      <!-- Benefit & Ringkasan -->
      <div class="m-card">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <div style="font-size:11px;color:var(--muted);font-weight:600">Insentif / Stipend</div>
            <div style="font-size:15px;font-weight:800;color:var(--brand);margin-top:2px">${rp(2500000)}</div>
          </div>
          <div>
            <div style="font-size:11px;color:var(--muted);font-weight:600">Konversi Akademik</div>
            <div style="font-size:15px;font-weight:800;color:var(--ok);margin-top:2px">3 SKS MBKM</div>
          </div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line-soft);font-size:12px;color:var(--body);line-height:1.5">
          <b>Target Luaran:</b> Prototipe web responsif untuk 40+ varian tas kulit, pengujian kemudahan navigasi bagi pembeli luar kota, dan panduan upload admin.
        </div>
      </div>

      <button class="btn" style="background:var(--brand);color:#fff;border-radius:14px;padding:14px;font-weight:750;width:100%;box-shadow:0 6px 18px rgba(37,99,235,.25)" onclick="go(2)">
        Ajukan Lamaran dengan Portofolio
      </button>
    </div>`
  },
  {
    name: 'Ruang Kerja (Workspace)',
    note: {
      tag: 'Kolaborasi · Milestone Terstruktur',
      h: 'Pemantauan Pengerjaan Berbasis Milestone',
      p: [
        '<b>Mencegah proyek mangkrak:</b> Saat kandidat diterima, sistem langsung menerbitkan <b>Workspace Kolaboratif</b> dengan checklist tugas dan tenggat waktu yang disepakati.',
        'Mahasiswa mencentang tugas dan mengunggah tautan hasil kerja (*deliverables*) seperti GitHub atau Figma.',
        'UMKM dan Dosen dapat melihat persentase kemajuan secara transparan tanpa harus saling menagih di WhatsApp.'
      ],
      src: 'Sesuai Spesifikasi Ruang Kerja & Checklist Tugas (Tabel 4.5).'
    },
    tabs: 2,
    html: `
    <div class="m-appbar">
      <div>
        <h1>Ruang Kerja Kolaborasi</h1>
        <div class="sub">CV Tanggulangin · Sprint 2</div>
      </div>
      <span class="pill ok" style="margin-left:auto">75% Progres</span>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <!-- Progress Bar Card -->
      <div class="m-card">
        <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;margin-bottom:6px">
          <span>Progres Milestone Proyek</span>
          <span style="color:var(--brand)">3 dari 4 Tugas Tuntas</span>
        </div>
        <div class="bar" style="height:8px"><i style="width:75%"></i></div>
        <div style="display:flex;gap:12px;margin-top:12px;font-size:11.5px;color:var(--muted)">
          <span>📅 Batas Akhir: <b>15 Oktober</b></span>
          <span>👥 Mentor: <b>H. Mochammad</b></span>
        </div>
      </div>

      <!-- Checklist Tugas -->
      <div class="m-card">
        <div style="font-size:13px;font-weight:800;color:var(--ink);margin-bottom:10px">Daftar Tugas Milestone:</div>

        <div class="task-item">
          <div class="task-check done">${ic('check','i-xs')}</div>
          <div>
            <div class="task-title done">Observasi katalog fisik &amp; wawancara produk unggulan</div>
            <div class="task-meta">Diselesaikan 22 Sep · Diverifikasi UMKM</div>
          </div>
        </div>

        <div class="task-item">
          <div class="task-check done">${ic('check','i-xs')}</div>
          <div>
            <div class="task-title done">Penyusunan Wireframe &amp; User Flow E-Commerce</div>
            <div class="task-meta">Tautan Figma terlampir · Disetujui Dosen</div>
          </div>
        </div>

        <div class="task-item">
          <div class="task-check done">${ic('check','i-xs')}</div>
          <div>
            <div class="task-title done">Desain High-Fidelity &amp; Komponen UI Design System</div>
            <div class="task-meta">40 Halaman mobile &amp; desktop</div>
          </div>
        </div>

        <div class="task-item">
          <div class="task-check" onclick="this.classList.toggle('done')"></div>
          <div>
            <div class="task-title">Uji coba interaktivitas ke 5 pelanggan potensial</div>
            <div class="task-meta" style="color:#D97706;font-weight:600">Sedang Berjalan · Tenggat 3 Hari</div>
          </div>
        </div>
      </div>

      <!-- Deliverables Upload Box -->
      <div class="m-card" style="background:#F8FAFC;border:1.5px dashed #CBD5E1">
        <div style="font-size:12.5px;font-weight:750;color:var(--ink)">Serahkan Hasil Kerja (Deliverables)</div>
        <div style="font-size:11px;color:var(--muted);margin:4px 0 10px">Tautan Figma Prototype / Kode GitHub / Laporan PDF</div>
        <div style="display:flex;gap:8px">
          <input type="text" value="https://figma.com/file/tanggulangin-redesign-v2" readonly style="flex:1;background:#fff;border:1px solid #CBD5E1;border-radius:10px;padding:8px 12px;font-size:11px;color:var(--ink)">
          <button class="btn" style="width:auto;padding:0 14px;border-radius:10px;font-size:11.5px;background:var(--ok);color:#fff" onclick="go(3)">Kirim</button>
        </div>
      </div>
    </div>`
  },
  {
    name: 'Portofolio Terverifikasi',
    note: {
      tag: 'Akuntabilitas · Rekam Jejak',
      h: 'Portofolio yang Diakui Kampus & Industri',
      p: [
        '<b>Nilai jual utama lulusan:</b> Bukan sekadar sertifikat seminar, melainkan rekam jejak hasil kerja nyata dengan bukti ulasan bintang dari pemilik usaha.',
        'Dilengkapi <b>Lencana Resmi (Verified Industry Badge)</b> dan kode verifikasi QR yang bisa dipindai HRD perusahaan saat melamar kerja.',
        'Nilai proyek otomatis tersinkronisasi ke transkrip akademik konversi MBKM.'
      ],
      src: 'Sesuai Sistem Ulasan Dua Arah & Akumulasi Skor Portofolio (BAB 2.3 FR-REV).'
    },
    tabs: 3,
    html: `
    <div class="m-appbar">
      <div>
        <h1>Portofolio Terverifikasi</h1>
        <div class="sub">Rekam Jejak &amp; Lencana Industri</div>
      </div>
      <span class="pill gold" style="margin-left:auto">⭐ 5.0 Rating</span>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <!-- Verified Badge Card -->
      <div class="m-card" style="text-align:center;padding:22px 18px;background:linear-gradient(180deg,#FFFFFF,#EFF6FF)">
        <div style="width:56px;height:56px;border-radius:20px;background:linear-gradient(135deg,#2563EB,#1D4ED8);color:#fff;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(37,99,235,.3)">
          ${ic('shield','i-lg')}
        </div>
        <div style="font-size:16px;font-weight:800;color:var(--ink);margin-top:10px">VERIFIED INDUSTRY TALENT</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px">Sertifikasi Proyek Riil · Universitas Airlangga</div>
        <div style="display:flex;justify-content:center;gap:4px;color:#F59E0B;margin-top:8px">
          ${ic('star','i-sm')}${ic('star','i-sm')}${ic('star','i-sm')}${ic('star','i-sm')}${ic('star','i-sm')}
        </div>
      </div>

      <!-- Testimoni UMKM -->
      <div class="m-card">
        <div style="font-size:12px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.05em">Ulasan Pemilik Usaha (Mitra):</div>
        <div style="font-size:13px;font-style:italic;color:var(--body);line-height:1.5;margin-top:8px">
          "Mas Dhafin sangat profesional dalam mendengarkan keluhan pembeli kami. Hasil katalog desainnya modern dan membuat pesanan tas kulit dari luar Jawa naik signifikan!"
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:12px;padding-top:10px;border-top:1px solid var(--line-soft)">
          <div style="width:34px;height:34px;border-radius:10px;background:#FEF3C7;color:#B45309;display:flex;align-items:center;justify-content:center;font-weight:750">HM</div>
          <div>
            <div style="font-size:12.5px;font-weight:700">H. Mochammad</div>
            <div style="font-size:11px;color:var(--muted)">Owner CV Tanggulangin Leather Goods</div>
          </div>
        </div>
      </div>

      <!-- Detail Sertifikat Digital -->
      <div class="m-card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:13px;font-weight:750">E-Sertifikat MBKM No. 2026/FST/SB-082</div>
            <div style="font-size:11px;color:var(--muted);margin-top:2px">Tervalidasi Dosen Pembimbing &amp; Dekanat</div>
          </div>
          <button class="pill brand" style="cursor:pointer">${ic('download','i-xs')} Unduh PDF</button>
        </div>
      </div>
    </div>`
  }
];

/* ══════════════════════════════════════════════════════════════════════════════
   ROLE 2: MITRA UMKM / INDUSTRI
   ══════════════════════════════════════════════════════════════════════════════ */
const UMKM_SCREENS = [
  {
    name: 'Beranda UMKM',
    note: {
      tag: 'Mitra UMKM · Efisiensi Talenta',
      h: 'Solusi Digitalisasi UMKM Tanpa Biaya Agensi Mahal',
      p: [
        '<b>Masalah nyata:</b> UMKM ingin go-digital namun tidak memiliki anggaran untuk menyewa agensi software house puluhan juta.',
        'Melalui SkillBridge Hub, UMKM cukup mempublikasikan masalah bisnisnya. Sistem langsung mencarikan mahasiswa terbaik yang dibimbing dosen universitas.',
        'Kartu fokus menampilkan <b>pelamar siap seleksi</b> yang sudah diurutkan berdasarkan skor AI.'
      ],
      src: 'Sesuai Analisis Pemangku Kepentingan SH-02 (Tabel 2.1).'
    },
    tabs: 0,
    html: `
    <div class="hero">
      <div class="fg">
        <div class="greet">Dashboard Mitra Usaha</div>
        <div class="name">CV Tanggulangin Leather</div>
        <div class="sub-meta">
          <span>Sentra Industri Kulit Sidoarjo</span>
          <span class="badge">Mitra Terverifikasi</span>
        </div>
      </div>
    </div>

    <div class="focus-card emerald">
      <div class="head">
        <span>PELAMAR MASUK</span>
        <span class="pill ok" style="background:rgba(255,255,255,.25);color:#fff">3 Kandidat Siap</span>
      </div>
      <div class="title">Seleksi Pelamar SkillMatch</div>
      <div class="desc">Proyek: Redesain UI/UX &amp; Katalog E-Commerce</div>
      <div class="act">
        <div class="btn-solid" style="color:#065F46" onclick="go(2)">${ic('users','i-sm')} Buka Ranking Pelamar</div>
        <div class="btn-ghost" onclick="go(1)">Pasang Proyek Baru</div>
      </div>
    </div>

    <div class="m-pad">
      <div class="m-sec-h">
        <h3>Ringkasan Aktivitas Usaha</h3>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
        <div class="m-card" style="margin-bottom:0">
          <div style="font-size:11px;color:var(--muted);font-weight:600">Proyek Berjalan</div>
          <div style="font-size:22px;font-weight:800;color:var(--brand);margin-top:4px">1 Proyek</div>
          <div style="font-size:11px;color:var(--ok);margin-top:2px">Progres 75%</div>
        </div>
        <div class="m-card" style="margin-bottom:0">
          <div style="font-size:11px;color:var(--muted);font-weight:600">Talenta Terhubung</div>
          <div style="font-size:22px;font-weight:800;color:var(--ink);margin-top:4px">2 Mahasiswa</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">FST UNAIR</div>
        </div>
      </div>

      <div class="m-sec-h" style="margin-top:16px">
        <h3>Proyek Aktif Anda</h3>
      </div>
      <div class="m-card" style="cursor:pointer" onclick="go(2)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="font-size:13.5px;font-weight:750">Redesain UI/UX &amp; Katalog Digital</div>
          <span class="pill brand">Aktif</span>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:4px">
          3 Pelamar Masuk · Skor AI Tertinggi: <b>94%</b>
        </div>
        <div style="margin-top:10px">
          <div class="bar" style="height:6px"><i style="width:75%"></i></div>
        </div>
      </div>
    </div>`
  },
  {
    name: 'Publikasi Kebutuhan Proyek',
    note: {
      tag: 'Form Mandiri UMKM',
      h: 'Formulir Brief yang Memandu Pengusaha Awam',
      p: [
        '<b>Masalah nyata:</b> Pemilik UMKM sering tidak paham istilah teknis IT untuk membuat lowongan kerja yang jelas.',
        'Sistem menyediakan form terpandu dengan pilihan kategori masalah bisnis (misal: "Katalog Penjualan Lambat", "Pencatatan Stok Masih Buku").',
        'Sistem otomatis memetakan kebutuhan tersebut ke dalam daftar *required skills* untuk dianalisis oleh modul NLP.'
      ],
      src: 'Sesuai Kebutuhan Fungsional FR-PROJ-01 Publikasi Brief Proyek (BAB 2.3).'
    },
    tabs: 1,
    html: `
    <div class="m-appbar">
      <div>
        <h1>Pasang Kebutuhan Proyek</h1>
        <div class="sub">Panduan Digitalisasi untuk UMKM</div>
      </div>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <div class="field" style="border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;margin-bottom:10px">
        <label style="display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px">Judul Proyek Masalah Bisnis</label>
        <div style="font-size:13px;font-weight:600;color:var(--ink)">Aplikasi Pencatatan Kasir &amp; Stok Barang Otomatis</div>
      </div>

      <div class="field" style="border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;margin-bottom:10px">
        <label style="display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px">Kategori Masalah</label>
        <div style="font-size:13px;color:var(--ink)">Aplikasi Kasir (POS) &amp; Inventori</div>
      </div>

      <div class="field" style="border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;margin-bottom:10px">
        <label style="display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px">Target Durasi &amp; Kompensasi</label>
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700">
          <span>⏱️ 4 Minggu</span>
          <span style="color:var(--brand)">${rp(2000000)}</span>
        </div>
      </div>

      <div class="field" style="border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;margin-bottom:14px">
        <label style="display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px">Keterampilan yang Diharapkan (Auto Tags)</label>
        <div class="skill-tags">
          <span class="skill-pill match">Laravel / Web</span>
          <span class="skill-pill match">Desain Kasir Sederhana</span>
          <span class="skill-pill match">Cetak Struk Bluetooth</span>
        </div>
      </div>

      <button class="btn" style="background:var(--brand);color:#fff;border-radius:14px;padding:14px;font-weight:750;width:100%" onclick="go(2)">
        Terbitkan &amp; Cari Talenta via NLP
      </button>
    </div>`
  },
  {
    name: 'Ranking Pelamar (SkillMatch)',
    note: {
      tag: 'Pengambilan Keputusan Cerdas',
      h: 'Pemeringkatan Objektif Calon Pelaksana',
      p: [
        '<b>Memangkas waktu kurasi:</b> UMKM tidak perlu membaca tumpukan berkas CV satu per satu.',
        'Algoritma NLP menyusun kandidat dari persentase skor kecocokan tertinggi. UMKM dapat melihat bukti portofolio dan rekomendasi kampus.',
        'Satu tombol **"Terima &amp; Inisiasi Workspace"** langsung mengaktifkan ruang kolaborasi resmi.'
      ],
      src: 'Sesuai Skenario Use Case Pemrosesan SkillMatch & Pemeringkatan (Tabel 4.3).'
    },
    tabs: 2,
    html: `
    <div class="m-appbar">
      <div>
        <h1>Ranking Pelamar (NLP Engine)</h1>
        <div class="sub">3 Talenta Terpilih untuk Brief Anda</div>
      </div>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <!-- Candidate 1 (Top Rank) -->
      <div class="m-card" style="border:1.5px solid var(--brand);box-shadow:0 4px 12px rgba(37,99,235,.12)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:40px;height:40px;border-radius:12px;background:var(--brand-soft);color:var(--brand-deep);display:flex;align-items:center;justify-content:center;font-weight:800">
              AD
            </div>
            <div>
              <div style="font-size:13.5px;font-weight:800">Ahmad Dhafin</div>
              <div style="font-size:11px;color:var(--muted)">S1 Sistem Informasi UNAIR · IPK 3.89</div>
            </div>
          </div>
          <span class="match-score high">🥇 94% MATCH</span>
        </div>

        <div class="skill-tags" style="margin-top:10px">
          <span class="skill-pill match">Figma UI/UX</span>
          <span class="skill-pill match">Tailwind CSS</span>
          <span class="skill-pill match">User Research</span>
        </div>

        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn sm" style="background:var(--ok);color:#fff;flex:1;border-radius:10px" onclick="go(3)">
            Terima &amp; Buat Ruang Kerja
          </button>
          <button class="btn sm ghost" style="flex:none;padding:0 12px;border-radius:10px">CV</button>
        </div>
      </div>

      <!-- Candidate 2 -->
      <div class="m-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:40px;height:40px;border-radius:12px;background:#F1F5F9;color:var(--ink);display:flex;align-items:center;justify-content:center;font-weight:800">
              NP
            </div>
            <div>
              <div style="font-size:13.5px;font-weight:800">Nabila Putri</div>
              <div style="font-size:11px;color:var(--muted)">S1 DKV UNAIR · IPK 3.75</div>
            </div>
          </div>
          <span class="match-score med">🥈 82% MATCH</span>
        </div>
        <div class="skill-tags" style="margin-top:10px">
          <span class="skill-pill match">Branding Tas</span>
          <span class="skill-pill match">Ilustrasi</span>
          <span class="skill-pill missing">HTML/CSS</span>
        </div>
      </div>
    </div>`
  },
  {
    name: 'Evaluasi & Ulasan Dua Arah',
    note: {
      tag: 'Penutupan Proyek & Reputasi',
      h: 'Ulasan Resmi Pengusaha untuk Portofolio Mahasiswa',
      p: [
        '<b>Selesai dengan tuntas:</b> UMKM meninjau hasil penyerahan akhir, memberikan bintang penilaian (1–5), dan menulis testimoni resmi.',
        'Ulasan ini otomatis menjadi bukti portofolio mahasiswa dan menjadi syarat pencairan stipend serta validasi konversi SKS oleh dosen.'
      ],
      src: 'Sesuai Kebutuhan Fungsional FR-REV-01 Two-Way Review (BAB 2.3).'
    },
    tabs: 3,
    html: `
    <div class="m-appbar">
      <div>
        <h1>Evaluasi Akhir &amp; Ulasan</h1>
        <div class="sub">Tinjau Hasil Kerja Mahasiswa</div>
      </div>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <div class="m-card">
        <div style="font-size:13px;font-weight:750">Hasil Penyerahan (Deliverables):</div>
        <div style="background:#F1F5F9;border-radius:10px;padding:10px;margin-top:8px;font-size:12px">
          🔗 <b>Figma Link:</b> figma.com/file/tanggulangin-redesign-v2<br>
          📁 <b>Aset Desain:</b> 42 File Gambar Siap Upload Katalog
        </div>
      </div>

      <div class="m-card">
        <div style="font-size:13px;font-weight:750;margin-bottom:8px">Beri Penilaian Kerja:</div>
        <div style="display:flex;gap:6px;color:#F59E0B;font-size:24px;margin-bottom:12px">
          ⭐ ⭐ ⭐ ⭐ ⭐
        </div>
        <div class="field" style="border:1px solid var(--line);border-radius:12px;padding:10px;background:#fff">
          <label style="font-size:11px;color:var(--muted);font-weight:700">Testimoni untuk Mahasiswa:</label>
          <div style="font-size:12.5px;color:var(--ink);margin-top:4px">
            Hasil pengerjaan sangat rapi dan selesai tepat waktu. Katalog baru memudahkan kami melayani pesanan via WhatsApp!
          </div>
        </div>
      </div>

      <button class="btn" style="background:var(--ok);color:#fff;border-radius:14px;padding:14px;font-weight:750;width:100%" onclick="go(0)">
        Setujui &amp; Terbitkan Sertifikat
      </button>
    </div>`
  }
];

/* ══════════════════════════════════════════════════════════════════════════════
   ROLE 3: DOSEN PEMBIMBING / EVALUATOR AKADEMIK
   ══════════════════════════════════════════════════════════════════════════════ */
const FACULTY_SCREENS = [
  {
    name: 'Beranda Pembimbing',
    note: {
      tag: 'Akademik · Pengawasan MBKM',
      h: 'Monitoring Ketercapaian Kompetensi Industri',
      p: [
        '<b>Tanggung jawab dosen:</b> Memastikan mahasiswa tidak sekadar bekerja buruh lepas, namun benar-benar menerapkan ilmu perkuliahan.',
        'Dosen dapat melihat status logbook, jam kerja kumulatif (standar 160 jam untuk 4 SKS), dan memberikan catatan bimbingan berkala.',
        'Data ini menjadi bukti pelaporan IKU 2 perguruan tinggi.'
      ],
      src: 'Sesuai Matriks Analisis Stakeholder SH-04 Dosen Evaluator (Tabel 2.1).'
    },
    tabs: 0,
    html: `
    <div class="hero">
      <div class="fg">
        <div class="greet">Dosen Pembimbing Akademik</div>
        <div class="name">Dr. Ir. Bambang Hermanto</div>
        <div class="sub-meta">
          <span>Koordinator Magang &amp; Kolaborasi</span>
          <span class="badge">FST UNAIR</span>
        </div>
      </div>
    </div>

    <div class="focus-card purple">
      <div class="head">
        <span>LOGBOOK MENUNGGU</span>
        <span class="pill gold" style="background:rgba(255,255,255,.25);color:#fff">4 Pengajuan</span>
      </div>
      <div class="title">Verifikasi Aktivitas Industri</div>
      <div class="desc">Ahmad Dhafin &amp; 3 Mahasiswa Lainnya</div>
      <div class="act">
        <div class="btn-solid" style="color:#5B21B6" onclick="go(1)">${ic('checkCircle','i-sm')} Periksa Logbook</div>
        <div class="btn-ghost" onclick="go(2)">Ekuivalensi SKS</div>
      </div>
    </div>

    <div class="m-pad">
      <div class="m-sec-h">
        <h3>Mahasiswa Bimbingan Aktif (MBKM)</h3>
      </div>
      <div class="m-card" style="cursor:pointer" onclick="go(1)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-size:13.5px;font-weight:800">Ahmad Dhafin Al Farisy</div>
            <div style="font-size:11.5px;color:var(--muted)">CV Tanggulangin Leather · UI/UX Designer</div>
          </div>
          <span class="pill ok">128 / 160 Jam</span>
        </div>
        <div style="margin-top:8px">
          <div class="bar" style="height:6px"><i style="width:80%"></i></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted);margin-top:8px">
          <span>Target: 3 SKS (RPL &amp; IMK)</span>
          <span style="font-weight:700;color:var(--brand)">Logbook Minggu ke-3 Masuk</span>
        </div>
      </div>
    </div>`
  },
  {
    name: 'Asistensi & Logbook',
    note: {
      tag: 'Pengendalian Mutu Pembelajaran',
      h: 'Validasi Catatan Kerja Mingguan & Bukti Riil',
      p: [
        '<b>Transparansi bukti kerja:</b> Mahasiswa wajib mengisi ringkasan kegiatan mingguan dan mengunggah foto saat berdiskusi dengan pemilik UMKM.',
        'Dosen memberikan persetujuan atau catatan perbaikan langsung di aplikasi, menghemat waktu temu bimbingan konvensional.'
      ],
      src: 'Sesuai Kebutuhan Non-Fungsional Keandalan Audit Akademik (Tabel 2.4).'
    },
    tabs: 1,
    html: `
    <div class="m-appbar">
      <div>
        <h1>Pemeriksaan Logbook Mingguan</h1>
        <div class="sub">Ahmad Dhafin · Minggu ke-3</div>
      </div>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <div class="m-card">
        <div style="font-size:12px;font-weight:700;color:var(--brand)">Aktivitas 15–20 September 2026 (36 Jam Kerja)</div>
        <div style="font-size:13px;color:var(--body);line-height:1.5;margin-top:6px">
          • Melakukan usability testing wireframe dengan 5 pembeli produk kulit Tanggulangin.<br>
          • Memperbaiki alur checkout katalog online agar lebih ringkas.<br>
          • Diskusi persetujuan warna dan font brand bersama pemilik UMKM (H. Mochammad).
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--ok);font-weight:700;margin-top:10px">
          ${ic('checkCircle','i-xs')} Telah diparaf pihak UMKM (H. Mochammad)
        </div>
      </div>

      <div class="m-card">
        <div style="font-size:12.5px;font-weight:750">Catatan &amp; Arahan Dosen:</div>
        <div class="field" style="border:1px solid var(--line);border-radius:10px;padding:10px;background:#fff;margin-top:6px">
          <textarea style="width:100%;border:0;outline:0;font:inherit;font-size:12px;color:var(--ink);resize:none;height:50px" placeholder="Beri catatan bimbingan...">Bagus, pastikan dokumentasi hasil usability testing dilampirkan dalam bab evaluasi laporan akhir.</textarea>
        </div>
      </div>

      <button class="btn" style="background:var(--brand);color:#fff;border-radius:14px;padding:14px;font-weight:750;width:100%" onclick="go(2)">
        Sahkan Logbook &amp; Lanjutkan ke Ekuivalensi
      </button>
    </div>`
  },
  {
    name: 'Validasi Konversi SKS',
    note: {
      tag: 'Ekuivalensi MBKM Resmi',
      h: 'Penetapan Nilai & Konversi Matakuliah',
      p: [
        '<b>Ujung tombak program kampus:</b> Proyek kolaborasi industri ini langsung dikonversi ke matakuliah kurikulum resmi program studi.',
        'Dosen menetapkan konversi SKS (misal: *Proyek Rekayasa Perangkat Lunak 4 SKS* dan *Interaksi Manusia Komputer 3 SKS*) dengan tanda tangan digital resmi.'
      ],
      src: 'Sesuai Pedoman Implementasi MBKM dan Perencanaan Rute Akademik (BAB 3.6).'
    },
    tabs: 2,
    html: `
    <div class="m-appbar">
      <div>
        <h1>Penetapan Konversi Matakuliah</h1>
        <div class="sub">Ekuivalensi SKS Program Studi</div>
      </div>
    </div>
    <div class="m-pad" style="padding-top:14px">
      <div class="m-card">
        <div style="font-size:13px;font-weight:800;color:var(--ink);margin-bottom:10px">Rekomendasi Konversi Matakuliah:</div>

        <div style="padding:10px 0;border-bottom:1px solid var(--line-soft);display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:13px;font-weight:700">Proyek Rekayasa Perangkat Lunak</div>
            <div style="font-size:11px;color:var(--muted)">Kode: SI301 · Semester 5</div>
          </div>
          <span class="pill ok">4 SKS (Nilai A)</span>
        </div>

        <div style="padding:10px 0;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:13px;font-weight:700">Interaksi Manusia dan Komputer</div>
            <div style="font-size:11px;color:var(--muted)">Kode: SI204 · Semester 4</div>
          </div>
          <span class="pill ok">3 SKS (Nilai A)</span>
        </div>
      </div>

      <div class="m-card" style="text-align:center;background:#F8FAFC">
        <div style="font-size:12px;color:var(--muted)">Tanda Tangan Digital Pejabat Akademik:</div>
        <div style="font-size:14px;font-weight:800;color:var(--brand-ink);margin-top:4px">Dr. Ir. Bambang Hermanto, M.Kom</div>
        <div style="font-size:11px;color:var(--muted)">NIP. 197804122005011002 · Koordinator MBKM FST</div>
        <div style="display:inline-flex;align-items:center;gap:4px;color:var(--ok);font-size:11px;font-weight:700;margin-top:6px">
          ${ic('checkCircle','i-xs')} Terverifikasi Sistem Informasi Akademik (CyberCampus)
        </div>
      </div>

      <button class="btn" style="background:var(--ok);color:#fff;border-radius:14px;padding:14px;font-weight:750;width:100%" onclick="go(0)">
        Sahkan Berita Acara Nilai Akhir
      </button>
    </div>`
  }
];

/* ══════════════════════════════════════════════════════════════════════════════
   TAB BARS & ROLE MAPPINGS
   ══════════════════════════════════════════════════════════════════════════════ */
const ROLE_TABS = {
  student: [
    ['home', 'Beranda'],
    ['briefcase', 'Proyek'],
    ['check', 'Workspace'],
    ['shield', 'Portofolio']
  ],
  umkm: [
    ['home', 'Beranda'],
    ['plus', 'Pasang'],
    ['users', 'Pelamar'],
    ['star', 'Ulasan']
  ],
  faculty: [
    ['home', 'Beranda'],
    ['doc', 'Logbook'],
    ['grad', 'Ekuivalensi']
  ]
};

const ROLE_SCREENS = {
  student: STUDENT_SCREENS,
  umkm: UMKM_SCREENS,
  faculty: FACULTY_SCREENS
};

let S = {
  surface: 'm',
  role: 'student',
  screen: 0,
  wnav: 'dash'
};

function surface(s) {
  S.surface = s;
  document.getElementById('surface-m').classList.toggle('hide', s !== 'm');
  document.getElementById('surface-w').classList.toggle('hide', s !== 'w');
  document.getElementById('sf-m').classList.toggle('on', s === 'm');
  document.getElementById('sf-w').classList.toggle('on', s === 'w');
  document.getElementById('chrome-note').textContent = s === 'm' ? 'konsep antarmuka mobile' : 'konsep dashboard web kampus & industri';
  if (s === 'w') renderWeb();
}

function pickRole(r) {
  S.role = r;
  S.screen = 0;
  ['student', 'umkm', 'faculty'].forEach(x => {
    const el = document.getElementById('role-' + x);
    if (el) el.classList.toggle('on', x === r);
  });
  renderMobile();
}

function go(idx) {
  S.screen = idx;
  renderMobile();
}

function renderMobile() {
  const screens = ROLE_SCREENS[S.role] || STUDENT_SCREENS;
  const sc = screens[S.screen] || screens[0];

  // Render Left screen links
  const screenlistEl = document.getElementById('screenlist');
  if (screenlistEl) {
    screenlistEl.innerHTML = screens.map((x, i) => `
      <button class="${i === S.screen ? 'on' : ''}" onclick="go(${i})">
        <span style="width:6px;height:6px;border-radius:50%;background:${i === S.screen ? '#fff' : 'var(--muted)'}"></span>
        ${x.name}
      </button>`).join('');
  }

  // Render Phone Scroll Area
  const mscroll = document.getElementById('mscroll');
  if (mscroll) {
    mscroll.innerHTML = sc.html;

    // Apply active hero wallpaper
    const hero = mscroll.querySelector('.hero');
    if (hero) {
      const mode = WP_MODE[WP] || {};
      hero.classList.toggle('lightw', !!mode.light);
      const statusBar = document.querySelector('.screen .status');
      if (statusBar) statusBar.classList.toggle('dark', !!mode.light);

      const existingWp = hero.querySelector('.wp');
      if (existingWp) existingWp.remove();
      hero.insertAdjacentHTML('afterbegin', HERO_BG[WP]());
    }
  }

  // Render Bottom Tabbar
  const mtabs = document.getElementById('mtabs');
  if (mtabs) {
    const tabs = ROLE_TABS[S.role] || ROLE_TABS.student;
    mtabs.innerHTML = tabs.map(([icon, label], i) => `
      <button class="${i === sc.tabs ? 'on' : ''}" onclick="go(${Math.min(i, screens.length - 1)})">
        ${ic(icon, 'i-sm')}
        <span>${label}</span>
      </button>`).join('');
  }

  // Render Pitching Rationale Note
  const mnote = document.getElementById('mnote');
  if (mnote && sc.note) {
    mnote.innerHTML = `
      <span class="stakeholder-tag">${sc.note.tag || 'Pitching Value'}</span>
      <h5>${ic('spark','i-xs')} Nilai Strategis Stakeholder</h5>
      <h3>${sc.note.h}</h3>
      ${sc.note.p.map(p => `<p>${p}</p>`).join('')}
      <div class="src">${sc.note.src || ''}</div>
    `;
  }
}

// Initial Run
window.addEventListener('DOMContentLoaded', () => {
  renderMobile();
});
