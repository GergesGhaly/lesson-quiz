import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "./data/Questions";
import btnWall from "./assets/btnWall.png";
import wallVideo from "./assets/wall2.mp4";
import startSound from "/sound/gameStart.mp3";
import ProfileNavigationBtn from "./components/ProfileNavigationBtn";

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    const sound = new Audio(startSound);
    sound.play().catch((err) => console.warn("فشل تشغيل الصوت", err));

    navigate(`/quiz/${quizId}`);
  };

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
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      {/* 🎥 خلفية الفيديو */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={wallVideo} type="video/mp4" />
        المتصفح لا يدعم تشغيل الفيديو.
      </video>

      {/* 🎯 المحتوى */}
      <div
        style={{
          padding: 40,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "start",
          gap: 30,
          zIndex: 1,
          color: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? 20 : 30,
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.678)",
          }}
        >
          اختر اختبارًا للبدء
        </h2>
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
                fontSize: isMobile ? 20 : 30,
                border: "none",
                backgroundColor: "transparent",
                color: "#fff",
                cursor: "pointer",
                backgroundImage: `url(${btnWall})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 100,
                width: isMobile ? 250 : 350,
                textShadow: "0px 3px 4px rgba(0, 0, 0, 0.836)",

                // shadow: "0px 4px 6px rgba(0, 0, 0, 0.63)",
              }}
            >
              {quiz.title}
            </button>
          ))}
        </div>
      </div>
      <ProfileNavigationBtn />
    </div>
  );
};

export default StartPage;
