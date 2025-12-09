# from fastapi import APIRouter, UploadFile, File, HTTPException
# import services.whisper_service as whisper_service
# import services.gemini_service as gemini_service
# from pydantic import BaseModel

# router = APIRouter()

# class QuestionRequest(BaseModel):
#     question: str

# # store transcript in memory for now, will change to db later
# STATE = {"transcript": None}


# @router.post("/upload_audio", tags = ["Upload content"])
# async def upload_audio(file: UploadFile = File(...)):

#     audio_bytes = await file.read()

#     if not audio_bytes:
#         raise HTTPException(400, "Empty audio file")

#     text = whisper_service.convert_bytes_to_text(audio_bytes)

#     STATE["transcript"] = text
#     print("UPLOAD ENDPOINT HIT")
#     print("Audio bytes length:", len(audio_bytes))
#     print("Transcript returned by Whisper:", text)
#     print("STATE after upload:", STATE)

#     return {"message": "Audio uploaded", "filename": file.filename, "transcript": text}



# @router.post("/summarize", tags = ["Gemini"])
# async def summarize():
#     transcript = STATE["transcript"]

#     if not transcript:
#         raise HTTPException(400, "No audio uploaded yet")

#     summary = gemini_service.create_summary(transcript)
#     return {"summary": summary}



# @router.post("/ask_question", tags=["Gemini"])
# async def ask_question(req: QuestionRequest):
#     transcript = STATE["transcript"]

#     if not transcript:
#         raise HTTPException(400, "No audio uploaded yet")

#     answer = gemini_service.ask_question(transcript, req.question)
#     return {"answer": answer}
from fastapi import APIRouter, UploadFile, File, HTTPException, Request
import services.whisper_service as whisper_service
import services.gemini_service as gemini_service
from pydantic import BaseModel

router = APIRouter()


class QuestionRequest(BaseModel):
    question: str


# We remove STATE completely — we will use app.state instead.


@router.post("/upload_audio", tags=["Upload content"])
async def upload_audio(request: Request, file: UploadFile = File(...)):

    audio_bytes = await file.read()
    if not audio_bytes:
        raise HTTPException(400, "Empty audio file")

    # Convert audio to text
    text = whisper_service.convert_bytes_to_text(audio_bytes)

    # Store transcript safely inside FastAPI application state
    request.app.state.transcript = text

    print("UPLOAD ENDPOINT HIT")
    print("Audio bytes length:", len(audio_bytes))
    print("Transcript returned by Whisper:", text)
    print("APP STATE AFTER UPLOAD:", request.app.state.transcript)

    return {
        "message": "Audio uploaded",
        "filename": file.filename,
        "transcript": text
    }


@router.post("/summarize", tags=["Gemini"])
async def summarize(request: Request):

    transcript = request.app.state.transcript

    if not transcript:
        raise HTTPException(400, "No audio uploaded yet")

    summary = gemini_service.create_summary(transcript)
    return {"summary": summary}


@router.post("/ask_question", tags=["Gemini"])
async def ask_question(request: Request, req: QuestionRequest):

    transcript = request.app.state.transcript

    if not transcript:
        raise HTTPException(400, "No audio uploaded yet")

    answer = gemini_service.ask_question(transcript, req.question)
    return {"answer": answer}
