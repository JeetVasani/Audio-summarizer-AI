
export async function uploadAudio(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/api/upload_audio", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
}

export async function summarizeTranscript() {
  const response = await fetch("http://localhost:8000/api/summarize", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return data.summary;
}

export async function askQuestion(question: string) {
  const response = await fetch("http://localhost:8000/api/ask_question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return data.answer;
}
