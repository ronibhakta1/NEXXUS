FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Add NLTK download here
RUN python -m nltk.downloader vader_lexicon

# Set only non-sensitive environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# EXPOSE the port Nginx will listen on externally.
EXPOSE 80
# Adjust to 80 if Nginx listens on the standard HTTP port, or as per your Nginx config.

COPY ./AZURE_layer2/ /app/AZURE_layer2/
RUN chmod +x /app/AZURE_layer2/app.py

# Setup NGINX
RUN apt-get update && \
    apt-get install -y --no-install-recommends nginx && \
    rm -rf /var/lib/apt/lists/*
RUN rm -f /etc/nginx/conf.d/default.conf /etc/nginx/sites-enabled/default
RUN adduser --disabled-password --gecos "" nginx
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/conf.d/nexxus.conf /etc/nginx/conf.d/nexxus.conf

# Run FastAPI app and Nginx
CMD ["sh", "-c", "python -m uvicorn AZURE_layer2.app:app --host 0.0.0.0 --port 1337 --workers=${NEXXUS_WORKERS:-1} --log-level=${NEXXUS_LOG_LEVEL:-info} & exec nginx"]
