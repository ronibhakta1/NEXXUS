import nltk

from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Removed runtime download of `vader_lexicon` as it is pre-downloaded in the Docker build
# nltk.download("vader_lexicon")
sia = SentimentIntensityAnalyzer()


def analyze_sentiment(text: str) -> str:
    scores = sia.polarity_scores(text)
    compound = scores["compound"]
    if compound >= 0.05:
        return "positive"
    elif compound <= -0.05:
        return "negative"
    else:
        return "neutral"
