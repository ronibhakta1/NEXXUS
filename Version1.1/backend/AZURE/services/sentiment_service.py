from textblob import TextBlob

def analyze_sentiment(input_text: str) -> str:
    """
    Analyzes the sentiment of a given text and returns a label (Positive, Negative, or Neutral).
    """
    try:
        blob = TextBlob(input_text)
        polarity = blob.sentiment.polarity  # Sentiment score: -1 to 1
        
        if polarity > 0:
            return "Positive"
        elif polarity < 0:
            return "Negative"
        else:
            return "Neutral"
    except Exception as e:
        return f"Error analyzing sentiment: {str(e)}"
