from pydantic import BaseModel, EmailStr
from datetime import datetime

# User Schema
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

# Sentiment Analysis Schema
class SentimentRequest(BaseModel):
    input_text: str

class SentimentResponse(BaseModel):
    id: int
    input_text: str
    sentiment: str
    timestamp: datetime

    class Config:
        orm_mode = True

# LangChain AI Response Schema
class LangChainRequest(BaseModel):
    input_text: str

class LangChainResponse(BaseModel):
    id: int
    input_text: str
    response_text: str
    timestamp: datetime

    class Config:
        orm_mode = True
