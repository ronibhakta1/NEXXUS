from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    phone = Column(String, unique=True, nullable=True)
    name = Column(String)
    avatar = Column(String, nullable=True)
    verified = Column(Boolean, default=False)
    echos = relationship("Echo", back_populates="author")


class Echo(Base):
    __tablename__ = "echo"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    author_id = Column(Integer, ForeignKey("user.id"))
    avatar = Column(String, nullable=True)
    image = Column(String, default="")
    time = Column(DateTime, default=datetime.utcnow)
    username = Column(String)
    visibility = Column(String, default="private")
    author = relationship("User", back_populates="echos")
    flag_data = relationship(
        "EchoContentFlagdata", uselist=False, back_populates="echo"
    )


class EchoContentFlagdata(Base):
    __tablename__ = "echo_content_flagdata"
    id = Column(Integer, primary_key=True, index=True)
    echo_id = Column(Integer, ForeignKey("echo.id"), unique=True)
    sentiment = Column(String)
    extra_data = Column(String, nullable=True)
    echo = relationship("Echo", back_populates="flag_data")


class FlaggedEchoLog(Base):
    __tablename__ = "flagged_echo_log"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    echo_id = Column(Integer, ForeignKey("echo.id"))
    flagged_at = Column(DateTime, default=datetime.utcnow)
