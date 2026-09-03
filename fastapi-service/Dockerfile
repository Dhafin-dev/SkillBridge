# Dockerfile untuk Layanan Mikro FastAPI NLP SkillMatch Engine
FROM python:3.11-slim

WORKDIR /app

# Hindari penulisan bytecode .pyc dan aktifkan unbuffered logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependensi
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin kode sumber
COPY . .

# Port default
EXPOSE 8000

# Jalankan uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
