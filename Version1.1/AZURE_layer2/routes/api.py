from fastapi import APIRouter, HTTPException, status, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from ..models.models import (
    EchoCreate,
)  # Import the Pydantic model from the models directory
from datetime import datetime
import json
import base64
from AZURE_layer2.utils.sentimental import (
    analyze_sentiment_with_content,
)  # Import sentiment utility
from AZURE_layer2.utils.langchain_suggester import (
    get_langchain_suggestions,
)  # Import Langchain utility
from fastapi import BackgroundTasks  # For delayed deletion
import asyncio  # For async functions
import weaviate  # Added for type hinting the client in background task

router = APIRouter()


@router.get("/", status_code=status.HTTP_200_OK)
async def root():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Nexxus API</title>
    </head>
    <body>
        <h1 style="text-align: center;">Welcome to the Nexxus API</h1>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content, media_type="text/html")


@router.post("/echo")
async def echo_endpoint(
    request: Request,
    echo_data: EchoCreate,
    background_tasks: BackgroundTasks,  # Added BackgroundTasks dependency
):  # Use Pydantic model for validation
    """
    Receives echo data, validates it, stores it in Weaviate, and returns a response.
    """
    client = request.app.weaviate_client

    if not client:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Weaviate client not available. Check server logs for errors.",
        )

    # Perform sentiment analysis using the utility function
    sentiment_result = analyze_sentiment_with_content(echo_data.content)
    sentiment_label = sentiment_result["sentiment"]

    # Prepare data object for Weaviate, converting Pydantic models to dicts where needed
    weaviate_object = {
        "content": echo_data.content,
        "authorId": echo_data.authorId,
        "username": echo_data.username,
        "avatarUrl": echo_data.avatar,  # Pydantic model uses 'avatar'
        "imageUrl": echo_data.image,  # Pydantic model uses 'image'
        "timestamp": datetime.utcnow().isoformat()
        + "Z",  # Weaviate expects ISO 8601 UTC
    }

    # Prepare flagData for Weaviate
    weaviate_flag_data_payload = {
        "sentiment": sentiment_label
    }  # Always include sentiment

    if echo_data.flagData:
        if echo_data.flagData.extraData and isinstance(
            echo_data.flagData.extraData, dict
        ):
            # Serialize the extraData dictionary to a JSON string
            extra_data_json_str = json.dumps(echo_data.flagData.extraData)
            # Encode the JSON string to base64
            extra_data_base64_str = base64.b64encode(
                extra_data_json_str.encode("utf-8")
            ).decode("utf-8")
            weaviate_flag_data_payload["extraData"] = extra_data_base64_str

    weaviate_object["flagData"] = (
        weaviate_flag_data_payload  # Assign the prepared flagData
    )

    try:
        # Get the collection (formerly class)
        echo_collection = client.collections.get("Echo")
        result_uuid = echo_collection.data.insert(
            properties=weaviate_object
        )  # Insert data

        response_data = {
            "message": "Data received and stored successfully in Weaviate.",
            "weaviate_uuid": result_uuid,
            "received_data": echo_data.model_dump(),
            "sentiment_details": sentiment_result,
            "feedback": "",
            "suggestions": None,
        }

        print(f"Data inserted into Weaviate with UUID: {result_uuid}")

        # Conditional logic after successful storage
        if sentiment_label == "positive":
            response_data["feedback"] = "The content is positive and has been stored."
        else:  # Neutral or Negative
            response_data["feedback"] = (
                "Content stored. Suggestions provided due to neutral/negative sentiment. Scheduled for review/deletion."
            )
            suggestions = await get_langchain_suggestions(echo_data.content)
            response_data["suggestions"] = suggestions

            # Setup a delayed deletion task for non-positive sentiments
            async def delete_echo_after_delay(
                uuid_to_delete: str, client_instance: weaviate.WeaviateClient
            ):  # Pass client instance
                await asyncio.sleep(3600)  # 1 hour = 3600 seconds
                try:
                    # Ensure client_instance is the Weaviate client
                    del_echo_collection = client_instance.collections.get("Echo")
                    del_echo_collection.data.delete_by_id(uuid_to_delete)
                    print(
                        f"Echo with UUID: {uuid_to_delete} deleted after 1 hour due to non-positive sentiment."
                    )
                except Exception as e_del:
                    print(f"Error deleting Echo with UUID {uuid_to_delete}: {e_del}")

            background_tasks.add_task(
                delete_echo_after_delay, result_uuid, client
            )  # Pass UUID and client

        return response_data
    except Exception as e:
        print(f"Error inserting data into Weaviate: {e}")
        # Optionally, still try to get suggestions if storage fails for non-positive content
        # For now, we prioritize reporting the storage failure.
        # If you want to add suggestions even on storage failure for non-positive, that logic would go here.
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to store data in Weaviate: {str(e)}",
        )
