# AZURE_layer2 Setup Instructions

This guide provides step-by-step instructions to set up the `AZURE_layer2` module for development and deployment. The module uses FastAPI for the backend, Weaviate as the database, and integrates with OpenAI for vectorization and sentiment analysis.

---
 
## Prerequisites

Before setting up `AZURE_layer2`, ensure you have the following installed:

1. **Python** (version 3.9 or higher)
2. **Docker** and **Docker Compose**
3. **Git**

---

## Setup Instructions

### 1. Clone the Repository
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the AZURE_layer2 directory
cd <repository-path>/Version1.1 # Or directly to AZURE_layer2 if cloning this specific module
```

### 2. Set Up Environment Variables

1. Create a `.env` file in the `Version1.1` directory (if not already present).
2. Add the following environment variables:

```env
OPENAI_API_KEY=<your-openai-api-key>
WEAVIATE_URL=http://weaviate:8080
```

3. Replace `<your-openai-api-key>` with your OpenAI API key.

---

### 3. Install Python Dependencies

If you are running the application locally (without Docker):

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

---

### 4. Run the Application with Docker

1. Navigate to the `Version1.1` directory:
   ```bash
   cd <repository-path>/Version1.1
   ```

2. Build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```

3. The FastAPI application will be available at:
   ```
   http://localhost:8000
   ```

4. The Weaviate instance will be available at:
   ```
   http://localhost:8080
   ```

---

### 5. Test the Application

1. Open your browser or use a tool like `curl` or Postman to test the API.
2. The API documentation is available at:
   ```
   http://localhost:8000/docs
   ```

---

## Key Features

1. **Sentiment Analysis**:
   - Uses `nltk`'s VADER for sentiment analysis.

2. **Weaviate Integration**:
   - Stores and retrieves vectorized data using the `text2vec-openai` module.

3. **LangChain Integration**:
   - Generates positive and alternative suggestions using OpenAI.

---
 
## Troubleshooting

1. **Docker Issues**:
   - Ensure Docker is running.
   - Check for port conflicts (e.g., `8000` or `8080`).

2. **Environment Variables**:
   - Verify that the `.env` file is correctly set up.

3. **Dependency Issues**:

---

For further assistance, contact the development team or refer to the project documentation.