import logging
from weaviate import WeaviateClient, exceptions
from typing import Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def ensure_schema(client: Optional[WeaviateClient]):
    """Ensures the 'Echo' class exists in Weaviate."""
    if not client:
        logger.critical("Weaviate client could not be initialized.")
        return False

    schema = {
        "classes": [
            {
                "class": "Echo",
                "properties": [
                    {"name": "content", "dataType": ["text"]},
                    {"name": "authorId", "dataType": ["text"]},
                    {"name": "username", "dataType": ["text"]},
                    {"name": "flagData", "dataType": ["text"]},
                ],
            }
        ]
    }
    try:
        if not client.schema.contains(schema):
            client.schema.create(schema)
            logger.info("Class 'Echo' created in Weaviate.")
        else:
            logger.info("Weaviate schema ensured.")
        return True
    except exceptions.UnexpectedStatusCodeException as e:
        logger.error(f"Failed to ensure Weaviate schema: {e}")
        return False
