import openai
import os

# Load environment variables
from dotenv import load_dotenv

load_dotenv()

# Set OpenAI API configuration
openai.api_key = os.getenv("AZURE_OPENAI_API_KEY")
openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
openai.api_type = "azure"
openai.api_version = "2024-12-01-preview"


def test_openai_api():
    try:
        response = openai.ChatCompletion.create(
            model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_ID"),  # Updated to use `model`
            messages=[{"role": "user", "content": "Hello, world!"}],
        )
        print("API Test Successful:", response)
    except Exception as e:
        print("API Test Failed:", e)


if __name__ == "__main__":
    test_openai_api()
