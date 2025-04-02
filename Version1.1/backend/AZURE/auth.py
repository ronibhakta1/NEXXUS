from fastapi import HTTPException, Security
from fastapi.security.api_key import APIKeyHeader

# Define API key header authentication
API_KEY_NAME = "api_key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

# Set your API key (this should be stored securely, e.g., in an environment variable)
VALID_API_KEYS = {"your-secure-api-key"}  

def verify_api_key(api_key: str = Security(api_key_header)):
    """
    Verify if the provided API key is valid.
    """
    if api_key not in VALID_API_KEYS:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key

