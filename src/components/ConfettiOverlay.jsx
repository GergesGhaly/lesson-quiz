import React, { useEffect } from "react";
import Confetti from "react-confetti";
import NextLevelBtn from "./NextLevelBtn";
import { useSound } from "../contexts/SoundContext";
import TotalScoreIcon from "./TotalScoreIcon";

export default function ConfettiOverlay({ show ,isMatch}) {
  const { isSoundOn } = useSound();
  useEffect(() => {
    if (show && isSoundOn && !isMatch) {
      const audio = new Audio("/sound/win.mp3");
      audio.play().catch((err) => {
        console.warn("فشل تشغيل الصوت:", err);
      });
    }
  }, [show]);

  if (!show) return null;
  return (
    <>
      <Confetti />
    </>
  );
}
