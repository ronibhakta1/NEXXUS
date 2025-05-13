from fastapi import APIRouter, HTTPException, status, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse

router = APIRouter()


@router.get("/", status_code=status.HTTP_200_OK)
async def root():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Nexxus API</title>
    </head>
    <body>
        <h1 style="text-align: center;">Welcome to the Nexxus API</h1>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content, media_type="text/html")


@router.post("/echo")
async def echo(request: Request):
    data = await request.json()
    print("Received data:", data)  # Print data to the terminal
    return {"message": "Data received successfully", "data": data}
