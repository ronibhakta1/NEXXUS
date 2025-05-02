from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String, unique=True, nullable=True)
    name = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    verified = Column(Boolean, default=False)

    echos = relationship("Echo", back_populates="author", cascade="all, delete")
    likes = relationship("Like", back_populates="user", cascade="all, delete")
    comments = relationship("Comment", back_populates="user", cascade="all, delete")
    shares = relationship("Share", back_populates="user", cascade="all, delete")
    reshares = relationship("Reshare", back_populates="user", cascade="all, delete")
