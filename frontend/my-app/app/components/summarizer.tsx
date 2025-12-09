import { useState } from "react";
import { summarizeTranscript } from "../src/api/audioEndpoints";

import styles from "./styles.module.css";
import ReactMarkdown from "react-markdown";

export default function Summarizer() {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSummarize() {
    try {
      setLoading(true);
      setError(null);

      const result = await summarizeTranscript();
      setSummary(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Summarize Transcript</h2>

      {/* Show button ONLY when not loading and no summary yet */}
      {!loading && !summary && (
        <button onClick={handleSummarize} className={styles.btn}>
          Summarize
        </button>
      )}

      {/* Smooth loading spinner */}
      {loading && <div className={styles.spinner}></div>}

      {/* Error message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Show summary */}
     {summary && (
  <div className="card">
    <div className="cardHeader">
      <h2>Summary</h2>
    </div>

    <div className="cardContent">
     <div className= {styles.markdownText}> 
      <ReactMarkdown>
        {summary}
      </ReactMarkdown>
    </div>
    </div>
  </div>
)}


    </div>
  );
}