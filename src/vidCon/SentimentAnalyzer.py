from transformers import pipeline


class SentimentAnalyzer:
    def __init__(self):
        print("--- Model loading.... ---")
        self.model = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")
    
    def analyze_sentiment(self, text):
        return self.sentiment_task(text)


# Usage
#analyzer = SentimentAnalyzer()
#result = analyzer.analyze_sentiment("I ate Chocolates")
#print(result)
