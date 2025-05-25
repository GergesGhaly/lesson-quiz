import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoinAnimation from "./CoinAnimation";

export default function Quiz({ questions, current, onAnswer }) {
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const [showCoin, setShowCoin] = useState(false);

  useEffect(() => {
    correctSoundRef.current = new Audio("/sound/correct.mp3");
    wrongSoundRef.current = new Audio("/sound/wrong.mp3");
  }, []);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[current].correct;
    if (isCorrect) {
      correctSoundRef.current?.play().catch(() => {});
      setShowCoin(true);
      setTimeout(() => setShowCoin(false), 1000);
    } else {
      wrongSoundRef.current?.play().catch(() => {});
    }

    onAnswer(index, isCorrect);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontSize: "20px",
        justifyContent: "center",
     
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>{questions[current].question}</h3>

      {questions[current].answers.map((answer, index) => (
        <button
          key={index}
          style={{
            display: "block",
            margin: "8px auto",
            padding: "10px",
            fontSize: "20px",
            width: "100%",
            maxWidth: "400px",
          }}
          onClick={() => handleAnswer(index)}
        >
          {answer}
        </button>
      ))}

      <CoinAnimation visible={showCoin} />
    </div>
  );
}
