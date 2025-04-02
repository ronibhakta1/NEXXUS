from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Load database URL from environment variables (default to SQLite if not set)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./nexxus.db")

# Database connection arguments
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

# Create database engine
engine = create_engine(DATABASE_URL, connect_args=connect_args)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
