from fastapi import FastAPI
from endpoints.audio_endpoints import router 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.transcript = None


app.include_router(router, prefix="/api")
