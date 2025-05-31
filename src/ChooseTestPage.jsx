import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "./data/QuizzesWithTranslations";
import btnWall from "./assets/btnWall.png";
import wallVideo from "./assets/wall2+.mp4";
import startSound from "/sound/gameStart.mp3";
import { useTranslation } from "react-i18next";
import { useSound } from "./contexts/SoundContext";
import { motion } from "framer-motion";
import bgMusicFile from "/sound/sky-lark-sound-birds.mp3"; // <-- تم إعادة التسمية لتجنب التعارض

const ChooseTestPage = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { isSoundOn } = useSound();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const bgMusicRef = useRef(null); // 🎵 مرجع للموسيقى الخلفية

  const handleStartQuiz = (quizId) => {
    const sound = new Audio(startSound);
    if (isSoundOn) {
      sound.play().catch((err) => console.warn("فشل تشغيل صوت البدء", err));
    }

    // إيقاف الخلفية عند الانتقال
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }

    navigate(`/quiz/${quizId}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // أنشئ كائن الصوت مرة واحدة
    bgMusicRef.current = new Audio(bgMusicFile);
    bgMusicRef.current.loop = true;

    // شغّل أو أوقف حسب isSoundOn
    if (isSoundOn) {
      bgMusicRef.current
        .play()
        .catch((err) =>
          console.warn("❌ فشل تشغيل الموسيقى الخلفية تلقائيًا", err)
        );
    } else {
      bgMusicRef.current.pause();
    }

    // عند الخروج من الصفحة
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, [isSoundOn]);

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
      {/* فيديو الخلفية */}
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
        {t("video_error_message")}
      </video>

      {/* المحتوى */}
      <div
        style={{
          padding: 40,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          {t("choose_test")}
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
            <motion.button
              whileTap={{ scale: 0.9 }}
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
                width: isMobile ? 270 : 350,
                textShadow: "0px 3px 4px rgba(0, 0, 0, 0.836)",
              }}
            >
              {quiz.title[language]}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseTestPage;
