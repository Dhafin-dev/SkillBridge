@echo off
echo =================================================================
echo   Menjalankan SkillBridge FastAPI NLP SkillMatch Engine
echo   URL: http://127.0.0.1:8000 (Docs: http://127.0.0.1:8000/docs)
echo =================================================================
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
