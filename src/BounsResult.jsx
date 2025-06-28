import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Bg from "./assets/comeBackTomorwBg.jpg";
import { Link } from "react-router-dom";
import ChickenGame from "./components/ChickenGame";
import coinImage from "./assets/coinForBounsMOdal.jpg";
import { useSound } from "./contexts/SoundContext";
import coinSound from "/sound/coin-spill.mp3";

const ONE_DAY = 24 * 60 * 60 * 1000;

const BounsResult = ({ score }) => {
  const { t } = useTranslation();
  const { isSoundOn } = useSound();

  const [remaining, setRemaining] = useState(() => {
    const lastPlayed = localStorage.getItem("dailyVersePlayedAt");
    if (!lastPlayed) return 0;
    const diff = ONE_DAY - (Date.now() - parseInt(lastPlayed));
    return diff > 0 ? diff : 0;
  });

  const [displayScoreEffect, setDisplayScoreEffect] = useState(score > 0);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let audio;
    if (score > 0) {
      if (isSoundOn) {
        audio = new Audio(coinSound);
        audio.play();
      }

      let current = 0;
      const step = Math.max(1, Math.floor(score / 50));
      const interval = setInterval(() => {
        current += step;
        if (current >= score) {
          current = score;
          clearInterval(interval);
          setTimeout(() => setDisplayScoreEffect(false), 2000);
        }
        setAnimatedScore(current);
      }, 100);

      return () => {
        clearInterval(interval);
        if (audio) audio.pause();
      };
    }
  }, [score, isSoundOn]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100dvh",
        width: "100dvw",
        padding: "25px 20px",
        textAlign: "center",
        fontSize: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🎉 Effect when score exists */}
      {displayScoreEffect && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            // background: "#ffffffcc",
            padding: "20px",
            borderRadius: "20px",
            // boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          <img
            src={coinImage}
            alt="coin"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              fontSize: "48px",
              color: "#FFD700",
              fontWeight: "bold",
              textShadow: "1px 1px 2px #00000080",
            }}
          >
            +{animatedScore}
          </div>
        </div>
      )}

      {!displayScoreEffect && (
        <>
          <p>
            {" "}
            لقد حصلت على مكافأتك اليومية! <br />
            اراك غدا وحتى ذلك الوقت فضلا اعتنى بدجاجتى
          </p>
          <strong
            style={{
              color: "#ffffff",
              fontSize: "65px",
            }}
          >
            {formatTime(remaining)}
          </strong>
          <Link
            to="/"
            style={{
              backgroundColor: "#FFD700",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "15px",
              padding: "12px 25px",
              cursor: "pointer",
              textShadow: "0 0 3px #00000042",
            }}
          >
            {t("home")}
          </Link>
        </>
      )}

      <ChickenGame />
    </div>
  );
};

export default BounsResult;
