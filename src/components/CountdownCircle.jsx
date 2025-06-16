import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "../contexts/SoundContext";

const CountdownCircle = ({ totalTime, onComplete }) => {
  const { isSoundOn, setIsSoundOn } = useSound();

  const radius = 25;
  const circumference = 2 * Math.PI * radius;

  const [countdown, setCountdown] = useState(totalTime);
  const intervalRef = useRef(null);
  const beepRef = useRef(new Audio("/sound/beep.mp3"));

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (countdown <= 4 && countdown > 0 && isSoundOn) {
      beepRef.current.play().catch(() => {});
    }
  }, [countdown]);

  const dashOffset = circumference * (1 - countdown / totalTime);

  return (
    <motion.div
      style={{
        width: 60,
        height: 60,
        position: "relative",
        margin: "10px auto",
      }}
      animate={
        countdown <= 3 && countdown > 0
          ? { scale: [1, 1.1, 0.95, 1] }
          : { scale: 1 }
      }
      transition={{
        duration: 0.3,
        repeat: countdown <= 3 && countdown > 0 ? Infinity : 0,
        repeatType: "loop",
      }}
    >
      <svg width="60" height="60">
        <circle
          cx="30"
          cy="30"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="30"
          cy="30"
          r={radius}
          stroke="#57fc0b"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: "linear" }}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: "bold",
          color: "#94fc0b",
        }}
      >
        {countdown}
      </div>
    </motion.div>
  );
};

export default CountdownCircle;
