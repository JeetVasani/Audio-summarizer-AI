# Audio-summarizer-AI

A simple tool to generate concise summaries from audio (or audio-derived transcript) — turning spoken content into readable summaries quickly and automatically.

## What is this

Audio-summarizer-AI processes audio (or text transcripts from audio) and produces human-readable summaries.  
It’s ideal for converting long podcasts, lectures, interviews, or recordings into shorter, digestible summaries.  

##  Why this project exists

- Listening to long-form audio (podcasts / lectures / interviews) is time-consuming.  
- Text summaries help in quickly scanning content and retrieving key points.  
- This project bridges the gap: from audio → transcript → summarized text — all with minimal manual effort.

##  Key Features

- Accepts audio input (or transcript) and runs summarization.  
- Supports both short and long inputs (depending on transcript length).  
- Easy to use via a web-based (or simple CLI/web) interface.  
- Quick setup and lightweight dependencies (Python backend + minimal frontend stack).  

## Working demo
https://github.com/user-attachments/assets/a76d50b7-2a40-4b44-a605-e9cc910edae9

##  Tech Stack

- **Backend:** Python, FastAPI. Fast Whisper for speech-to-text, Gemini api for chatbot
- **Frontend:**  TypeScript + CSS — for user interface.  

## API Endpoints

### Upload Content

#### POST /api/upload_audio — Upload Audio  
Uploads an audio file and returns a transcript.

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/upload_audio" \
  -F "file=@your_audio_file.mp3"
```

---

### Gemini

#### POST /api/summarize — Summarize  
Generates a summary from the transcript.

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/summarize" \
  -H "Content-Type: application/json" \
  -d '{"transcript": "your text here"}'
```

#### POST /api/ask_question — Ask Question  
Ask contextual questions based on the transcript.

**Example (cURL):**
```bash
curl -X POST "http://localhost:8000/api/ask_question" \
  -H "Content-Type: application/json" \
  -d '{"question": "your question"}'
```

## Installation

1. Clone the repository  
```bash
git clone https://github.com/JeetVasani/Audio-summarizer-AI.git  
cd Audio-summarizer-AI
```
2. Install dependencies
  ```bash
pip install -r requirements.txt
```

3.Configure API key in env
```bash
Change 
GEMINI_API_KEY=your_key_here
To your API key
```

4. Run the backend
```bash
uvicorn main:app --reload
```

5.Run the frontend
```bash  
npm run dev
```
