from fastapi import APIRouter, UploadFile, File, HTTPException
import services.whisper_service as whisper_service
import services.gemini_service as gemini_service

router = APIRouter()

# store transcript in memory for now, will change to db later
STATE = {"transcript": None}


@router.post("/upload_audio", tags = ["Upload content"])
async def upload_audio(file: UploadFile = File(...)):
    audio_bytes = await file.read()

    if not audio_bytes:
        raise HTTPException(400, "Empty audio file")

    text = whisper_service.convert_bytes_to_text(audio_bytes)

    STATE["transcript"] = text

    return {"message": "Audio uploaded", "filename": file.filename, "transcript": text}


@router.post("/summarize", tags = ["Gemini"])
async def summarize():
    transcript = STATE["transcript"]

    if not transcript:
        raise HTTPException(400, "No audio uploaded yet")

    summary = gemini_service.create_summary(transcript)
    return {"summary": summary}


@router.post("/ask_question", tags = ["Gemini"])
async def ask_question(question: str):
    transcript = STATE["transcript"]

    if not transcript:
        raise HTTPException(400, "No audio uploaded yet")

    answer = gemini_service.ask_question(transcript, question)
    return {"answer": answer}
