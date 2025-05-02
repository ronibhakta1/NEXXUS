from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import requests
from AZURE_layer2.services.sentiment_service import analyze_sentiment
from AZURE_layer2.services.langchain_service import generate_positive_suggestion
from AZURE_layer2.services.weaviate_services import store_in_weaviate

router = APIRouter()


@router.get("/echo")
async def get_echo():
    return {"message": "This is the echo endpoint."}


class EchoCreate(BaseModel):
    content: str
    author_id: int
    username: str
    avatar: Optional[str] = None
    image: Optional[str] = ""


class EchoResponse(BaseModel):
    content: str
    sentiment: str
    suggestion: Optional[str] = None


@router.post("/echo", response_model=EchoResponse)
async def process_echo(echo: EchoCreate):
    # Simulate fetching echo from Cloudflare function (replace with actual URL)
    try:
        cloudflare_response = requests.post(
            "https://your-cloudflare-function.workers.dev/echo",
            json={
                "content": echo.content,
                "author_id": echo.author_id,
                "username": echo.username,
                "avatar": echo.avatar,
                "image": echo.image,
            },
        )
        cloudflare_response.raise_for_status()
        fetched_echo = cloudflare_response.json()
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to fetch echo from Cloudflare: {str(e)}"
        )

    # Analyze sentiment
    sentiment = analyze_sentiment(echo.content)

    # Store sentiment result in Weaviate
    store_in_weaviate(
        f"Sentiment: {sentiment} for content: {echo.content}",
        {"type": "sentiment", "echo_id": echo.author_id},
    )

    # If neutral or negative, generate a positive suggestion using LangChain
    suggestion = None
    if sentiment in ["neutral", "negative"]:
        suggestion = generate_positive_suggestion(echo.content)
        # Store suggestion in Weaviate
        store_in_weaviate(
            f"Suggestion: {suggestion} for content: {echo.content}",
            {"type": "suggestion", "echo_id": echo.author_id},
        )

    return {"content": echo.content, "sentiment": sentiment, "suggestion": suggestion}
