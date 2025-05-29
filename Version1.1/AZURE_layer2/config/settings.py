import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables from .env file
load_dotenv(find_dotenv())


class Settings:
    # Azure OpenAI Configuration
    AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
    AZURE_OPENAI_CHAT_DEPLOYMENT_ID = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_ID")
    AZURE_OPENAI_API_VERSION = os.getenv(
        "AZURE_OPENAI_API_VERSION", "2024-12-01-preview"
    )
    AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")

    # Weaviate Configuration
    WEAVIATE_URL = os.getenv("WEAVIATE_URL")

    # FastAPI Application Configuration
    NEXXUS_PORT = os.getenv("NEXXUS_PORT", 8000)
    NEXXUS_WORKERS = os.getenv("NEXXUS_WORKERS", 1)
    NEXXUS_LOG_LEVEL = os.getenv("NEXXUS_LOG_LEVEL", "debug")
    NEXXUS_DEBUG = os.getenv("NEXXUS_DEBUG", 1)


settings = Settings()
