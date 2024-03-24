from transformers import pipeline
import re


class PrivacyFilter:

    """Initializes and applies a privacy filter to transcribed text."""

    def __init__(self):
        print("--- Model loading.... ---")
        self.model = pipeline(
            "token-classification", "lakshyakh93/deberta_finetuned_pii", device=-1
        )
        print("--- Model loaded! ---")
        self.entities = ""

    def getEntities(self, transcribed_text):
        """Extracts entities from transcribed text."""
        self.entities = self.model(transcribed_text, aggregation_strategy="first")
        return self.entities

    def redact_words(self, text):
        # Sort the redactions by start index in descending order
        redactions = sorted(self.entities, key=lambda x: x["start"], reverse=True)

        for redaction in redactions:
            start = redaction["start"]
            end = redaction["end"]
            # Replace the specified range with '<Redacted>'
            text = text[:start] + "<Redacted>" + text[end:]

        return text
