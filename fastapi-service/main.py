from typing import List, Optional, Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nlp_matcher import calculate_skill_match

app = FastAPI(
    title="SkillBridge NLP SkillMatch Engine",
    description="Microservice pemrosesan bahasa alami untuk pencocokan dan pemeringkatan kandidat proyek berbasis TF-IDF dan Cosine Similarity.",
    version="1.0.0"
)

# Aktifkan CORS untuk komunikasi dari Laravel & frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CandidateInput(BaseModel):
    candidate_id: Union[int, str]
    candidate_name: Optional[str] = ""
    profile_text: Optional[str] = ""
    skills: Optional[Union[List[str], str]] = []


class MatchRequest(BaseModel):
    project_requirements: str
    required_skills: Optional[Union[List[str], str]] = []
    candidates: List[CandidateInput]


from fastapi.responses import HTMLResponse

@app.get("/", response_class=HTMLResponse)
def read_root():
    return """
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SkillBridge Hub — NLP SkillMatch Engine Demo</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary: #4f46e5;
                --primary-dark: #4338ca;
                --bg: #f8fafc;
                --card: #ffffff;
                --text: #0f172a;
                --muted: #64748b;
                --border: #e2e8f0;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; padding: 2rem 1rem; }
            .container { max-width: 900px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 2rem; }
            .badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 999px; font-weight: 700; font-size: 0.8rem; margin-bottom: 0.75rem; }
            h1 { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em; }
            p.sub { color: var(--muted); font-size: 1rem; margin-top: 0.25rem; }
            .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 1.5rem; }
            label { display: block; font-weight: 700; font-size: 0.875rem; margin-bottom: 0.5rem; }
            input, textarea { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border); border-radius: 10px; font-family: inherit; font-size: 0.925rem; margin-bottom: 1rem; transition: border-color 0.2s; }
            input:focus, textarea:focus { outline: none; border-color: var(--primary); }
            button { background: var(--primary); color: white; border: none; padding: 0.85rem 1.75rem; font-weight: 700; font-size: 1rem; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
            button:hover { background: var(--primary-dark); transform: translateY(-1px); }
            .result-item { background: #ffffff; border: 1px solid var(--border); border-left: 5px solid var(--primary); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
            .score-bar { height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-top: 0.5rem; }
            .score-fill { height: 100%; background: linear-gradient(90deg, #4f46e5, #0ea5e9); border-radius: 999px; }
            .tag { display: inline-block; background: #f1f5f9; color: #334155; font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: 4px; margin-right: 4px; margin-top: 4px; }
            .tag-matched { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <span class="badge">⚡ Powered by Scikit-Learn TF-IDF & Cosine Similarity</span>
                <h1>SkillBridge NLP SkillMatch Engine</h1>
                <p class="sub">Demonstrasi Interaktif Pemeringkatan Talenta Mahasiswa Terhadap Kebutuhan Proyek UMKM</p>
                <div style="margin-top: 0.75rem; font-size: 0.85rem;">
                    <a href="/docs" target="_blank" style="color: var(--primary); font-weight: 700; text-decoration: underline;">Buka Dokumentasi Swagger REST API (/docs)</a>
                </div>
            </div>

            <div class="card">
                <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem;">1. Kebutuhan Proyek UMKM</h2>
                <label>Judul & Deskripsi Kebutuhan Proyek:</label>
                <textarea id="project_desc" rows="3">Pembuatan aplikasi web katalog produk digital dan sistem pemesanan online untuk UMKM kuliner dan kerajinan lokal.</textarea>
                
                <label>Keahlian Teknis yang Dicari (Koma terpisah):</label>
                <input type="text" id="required_skills" value="Laravel, Blade, PostgreSQL, HTML, CSS, PHP">

                <h2 style="font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 1rem;">2. Profil Kandidat Mahasiswa (JSON Corpus)</h2>
                <textarea id="candidates_json" rows="6" style="font-family: monospace; font-size: 0.8rem;">[
  {
    "candidate_id": 1,
    "candidate_name": "Ahmad Dhafin Al Farisy",
    "profile_text": "Mahasiswa S1 Sistem Informasi Universitas Airlangga, Fullstack Web Developer berpengalaman dengan Laravel, Blade, PostgreSQL, dan arsitektur microservice.",
    "skills": ["Laravel", "Blade", "PHP", "PostgreSQL", "HTML", "CSS"]
  },
  {
    "candidate_id": 2,
    "candidate_name": "Citra Lestari",
    "profile_text": "Mahasiswa Desain Komunikasi Visual, fokus pada pembuatan desain antarmuka aplikasi katalog produk interaktif dan aset grafis Figma.",
    "skills": ["UI/UX", "Figma", "CSS", "Wireframing"]
  },
  {
    "candidate_id": 3,
    "candidate_name": "Budi Pratama",
    "profile_text": "Mahasiswa Manajemen Bisnis, memiliki keahlian dalam riset pasar digital dan strategi pemasaran media sosial UMKM.",
    "skills": ["Digital Marketing", "SEO", "Copywriting"]
  }
]</textarea>

                <button onclick="runMatch()">⚡ Hitung Kesesuaian SkillMatch Sekarang</button>
            </div>

            <div id="results-container" style="display: none;">
                <h2 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem;">🏆 Hasil Pemeringkatan Kandidat (Live Calculation):</h2>
                <div id="results-list"></div>
            </div>
        </div>

        <script>
            async function runMatch() {
                const project_requirements = document.getElementById('project_desc').value;
                const required_skills = document.getElementById('required_skills').value;
                let candidates = [];
                try {
                    candidates = JSON.parse(document.getElementById('candidates_json').value);
                } catch(e) {
                    alert('Format JSON kandidat tidak valid!');
                    return;
                }

                const payload = {
                    project_requirements: project_requirements,
                    required_skills: required_skills,
                    candidates: candidates
                };

                const res = await fetch('/match', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await res.json();
                const list = document.getElementById('results-list');
                list.innerHTML = '';

                data.rankings.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'result-item';
                    el.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span style="background: #eef2ff; color: #4338ca; font-weight: 800; padding: 2px 8px; border-radius: 6px; font-size: 0.8rem;">Rank #${item.rank}</span>
                                <strong style="font-size: 1.15rem; margin-left: 0.5rem;">${item.candidate_name}</strong>
                            </div>
                            <div style="font-size: 1.25rem; font-weight: 800; color: #4f46e5;">${item.match_score}% Cocok</div>
                        </div>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${item.match_score}%"></div>
                        </div>
                        <div style="margin-top: 0.75rem; font-size: 0.85rem;">
                            <strong>Overlapping Kata Kunci Terdeteksi:</strong> 
                            ${item.overlapping_skills.map(s => `<span class="tag tag-matched">${s} ✓</span>`).join(' ')}
                        </div>
                    `;
                    list.appendChild(el);
                });

                document.getElementById('results-container').style.display = 'block';
                document.getElementById('results-container').scrollIntoView({ behavior: 'smooth' });
            }
        </script>
    </body>
    </html>
    """


@app.get("/health")
def health_check():
    return {"status": "healthy", "engine": "scikit-learn"}


@app.post("/match")
def match_candidates(payload: MatchRequest):
    """Menghitung skor kemiripan kandidat terhadap deskripsi dan kebutuhan proyek."""
    if not payload.candidates:
        return {
            "status": "success",
            "total_candidates": 0,
            "rankings": []
        }

    try:
        # Konversi candidates ke list of dict
        candidates_data = [cand.model_dump() for cand in payload.candidates]
        
        # Konversi required_skills ke list bila string
        req_skills = payload.required_skills
        if isinstance(req_skills, str):
            req_skills = [s.strip() for s in req_skills.split(",") if s.strip()]

        rankings = calculate_skill_match(
            project_requirements=payload.project_requirements,
            required_skills=req_skills,
            candidates=candidates_data
        )

        return {
            "status": "success",
            "total_candidates": len(rankings),
            "rankings": rankings
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gagal memproses kalkulasi SkillMatch: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
