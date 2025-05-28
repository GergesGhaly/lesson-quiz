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

const Profile = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

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
    if (total > 0) {
      audio.play().catch((e) => {
        // في حال منع المتصفح التشغيل التلقائي
        console.warn("لم يتم تشغيل الصوت تلقائيًا:", e);
      });
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle, #433C7D, #1E2247)",
        color: "#fff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "space-between",

        width: "100%",
      }}
    >
      {/* <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        👤 ملف المستخدم
      </h2> */}
      <div
        style={{
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        إجمالي النقاط: {totalScore}
      </div>

      {/* <div style={{ marginBottom: "40px" }}>
        <h3>🏆 المكافآة الحالية</h3>
        {unlockedRewards.length === 0 ? (
          <p>لا توجد مكافآت حتى الآن.</p>
        ) : (
          (() => {
            const { reward, icon, image } =
              unlockedRewards[unlockedRewards.length - 1];
            return (
              <motion.div
                initial={{ scale: 5, opacity: 0.2 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                // transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  borderRadius: "12px",
                  width: "140px",
                }}
              >
                {image ? (
                  <motion.img
                    src={image}
                    alt={reward}
                    style={{
                      width: 170,
                      height: 170,
                      objectFit: "contain",
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                ) : (
                  <motion.span
                    style={{ fontSize: 130 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {icon}
                  </motion.span>
                )}
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginTop: "8px",
                    textAlign: "center",
                  }}
                >
                  {reward}
                </span>
              </motion.div>
            );
          })()
        )}
      </div> */}

      <CurrentReward imageSize={170} fontSize={130} />
      <RewardsList rewards={unlockedRewards} />
      <Link
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
          Back
        </button>
      </Link>
    </div>
  );
};

export default Profile;
