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


@app.get("/")
def read_root():
    return {
        "service": "SkillBridge NLP SkillMatch Engine",
        "version": "1.0.0",
        "status": "online",
        "algorithm": "TF-IDF + Cosine Similarity",
        "endpoints": {
            "health": "/health",
            "match": "/match (POST)"
        }
    }


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
