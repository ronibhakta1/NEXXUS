from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    # Relationships
    responses = relationship("LangChainResponse", back_populates="user", cascade="all, delete")
    sentiments = relationship("SentimentAnalysis", back_populates="user", cascade="all, delete")

class SentimentAnalysis(Base):
    __tablename__ = "sentiment_analysis"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    input_text = Column(Text, nullable=False)  # Renamed 'text' → 'input_text' for clarity
    sentiment = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationship
    user = relationship("User", back_populates="sentiments")

class LangChainResponse(Base):
    __tablename__ = "langchain_responses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    input_text = Column(Text, nullable=False)
    response_text = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationship
    user = relationship("User", back_populates="responses")
