import json
from nlp_matcher import calculate_skill_match, preprocess_text

def test_preprocessing():
    sample = "Mahasiswa Teknik Informatika, menguasai LARAVEL 11 & PHP 8.2!"
    clean = preprocess_text(sample)
    assert "laravel" in clean
    assert "php" in clean
    print("[OK] test_preprocessing passed:", clean)

def test_matching():
    project_req = "Dibutuhkan talenta mahasiswa untuk pembuatan website katalog produk UMKM menggunakan Laravel, Blade, MySQL/PostgreSQL, dan Tailwind CSS."
    req_skills = ["Laravel", "PHP", "Blade", "PostgreSQL", "CSS"]

    candidates = [
        {
            "candidate_id": 1,
            "candidate_name": "Ahmad Dhafin Al Farisy",
            "profile_text": "Mahasiswa Sistem Informasi spesialis Fullstack Web Laravel, Blade, PostgreSQL, dan FastAPI.",
            "skills": ["Laravel", "PHP", "PostgreSQL", "Blade", "Python", "FastAPI"]
        },
        {
            "candidate_id": 2,
            "candidate_name": "Budi Pratama",
            "profile_text": "Graphic Designer dan Digital Marketer berpengalaman mengelola Instagram Ads dan Canva.",
            "skills": ["Canva", "Photoshop", "Social Media Marketing", "Copywriting"]
        },
        {
            "candidate_id": 3,
            "candidate_name": "Citra Lestari",
            "profile_text": "Frontend Developer menguasai HTML, CSS, JavaScript, dan antarmuka responsif web.",
            "skills": ["HTML", "CSS", "JavaScript", "Tailwind CSS"]
        }
    ]

    results = calculate_skill_match(project_req, req_skills, candidates)
    print("\n--- SkillMatch Engine Ranking Results ---")
    for r in results:
        print(f"Rank {r['rank']}: {r['candidate_name']} -> Score: {r['match_score']}% (Overlaps: {r['overlapping_skills']})")

    # Assert bahwa Ahmad Dhafin (ahli Laravel & PostgreSQL) berada di rank 1 dengan skor tertinggi
    assert results[0]["candidate_id"] == 1, "Kandidat dengan keahlian paling cocok harus menduduki Rank 1"
    assert results[0]["match_score"] > results[1]["match_score"]
    assert results[2]["candidate_id"] == 2 or results[1]["candidate_id"] == 3
    print("\n[OK] test_matching passed successfully!")

if __name__ == "__main__":
    test_preprocessing()
    test_matching()
