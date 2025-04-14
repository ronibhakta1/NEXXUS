from prisma import Prisma
from prisma.models import Echo

db = Prisma()


async def save_echo(
    user_id: str, content: str, sentiment: str, suggestions: list[str], is_public: bool
):
    await db.connect()
    result = await db.echo.create(
        {
            "userId": user_id,
            "content": content,
            "sentiment": sentiment,
            "suggestions": suggestions,
            "isPublic": is_public,
        }
    )
    await db.disconnect()
    return result
