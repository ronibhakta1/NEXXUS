from pydantic import BaseModel
from typing import Optional


class EchoInput(BaseModel):
    content: str
    username: str
    authorId: int
    avatar: Optional[str] = ""
    image: Optional[str] = ""


class EchoResponse(BaseModel):
    sentiment: str
    message: str
    suggestions: Optional[list] = None
