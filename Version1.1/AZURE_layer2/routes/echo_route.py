from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from AZURE_layer2.services.echo_services import (
    create_echo,
    get_echoes,
)  # Changed from .. to .
from pydantic import BaseModel
from datetime import datetime


class EchoInput(BaseModel):
    content: str
    authorId: int
    username: str
    avatar: str | None = None
    image: str | None = None


class EchoResponse(BaseModel):
    id: int
    content: str
    authorId: int
    username: str
    avatar: str | None
    image: str | None
    time: datetime
    isPublic: bool


router = APIRouter()


@router.post("/create", response_model=EchoResponse)
async def create_echo_endpoint(data: EchoInput, db: Session = Depends(get_db)):
    echo = await create_echo(data.dict(), db)
    return echo


@router.get("/list", response_model=list[EchoResponse])
async def list_echoes(db: Session = Depends(get_db)):
    echoes = await get_echoes(db)
    return echoes
