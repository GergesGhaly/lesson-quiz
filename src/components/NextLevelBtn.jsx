import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NextLevelBtn = () => {
  const navigate = useNavigate();
  // const { quizId } = useParams();

  const handleNextQuiz = () => {
    navigate(`/Library`);
  };
  const { t } = useTranslation();

  return (
    <button
      onClick={handleNextQuiz}
      style={{
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        marginTop: 20,
        padding: "10px 20px",
        fontSize: "20px",
        cursor: "pointer",
        borderRadius: 8,
        border: "none",
        backgroundColor: "#4caf50",
        color: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* ابدا اختبار اخر */}
      {t("next_quiz")}
    </button>
  );
};

export default NextLevelBtn;
