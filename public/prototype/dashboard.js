/* ─── SkillBridge Hub: Desktop Web Dashboard (Kampus & Industri) ───────────── */

const WSECT = [
  ['utama', 'grid', 'Utama', [
    ['dash', 'grid', 'Dashboard Ekosistem', ''],
    ['proyek', 'briefcase', 'Katalog & Kurasi Proyek', '12'],
    ['workspace', 'check', 'Monitoring Workspace', '8'],
  ]],
  ['akademik', 'grad', 'Akademik MBKM', [
    ['mbkm', 'grad', 'Ekuivalensi & Konversi SKS', '4'],
    ['logbook', 'doc', 'Verifikasi Logbook', '6'],
  ]],
  ['industri', 'building', 'Kemitraan & Dampak', [
    ['mitra', 'building', 'Jaringan Mitra UMKM', '64'],
    ['iku', 'chart', 'Laporan Capaian IKU', ''],
  ]],
];

const WTITLE = {
  dash: 'Dashboard Ekosistem Kolaborasi Kampus & Industri',
  proyek: 'Katalog Kebutuhan Proyek UMKM & Kurasi NLP',
  workspace: 'Monitoring Ruang Kerja & Sprint Mahasiswa',
  mbkm: 'Ekuivalensi Kurikulum & Validasi SKS MBKM',
  logbook: 'Verifikasi Logbook Aktivitas Lapangan',
  mitra: 'Jaringan Kemitraan UMKM Jawa Timur',
  iku: 'Laporan Capaian Indikator Kinerja Utama (IKU 2 & IKU 6)'
};

