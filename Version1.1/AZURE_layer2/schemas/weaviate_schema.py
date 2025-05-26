import weaviate


def get_echo_weaviate_schema():
    """
    Defines the Weaviate schema object for the Echo class.
    """
    return {
        "class": "Echo",
        "description": "An echo post with its content and metadata",
        # Vectorizer and moduleConfig removed to skip automatic vectorization by Weaviate.
        # If you re-enable vectorization later, ensure Weaviate's environment variables
        # (OPENAI_APIKEY, AZURE_RESOURCE_NAME, AZURE_DEPLOYMENT_ID for embeddings)
        # are correctly set in docker-compose.yaml for text2vec-openai with Azure.
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
                "moduleConfig": {  # Explicitly skip vectorizing username
                    "text2vec-openai": {"skip": True, "vectorizePropertyName": False}
                },
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
        try:
            client.collections.create_from_dict(echo_class_obj)  # v4 method
            print(f"Class '{class_name}' created in Weaviate.")
        except Exception as e:
            print(f"Failed to create class '{class_name}': {e}")
            print(
                "Please ensure your Weaviate instance is configured with the 'text2vec-openai' module and a valid OpenAI API key."
            )
            # Potentially re-raise or handle more gracefully
    else:
        print(f"Class '{class_name}' already exists in Weaviate.")
