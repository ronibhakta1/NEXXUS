import uvicorn
from fastapi import FastAPI
from AZURE_layer2.routes import api
from contextlib import asynccontextmanager
from fastapi.responses import RedirectResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    # Startup logic (if needed)
    try:
        # Add any initialization logic here
        pass
    except Exception as e:
        # Log or handle startup errors
        pass
    yield
    # Shutdown logic (if needed)


app = FastAPI(
    title="Nexxus API",
    description="Nexxus: A Layered API System",
    version="0.1.0",
    lifespan=lifespan,
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/v1/api/")

# Include API routes
app.include_router(api.router, prefix="/v1/api")

if __name__ == "__main__":
    uvicorn.run("AZURE_layer2.app:app", host="0.0.0.0", port=8000, reload=True)
