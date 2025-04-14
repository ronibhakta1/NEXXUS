from typing import Dict

# In-memmory buffer - can be upgraded to Redis or DB later
langmemo_context: Dict[str, dict] = {}


def store_in_langemo(echo_id: str, context: str, sentiment: str):
    langmemo_context[echo_id] = {
        "content": context,
        "sentiment": sentiment,
        "status": "awaiting",
        "suggestions": [],
    }


def update_langmemo_status(echo_id: str, status: str, suggestions=None):
    if echo_id in langmemo_context:
        langmemo_context[echo_id]["status"] = status
        if suggestions:
            langmemo_context[echo_id]["suggestions"] = suggestions


def get_langmemo_context(echo_id: str):
    return langmemo_context.get(echo_id, None)
