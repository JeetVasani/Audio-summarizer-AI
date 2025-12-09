from faster_whisper import WhisperModel

def covert_audio_to_text(audio_path: str):

    try:
        model = WhisperModel(
            "tiny",
            device="cuda",
            compute_type="float16"
        )
        print("Using GPU...")

    except Exception as e:
        print("GPU failed, using CPU...", e)
        model = WhisperModel(
            "tiny",
            device="cpu",
            compute_type="int8"
        )

    segments, info = model.transcribe(
        audio_path,
        beam_size=1,
        vad_filter=True,
        language="en",
    )

    transcript = ""

    for seg in segments:
        start_min = seg.start / 60
        end_min = seg.end / 60

        print(f"[{start_min:.2f}m → {end_min:.2f}m] {seg.text}")
        transcript += seg.text + " "


    transcript = transcript.strip()

    return(transcript)

def convert_bytes_to_text(audio_bytes):
    import tempfile
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name
    try:
        model = WhisperModel(
            "tiny",
            device="cuda",
            compute_type="float16"
        )
        print("Using GPU...")

    except Exception as e:
        print("GPU failed, using CPU...", e)
        model = WhisperModel(
            "tiny",
            device="cpu",
            compute_type="int8"
        )

    segments, info = model.transcribe(tmp_path)
    return " ".join([seg.text for seg in segments])

# def get_file(audio_bytes):
