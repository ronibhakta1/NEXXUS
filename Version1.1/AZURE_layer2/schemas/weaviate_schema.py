import weaviate


def get_echo_weaviate_schema():
    """
    Defines the Weaviate schema object for the Echo class.
    """
    return {
        "class": "Echo",
        "description": "An echo post with its content and metadata",
        "vectorizer": "text2vec-openai",  # As configured in Weaviate's docker-compose
        "moduleConfig": {
            "text2vec-openai": {  # Ensure this matches your Weaviate's module config
                "model": "ada",
                "modelVersion": "002",
                "type": "text",
            }
        },
        "properties": [
            {
                "name": "content",
                "dataType": ["text"],
                "description": "The textual content of the echo",
            },
            {
                "name": "authorId",
                "dataType": ["text"],
                "description": "The ID of the author",
            },
            {
                "name": "username",
                "dataType": ["text"],
                "description": "The username of the author",
                "moduleConfig": {
                    "text2vec-openai": {"skip": True, "vectorizePropertyName": False}
                },  # Don't vectorize username by default
            },
            {
                "name": "avatarUrl",
                "dataType": ["text"],
                "description": "URL to the author's avatar",
            },
            {
                "name": "imageUrl",
                "dataType": ["text"],
                "description": "URL to an image in the echo",
            },
            {
                "name": "timestamp",
                "dataType": ["date"],
                "description": "Timestamp of when the echo was created/ingested",
            },
            {
                "name": "flagData",
                "dataType": ["object"],
                "description": "Content flagging data",
                "nestedProperties": [
                    {"name": "sentiment", "dataType": ["text"]},
                    {
                        "name": "extraData",
                        "dataType": ["blob"],  # Changed from "object" to "blob"
                    },  # Can store arbitrary JSON
                ],
            },
        ],
    }


def ensure_weaviate_schema(client: weaviate.WeaviateClient):  # Type hint for v4 client
    """
    Checks if the Echo class exists in Weaviate and creates it if not.
    """
    echo_class_obj = get_echo_weaviate_schema()
    class_name = echo_class_obj["class"]

    # v4 collection existence check
    class_exists = client.collections.exists(class_name)

    if not class_exists:
        client.collections.create_from_dict(echo_class_obj)  # v4 method
        print(f"Class '{class_name}' created in Weaviate.")
    else:
        print(f"Class '{class_name}' already exists in Weaviate.")
