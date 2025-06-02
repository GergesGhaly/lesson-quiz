import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import proifile from "/sound/proifile.mp3";
import {
  getQuizResults,
  getUnlockedRewards,
} from "./utils/localStorageHelpers";
import { getRewardsDisplay } from "./utils/rewardUtils"; // ✅ استيراد الدالة
import { Link } from "react-router-dom";
import RewardsList from "./components/RewardsList";
import CurrentReward from "./components/CurrentReward";
import { useTranslation } from "react-i18next";
import { useSound } from "./contexts/SoundContext";
import NextRewardProgress from "./components/NextRewardProgress";
import BackBtn from "./components/BackBtn";

const Profile = () => {
  const { t } = useTranslation();
  const { isSoundOn } = useSound();

  const [quizResults, setQuizResults] = useState([]);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedResults = getQuizResults();
    setQuizResults(savedResults);

    const total = savedResults.reduce((sum, val) => sum + (val || 0), 0);
    setTotalScore(total);

    const rewardsKeys = getUnlockedRewards();
    const fullRewards = getRewardsDisplay(rewardsKeys); // ✅ تحويل المفاتيح إلى بيانات كاملة
    setUnlockedRewards(fullRewards);

    // تشغيل الصوت عند الدخول
    const audio = new Audio(proifile);
    if (total > 0 && isSoundOn) {
      audio.play().catch((e) => {
        // في حال منع المتصفح التشغيل التلقائي
        console.warn("لم يتم تشغيل الصوت تلقائيًا:", e);
      });
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "radial-gradient(circle, #433C7D, #1E2247)",
        color: "#fff",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "start",

        width: "100%",
        gap: "25px",
      }}
    >
      <div
        style={{
          // marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {t("total_score")}: {totalScore}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <CurrentReward imageSize={isMobile ? 90 : 135} fontSize={90} />
        <NextRewardProgress totalScore={totalScore} />
        <RewardsList rewards={unlockedRewards} />
      </div>

      <BackBtn />
      {/* <Link
        to="/"
        style={{
          background: "#4CAF50",
          width: "100%",
          maxWidth: "300px",
          color: "white",
          padding: "10px 20px",
          fontSize: "18px",
          marginTop: "20px",
          borderRadius: "12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <button
          style={{
            background: "transparent",
            color: "white",
            border: "none",
          }}
        >
          {t("back")}
        </button>
      </Link> */}
    </div>
  );
};

export default Profile;
