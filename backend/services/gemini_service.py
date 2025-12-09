import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")

def create_summary(text):
    print("-------------->CREATING MEETING SUMMARY<--------------\n\n")
    response = model.generate_content(f"Summarize the meeting contents :{text}")
    return(response.text)

def ask_question(transcript, question):
    prompt = (
        f"You are a strict assistant. You can ONLY answer using the transcript below.\n\n"
        f"If the user's question is outside this transcript's content, reply with:\n\n"
        f"Sorry, I can only answer questions related to the uploaded audio.\n\n"
        f"You are answering based ONLY on this transcript.\n\n"
        f"Transcript:\n{transcript}\n\n"
        f"Question: {question}\n\n"
        f"Answer clearly and concisely. Do not say the words - Based on the transcript"
    )
    response = model.generate_content(prompt)
    return response.text