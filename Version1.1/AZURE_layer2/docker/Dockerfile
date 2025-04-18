FROM python:3.11-slim

WORKDIR /app

COPY ./AZURE_layer2/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ./AZURE_layer2 /app

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]