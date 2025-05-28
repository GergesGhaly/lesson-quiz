import React, { useEffect, useRef, useState } from "react";
import CoinAnimation from "./CoinAnimation";
import ComboMessage from "./ComboMessage";
import ProgressDots from "./ProgressDots";
import { useTranslation } from "react-i18next";
import { useSound } from "../contexts/SoundContext";

export default function Quiz({ questions, current, onAnswer }) {
  const { i18n } = useTranslation(); // نستخدم i18n للحصول على اللغة الحالية
  const language = i18n.language || "ar"; // "ar" أو "en" // اللغة الحالية ("ar", "en", ...)
  const { isSoundOn } = useSound();

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  // const comboSoundRef = useRef(null);
  const [showCoin, setShowCoin] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [comboNumber, setComboNumber] = useState(0);
  const [answersStatus, setAnswersStatus] = useState(
    Array(questions.length).fill(null)
  );

  // أرقام الكمبونت اللي تظهر عندها الرسالة
  const comboTriggers = [3, 6, 9];

  useEffect(() => {
    correctSoundRef.current = new Audio("/sound/correct.mp3");
    wrongSoundRef.current = new Audio("/sound/wrong.mp3");

    // comboSoundRef.current = new Audio("/sound/combo.mp3");
  }, []);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[current].correct;

    setAnswersStatus((prev) => {
      const updated = [...prev];
      updated[current] = isCorrect ? "correct" : "wrong";
      return updated;
    });

    if (isCorrect) {
      if (isSoundOn) {
        correctSoundRef.current?.play().catch(() => {});
      }
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
      if (isSoundOn) {
        wrongSoundRef.current?.play().catch(() => {});
      }
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
      {/* ✅ النقاط أعلى الكويز */}
      {/* ✅ dots */}
      <ProgressDots
        total={questions.length}
        current={current}
        answersStatus={answersStatus}
      />
      {/* رسالة الكمبونت */}
      <ComboMessage visible={showCombo} comboNumber={comboNumber} />

      <h3
        style={{
          marginBottom: "20px",
          direction: language === "ar" ? "rtl" : "ltr",
        }}
      >
        {questions[current].question[language]}
      </h3>

      {/* <h3 style={{ marginBottom: "20px" }}>{questions[current].question}</h3> */}
      {/* عرض الإجابات بحسب اللغة */}
      {questions[current].answers[language].map((answer, index) => (
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
      {/* {questions[current].answers.map((answer, index) => (
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
      ))} */}

      <CoinAnimation visible={showCoin} />
    </div>
  );
}
