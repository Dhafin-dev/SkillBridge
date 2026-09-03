---
title: SkillBridge NLP SkillMatch Engine
emoji: ⚡
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# SkillBridge NLP SkillMatch Engine

Layanan mikro pemrosesan bahasa alami (*Natural Language Processing / NLP*) berbasis **FastAPI**, **TF-IDF Vectorizer**, dan **Cosine Similarity** untuk pemeringkatan kandidat proyek mahasiswa terhadap kebutuhan UMKM.

## Endpoints:
- `GET /health`: Cek kesehatan service.
- `POST /match`: Menghitung skor kemiripan teks kebutuhan proyek terhadap korpus kandidat mahasiswa.
