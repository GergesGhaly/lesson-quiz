// components/CurrentReward.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUnlockedRewards } from "../utils/localStorageHelpers";
import { getRewardsDisplay } from "../utils/rewardUtils";
import { useTranslation } from "react-i18next";

const CurrentReward = ({ imageSize, fontSize }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "ar";
  const [lastReward, setLastReward] = useState(null);

  useEffect(() => {
    const rewardsKeys = getUnlockedRewards(); // استرجاع المفاتيح من localStorage
    const fullRewards = getRewardsDisplay(rewardsKeys); // تحويل المفاتيح إلى بيانات كاملة
    const last =
      fullRewards.length > 0 ? fullRewards[fullRewards.length - 1] : null;
    setLastReward(last);
  }, []);

  // const { t } = useTranslation();

  if (!lastReward) {
    return (
      <div
        style={{
          marginBottom: "40px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>🏆 {t("current_reward")}</h3>
        <p> {t("no_rewards")}.</p>
      </div>
    );
  }

  const { reward, icon, image } = lastReward;

  return (
    <div
      style={{
        marginBottom: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>🏆 {t("current_reward")}</h3>
      <motion.div
        initial={{ scale: 5, opacity: 0.2 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
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
            alt={reward[language]}
            style={{
              width: imageSize,
              height: imageSize,
              objectFit: "contain",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        ) : (
          <motion.span
            style={{ fontSize: fontSize }}
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
          {reward[language]}
        </span>
      </motion.div>
    </div>
  );
};

export default CurrentReward;
