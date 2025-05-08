import weaviate
import os
from config.settings import settings

WEAVIATE_URL = settings.WEAVIATE_URL

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
