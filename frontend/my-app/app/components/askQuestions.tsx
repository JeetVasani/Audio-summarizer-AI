"use client";

import { askQuestion } from "../src/api/audioEndpoints";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./styles.module.css";

export default function AskQuestions() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleAsk() {
    if (!question.trim()) return;

    // Push user's question
    setMessages((prev) => [...prev, { sender: "user", text: question }]);

    setLoading(true);

    try {
      const answer = await askQuestion(question);

      // Push AI answer
      setMessages((prev) => [...prev, { sender: "ai", text: answer }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: " + err.message },
      ]);
    }

    setQuestion("");
    setLoading(false);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAsk();
    }
  }
return (
  <div className={styles.chatWrapper}>
    <h2 className={styles.title}>Ask Questions</h2>

    {/* Chat window */}
    <div className={styles.chatBox}>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`${styles.message} ${
            msg.sender === "user" ? styles.userMessage : styles.aiMessage
          }`}
        >
          <div className={styles.markdown}>
            <ReactMarkdown >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      {/* Loading bubble */}
      {loading && (
        <div className={`${styles.message} ${styles.aiMessage}`}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <div ref={chatEndRef}></div>
    </div>

    {/* Floating input bar */}
    <div className={styles.inputBar}>
      <input
        type="text"
        placeholder="Ask something about the transcript..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKey}
        className={styles.input}
      />

      <button
        className={styles.sendBtn}
        onClick={handleAsk}
        disabled={loading}
      >
        Send
      </button>
    </div>
  </div>
);

}
