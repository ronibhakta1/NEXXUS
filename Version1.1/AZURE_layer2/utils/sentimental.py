import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from langchain_openai import OpenAIEmbeddings  # Updated import
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, Any  # For type hinting
import os
from dotenv import load_dotenv, find_dotenv
from AZURE_layer2.config.settings import settings
import openai  # Ensure Azure OpenAI configuration is used

# --- Setup that runs once on import ---
try:
    nltk.data.find("sentiment/vader_lexicon.zip")
except nltk.downloader.DownloadError:
    print("Downloading VADER lexicon for sentimental.py...")
    nltk.download("vader_lexicon")

# Use settings for environment variables
AZURE_OPENAI_API_KEY_EMB = settings.AZURE_OPENAI_API_KEY
AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB = os.getenv(
    "AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID", ""
)
AZURE_OPENAI_API_VERSION_EMB = settings.AZURE_OPENAI_API_VERSION

# Update os.environ assignments
os.environ["OPENAI_API_TYPE"] = "azure"
os.environ["AZURE_OPENAI_ENDPOINT"] = settings.AZURE_OPENAI_ENDPOINT
os.environ["AZURE_OPENAI_API_KEY"] = AZURE_OPENAI_API_KEY_EMB

# Debugging log to confirm environment variable loading
print(f"AZURE_OPENAI_API_KEY_EMB: {AZURE_OPENAI_API_KEY_EMB}")
print(
    f"AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB: {AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB}"
)

# Ensure AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB is defined before use
if not AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB:
    print(
        "Warning: AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID is not set. Embedding features will be skipped."
    )
else:
    print("AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID is set.")

# Define AZURE_OPENAI_ENDPOINT from settings
AZURE_OPENAI_ENDPOINT = settings.AZURE_OPENAI_ENDPOINT

# Initialize VADER and OpenAI Embeddings
sia = SentimentIntensityAnalyzer()
embeddings_analyzer = None  # Initialize to None

if AZURE_OPENAI_API_KEY_EMB and AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB:
    try:
        # Configure for Azure OpenAI Embeddings
        embeddings_analyzer = OpenAIEmbeddings(
            azure_deployment=AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB,
            model=AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_ID_EMB,  # Often good to set model to deployment name for Azure
            azure_endpoint=AZURE_OPENAI_ENDPOINT,  # Updated to use AZURE_OPENAI_ENDPOINT directly
            openai_api_key=AZURE_OPENAI_API_KEY_EMB,
            openai_api_version=AZURE_OPENAI_API_VERSION_EMB,
        )
        print("OpenAIEmbeddings (Azure) initialized successfully in sentimental.py.")
    except Exception as e:
        print(
            f"Warning: Could not initialize Azure OpenAIEmbeddings in sentimental.py: {e}. Embedding features will be skipped."
        )
else:
    print(
        "Warning: Azure OpenAI environment variables for embeddings (API_KEY, EMBEDDINGS_DEPLOYMENT_ID) not fully set in sentimental.py. OpenAI Embedding features will be skipped."
    )

# Set Azure OpenAI configuration
openai.api_key = settings.AZURE_OPENAI_API_KEY
openai.api_base = settings.AZURE_OPENAI_ENDPOINT
openai.api_type = "azure"
openai.api_version = settings.AZURE_OPENAI_API_VERSION

# Custom sentiment map (optional booster)
custom_sentiments = {"fantabulous": 0.9, "horrific": -0.8, "meh": 0.0, "terrific": 0.9}


# Sentiment Analysis Function using VADER
def analyze_sentiment_with_content(content: str) -> Dict[str, Any]:
    # Generate embedding vector (can be stored/used later)
    # vector = embeddings_analyzer.embed_query(content) # This line would use OpenAI

    # Base score from VADER
    scores = sia.polarity_scores(content)
    compound = scores["compound"]

    # Adjust score based on custom sentiment dictionary
    for word in content.split():
        # Ensure word is lowercased for matching keys in custom_sentiments
        lower_word = word.lower()
        if lower_word in custom_sentiments:
            compound += custom_sentiments[lower_word]

    # Optionally, use OpenAI embeddings if available and desired for adjustment
    if embeddings_analyzer:
        try:
            vector = embeddings_analyzer.embed_query(content)
            # At this point, 'vector' contains the embedding.
            # You could log its generation or use it for more advanced sentiment analysis/features.
            # For now, we're just ensuring it's generated as per the request to "enable vectorization".
            # print(f"Generated embedding vector for content (first 10 dims): {vector[:10]}") # Optional: for debugging
        except Exception as e:
            print(
                f"Warning: Could not generate OpenAI embedding during sentiment analysis (in sentimental.py): {e}"
            )

    # Final sentiment classification
    if compound >= 0.05:
        sentiment_label = "positive"
    elif compound <= -0.05:
        sentiment_label = "negative"
    else:
        sentiment_label = "neutral"

    return {"sentiment": sentiment_label, "content": content}


# Process multiple lines using threads
def process_multiline_input(multiline_input: str):
    sentences = []
    for line in multiline_input.strip().split("\n"):
        sentences += [part.strip() for part in line.split(",") if part.strip()]

    results = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        future_to_sentence = {
            executor.submit(
                analyze_sentiment_with_content, sentence
            ): sentence  # Use updated function name
            for sentence in sentences
        }
        for future in as_completed(future_to_sentence):
            results.append(future.result())

    return results


# Main block
if __name__ == "__main__":
    user_input = input("Enter sentences (comma-separated, multiline supported):\n")
    results = process_multiline_input(user_input)
    print("\nSentiment Results:")
    for result_dict in results:  # Iterate through the list of dictionaries
        print(
            f"Sentiment: {result_dict['sentiment']}, Content: \"{result_dict['content']}\""
        )
