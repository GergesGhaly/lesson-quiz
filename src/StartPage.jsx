import React from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "./data/Questions";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
        height: "100vh",
        // justifyContent: "center",
      }}
    >
      <h2>اختر اختبارًا للبدء</h2>
      {quizzes.map((quiz) => (
        <button
          key={quiz.id}
          onClick={() => handleStartQuiz(quiz.id)}
          style={{
            // margin: 10,
            padding: "12px 24px",
            fontSize: 25,
            borderRadius: 10,
            border: "none",
            backgroundColor: "#2196f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {quiz.title}
        </button>
      ))}
    </div>
  );
};

export default StartPage;
