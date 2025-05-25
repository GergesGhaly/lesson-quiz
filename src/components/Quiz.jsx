import React, { useEffect, useRef, useState } from "react";
import CoinAnimation from "./CoinAnimation";
import ComboMessage from "./ComboMessage";

export default function Quiz({ questions, current, onAnswer }) {
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  // const comboSoundRef = useRef(null);
  const [showCoin, setShowCoin] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [comboNumber, setComboNumber] = useState(0);

  // أرقام الكمبونت اللي تظهر عندها الرسالة
  const comboTriggers = [3, 6, 9];

  useEffect(() => {
    correctSoundRef.current = new Audio("/sound/correct.mp3");
    wrongSoundRef.current = new Audio("/sound/wrong.mp3");
    // comboSoundRef.current = new Audio("/sound/combo.mp3");
  }, []);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[current].correct;
    if (isCorrect) {
      correctSoundRef.current?.play().catch(() => {});
      setShowCoin(true);
      setTimeout(() => setShowCoin(false), 1000);

      setComboCount((prev) => {
        const newCount = prev + 1;

        if (comboTriggers.includes(newCount)) {
          setComboNumber(newCount);
          setShowCombo(true);
          // comboSoundRef.current?.play().catch(() => {});
          setTimeout(() => setShowCombo(false), 1500);
        }

        if (newCount === Math.max(...comboTriggers)) {
          // إذا وصلت لأعلى combo، نعيد العد للصفر
          return 0;
        }

        return newCount;
      });
    } else {
      wrongSoundRef.current?.play().catch(() => {});
      setComboCount(0);
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
      {/* رسالة الكمبونت */}
      <ComboMessage visible={showCombo} comboNumber={comboNumber} />

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
