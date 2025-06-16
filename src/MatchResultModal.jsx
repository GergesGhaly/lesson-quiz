import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import vectory from "./assets/vectort.png";
import defeat from "./assets/defeat.png";
import coinsEffect from "/sound/coin-spill.mp3";
import lose from "/sound/marimba-lose.mp3";
import win from "/sound/violin-win.mp3";
import x2 from "/sound/X2.mp3";
import { useSound } from "./contexts/SoundContext";
import ConfettiOverlay from "./components/ConfettiOverlay";
import { useNavigate } from "react-router-dom";

const MatchResultModal = ({ score, isWin, readyToShow, roomId }) => {
  const navigate = useNavigate();

  const { isSoundOn } = useSound();

  const [displayScore, setDisplayScore] = useState(0);
  const [showX2, setShowX2] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    if (!readyToShow) return;

    const winSound = new Audio(win);
    const loseSound = new Audio(lose);
    const coinSound = new Audio(coinsEffect);
    const x2Sound = new Audio(x2);

    if (isSoundOn) {
      if (isWin) {
        winSound.play();
      } else {
        loseSound.play();
      }

      setTimeout(() => {
        coinSound.play();
      }, 500); // تشغيل صوت العملات بعد التأثير الأول
    }

    const controls = animate(0, score, {
      duration: 1.5,
      onUpdate: (value) => setDisplayScore(Math.floor(value)),
      onComplete: () => {
        if (isSoundOn) {
          coinSound.pause();
          coinSound.currentTime = 0;
        }

        if (isWin) {
          setShowX2(true);
          if (isSoundOn) x2Sound.play();
          setTimeout(() => {
            setFinalScore(score * 2);
          }, 1000);
        } else {
          setTimeout(() => {
            setFinalScore(score);
          }, 500); // delay بسيط لتحسين المظهر
        }
      },
    });

    return () => {
      controls.stop();
      coinSound.pause();
    };
  }, [score, isWin, isSoundOn, readyToShow, roomId]);

  if (!readyToShow) return null; // لا تظهر شيئًا حتى تتوفر النتائج

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 15,
          textAlign: "center",
          maxWidth: 350,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h4>Match Result</h4>
        <img
          src={isWin ? vectory : defeat}
          alt={isWin ? "Victory" : "Defeat"}
          style={{ width: 250, height: "auto" }}
        />
        <div style={{ fontSize: 24, marginTop: 20 }}>
          Score: {displayScore}
          {showX2 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ color: "orange", marginLeft: 10 }}
            >
              x2
            </motion.span>
          )}
        </div>

        {finalScore !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}
          >
            Final Score: {finalScore}
          </motion.div>
        )}

        {/* <a href="/" style={{ textDecoration: "none", color: "white" }}> */}
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 25,
            background: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          Home
        </button>
        {/* </a> */}
      </motion.div>
      <ConfettiOverlay show={isWin} isMatch={true} />
    </div>
  );
};

export default MatchResultModal;
