from transformers import pipeline

sentiment_pipeline = pipeline("sentiment_analysis")


def classify_sentiment(text: str):
    result = sentiment_pipeline(text)[0]
    label = result["label"]
    if label == "POSITIVE":
        return "Positive"
    elif label == "NEGATIVE":
        return "Negative"
    else:
        return "Neutral"
