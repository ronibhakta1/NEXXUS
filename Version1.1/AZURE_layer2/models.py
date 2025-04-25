from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base
import datetime


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String, unique=True)
    name = Column(String, nullable=False)
    avatar = Column(String)
    verified = Column(Boolean, default=False)
    echos = relationship("Echo", back_populates="author")
    likes = relationship("Like", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    shares = relationship("Share", back_populates="user")
    reshares = relationship("Reshare", back_populates="user")


class Echo(Base):
    __tablename__ = "echo"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    authorId = Column(Integer, ForeignKey("User.id"), nullable=False)
    avatar = Column(String)
    image = Column(String, default="")
    time = Column(DateTime, default=datetime.datetime.utcnow)
    username = Column(String, nullable=False)
    isPublic = Column(Boolean, default=False)
    author = relationship("User", back_populates="echos")
    flagData = relationship("EchoContentFlagdata", back_populates="echo", uselist=False)
    likes = relationship("Like", back_populates="echo")
    comments = relationship("Comment", back_populates="echo")
    shares = relationship("Share", back_populates="echo")
    reshares = relationship("Reshare", back_populates="echo")


class EchoContentFlagdata(Base): 
    __tablename__ = "echoContentFlagdata"

    id = Column(Integer, primary_key=True, index=True)
    echoId = Column(Integer, ForeignKey("echo.id"), unique=True, nullable=False)
    sentiment = Column(String)
    extraData = Column(JSON)
    echo = relationship("Echo", back_populates="flagData")


class Like(Base):
    __tablename__ = "Like"

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"), nullable=False)
    echoId = Column(Integer, ForeignKey("echo.id"), nullable=False)
    user = relationship("User", back_populates="likes")
    echo = relationship("Echo", back_populates="likes")


class Comment(Base):
    __tablename__ = "Comment"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    userId = Column(Integer, ForeignKey("User.id"), nullable=False)
    echoId = Column(Integer, ForeignKey("echo.id"), nullable=False)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    user = relationship("User", back_populates="comments")
    echo = relationship("Echo", back_populates="comments")


class Share(Base):
    __tablename__ = "Share"

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"), nullable=False)
    echoId = Column(Integer, ForeignKey("echo.id"), nullable=False)
    user = relationship("User", back_populates="shares")
    echo = relationship("Echo", back_populates="shares")


class Reshare(Base):
    __tablename__ = "Reshare"

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"), nullable=False)
    echoId = Column(Integer, ForeignKey("echo.id"), nullable=False)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    user = relationship("User", back_populates="reshares")
    echo = relationship("Echo", back_populates="reshares")
