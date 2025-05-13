# AZURE_layer2/services/weaviate_services.py

import weaviate
import uuid
import os
from langchain import OpenAI
from langchain.prompts import PromptTemplate
from AZURE_layer2.config.settings import settings

# Initialize OpenAI LLM
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

llm = OpenAI(openai_api_key=openai_api_key, temperature=0.7)

# Define prompt template for generating positive suggestions
prompt_template = PromptTemplate(
    input_variables=["content"],
    template="Rephrase the following text into a positive version: {content}",
)

# Initialize Weaviate client
WEAVIATE_URL = settings.WEAVIATE_URL
weaviate_client = weaviate.Client(url=WEAVIATE_URL)


def generate_positive_suggestion(content: str) -> str:
    from langchain.chains import LLMChain

    chain = LLMChain(llm=llm, prompt=prompt_template)
    response = chain.run(content=content)
    return response.strip()


def store_in_weaviate_with_sentiment(content: str, author_id: int, sentiment: str):
    if not weaviate_client.is_ready():
        raise ConnectionError("Weaviate is not ready.")

    class_name = "EchoVector"

    if not weaviate_client.schema.contains({"classes": [{"class": class_name}]}):
        weaviate_client.schema.create_class(
            {
                "class": class_name,
                "properties": [
                    {"name": "content", "dataType": ["text"]},
                    {"name": "authorId", "dataType": ["int"]},
                    {"name": "sentiment", "dataType": ["text"]},
                ],
                "vectorizer": "text2vec-openai",
            }
        )

    object_uuid = str(uuid.uuid4())

    weaviate_client.data_object.create(
        data_object={"content": content, "authorId": author_id, "sentiment": sentiment},
        class_name=class_name,
        uuid=object_uuid,
    )

    return object_uuid


def store_in_weaviate(content: str, metadata: dict):
    """
    Store content and metadata in Weaviate.

    Args:
        content (str): The content to store.
        metadata (dict): Additional metadata to associate with the content.
    """
    if not weaviate_client.is_ready():
        raise ConnectionError("Weaviate is not ready.")

    class_name = "EchoVector"

    # Ensure the schema exists
    if not weaviate_client.schema.contains({"classes": [{"class": class_name}]}):
        weaviate_client.schema.create_class(
            {
                "class": class_name,
                "properties": [
                    {"name": "content", "dataType": ["text"]},
                    {"name": "metadata", "dataType": ["text"]},
                ],
                "vectorizer": "text2vec-openai",
            }
        )

    # Create the data object
    weaviate_client.data_object.create(
        data_object={"content": content, "metadata": metadata},
        class_name=class_name,
    )
