import React, { useState, useEffect } from "react";
import CurrentReward from "./CurrentReward";

const QuizNavBar = ({ quiz, totalScore, getTotalScoreIcon }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        // flexDirection: "column-reverse",
        justifyContent: "space-between",
        alignItems: "start",
        marginBottom: 20,
        textAlign: "center",
      }}
    >
      <h2 style={{ textAlign: "start", fontSize: isMobile ? "16px" : "24px" }}>
        {quiz.title}
      </h2>
      <CurrentReward
        imageSize={isMobile ? 60 : 100}
        fontSize={isMobile ? 45 : 60}
      />
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            textAlign: "end",
            fontSize: isMobile ? "16px" : "24px",
          }}
        >
          {getTotalScoreIcon()} إجمالي النقاط: {totalScore}
        </h2>
      </div>
    </div>
  );
};

export default QuizNavBar;