const WSCREEN = {
  dash: `
  <div class="wpad">
    <!-- Executive KPI Row -->
    <div class="stats">
      <div class="stat">
        <div class="lbl">${ic('briefcase','i-xs')} Proyek Kolaborasi Aktif</div>
        <div class="num">48</div>
        <div class="delta" style="color:var(--ok)">
          ${ic('check','i-xs')} 36 Berjalan · 12 Menunggu Kurasi
        </div>
      </div>

      <div class="stat">
        <div class="lbl">${ic('users','i-xs')} Mahasiswa Terlibat (Talenta)</div>
        <div class="num">142</div>
        <div class="delta" style="color:var(--brand)">
          FST UNAIR (Sistem Informasi, DKV, TI)
        </div>
      </div>

      <div class="stat">
        <div class="lbl">${ic('cpu','i-xs')} Akurasi NLP SkillMatch Engine</div>
        <div class="num">91.8%</div>
        <div class="delta" style="color:var(--ok)">
          Rata-rata kesesuaian kualifikasi
        </div>
      </div>

      <div class="stat">
        <div class="lbl">${ic('grad','i-xs')} Total SKS Terkonversi (MBKM)</div>
        <div class="num">426 <span style="font-size:15px;color:var(--muted)">SKS</span></div>
        <div class="delta" style="color:#D97706">
          ⭐ 4.92 / 5.00 Indeks Kepuasan Mitra
        </div>
      </div>
    </div>

    <!-- Middle Grid: Urgent Actions + IKU Progress -->
    <div class="cols" style="display:grid;grid-template-columns:1.6fr 1fr;gap:18px;margin-top:20px">
      <!-- Left Panel: Urgent Actions Table -->
      <div class="panel">
        <div class="panel-h">
          <h3>Perlu Tindakan Hari Ini (SLA Monitoring)</h3>
          <div class="act">
            <span class="chip on">Semua (5)</span>
            <span class="chip">Akademik</span>
            <span class="chip">Mitra</span>
          </div>
        </div>
        <table>
          <tr>
            <th style="width:36%">Perkara / Agenda</th>
            <th>Kategori</th>
            <th>PIC / Pihak</th>
            <th>Status SLA</th>
            <th></th>
          </tr>
          ${[
            ['CV Tanggulangin — Validasi Ekuivalensi SKS', 'Akademik MBKM', 'Dr. Ir. Bambang Hermanto', 'Batas Hari Ini', 'bad'],
            ['UD Jamu Barokah — Permohonan Proyek Kasir', 'Kurasi Brief UMKM', 'Koordinator Kemitraan', '2 hari', 'warn'],
            ['Verifikasi 6 Logbook Lapangan Mahasiswa', 'Monitoring Logbook', 'Dosen Pembimbing', '1 hari', 'info'],
            ['MoU Kemitraan Sentra Batik Jetis Sidoarjo', 'Kerjasama Legal', 'Wakil Dekan III FST', '3 hari', 'info'],
            ['Penerbitan E-Sertifikat Angkatan Gasal', 'Sertifikasi Talenta', 'Bagian Kemahasiswaan', 'Selesai', 'ok']
          ].map(([p, k, pic, sla, tone]) => `
            <tr>
              <td><b style="font-weight:700;color:var(--ink)">${p}</b></td>
              <td><span class="pill brand" style="font-size:10px">${k}</span></td>
              <td style="font-size:12px;color:var(--muted)">${pic}</td>
              <td><span class="pill ${tone}">${sla}</span></td>
              <td style="text-align:right;color:var(--muted)">${ic('chevronR','i-xs')}</td>
            </tr>`).join('')}
        </table>
      </div>

      <!-- Right Column: IKU Targets & Regional Spread -->
      <div style="display:flex;flex-direction:column;gap:18px">
        <!-- IKU Card -->
        <div class="panel">
          <div class="panel-h">
            <h3>Capaian Indikator Kinerja Utama (IKU)</h3>
          </div>
          <div style="padding:16px 20px">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:12.5px">
                <b>IKU 2: Mahasiswa Berkegiatan di Luar Kampus</b>
                <span style="font-weight:800;color:var(--brand)">88%</span>
              </div>
              <div class="bar" style="margin-top:6px"><i style="width:88%"></i></div>
              <div style="font-size:11px;color:var(--muted);margin-top:4px">142 dari target 160 mahasiswa semester ini</div>
            </div>

            <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line-soft)">
              <div style="display:flex;justify-content:space-between;font-size:12.5px">
                <b>IKU 6: Kemitraan Prodi dengan UMKM Riil</b>
                <span style="font-weight:800;color:var(--ok)">94%</span>
              </div>
              <div class="bar" style="margin-top:6px"><i style="width:94%;background:var(--ok)"></i></div>
              <div style="font-size:11px;color:var(--muted);margin-top:4px">64 UMKM aktif di 5 kab/kota Jawa Timur</div>
            </div>
          </div>
        </div>

        <!-- Regional Spread -->
        <div class="panel" style="flex:1">
          <div class="panel-h">
            <h3>Sebaran Mitra UMKM Jawa Timur</h3>
          </div>
          <div style="padding:14px 20px">
            ${[
              ['Surabaya (F&B & Retail Digital)', 26, 40],
              ['Sidoarjo (Sentra Kerajinan Kulit & Batik)', 18, 28],
              ['Gresik (Koperasi & Olahan Pangan)', 11, 17],
              ['Malang Raya (Agroindustri & Kreatif)', 6, 10],
              ['Mojokerto (Sentra Alas Kaki)', 3, 5]
            ].map(([kota, jml, pct]) => `
              <div style="margin-bottom:10px">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
                  <span style="font-weight:650">${kota}</span>
                  <span style="font-weight:800;color:var(--ink)">${jml} UMKM</span>
                </div>
                <div class="bar" style="height:5px"><i style="width:${pct*2.2}%"></i></div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`,

  proyek: `
  <div class="wpad">
    <div class="panel">
      <div class="panel-h">
        <h3>Master Katalog Kebutuhan Proyek &amp; Kurasi NLP</h3>
        <div class="act">
          <span class="chip on">Semua Kategori</span>
          <span class="chip">UI/UX &amp; Web (22)</span>
          <span class="chip">Kasir &amp; POS (14)</span>
          <span class="chip">Branding &amp; Media (12)</span>
        </div>
      </div>
      <table>
        <tr>
          <th>Nama Proyek &amp; UMKM</th>
          <th>Required Skills</th>
          <th>Top Candidate (NLP)</th>
          <th>Skor Kemiripan</th>
          <th>Konversi SKS</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
        ${[
          ['Redesain UI/UX Katalog Kulit<br><small class="muted">CV Tanggulangin · Sidoarjo</small>', 'Figma, UI/UX, Tailwind', 'Ahmad Dhafin (SI UNAIR)', '94% Match', '3 SKS', 'Aktif Pengerjaan', 'ok'],
          ['Aplikasi Kasir &amp; Stok Jamu Herbal<br><small class="muted">UD Jamu Barokah · Surabaya</small>', 'Laravel, PostgreSQL, Struk', 'Rizky Maulana (TI UNAIR)', '88% Match', '4 SKS', 'Menunggu Seleksi', 'warn'],
          ['Branding &amp; Foto Kemasan Keripik<br><small class="muted">Sentra Keripik Apel · Malang</small>', 'Canva, DKV, Packaging', 'Nabila Putri (DKV UNAIR)', '91% Match', '3 SKS', 'Aktif Pengerjaan', 'ok'],
          ['Sistem Pembukuan Kas Digital Kasir<br><small class="muted">Koperasi Batik Jetis · Sidoarjo</small>', 'Excel/Web, Accounting, DB', 'Farhan Yudha (SI UNAIR)', '85% Match', '3 SKS', 'Menunggu Seleksi', 'warn']
        ].map(([p, sk, c, sc, sks, st, tone]) => `
          <tr>
            <td><b>${p}</b></td>
            <td style="font-size:11.5px;color:var(--muted)">${sk}</td>
            <td><b style="color:var(--brand)">${c}</b></td>
            <td><span class="match-score high">${sc}</span></td>
            <td><b>${sks}</b></td>
            <td><span class="pill ${tone}">${st}</span></td>
            <td><button class="pill brand" style="cursor:pointer">Tinjau</button></td>
          </tr>`).join('')}
      </table>
    </div>
  </div>`,

  workspace: `
  <div class="wpad">
    <div class="panel">
      <div class="panel-h">
        <h3>Monitoring Seluruh Workspace Aktif &amp; Deteksi Dini Risiko (SLA)</h3>
      </div>
      <table>
        <tr>
          <th>Workspace Proyek</th>
          <th>Tim Mahasiswa</th>
          <th>Mitra UMKM</th>
          <th>Milestone Aktif</th>
          <th>Persentase</th>
          <th>Peringatan Dini</th>
        </tr>
        ${[
          ['Redesain UI/UX Katalog Kulit', 'Ahmad Dhafin Al Farisy', 'CV Tanggulangin Leather', 'Sprint 2 · Usability Testing', '75%', 'Tepat Waktu', 'ok'],
          ['Aplikasi Kasir Jamu Barokah', 'Rizky Maulana &amp; Tim', 'UD Jamu Barokah', 'Sprint 1 · Desain Database', '30%', 'Tepat Waktu', 'ok'],
          ['Branding Keripik Apel Malang', 'Nabila Putri Pratama', 'Sentra Keripik Apel', 'Sprint 3 · Cetak Kemasan', '90%', 'Menunggu ACC Final', 'warn'],
          ['Katalog Digital Batik Jetis', 'Farhan Yudha &amp; Tim', 'Koperasi Batik Sidoarjo', 'Sprint 1 · Foto Produk', '15%', 'Keterlambatan 3 Hari', 'bad']
        ].map(([w, m, u, ml, p, alert, tone]) => `
          <tr>
            <td><b>${w}</b></td>
            <td>${m}</td>
            <td class="muted">${u}</td>
            <td><span class="pill brand" style="font-size:11px">${ml}</span></td>
            <td style="width:140px">
              <div style="font-size:11px;font-weight:700;margin-bottom:3px">${p}</div>
              <div class="bar" style="height:6px"><i style="width:${p}"></i></div>
            </td>
            <td><span class="pill ${tone}">${alert}</span></td>
          </tr>`).join('')}
      </table>
    </div>
  </div>`,

  mbkm: `
  <div class="wpad">
    <div class="panel">
      <div class="panel-h">
        <h3>Ekuivalensi Kurikulum &amp; Konversi Matakuliah MBKM FST UNAIR</h3>
        <div class="act"><span class="chip on">Semester Gasal 2026/2027</span></div>
      </div>
      <table>
        <tr>
          <th>NIM &amp; Nama Mahasiswa</th>
          <th>Program Studi</th>
          <th>Proyek Industri Mitra</th>
          <th>Matakuliah Terkonversi</th>
          <th>Bobot SKS</th>
          <th>Nilai Akhir</th>
          <th>Status Berita Acara</th>
        </tr>
        ${[
          ['187241057 · Ahmad Dhafin', 'S1 Sistem Informasi', 'CV Tanggulangin Leather', 'Proyek RPL (4 SKS) &amp; IMK (3 SKS)', '7 SKS', 'A (4.00)', 'Tersahkan Dekanat', 'ok'],
          ['187241012 · Nabila Putri', 'S1 DKV', 'Sentra Keripik Apel Malang', 'Desain Kemasan (3 SKS) &amp; Branding (3 SKS)', '6 SKS', 'A (4.00)', 'Tersahkan Dekanat', 'ok'],
          ['187241088 · Rizky Maulana', 'S1 Teknik Informatika', 'UD Jamu Barokah', 'Rekayasa Web (3 SKS) &amp; Basis Data (3 SKS)', '6 SKS', 'A- (3.75)', 'Menunggu Pleno', 'warn']
        ].map(([m, p, u, mk, s, n, st, tone]) => `
          <tr>
            <td><b>${m}</b></td>
            <td>${p}</td>
            <td class="muted">${u}</td>
            <td style="color:var(--brand);font-weight:650">${mk}</td>
            <td><b>${s}</b></td>
            <td><b style="color:var(--ok)">${n}</b></td>
            <td><span class="pill ${tone}">${st}</span></td>
          </tr>`).join('')}
      </table>
    </div>
  </div>`,

  logbook: `
  <div class="wpad">
    <div class="panel">
      <div class="panel-h">
        <h3>Antrean Verifikasi Logbook Aktivitas Lapangan Mahasiswa</h3>
      </div>
      <table>
        <tr>
          <th>Mahasiswa</th>
          <th>Periode Kerja</th>
          <th>Uraian Singkat Kegiatan</th>
          <th>Jam Kerja</th>
          <th>Paraf UMKM</th>
          <th>Aksi Dosen</th>
        </tr>
        ${[
          ['Ahmad Dhafin Al Farisy', '15–20 Sep 2026', 'Usability testing wireframe &amp; perbaikan alur checkout dengan 5 pembeli produk kulit', '36 Jam', 'Terparaf (H. Mochammad)', 'Sahkan'],
          ['Nabila Putri', '16–21 Sep 2026', 'Finalisasi mockup 3D kemasan keripik apel dan konsultasi percetakan', '32 Jam', 'Terparaf (Ibu Rahayu)', 'Sahkan'],
          ['Rizky Maulana', '14–19 Sep 2026', 'Normalisasi skema basis data kasir dan integrasi modul thermal printer', '38 Jam', 'Terparaf (Bpk. Subarjo)', 'Sahkan']
        ].map(([m, p, u, j, pr, act]) => `
          <tr>
            <td><b>${m}</b></td>
            <td class="muted">${p}</td>
            <td style="font-size:12px;max-width:320px">${u}</td>
            <td><b>${j}</b></td>
            <td><span class="pill ok">${pr}</span></td>
            <td><button class="pill brand" style="cursor:pointer">${act}</button></td>
          </tr>`).join('')}
      </table>
    </div>
  </div>`,

  mitra: `
  <div class="wpad">
    <div class="panel">
      <div class="panel-h">
        <h3>Jaringan 64 Mitra UMKM Jawa Timur Terhubung</h3>
        <div class="act"><span class="chip on">Semua Wilayah</span></div>
      </div>
      <table>
        <tr>
          <th>Nama Usaha &amp; Pemilik</th>
          <th>Kota / Kabupaten</th>
          <th>Sektor Industri</th>
          <th>Proyek Selesai</th>
          <th>Rating Kepuasan</th>
          <th>Status Kemitraan</th>
        </tr>
        ${[
          ['CV Tanggulangin Leather Goods<br><small class="muted">H. Mochammad</small>', 'Sidoarjo', 'Kerajinan Kulit &amp; Fashion', '2 Proyek', '⭐⭐⭐⭐⭐ 5.0', 'MoU Aktif 2026–2028', 'ok'],
          ['UD Jamu Barokah<br><small class="muted">Bpk. Subarjo</small>', 'Surabaya', 'Minuman Tradisional &amp; Herbal', '1 Proyek', '⭐⭐⭐⭐⭐ 4.9', 'MoU Aktif 2026–2028', 'ok'],
          ['Sentra Keripik Apel Lestari<br><small class="muted">Ibu Rahayu</small>', 'Batu Malang', 'Olahan Pangan &amp; Pertanian', '3 Proyek', '⭐⭐⭐⭐⭐ 5.0', 'MoU Aktif 2025–2027', 'ok'],
          ['Koperasi Batik Jetis Sidoarjo<br><small class="muted">Hj. Anik</small>', 'Sidoarjo', 'Tekstil &amp; Kerajinan Tradisional', '1 Proyek', '⭐⭐⭐⭐ 4.8', 'MoU Aktif 2026–2028', 'ok']
        ].map(([u, k, s, p, r, m, tone]) => `
          <tr>
            <td><b>${u}</b></td>
            <td>${k}</td>
            <td class="muted">${s}</td>
            <td><b>${p}</b></td>
            <td style="color:#D97706;font-weight:700">${r}</td>
            <td><span class="pill ${tone}">${m}</span></td>
          </tr>`).join('')}
      </table>
    </div>
  </div>`,

  iku: `
  <div class="wpad">
    <div class="panel">
      <div class="panel-h">
        <h3>Laporan Eksekutif Capaian Indikator Kinerja Utama (IKU 2 &amp; IKU 6)</h3>
      </div>
      <div style="padding:22px">
        <div class="stats" style="margin-bottom:20px">
          <div class="stat">
            <div class="lbl">IKU 2: Mahasiswa di Luar Kampus</div>
            <div class="num">142 <span style="font-size:16px;color:var(--ok)">/ 160</span></div>
            <div class="delta" style="color:var(--ok)">Tercapai 88.75% dari Target</div>
          </div>
          <div class="stat">
            <div class="lbl">IKU 6: Kemitraan Prodi &amp; UMKM</div>
            <div class="num">64 <span style="font-size:16px;color:var(--ok)">/ 50</span></div>
            <div class="delta" style="color:var(--ok)">Melampaui Target (128%)</div>
          </div>
          <div class="stat">
            <div class="lbl">Rata-rata Konversi SKS</div>
            <div class="num">6.2 SKS</div>
            <div class="delta muted">Per Mahasiswa Peserta</div>
          </div>
          <div class="stat">
            <div class="lbl">Efisiensi Biaya UMKM</div>
            <div class="num">Rp480 jt</div>
            <div class="delta" style="color:var(--brand)">Nilai Valuasi Hibah Talenta</div>
          </div>
        </div>
        <p style="font-size:13px;color:var(--body);line-height:1.6">
          Laporan ini disusun otomatis berdasarkan data logbook tervalidasi, berita acara pengesahan SKS dosen, serta tanda tangan elektronik nota kesepahaman (MoU) antara Fakultas Sains dan Teknologi Universitas Airlangga dengan mitra usaha UMKM di Jawa Timur.
        </p>
      </div>
    </div>
  </div>`
};

function pickWNav(k) {
  S.wnav = k;
  renderWeb();
}

function renderWeb() {
  // Render Left Rail
  const wrailEl = document.getElementById('wrail');
  if (wrailEl) {
    wrailEl.innerHTML = WSECT.map(([sid, icon, label]) => `
      <div class="r ${SECT_OF[S.wnav] === sid ? 'on' : ''}" onclick="pickWNav('${WSECT.find(x => x[0] === sid)[3][0][0]}')">
        ${ic(icon, 'i-sm')}
        <span>${label}</span>
      </div>`).join('');
  }

  // Render Subnav
  const activeSect = WSECT.find(x => x[0] === (SECT_OF[S.wnav] || 'utama'));
  const wmhEl = document.getElementById('wmh');
  const wnavEl = document.getElementById('wnav');
  if (wmhEl && activeSect) {
    wmhEl.innerHTML = `<b>${activeSect[2]}</b><span class="cnt">${activeSect[3].length}</span>`;
  }
  if (wnavEl && activeSect) {
    wnavEl.innerHTML = `
      <div class="lbl">Menu Modul</div>
      ${activeSect[3].map(([k, icon, title, cnt]) => `
        <button class="nav ${S.wnav === k ? 'on' : ''}" onclick="pickWNav('${k}')">
          ${ic(icon, 'i-sm')}
          <span>${title}</span>
          ${cnt ? `<span class="cnt">${cnt}</span>` : ''}
        </button>`).join('')}
    `;
  }

  // Render Main Content
  const wmainEl = document.getElementById('wmain');
  if (wmainEl) {
    wmainEl.innerHTML = `
      <div class="topbar">
        <div>
          <h2>${WTITLE[S.wnav] || 'Dashboard'}</h2>
          <div class="sub">SkillBridge Hub · FST Universitas Airlangga × UMKM Jawa Timur</div>
        </div>
        <div class="search">
          ${ic('search','i-xs')}
          <input type="text" placeholder="Cari mahasiswa, proyek, UMKM..." style="border:0;outline:0;font:inherit;font-size:12px;width:100%">
        </div>
        <span class="badge-semester">🎓 Semester Gasal 2026/2027</span>
      </div>
      ${WSCREEN[S.wnav] || WSCREEN.dash}
    `;
  }
}

const SECT_OF = {};
WSECT.forEach(([sid, , , items]) => items.forEach(([k]) => { SECT_OF[k] = sid; }));
