from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import User, SentimentAnalysis
from schemas import UserCreate, UserResponse, SentimentRequest, SentimentResponse
from services import analyze_sentiment, process_with_langchain  # Fix import

# Initialize FastAPI
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# User Registration Endpoint
@app.post("/register", response_model=UserResponse)  # Fix response model
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(name=user.name, email=user.email, password=user.password)  # Explicitly assign fields
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user  # Returns UserResponse (excludes password)

# Sentiment Analysis Endpoint
@app.post("/sentiment", response_model=SentimentResponse)
def analyze_text(request: SentimentRequest, db: Session = Depends(get_db)):
    result = analyze_sentiment(request.input_text)  # Fix attribute name
    sentiment_record = SentimentAnalysis(text=request.input_text, sentiment=result)
    
    db.add(sentiment_record)
    db.commit()
    db.refresh(sentiment_record)  # Refresh to get the ID
    
    return sentiment_record  # Returns the full SentimentResponse schema

# LangChain AI Response Endpoint
@app.post("/langchain-response")
def langchain_response(request: SentimentRequest):
    response = process_with_langchain(request.input_text)  # Fix function name
    return {"input": request.input_text, "response": response}
