import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import bg from "../assets/timerBg.jpg";

const CountdownTimerBeforeMatchStart = ({ totalTime = 5, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const { t } = useTranslation();

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        return next >= 0 ? next : 0;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && onComplete) {
      // تأخير التنفيذ لما بعد الرندر لتفادي الخطأ
      setTimeout(() => onComplete(), 0);
    }
  }, [timeLeft, onComplete]);

  const circleSize = 200;
  const radius = circleSize / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 20px",
        textAlign: "center",
        // marginTop: "100px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        minHeight: "100dvh",
      }}
    >
      <svg width={circleSize} height={circleSize}>
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke="#4caf50"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1 }}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="32px"
          fill="#333"
        >
          {timeLeft}
        </text>
      </svg>
      <p style={{ fontSize: "20px", marginTop: "10px" }}>
        {t("ready_for_battle")}...
      </p>
    </div>
  );
};

export default CountdownTimerBeforeMatchStart;
