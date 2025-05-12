# Use a multi-stage build to optimize caching
FROM python:3.9-slim AS base

# Set the working directory
WORKDIR /app

# Install system dependencies and Python dependencies in one layer
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY requirements.txt ./

# Upgrade pip to the latest version before downloading packages
RUN pip install --upgrade pip

# Pre-download Python packages to a local cache
RUN pip download --no-cache-dir -r requirements.txt -d ./packages

# Final stage to build the runtime image
FROM python:3.9-slim AS final

# Set the working directory
WORKDIR /app

# Set environment variables (aligning with config/settings.py)
# Set non-sensitive environment variables
ENV WEAVIATE_URL="http://weaviate:8080"

# Sensitive data like OPENAI_API_KEY should be passed at runtime or managed via Docker secrets

# Copy pre-downloaded packages and install dependencies
COPY --from=base /app/packages ./packages
COPY requirements.txt ./
RUN pip install --no-cache-dir --no-index --find-links=./packages -r requirements.txt

# Download NLTK vader_lexicon data
RUN python -m nltk.downloader vader_lexicon

# Copy the application code
COPY AZURE_layer2 ./AZURE_layer2

# Expose the FastAPI port
EXPOSE 8000

# Command to run the FastAPI application
CMD ["uvicorn", "AZURE_layer2.app:app", "--host", "0.0.0.0", "--port", "8000"]