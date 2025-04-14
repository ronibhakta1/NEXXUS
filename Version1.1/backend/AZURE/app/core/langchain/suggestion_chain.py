from app.core.sentiment_utils import classify_sentiment
from app.core.langmemo_buffer import store_in_langemo, update_langmemo_status


def analyze_sentiment_and_process(content: str, echo_id: str = None):
    sentiment = classify_sentiment(content)

    suggestions = []
    if sentiment in ["Negative", "Neutral"]:
        # Fake placeholder, will come from langchain next
        suggestions = [f"Try rewording: '{content} 😊'"]
    else:
        suggestions = []

    return sentiment, suggestions
