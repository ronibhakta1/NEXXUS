import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from langchain_openai import OpenAIEmbeddings  # Updated import
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, Any  # For type hinting

# --- Setup that runs once on import ---
try:
    nltk.data.find("sentiment/vader_lexicon.zip")
except nltk.downloader.DownloadError:
    print("Downloading VADER lexicon for sentimental.py...")
    nltk.download("vader_lexicon")

# Initialize VADER and OpenAI Embeddings
sia = SentimentIntensityAnalyzer()
embeddings_analyzer = None  # Initialize to None
try:
    # This will use OPENAI_API_KEY from environment if available
    # and if the openai package is installed.
    embeddings_analyzer = OpenAIEmbeddings()
    print("OpenAIEmbeddings initialized successfully in sentimental.py.")
except Exception as e:
    print(
        f"Warning: Could not initialize OpenAIEmbeddings in sentimental.py: {e}. Embedding features will be skipped."
    )


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
            # vector = embeddings_analyzer.embed_query(content) # Example: if you wanted to use the vector
            pass  # Placeholder for any logic involving embeddings
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
