from pydantic import BaseSettings

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str

    # OpenAI API Key
    OPENAI_API_KEY: str

    # Weaviate URL
    WEAVIATE_URL: str

    class Config:
        env_file = ".env"  # Load environment variables from .env file

# Instantiate settings
settings = Settings()