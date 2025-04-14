from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.langchain_tools import analyze_sentiment_and_process
from app.db.prisma import save_echo

router = APIRouter()


class EchoInput(BaseModel):
    content: str
    user_id: str


@router.post("/analyze-echo")
async def analyze_echo(data: EchoInput):
    try:
        sentiment, suggestions = analyze_sentiment_and_process(data.content)

        # Initially flag echo as private and store in DB
        saved_echo = await save_echo(
            user_id=data.user_id,
            content=data.content,
            sentiment=sentiment,
            suggestions=suggestions,
            is_public=False,
        )

        return {
            "status": "success",
            "echo_id": saved_echo["id"],
            "sentiment": sentiment,
            "suggestion": suggestions,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
