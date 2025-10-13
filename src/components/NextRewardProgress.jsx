import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { rewardLevels } from "../data/RewardLevelsWithTranslation";

const NextRewardProgress = ({ totalScore }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "ar";

  const nextReward = rewardLevels.find(
    (reward) => totalScore < reward.threshold
  );

  if (!nextReward) return null;

  const percentage = Math.min(
    100,
    Math.round((totalScore / nextReward.threshold) * 100)
  );

  if (!nextReward) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        {t("all_rewards_unlocked")}
      </p>
    );
  }

  return (
    <div
      style={{
        // marginTop: "20px",
        textAlign: "center",
        color: "#fff",
        width: "100%",
        maxWidth: "400px",
        marginInline: "auto",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          marginBottom: "5px",
          fontWeight: "medium",
          direction: language === "en" ? "ltr" : "rtl",
         
        }}
      >
        {t("Next challenge at")} {nextReward.threshold} {t("point")} -{" "}
        {nextReward.reward[language]} 🔓
      </div>

      {/* شريط التقدم */}
      <div
        style={{
          background: "#444",
          borderRadius: "12px",
          overflow: "hidden",
          height: "24px",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #FFBD2B, #ffc64c, #fdcd64)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            top: 0,
            color: "black",
            fontWeight: "bold",
            lineHeight: "24px",
            fontSize: "14px",
          }}
        >
          {totalScore} / {nextReward.threshold}
        </div>
      </div>
    </div>
  );
};

export default NextRewardProgress;
