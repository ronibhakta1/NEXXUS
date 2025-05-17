import uvicorn
from fastapi import FastAPI
from AZURE_layer2.routes import api, health  # Import health router
from contextlib import asynccontextmanager
from fastapi.responses import RedirectResponse
import os
import weaviate
import time  # Import the time module for delays
from AZURE_layer2.schemas.weaviate_schema import (
    ensure_weaviate_schema,
)  # Import schema function


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    app.weaviate_client = None  # Initialize attribute
    try:
        weaviate_url = os.getenv("WEAVIATE_URL")
        openai_api_key = os.getenv("OPENAI_API_KEY")

        if not weaviate_url:
            raise ValueError("WEAVIATE_URL environment variable not set for FastAPI.")
        # OpenAI key is optional here if Weaviate is configured globally,
        # but good to check if module is expected to use it via FastAPI headers.
        if not openai_api_key:
            print(
                "Warning: OPENAI_API_KEY not set for FastAPI, Weaviate text2vec-openai module might fail if not configured globally in Weaviate."
            )

            # v4 client initialization
        http_host_extracted = weaviate_url.replace("http://", "").split(":")[0]

        max_retries = 5
        retry_delay_seconds = 5
        client = None  # Initialize client to None

        for attempt in range(max_retries):
            try:
                print(
                    f"Attempting to connect to Weaviate (attempt {attempt + 1}/{max_retries})..."
                )
                client = weaviate.connect_to_custom(
                    http_host=http_host_extracted,
                    http_port=int(weaviate_url.split(":")[-1]),
                    http_secure=False,
                    grpc_host=http_host_extracted,
                    grpc_port=50051,
                    grpc_secure=False,
                    headers={"X-OpenAI-Api-Key": openai_api_key},
                )
                if client.is_live():
                    app.weaviate_client = client
                    print(f"Successfully connected to Weaviate at {weaviate_url}.")
                    break  # Exit retry loop on success
                else:
                    # This case might not be hit if is_live() itself raises on connection failure
                    print(
                        f"Weaviate at {weaviate_url} is not live. Retrying in {retry_delay_seconds}s..."
                    )
                    if client:  # Ensure client object exists before trying to close
                        client.close()
            except Exception as connect_e:
                print(f"Connection attempt {attempt + 1} failed: {connect_e}")
                if client:  # Ensure client object exists before trying to close
                    client.close()  # Close potentially partially open client
                if attempt + 1 == max_retries:
                    # If all retries fail, app.weaviate_client will remain None
                    # and the outer except block will catch the final state.
                    raise ConnectionError(
                        f"Failed to connect to Weaviate at {weaviate_url} after {max_retries} attempts. Last error: {connect_e}"
                    )

            time.sleep(retry_delay_seconds)

        if app.weaviate_client:  # Only try to ensure schema if client is connected
            # Ensure Weaviate schema is created
            ensure_weaviate_schema(app.weaviate_client)

    except Exception as e:
        print(f"Error during Weaviate client initialization or schema creation: {e}")
        app.weaviate_client = None  # Ensure client is None if setup failed
    yield
    # Shutdown logic (if needed)
    if app.weaviate_client:
        app.weaviate_client.close()  # Close the client connection for v4
        print("Weaviate client connection closed.")


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
