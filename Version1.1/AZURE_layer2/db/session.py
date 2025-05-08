from sqlalchemy.orm import sessionmaker

# Removed DATABASE_URL as Weaviate is the only database being used
engine = None  # Placeholder for future database engine if needed
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
