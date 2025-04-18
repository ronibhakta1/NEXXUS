from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load env variable from .env file
load_dotenv()

# Get the databse URL from the environment
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgres://postgres:1030@localhost:5432/nexxdb"
)

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a configured "Session" class
Sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declrative models
Base = declarative_base()


# Dependency to get a database session
def get_db():
    db = Sessionlocal()
    try:
        yield db
    finally:
        db.close()
