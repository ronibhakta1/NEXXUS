from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

# Load OpenAI API key from environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")

# Initialize OpenAI LLM
llm = OpenAI(api_key=openai_api_key, temperature=0.7)

# Define prompt template for generating positive suggestions
positive_prompt_template = PromptTemplate(
    input_variables=["content"],
    template="Rephrase the following text into a positive version: {content}",
)

# Define prompt template for alternative suggestions
alternative_prompt_template = PromptTemplate(
    input_variables=["content"],
    template="Provide an alternative suggestion for the following text: {content}",
)


def generate_positive_suggestion(content: str) -> str:
    """
    Generate a positive rephrasing of the given content.
    """
    chain = LLMChain(llm=llm, prompt=positive_prompt_template)
    response = chain.run(content=content)
    return response.strip()


def generate_alternative_suggestion(content: str) -> str:
    """
    Generate an alternative suggestion for the given content.
    """
    chain = LLMChain(llm=llm, prompt=alternative_prompt_template)
    response = chain.run(content=content)
    return response.strip()
