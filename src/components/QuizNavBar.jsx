import React, { useState, useEffect } from "react";
import CurrentReward from "./CurrentReward";
import { useTranslation } from "react-i18next";

const QuizNavBar = ({ quiz, totalScore, getTotalScoreIcon }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "ar";
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
        justifyContent: "space-between",
        // alignItems: "center",
        marginBottom: 20,
        textAlign: "center",
      }}
    >
      {/* ✅ العنوان على اليسار */}
      <div style={{ flex: 1, textAlign: language === "en" ? "end" : "start" }}>
        <h2
          style={{
            fontSize: isMobile ? "16px" : "20px",
            direction: language === "en" ? "ltr" : "rtl",
          }}
        >
          {quiz.title[language]}
        </h2>
      </div>

      {/* ✅ المكافأة في الوسط */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <CurrentReward
          imageSize={isMobile ? 60 : 100}
          fontSize={isMobile ? 45 : 60}
        />
      </div>

      {/* ✅ مجموع النقاط على اليمين */}
      <div style={{ flex: 1, textAlign: "end" }}>
        <h2 style={{ fontSize: isMobile ? "16px" : "20px" }}>
          {getTotalScoreIcon()} {t("total_score")}: {totalScore}
        </h2>
      </div>
    </div>
  );
};

export default QuizNavBar;
