import uvicorn
from fastapi import FastAPI
from AZURE_layer2.routes import api, health  # Import health router
from contextlib import asynccontextmanager
from fastapi.responses import RedirectResponse
import os
import weaviate
from weaviate.connect import ConnectionParams  # Corrected import for v4
import time
from AZURE_layer2.schemas.weaviate_schema import ensure_weaviate_schema  # Import schema function


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    app.weaviate_client = None  # Initialize as None
    temp_client = None  # Temporary client variable for the loop

    weaviate_url = os.getenv("WEAVIATE_URL")

    if not weaviate_url:
        print(
            "CRITICAL: WEAVIATE_URL environment variable not set. Weaviate client cannot be initialized."
        )
        # Allow app to start, but Weaviate-dependent endpoints will fail.
    else:
        max_retries = 5
        retry_delay_seconds = 5

        for attempt in range(max_retries):
            try:
                print(
                    f"Attempting to connect to Weaviate and ensure schema (attempt {attempt + 1}/{max_retries})..."
                )
                # v4 client initialization using ConnectionParams.from_url
                temp_client = weaviate.WeaviateClient(
                    connection_params=ConnectionParams.from_url(
                        url=weaviate_url,
                        grpc_port=int(
                            os.getenv("WEAVIATE_GRPC_PORT", "50051")
                        ),  # Ensure gRPC port is integer
                    )
                )
                temp_client.connect()  # Explicitly connect for v4

                if temp_client.is_ready():  # v4 readiness check
                    print(f"Successfully connected to Weaviate at {weaviate_url}.")
                    # Attempt to ensure schema
                    ensure_weaviate_schema(temp_client)
                    print("Weaviate schema ensured.")
                    app.weaviate_client = temp_client  # Assign to app state only if ALL steps succeed
                    break  # Exit retry loop on success
                else:
                    print(
                        f"Connection attempt {attempt + 1} successful, but Weaviate not ready."
                    )
                    if temp_client:
                        temp_client.close()

            except Exception as e_attempt:
                print(f"Attempt {attempt + 1} failed: {e_attempt}")
                if temp_client:
                    try:
                        temp_client.close()
                    except Exception:
                        pass  # Ignore errors during close on failed attempt
                temp_client = None  # Reset temp client

            if app.weaviate_client:  # If successful in the try block, we would have broken
                break

            if attempt < max_retries - 1:  # If not the last attempt and not successful
                print(f"Retrying in {retry_delay_seconds} seconds...")
                time.sleep(retry_delay_seconds)
            else:  # Last attempt failed
                if attempt + 1 == max_retries:
                    print(
                        f"CRITICAL: Failed to connect to Weaviate and/or ensure schema after {max_retries} attempts."
                    )
                    # app.weaviate_client remains None

    if not app.weaviate_client and weaviate_url:  # Log final status if URL was provided but client failed
        print(
            "CRITICAL: Weaviate client could not be initialized. API endpoints requiring Weaviate will likely fail."
        )

    yield
    # Shutdown logic (if needed)
    if app.weaviate_client:
        try:
            app.weaviate_client.close()
            print("Weaviate client connection closed.")
        except Exception as e_close:
            print(f"Error closing Weaviate client: {e_close}")


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
app.include_router(health.router)  # Include the health check router

if __name__ == "__main__":
    UVICORN_OPTIONS = {
        "host": "0.0.0.0",
        "port": 8000,
        "reload": True,
    }
    uvicorn.run("AZURE_layer2.app:app", **UVICORN_OPTIONS)
