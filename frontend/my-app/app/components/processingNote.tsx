"use client";

import styles from "./styles.module.css";

export default function ProcessingNote({ hidden }: { hidden: boolean }) {
  if (hidden) return null;

  return (
<div className="card noteCard">
    <div className="cardHeader">Processing Audio</div>

    <div className="cardContent">
      Please wait while your audio is being processed.

      {"\n\n"}Estimated processing time:
      {"\n"}• 30 mins → 25–30 seconds  
      {"\n"}• 45 mins → 45–50 seconds  
      {"\n"}• 1 hour+ → ~1 minute
    </div>
  </div>
  );
}
