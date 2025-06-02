import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "./data/QuizzesWithTranslations";
import btnWall from "./assets/btnWall.avif";
import startSound from "/sound/gameStart.mp3";
import { useTranslation } from "react-i18next";
import { useSound } from "./contexts/SoundContext";
import { motion } from "framer-motion";
import bgMusicFile from "/sound/sky-lark-sound-birds.mp3";
import moriningForsetBg from "/sound/moriningForsetBg_out.mp3";
import wallBg from "./assets/choosTestBg.webp";
import BackBtn from "./components/BackBtn";

const ChooseTestPage = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { isSoundOn } = useSound();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [isNight, setIsNight] = useState(false);
  const [rainDrops, setRainDrops] = useState([]);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 18 || hour < 6);
  }, []);

  const handleStartQuiz = (quizId) => {
    const sound = new Audio(startSound);
    if (isSoundOn) {
      sound.play().catch((err) => console.warn("فشل تشغيل صوت البدء", err));
    }

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
    bgMusicRef.current = new Audio(isNight ? bgMusicFile : moriningForsetBg);
    bgMusicRef.current.loop = true;

    if (isSoundOn) {
      bgMusicRef.current
        .play()
        .catch((err) =>
          console.warn("❌ فشل تشغيل الموسيقى الخلفية تلقائيًا", err)
        );
    } else {
      bgMusicRef.current.pause();
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, [isSoundOn, isNight]);

  // 💧 إنشاء قطرات المطر
  const generateRain = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 1.5 + 1.5,
      height: Math.random() * 20 + 10,
    }));
  };

  useEffect(() => {
    if (isNight) {
      setRainDrops(generateRain(100));
    }
  }, [isNight]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        backgroundImage: `url(${wallBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 💧 تضمين تحريك قطرات المطر */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100px);
              opacity: 0;
            }
            30% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* ☀️ الشمس (تظهر فقط في النهار) */}
      {!isNight && (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,240,150,0.85), rgba(255,223,0,0.2))",
            filter: "blur(50px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* 🌙 طبقة شفافة ليلية */}
      {isNight && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 0,
          }}
        ></div>
      )}

      {/* 💧 قطرات المطر */}
      {isNight &&
        rainDrops.map((drop) => (
          <div
            key={drop.id}
            style={{
              position: "absolute",
              top: 0,
              left: `${drop.left}%`,
              width: 1.5,
              height: drop.height,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              animation: `fall ${drop.duration}s linear infinite`,
              animationDelay: `${drop.delay}s`,
              zIndex: 0,
            }}
          />
        ))}

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
            gap: isMobile ? 13 : 20,
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
      <BackBtn />
    </div>
  );
};

export default ChooseTestPage;
