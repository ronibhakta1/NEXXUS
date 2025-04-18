from fastapi import FastAPI
from .routes.echo_route import router
from .database import engine, Base

app = FastAPI(title="NEXXUS API")


@app.on_event("startup")
async def startup():
    Base.metadata.create_all(bind=engine)  # Fallback to create tables if needed


app.include_router(router, prefix="/v1/api")


@app.get("/")
async def read_root():
    return {"message": "NEXXUS API is running"}
