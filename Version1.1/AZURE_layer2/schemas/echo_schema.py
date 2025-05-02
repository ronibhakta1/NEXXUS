from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EchoCreate(BaseModel):
    content: str
    author_id: int
    username: str
    avatar: Optional[str] = None
    image: Optional[str] = None


class EchoResponse(BaseModel):
    id: int
    content: str
    author_id: int
    username: str
    avatar: Optional[str]
    image: Optional[str]
    visibility: str
    time: datetime

    class Config:
        orm_mode = True


class EchoSuggestion(BaseModel):
    original_content: str
    suggested_content: str


class FlaggedCountResponse(BaseModel):
    user_id: int
    flagged_count: int
