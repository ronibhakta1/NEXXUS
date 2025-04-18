from sqlalchemy.orm import Session
from ..models import Echo
from fastapi import Depends
from ..database import get_db


async def create_echo(data: dict, db: Session = Depends(get_db)):
    echo = Echo(
        content=data["content"],
        authorId=data["authorId"],
        username=data["username"],
        avatar=data.get("avatar"),
        image=data.get("image", ""),
        isPublic=False,
    )
    db.add(echo)
    db.commit()
    db.refresh(echo)
    return echo


async def get_echoes(db: Session = Depends(get_db)):
    return db.query(Echo).all()
