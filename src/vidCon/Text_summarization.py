from transformers import pipeline

class TextSummarizer:
    def __init__(self, model_name="summarization", model="Falconsai/text_summarization"):
        self.summarizer = pipeline(model_name, model=model)
    
    def summarize_text(self, text):
        summary = self.summarizer(text, max_length=20, min_length=5, do_sample=False)
        return summary
