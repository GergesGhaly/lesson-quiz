// src/components/RewardPopup.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSound } from "../contexts/SoundContext";

const RewardPopup = ({ reward, onClose }) => {
  const { t } = useTranslation();
  const { isSoundOn } = useSound();

  useEffect(() => {
    if (reward && isSoundOn) {
      // تأكد من أن threshold رقم
      // const threshold = Number(reward.threshold);
      console.log("Threshold:", reward.threshold);

      let audioSrc;

      if (reward.threshold > 100) {
        audioSrc = "/sound/new-level3.mp3";
      } else if (reward.threshold >= 50) {
        audioSrc = "/sound/new-level2.mp3";
      } else {
        audioSrc = "/sound/new-level.mp3";
      }

      const audio = new Audio(audioSrc);
      audio.play().catch((err) => {
        console.warn("فشل تشغيل الصوت:", err);
      });
      console.log(reward);
    }
  }, [reward]);

  if (!reward) return null;

  const imageAnimation = {
    initial: { scale: 5, opacity: 0.2 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 15,
          textAlign: "center",
          maxWidth: 300,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {reward.image ? (
          <motion.img
            src={reward.image}
            alt={reward.reward}
            style={{ width: 170, height: 170, marginBottom: 10 }}
            initial="initial"
            animate="animate"
            variants={imageAnimation}
          />
        ) : (
          <motion.div
            style={{ fontSize: 90, marginBottom: 10 }}
            initial="initial"
            animate="animate"
            variants={imageAnimation}
          >
            {reward.icon}
          </motion.div>
        )}

        <div style={{ fontSize: 25, fontWeight: "bold" }}>{reward.reward}</div>
        <h4 style={{ margin: "15px 0" }}>{t("new_reward")}</h4>
        <button
          onClick={onClose}
          style={{
            marginTop: 5,
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {t("OK")}
        </button>
      </div>
    </div>
  );
};

export default RewardPopup;
