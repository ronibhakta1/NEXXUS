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

# Pre-download Python packages to a local cache
RUN pip download -r requirements.txt -d ./packages

# Final stage to build the runtime image
FROM python:3.9-slim AS final

# Set the working directory
WORKDIR /app

# Copy pre-downloaded packages and install dependencies
COPY --from=base /app/packages ./packages
COPY requirements.txt ./
RUN pip install --no-cache-dir --no-index --find-links=./packages -r requirements.txt

# Copy the application code
COPY AZURE_layer2 ./AZURE_layer2

# Expose the FastAPI port
EXPOSE 8000

# Command to run the FastAPI application
CMD ["uvicorn", "AZURE_layer2.app:app", "--host", "0.0.0.0", "--port", "8000"]