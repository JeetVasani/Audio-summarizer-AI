// "use client";

// import { useState } from "react";
// import { uploadAudio } from "../src/api/audioEndpoints";

// type UploadResponse = {
//   message: string;
//   filename: string;
//   transcript: string;
// };

// export default function Uploader({ onUpload }: { onUpload: () => void }) {
//   const [result, setResult] = useState<UploadResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [uploading, setUploading] = useState(false);     // uploading file to backend
//   const [processing, setProcessing] = useState(false);   // whisper creating transcript

//   async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setError(null);
//       setUploading(true);

//       // Simulate step 1: Uploading file
//       const uploadPromise = uploadAudio(file);

//       // UI switch between two stages
//       setTimeout(() => {
//         setUploading(false);
//         setProcessing(true); // whisper stage begins
//       }, 500);

//       const data = await uploadPromise;

//       setProcessing(false);
//       setResult(data);
//       onUpload(); // notify page
//     } catch (err: any) {
//       setError(err.message);
//       setUploading(false);
//       setProcessing(false);
//     }
//   }

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2>Upload Audio</h2>

//       {/* Hide upload button during loading */}
//       {!uploading && !processing && (
//         <label
//           style={{
//             display: "inline-block",
//             padding: "10px 18px",
//             border: "2px solid #333",
//             borderRadius: "8px",
//             cursor: "pointer",
//             background: "white",
//             fontWeight: "500",
//           }}
//         >
//           Select Audio
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={handleUpload}
//             style={{ display: "none" }}
//           />
//         </label>
//       )}

//       {/* Loading UI */}
//       {(uploading || processing) && (
//         <div style={{ marginTop: "1rem" }}>
//           {/* Loading Circle */}
//           <div
//             style={{
//               margin: "10px auto",
//               width: "40px",
//               height: "40px",
//               border: "4px solid rgba(255, 255, 255, 0.3)",
//               borderTopColor: "white",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//             }}
//           />

//           {/* Status Text */}
//           <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
//             {uploading && "Uploading audio..."}
//             {processing && "Creating transcript..."}
//           </p>
//         </div>
//       )}

//       {/* Filename */}
//       <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
//         {result ? result.filename : "No file uploaded"}
//       </p>

//       {/* Error */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Transcript */}
//       {result && (

//       <div
//         style={{
//           width: "100%",
//           maxWidth: "900px",
//           margin: "0 auto",
//           padding: "1rem 2rem",
//           textAlign: "left",
//           lineHeight: "1.6",
//           fontSize: "1.05rem",
//         }}
//       >
//         <p>
//           <b>Transcript:</b> {result.transcript}
//         </p>
//       </div>

//       )}

//       {/* Spinner animation */}
//       <style>{`
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { uploadAudio } from "../src/api/audioEndpoints";
import styles from "./styles.module.css";


type UploadResponse = {
  message: string;
  filename: string;
  transcript: string;
};

export default function Uploader({ onUpload }: { onUpload: () => void }) {
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setUploading(true);

      const uploadPromise = uploadAudio(file);

      setTimeout(() => {
        setUploading(false);
        setProcessing(true);
      }, 500);

      const data = await uploadPromise;

      setProcessing(false);
      setResult(data);
      onUpload();
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
      setProcessing(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Upload Audio</h2>
      <br></br>

      {!uploading && !processing && (
        <label className={styles.btn}>
          Select Audio
          <input
            type="file"
            accept="audio/*"
            onChange={handleUpload}
            className={styles.hiddenInput}
          />
        </label>
      )}

      {(uploading || processing) && (
        <div className={styles.loadingBlock}>
          <div className={styles.spinner}></div>
          <p className={styles.statusText}>
            {uploading && "Uploading audio..."}
            {processing && "Creating transcript..."}
          </p>
        </div>
      )}

      <p className={styles.filename}>
        {result ? result.filename : "No file uploaded"}
      </p>

      {error && <p className={styles.error}>{error}</p>}

{result && (
  <div className="card">
    <div className="cardHeader">Transcript</div>

    <div className="cardContent">
      {result.transcript}
    </div>
  </div>
)}

    </div>
  );
}
