from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from AZURE_layer2.database import Base
from datetime import datetime


class Echo(Base):
    __tablename__ = "echo"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    authorId = Column(Integer, ForeignKey("user.id"), nullable=False)
    avatar = Column(String, nullable=True)
    image = Column(String, default="")
    time = Column(DateTime, default=datetime.utcnow)
    username = Column(String, nullable=False)

    flagData = relationship("EchoContentFlagdata", uselist=False, back_populates="echo")
    likes = relationship("Like", back_populates="echo", cascade="all, delete")
    comments = relationship("Comment", back_populates="echo", cascade="all, delete")
    shares = relationship("Share", back_populates="echo", cascade="all, delete")
    reshares = relationship("Reshare", back_populates="echo", cascade="all, delete")

    author = relationship("User", back_populates="echos")
