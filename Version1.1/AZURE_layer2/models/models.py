from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime


class EchoContentFlagDataInput(BaseModel):
    """
    Pydantic model for the input of echo content flag data.
    Corresponds to Prisma's echoContentFlagdata.
    """

    sentiment: Optional[str] = None
    extraData: Optional[Dict[str, Any]] = None


class EchoCreate(BaseModel):
    """
    Pydantic model for creating a new echo.
    This is what the /echo endpoint will expect.
    """

    content: str
    authorId: str
    username: str  # From Prisma echo.username
    avatar: Optional[str] = None
    image: Optional[str] = None
    flagData: Optional[EchoContentFlagDataInput] = None
