FROM python:3.11-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install ExifTool (optional - remove if not needed)
RUN apt-get update && apt-get install -y \
    libimage-exiftool-perl \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy app code
COPY app/ ./app

# Expose FastAPI port
EXPOSE 3000

# Optional default CMD (if not handled by docker-compose)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3000"]
