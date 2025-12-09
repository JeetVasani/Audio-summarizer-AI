"use client";

import { useState } from "react";
import Uploader from "./components/uploader";
import Summarizer from "./components/summarizer";
import AskQuestion from "./components/askQuestions";
import Header from "./components/header";
import Footer from "./components/footer";
import ProcessingNote from "./components/processingNote";

import styles from "./components/styles.module.css";

export default function Page() {
  const [audioUploaded, setAudioUploaded] = useState(false);
  const [processingDone, setProcessingDone] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.content}>

        <Uploader
          onUpload={() => {
            setAudioUploaded(true);
            setProcessingDone(true);
          }}
        />

        <ProcessingNote hidden={processingDone} />
        {audioUploaded && <Summarizer />}
        {audioUploaded && <AskQuestion />}
      </main>

      <Footer />
    </div>
  );
}
