# pip install pypdf
# pip install docx2txt
# pip install python-pptx


from pypdf import PdfReader
import docx2txt
from pptx import Presentation 

# Read the Data from PDF 
class PDFReader:
    def _init_(self, filename):
        self.reader = PdfReader(filename)
    
    def extract_text_from_pages(self):
        for page in self.reader.pages:
            text = page.extract_text()
            print(text)

# Read data from Document 
class DOCReader: 
    def _init_(self, filename):
        self.reader = docx2txt.process(filename)

    def extract_text_from_pages(self):
        print(self.reader)

# Read data from PPT 
class PPTReader:
    def _init_(self, filename):
        self.reader = Presentation(filename)

    def extract_text_from_pages(self):
        for slide_number, slide in enumerate(self.reader.slides): 
          print(f"Slide {slide_number + 1}:")

# Usage
#ppt_reader = PPTReader('samplepptx.pptx')
#ppt_reader.extract_text_from_pages()
