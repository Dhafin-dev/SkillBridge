# SkillBridge Hub — Prototipe Antarmuka Pitching Stakeholder
### Sistem Informasi Kolaborasi Proyek Akademik dan UMKM Berbasis NLP SkillMatch Engine
**Fakultas Sains dan Teknologi · Universitas Airlangga**

---

## 🌟 Tentang Prototipe Ini
Prototipe ini dirancang khusus untuk keperluan presentasi dan pitching kepada para pemangku kepentingan (*stakeholders*):
1. **Dosen Pembimbing & Pimpinan Kampus (Dekanat/Rektorat)**: Memperlihatkan kepatuhan terhadap standar MBKM, pencapaian **IKU 2** (Mahasiswa berkegiatan di luar kampus) & **IKU 6** (Kemitraan industri riil), dan ekuivalensi SKS terstruktur.
2. **Mitra UMKM / Industri**: Memperlihatkan kemudahan penerbitan brief proyek digitalisasi tanpa beban teknis, serta efisiensi kurasi kandidat menggunakan mesin rekomendasi cerdas.
3. **Mahasiswa (Talenta)**: Menampilkan pencocokan otomatis keahlian (*NLP SkillMatch 90%+*), monitoring pengerjaan terstruktur dalam ruang kerja (*workspace*), dan portofolio terverifikasi industri dengan rating bintang dan e-sertifikat.

---

## 🚀 Fitur Utama

### 1. Mode Surface Ganda (*Dual Surface Showcase*)
- 📱 **Aplikasi Mobile**: Simulasi smartphone interaktif untuk 3 peran (*Mahasiswa*, *Mitra UMKM*, dan *Dosen Pembimbing*) lengkap dengan panel catatan argumentasi pitching (*Rationale Card*) di sisi kanan.
- 💻 **Dashboard Kampus & Industri**: Dasbor web eksekutif ala enterprise (Icon Rail 104px + Subnav 220px + Main Canvas) untuk analitik data, kurasi proyek, monitoring SLA workspace, dan rekapitulasi SKS MBKM.

### 2. Pilihan Tema Visual Hero (6 Varian)
- **1 · Vibrant Blue**: Identitas resmi SkillBridge modern & dinamis.
- **2 · UNAIR Gold**: Aksen keilmuan dan identitas almamater Universitas Airlangga.
- **3 · Emerald Tech**: Visual pertumbuhan ekonomi dan digitalisasi UMKM.
- **4 · Cyber Slate**: Gaya tech enterprise dan analitik data.
- **5 · Clean White**: Tampilan terang dan jernih untuk presentasi di ruangan terang.
- **6 · AI Violet**: Sentuhan modernitas algoritma kecerdasan buatan (*NLP Engine*).

---

## 🌐 Cara Menjalankan & Deploy ke GitHub Pages (`github.io`)

### 1. Jalankan di Lokal (Localhost)
Cukup buka file `index.html` di peramban web modern (Google Chrome / Microsoft Edge / Firefox), atau buka melalui web server lokal.

### 2. Deploy ke GitHub Pages (Gratis & Cepat)
Repository ini telah dilengkapi dengan GitHub Actions workflow `.github/workflows/deploy.yml`.

Langkah deploy:
1. Buat repository publik baru di GitHub dengan nama: `skillbridge-prototype` (atau nama lain yang Anda inginkan).
2. Di folder ini, jalankan perintah git remote dan push:
   ```bash
   git remote add origin git@github.com:Dhafin-dev/skillbridge-prototype.git
   git branch -M main
   git push -u origin main
   ```
3. Di repository GitHub Anda, masuk ke **Settings** &rarr; **Pages** &rarr; Pada bagian **Build and deployment**, pilih **Source: GitHub Actions**.
4. Website prototipe Anda akan otomatis aktif di:
   ```
   https://dhafin-dev.github.io/skillbridge-prototype/
   ```

---

*Disusun oleh:*
**Ahmad Dhafin Al Farisy (187241057)**  
*Fullstack Software Engineer · S1 Sistem Informasi Universitas Airlangga*
