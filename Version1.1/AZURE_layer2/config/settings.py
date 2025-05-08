import os


class Config:
    # Centralized access to environment variables
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "default_openai_key")
    WEAVIATE_URL = os.getenv("WEAVIATE_URL", "http://localhost:8080")


config = Config()
