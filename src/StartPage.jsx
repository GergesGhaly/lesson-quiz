import React from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "./data/Questions";
import wall from "./assets/wall1.jpg";
import btnWall from "./assets/btnWall.png";
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
        gap: 30,
        minHeight: "100vh",
        backgroundImage: `url(${wall})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        backgroundPosition: "center",
      }}
    >
      <h2 style={{ fontSize: 30 }}>اختر اختبارًا للبدء</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() => handleStartQuiz(quiz.id)}
            style={{
              // margin: 10,
              // padding: "12px 24px",
              fontSize: 30,
              // borderRadius: 10,
              border: "none",
              backgroundColor: "transparent",
              color: "#fff",
              cursor: "pointer",
              backgroundImage: `url(${btnWall})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              objectFit: "cover",
              // backgroundSize: "100%",
              backgroundPosition: "center",
              height: 100,
              width: 350,
            }}
          >
            {quiz.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartPage;
