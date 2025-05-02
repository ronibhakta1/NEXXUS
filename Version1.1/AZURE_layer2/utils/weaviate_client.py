import weaviate
import os
from dotenv import load_dotenv

load_dotenv()

WEAVIATE_URL = os.getenv("WEAVIATE_URL", "http://localhost:8080")

client = weaviate.Client(
    url=WEAVIATE_URL,
    additional_headers={
        "X-OpenAI-Api-Key": os.getenv(
            "OPENAI_API_KEY"
        ),  # We'll use OpenAI to vectorize
    },
)


def get_client():
    return client
