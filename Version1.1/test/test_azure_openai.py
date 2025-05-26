import os
import openai

# Load API configuration from environment variables
openai.api_key = os.getenv("AZURE_OPENAI_API_KEY")
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
openai.api_type = "azure"
openai.api_version = os.getenv("AZURE_OPENAI_API_VERSION")

try:
    response = openai.ChatCompletion.create(
        deployment_id=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_ID"),
        messages=[{"role": "user", "content": "Hello, Azure OpenAI!"}],
    )
    print("Test Successful:", response)
except Exception as e:
    print("Test Failed:", e)
