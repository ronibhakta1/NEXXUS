import asyncio
import logging
from typing import List
from langchain_openai import (
    AzureChatOpenAI,
)  # Updated import to avoid deprecation warnings
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain.schema import BaseMessage  # For response handling
from AZURE_layer2.config.settings import settings
from httpx import Client  # Import Client for synchronous behavior

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY = settings.AZURE_OPENAI_API_KEY
AZURE_OPENAI_ENDPOINT = settings.AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_CHAT_DEPLOYMENT_ID = settings.AZURE_OPENAI_CHAT_DEPLOYMENT_ID
AZURE_OPENAI_API_VERSION = settings.AZURE_OPENAI_API_VERSION

# Initialize LangChain AzureChatOpenAI model
llm = None
suggestion_chain = None
http_client = None  # Define it outside the try block for potential cleanup

try:
    if not (
        AZURE_OPENAI_API_KEY
        and AZURE_OPENAI_ENDPOINT
        and AZURE_OPENAI_CHAT_DEPLOYMENT_ID
    ):
        logger.warning(
            "Azure OpenAI environment variables (API_KEY, ENDPOINT, CHAT_DEPLOYMENT_ID) "
            "not fully set. LangChain suggester will use placeholder suggestions."
        )
    else:
        # Create a httpx.Client for synchronous behavior
        http_client = Client()

        # Initialize the AzureChatOpenAI model
        llm = AzureChatOpenAI(
            azure_endpoint=AZURE_OPENAI_ENDPOINT,  # Updated to use azure_endpoint
            azure_deployment=AZURE_OPENAI_CHAT_DEPLOYMENT_ID,  # Updated to use azure_deployment
            openai_api_key=AZURE_OPENAI_API_KEY,
            openai_api_version=AZURE_OPENAI_API_VERSION,
            temperature=0.7,
            openai_proxy=None,  # Explicitly ensure no proxy is configured via langchain's old mechanism
            http_client=http_client,  # Pass the httpx client
        )

        # Define the prompt template
        system_message_prompt = SystemMessagePromptTemplate.from_template(
            "You are an expert in communication. Your task is to rephrase potentially neutral or negative text "
            "into 2-3 alternative, more positive or constructive phrasings. "
            "Provide each suggestion on a new line, prefixed with a hyphen (-). "
            "Do NOT use any numbering or bullet points other than the hyphen prefix. "
            "Do NOT use any symbols like * or _ to make text bold or italic. "
            "Do NOT use any other special formatting.\n"
            "Example input: 'This is not good.'\n"
            "Example output:\n"
            "- Perhaps we can explore other options.\n"
            "- Let's see how we can improve this."
        )
        human_message_prompt = HumanMessagePromptTemplate.from_template(
            "{original_text}"
        )
        prompt_template = ChatPromptTemplate.from_messages(
            [system_message_prompt, human_message_prompt]
        )

        # Combine the prompt template with the LLM
        suggestion_chain = prompt_template | llm
        logger.info(
            f"LangChain suggester initialized successfully for Azure with deployment: {AZURE_OPENAI_CHAT_DEPLOYMENT_ID}."
        )

except Exception as e:
    logger.warning(
        f"Could not initialize LangChain suggester (AzureChatOpenAI): {e}. Suggestions will be placeholders.",
        exc_info=True,
    )
    llm = None
    suggestion_chain = None


async def get_langchain_suggestions(original_content: str) -> List[str]:
    """
    Interacts with LangChain to get alternative suggestions for the given content.
    """
    if suggestion_chain:
        logger.info(
            f"LangChain: Received content for suggestions: '{original_content[:100]}...'"
        )
        try:
            response_obj = await suggestion_chain.ainvoke(
                {"original_text": original_content}
            )
            response = response_obj.content
            logger.info(f"LangChain response: {response}")

            # Parse suggestions from the response
            suggestions = [
                s.strip()[1:].strip()
                for s in response.split("\n")
                if s.strip().startswith("-")
            ]

            if not suggestions:
                logger.warning(
                    f"LangChain returned unexpected response format or no suggestions: '{response}'"
                )
                suggestions = [
                    f"Fallback: Could not parse suggestions for: '{original_content[:30]}...'"
                ]

        except Exception as e:
            logger.error(
                f"Error during LangChain suggestion generation: {e}", exc_info=True
            )
            suggestions = [
                f"Error generating suggestions for: '{original_content[:30]}...'"
            ]
    else:
        logger.warning(
            "LangChain suggester not initialized. Returning placeholder suggestions."
        )
        await asyncio.sleep(0.1)
        suggestions = [
            f"Placeholder suggestion 1: '{original_content[:30]}...'",
            f"Placeholder suggestion 2: '{original_content[:30]}...'",
        ]

    logger.info(f"LangChain: Returning suggestions: {suggestions}")
    return suggestions


# Example of how you might use it (for direct testing if needed)
# if __name__ == "__main__":
#     async def main():
#         test_content = "This is a really bad day."
#         suggs = await get_langchain_suggestions(test_content)
#         print(f"\nSuggestions for '{test_content}': {suggs}")
#
#         test_content_positive = "This is great!"
#         suggs_pos = await get_langchain_suggestions(test_content_positive) # Note: Langchain is called regardless of sentiment here
#         print(f"\nSuggestions for '{test_content_positive}': {suggs_pos}")
#
