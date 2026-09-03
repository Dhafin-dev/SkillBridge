import re
import math
from typing import List, Dict, Any
from collections import Counter


def preprocess_text(text: str) -> str:
    """Membersihkan dan menormalisasi teks untuk pemrosesan NLP.
    
    Tahapan:
    1. Case folding (lowercasing)
    2. Menghapus tanda baca, simbol khusus, dan angka non-esensial
    3. Normalisasi spasi
    """
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def get_ngrams(tokens: List[str], n: int = 1) -> List[str]:
    """Menghasilkan n-gram (unigram & bigram) dari daftar token."""
    if n == 1:
        return tokens
    return [" ".join(tokens[i:i + n]) for i in range(len(tokens) - n + 1)]


def calculate_tfidf_vectors(documents: List[str]) -> List[Dict[str, float]]:
    """Menghitung vektor TF-IDF untuk sekumpulan dokumen teks.
    
    Formula standar:
    TF(t, d) = frekuensi kemunculan term t dalam dokumen d / total terms dalam d
    IDF(t, D) = ln((1 + N) / (1 + df(t))) + 1  (smoothed IDF)
    """
    tokenized_docs = []
    for doc in documents:
        tokens = doc.split()
        # Gabungkan unigram dan bigram untuk menangkap frasa seperti "web development", "machine learning"
        unigrams = get_ngrams(tokens, 1)
        bigrams = get_ngrams(tokens, 2)
        all_terms = unigrams + bigrams
        tokenized_docs.append(all_terms)

    num_docs = len(documents)
    # Hitung Document Frequency (df) untuk setiap term
    df: Dict[str, int] = {}
    for terms in tokenized_docs:
        unique_terms = set(terms)
        for term in unique_terms:
            df[term] = df.get(term, 0) + 1

    # Hitung IDF untuk setiap term
    idf: Dict[str, float] = {}
    for term, count in df.items():
        idf[term] = math.log((1.0 + num_docs) / (1.0 + count)) + 1.0

    # Bentuk vektor TF-IDF berbobot dan lakukan normalisasi L2
    vectors = []
    for terms in tokenized_docs:
        if not terms:
            vectors.append({})
            continue
        term_counts = Counter(terms)
        total_terms = len(terms)
        
        vec: Dict[str, float] = {}
        for term, count in term_counts.items():
            tf = count / total_terms
            vec[term] = tf * idf.get(term, 1.0)
            
        # L2 Normalization: vec_norm = vec / sqrt(sum(v^2))
        norm = math.sqrt(sum(val ** 2 for val in vec.values()))
        if norm > 0:
            for term in vec:
                vec[term] /= norm
        vectors.append(vec)

    return vectors


def compute_cosine_similarity(vec1: Dict[str, float], vec2: Dict[str, float]) -> float:
    """Menghitung Cosine Similarity antara dua vektor ternormalisasi L2.
    
    Similarity = DotProduct(vec1, vec2)
    """
    if not vec1 or not vec2:
        return 0.0
    
    dot_product = 0.0
    for term, val in vec1.items():
        if term in vec2:
            dot_product += val * vec2[term]
            
    return max(0.0, min(1.0, dot_product))


def calculate_skill_match(
    project_requirements: str,
    required_skills: List[str],
    candidates: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """Menghitung kemiripan teks profil/resume kandidat terhadap kebutuhan proyek.
    
    Mengembalikan daftar kandidat terurut dari persentase skor kecocokan tertinggi ke terendah.
    """
    if not candidates:
        return []

    # Gabungkan kualifikasi proyek dan required skills
    skills_joined = " ".join(required_skills) if isinstance(required_skills, list) else str(required_skills or "")
    project_full = f"{project_requirements} {skills_joined}"
    clean_project = preprocess_text(project_full)

    # Preprocessing seluruh kandidat
    clean_candidates = []
    raw_cand_skills = []
    for cand in candidates:
        p_text = cand.get("profile_text", "") or ""
        s_text = cand.get("skills", "") or ""
        if isinstance(s_text, list):
            s_text = " ".join(s_text)
        cand_full = f"{p_text} {s_text}"
        clean_candidates.append(preprocess_text(cand_full))
        raw_cand_skills.append(preprocess_text(s_text).split())

    # Vektorisasi korpus [project, candidate_1, candidate_2, ...]
    all_docs = [clean_project] + clean_candidates
    vectors = calculate_tfidf_vectors(all_docs)

    proj_vector = vectors[0]
    cand_vectors = vectors[1:]

    scored_candidates = []
    proj_tokens = set(clean_project.split())

    for idx, cand in enumerate(candidates):
        cand_vec = cand_vectors[idx]
        sim = compute_cosine_similarity(proj_vector, cand_vec)
        
        # Skor kecocokan dalam persentase (0 - 100%)
        # Terapkan boost kurasi jika keahlian spesifik langsung cocok
        match_score = round(sim * 100.0, 1)

        # Cari term kata kunci yang tumpang-tindih (overlapping skills)
        cand_tokens = set(clean_candidates[idx].split())
        overlap = list(proj_tokens.intersection(cand_tokens))
        # Filter kata umum pendek
        meaningful_overlap = [w for w in overlap if len(w) > 2][:8]

        scored_candidates.append({
            "candidate_id": cand.get("candidate_id"),
            "candidate_name": cand.get("candidate_name", f"Candidate #{cand.get('candidate_id')}"),
            "match_score": match_score,
            "overlapping_skills": meaningful_overlap,
            "raw_similarity": round(sim, 4)
        })

    # Urutkan secara descending berdasarkan match_score
    scored_candidates.sort(key=lambda x: x["match_score"], reverse=True)

    # Tetapkan urutan peringkat (rank 1, 2, 3...)
    for rank_idx, item in enumerate(scored_candidates, 1):
        item["rank"] = rank_idx

    return scored_candidates
