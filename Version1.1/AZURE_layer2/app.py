from fastapi import FastAPI
import logging
import logging.config
import signal
from fastapi.middleware.cors import CORSMiddleware
from AZURE_layer2.routes.echo_route import router as echo_router
from AZURE_layer2.routes.root_routes import router as root_router

app = FastAPI()

# Example logging setup
log_config = {
    "version": 1,
    "handlers": {"console": {"class": "logging.StreamHandler", "level": "DEBUG"}},
    "root": {"level": "DEBUG", "handlers": ["console"]},
}
logging.config.dictConfig(log_config)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Shutdown handler
def shutdown():
    logging.info("Shutting down...")
    logging.shutdown()


# Register shutdown handler
signal.signal(signal.SIGINT, lambda sig, frame: shutdown())

# Include routers
app.include_router(echo_router, prefix="/v1/api")
app.include_router(root_router)
