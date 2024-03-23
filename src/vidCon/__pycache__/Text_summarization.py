from transformers import pipeline

class TextSummarizer:
    def __init__(self, model_name="summarization", model="Falconsai/text_summarization"):
        self.summarizer = pipeline(model_name, model=model)
    
    def summarize_text(self, text):
        summary = self.summarizer(text, max_length=1000, min_length=30, do_sample=False)
        return summary

# Example usage:
'''summarizer = TextSummarizer()
ARTICLE = """
<Input Text>
"""
summary = summarizer.summarize_text(ARTICLE)
print(summary)
'''
