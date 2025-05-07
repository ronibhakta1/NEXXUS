from fastapi import APIRouter, Request, HTTPException
from services.langchain_service import generate_positive_suggestion
from services.sentiment_service import analyze_sentiment
from services.weaviate_services import store_in_weaviate_with_sentiment

router = APIRouter()


@router.get("/")
async def read_root():
    return {"message": "Welcome to the API. Use /v1/api for endpoints."}


@router.post("/process_echo")
async def process_echo(request: Request):
    try:
        # Parse the incoming JSON payload
        payload = await request.json()
        content = payload.get("content")
        author_id = payload.get("author_id")

        if not content or not author_id:
            raise HTTPException(status_code=400, detail="Invalid input")

        # Analyze sentiment
        sentiment = analyze_sentiment(content)

        # Store in Weaviate
        store_in_weaviate_with_sentiment(content, author_id, sentiment)

        # Generate alternative suggestion if sentiment is neutral or negative
        alternative = None
        if sentiment in ["neutral", "negative"]:
            alternative = generate_positive_suggestion(content)

        # Prepare response
        response = {
            "content": content,
            "author_id": author_id,
            "sentiment": sentiment,
            "alternative": alternative,
        }

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
