from sqlalchemy.orm import Session
from models import User, SentimentAnalysis, LangChainResponse
from schemas import UserCreate
from datetime import datetime

# Create a new user
def create_user(db: Session, user: UserCreate):
    db_user = User(name=user.name, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Store sentiment analysis result
def create_sentiment(db: Session, input_text: str, sentiment: str):
    db_sentiment = SentimentAnalysis(input_text=input_text, sentiment=sentiment, timestamp=datetime.utcnow())
    db.add(db_sentiment)
    db.commit()
    db.refresh(db_sentiment)
    return db_sentiment

# Retrieve sentiment analysis result by ID
def get_sentiment(db: Session, sentiment_id: int):
    return db.query(SentimentAnalysis).filter(SentimentAnalysis.id == sentiment_id).first()

# Store LangChain AI response
def create_response(db: Session, input_text: str, response_text: str):
    db_response = LangChainResponse(input_text=input_text, response_text=response_text, timestamp=datetime.utcnow())
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response

# Retrieve a specific LangChain response by ID
def get_response(db: Session, response_id: int):
    return db.query(LangChainResponse).filter(LangChainResponse.id == response_id).first()
