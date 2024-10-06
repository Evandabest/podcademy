import google.generativeai as genai
import os
from dotenv import load_dotenv


load_dotenv('.env')
API_KEY = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY')
genai.configure(api_key=API_KEY)

def parse_and_summarize(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    print(response.text)