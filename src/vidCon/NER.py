from transformers import pipeline


class PrivacyFilter:
    """Initializes and applies a privacy filter to transcribed text."""

    def __init__(self):
        print("--- Model loading.... ---")
        self.model = pipeline(
            "token-classification", "lakshyakh93/deberta_finetuned_pii", device=-1
        )
        print("--- Model loaded! ---")

    def getEntities(self, transcribed_text):
        """Extracts entities from transcribed text."""
        entities = self.model(transcribed_text, aggregation_strategy="first")
        return entities
