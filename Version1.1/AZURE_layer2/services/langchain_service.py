from langchain.embeddings import OpenAIEmbeddings
from textblob import TextBlob

# Initialize OpenAI Embeddings
embeddings = OpenAIEmbeddings()

# Custom sentiment map (optional booster)
custom_sentiments = {
    "fantabulous": 0.9,  # very positive word
    "horrific": -0.8,    # very negative word
    "meh": 0.0,          # neutral word
    "terrific": 0.9
}

# Sentiment Analysis Function
def analyze_sentiment(content: str) -> str:
    # Generate embedding vector (you might use it later or store it)
    vector = embeddings.embed_query(content)

    # Use TextBlob to get sentiment
    blob = TextBlob(content)  # <-- FIXED: used 'content', not 'str'
    sentiment = blob.sentiment.polarity

    # Add any custom sentiment scores
    for word in content.split():
        if word.lower() in custom_sentiments:
            sentiment += custom_sentiments[word.lower()]

    # Classify sentiment
    if sentiment > 0:
        return "Positive"
    elif sentiment < 0:
        return "Negative"
    else:
        return "Neutral"

# Main block for testing
if __name__ == "__main__":
    text = input("Enter a sentence for sentiment analysis: ")
    result = analyze_sentiment(text)
    print(f"Sentiment: {result}")
