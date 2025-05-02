from fastapi import APIRouter
from AZURE_layer2.services.weaviate_services import create_echo_schema

router = APIRouter()


@router.post("/weaviate/create-schema")
async def create_schema_route():
    create_echo_schema()
    return {"message": "Schema creation triggered"}
