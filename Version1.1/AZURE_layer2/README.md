# NEXXUS – LLM-Powered Sentiment-Aware Content Pipeline

NEXXUS is a backend AI system built with FastAPI, LangChain, Azure OpenAI, and Weaviate. It performs sentiment analysis on user-submitted "echoes", rewrites negative/neutral inputs using an LLM, and stores the results in a vector database for retrieval-based suggestions.

---

## 🔧 Tech Stack

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![LangChain](https://img.shields.io/badge/LangChain-000000?style=for-the-badge)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai)
![Weaviate](https://img.shields.io/badge/Weaviate-ED6C02?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-0db7ed?style=for-the-badge&logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql)

---

## 🧠 System Architecture

[Frontend] → POST /echo
↓
[FastAPI Backend]
├─ Sentiment Analysis (pipeline)
├─ LangChain Rewriter (OpenAI)
└─ Weaviate Storage (vector embedding)
↓
Dashboard / Retrieval

---

## 🚀 Workflow

1. **User submits an echo**
2. **Sentiment analysis** classifies it
   - If **positive** → marked public
   - If **neutral/negative** → rephrased with LLM
3. **LangChain** generates alternative
4. Result stored in **Weaviate vector DB**
5. Public dashboard shows rewritten output

---

## 📡 API Endpoints

| Method | Route      | Description                                                      |
|--------|------------|------------------------------------------------------------------|
| POST   | `/echo`    | Receives echo text, processes sentiment, rewrites if needed       |
| GET    | `/health`  | Health check endpoint                                            |
| GET    | `/`        | Root endpoint, returns welcome HTML                              |

---

## 🧪 Tech Features

- 🔄 Sentiment classification using HuggingFace / transformer pipeline
- ✍️ Prompt template design and LLM chaining with LangChain
- 📥 Weaviate vector storage and semantic search
- 🧱 Pydantic validation + modular route structure
- 📦 Dockerized backend for local or cloud deployment

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/yourusername/NEXXUS
cd NEXXUS

python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Set up .env file
cp .env.example .env
# Add your OPENAI_API_KEY, WEAVIATE_URL, etc.

uvicorn main:app --reload
```
