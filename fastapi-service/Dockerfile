# Dockerfile untuk Layanan Mikro FastAPI NLP SkillMatch Engine
# Kompatibel penuh dengan Hugging Face Spaces & Cloud Container (Port 7860)
FROM python:3.11-slim

# Buat user non-root (standar keamanan Hugging Face Spaces UID 1000)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR $HOME/app

# Install dependensi
COPY --chown=user:user requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Salin kode sumber
COPY --chown=user:user . .

# Port standar Hugging Face Spaces adalah 7860
EXPOSE 7860

# Jalankan uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
