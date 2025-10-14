import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import proifile from "/sound/proifile.mp3";
import {
  getQuizResults,
  getUnlockedRewards,
} from "./utils/localStorageHelpers";
import { getAllRewards, getRewardsDisplay } from "./utils/rewardUtils"; // ✅ استيراد الدالة
import { Link } from "react-router-dom";
import RewardsList from "./components/RewardsList";
import CurrentReward from "./components/CurrentReward";
import { useTranslation } from "react-i18next";
import { useSound } from "./contexts/SoundContext";
import NextRewardProgress from "./components/NextRewardProgress";
import BackBtn from "./components/BackBtn";
import GetsAllRewards from "./components/GetsAllRewards";
import TimeToVictoryBtn from "./components/TimeToVictoryBtn";
import profilBg from "./assets/profil_bg.jpg";

const Profile = () => {
  const { t } = useTranslation();
  const { isSoundOn } = useSound();
  const [showAllRewards, setShowAllRewards] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const playerAvatar = localStorage.getItem("playerAvatar");
  const playerId = localStorage.getItem("playerId");

  const allRewards = getAllRewards();
  const hasCollectedAll = unlockedRewards.length === allRewards.length;

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
        // backgroundImage: `url(${profilBg})`,
        // backgroundSize: "cover",
        background: hasCollectedAll
          ? "radial-gradient(circle, #e4a42e, #c72b2b)"
          : "radial-gradient(circle, #C6542E, #1E2247)",
        color: "#fff",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "start",

        width: "100%",
        overflow: "hidden",
        gap: "25px",
      }}
    >
      <div
        style={{
          // marginBottom: "20px",
          fontSize: isMobile ? "20px" : "24px",
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
        {hasCollectedAll ? (
          <TimeToVictoryBtn setShowAllRewards={setShowAllRewards} />
        ) : (
          <NextRewardProgress totalScore={totalScore} />
        )}
        <RewardsList rewards={unlockedRewards} />
      </div>

      <BackBtn />
      {showAllRewards && (
        <GetsAllRewards
          onClose={() => {
            setShowAllRewards(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
