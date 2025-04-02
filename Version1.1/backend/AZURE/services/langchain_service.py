from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os

# Load API key securely from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Ensure API key is set
if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key. Please set the OPENAI_API_KEY environment variable.")

# Initialize LangChain's OpenAI model
llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY, model_name="gpt-4", temperature=0.7)

def process_with_langchain(input_text: str) -> str:
    """
    Processes input text using LangChain and returns AI-generated response.
    """
    try:
        response = llm([HumanMessage(content=input_text)])
        return response.content  # Extract text response from AI
    except Exception as e:
        return f"Error processing LangChain request: {str(e)}"
