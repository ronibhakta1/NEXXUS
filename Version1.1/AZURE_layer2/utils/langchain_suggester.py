import asyncio
import logging
from typing import List
from langchain_openai import OpenAI  # Using langchain_openai
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_core.exceptions import LangChainException  # More specific exception

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Placeholder for your Langchain model and prompt setup
llm = None
suggestion_chain = None

try:
    llm = OpenAI(temperature=0.7)  # Ensure OPENAI_API_KEY is in env
    # Define the prompt template
    # Adding explicit formatting instructions for robustness
    prompt_template_str = """Given the following text which might be neutral or negative: '{original_text}', please provide 2-3 alternative, more positive or constructive phrasings.
Provide each suggestion on a new line, prefixed with a hyphen (-).
Example:
- Suggestion 1
- Suggestion 2
- Suggestion 3

Suggestions:"""
    prompt_template = PromptTemplate(
        input_variables=["original_text"], template=prompt_template_str
    )
    suggestion_chain = LLMChain(llm=llm, prompt=prompt_template)
    logger.info("Langchain suggester initialized successfully.")
except Exception as e:
    # Catching a broad Exception for initialization issues (e.g., missing key, network)
    logger.warning(
        f"Could not initialize Langchain suggester: {e}. Suggestions will be placeholders.",
        exc_info=True,
    )
    llm = None  # Ensure llm is None if initialization failed
    suggestion_chain = None  # Ensure chain is None if initialization failed


async def get_langchain_suggestions(original_content: str) -> List[str]:
    """
    Interacts with Langchain to get alternative suggestions for the given content.
    """
    if suggestion_chain:
        logger.info(
            f"Langchain: Received content for suggestions: '{original_content[:100]}...'"
        )  # Log truncated content
        # Use arun for async execution if your LLM/chain supports it.
        # For the standard LLMChain with OpenAI, run might be synchronous under the hood
        # but we can call it in a way that doesn't block the event loop for too long
        # or use asyncio.to_thread for truly non-blocking if needed for very long calls.
        # For simplicity, let's assume `arun` is available or `run` is acceptable for now.
        try:
            # Use arun for asynchronous execution
            response = await suggestion_chain.arun(original_text=original_content)

            # Parse the response - expect lines starting with '-'
            # Split by newline, strip whitespace, filter lines starting with '-', remove '-' prefix
            suggestions = [
                s.strip()[1:].strip()  # Remove hyphen and leading/trailing whitespace
                for s in response.split("\n")  # s is the loop variable
                if s.strip().startswith("-")  # Use s here
            ]

            if (
                not suggestions
            ):  # Fallback if parsing fails or LLM returns unexpected format
                logger.warning(
                    f"Langchain returned unexpected response format or no suggestions: '{response}'"
                )
                suggestions = [
                    f"Could not generate specific suggestions for: '{original_content[:30]}...'"
                ]

        except LangChainException as e:
            logger.error(f"Langchain chain execution failed: {e}", exc_info=True)
            suggestions = [
                f"Error generating suggestions (Langchain error) for: '{original_content[:30]}...'"
            ]
        except Exception as e:
            # Catch any other unexpected errors during the async call
            logger.error(
                f"Unexpected error during Langchain suggestion generation: {e}",
                exc_info=True,
            )
            suggestions = [
                f"Error generating suggestions (unexpected error) for: '{original_content[:30]}...'"
            ]
    else:
        logger.warning(
            "Langchain suggester not initialized. Returning placeholder suggestions."
        )
        await asyncio.sleep(0.1)  # Simulate async work if falling back
        suggestions = [
            f"Placeholder suggestion 1 (Langchain not init): '{original_content[:30]}...'",
            f"Placeholder suggestion 2 (Langchain not init): '{original_content[:30]}...'",
        ]

    logger.info(f"Langchain: Returning suggestions: {suggestions}")
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
