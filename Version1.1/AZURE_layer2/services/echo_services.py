from AZURE_layer2.utils.weaviate_client import weaviate_client
from AZURE_layer2.services.langchain_service import get_alternative_echo
from AZURE_layer2.services.sentiment_service import analyze_sentiment


def process_echo(echo_data):
    sentiment = analyze_sentiment(echo_data.content)

    if sentiment == "positive":
        alt_text = None
    else:
        alt_text = get_alternative_echo(echo_data.content)

    # Insert into Weaviate
    data_obj = {
        "content": echo_data.content,
        "author_id": echo_data.author_id,
        "sentiment": sentiment,
        "alternative": alt_text,
    }

    weaviate_client.data_object.create(data_obj, class_name="Echo")
    return {"status": "success", "sentiment": sentiment, "alternative": alt_text}
