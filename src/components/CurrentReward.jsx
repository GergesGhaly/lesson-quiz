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
    const rewardsKeys = getUnlockedRewards();
    const fullRewards = getRewardsDisplay(rewardsKeys);

    let lastVisualReward = null;
    let lastFlagReward = null;

    // loop from end to start to find the latest matching
    for (let i = fullRewards.length - 1; i >= 0; i--) {
      const reward = fullRewards[i];
      if (!lastVisualReward && (reward.image || reward.icon)) {
        lastVisualReward = reward;
      }
      if (!lastFlagReward && reward.flag) {
        lastFlagReward = reward;
      }
      if (lastVisualReward && lastFlagReward) break;
    }

    setLastReward({
      visual: lastVisualReward,
      flag: lastFlagReward,
    });
  }, []);

  // useEffect(() => {
  //   const rewardsKeys = getUnlockedRewards(); // استرجاع المفاتيح من localStorage
  //   const fullRewards = getRewardsDisplay(rewardsKeys); // تحويل المفاتيح إلى بيانات كاملة
  //   const last =
  //     fullRewards.length > 0 ? fullRewards[fullRewards.length - 1] : null;
  //   setLastReward(last);
  // }, []);

  // const { t } = useTranslation();

  if (!lastReward || (!lastReward.visual && !lastReward.flag)) {
    return (
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h3>🏆 {t("current_reward")}</h3>
        <p>{t("no_rewards")}.</p>
      </div>
    );
  }

  const { visual, flag } = lastReward;
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "40px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>🏆 {t("current_reward")}</h3>

      {visual && (
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
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {/* حاوية مكدسة للشارة والصورة/الأيقونة */}
          <div
            style={{
              width: "100%",
              // height: imageSize,
              // margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {flag && (
              <motion.img
                src={flag.flag}
                alt={flag.reward[language]}
                style={{
                  width: imageSize,

                  objectFit: "contain",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            )}

            {visual.image ? (
              <motion.img
                src={visual.image}
                alt={visual.reward[language]}
                style={{
                  width: imageSize,
                  // height: imageSize,
                  objectFit: "contain",
                  position: "relative",
                  // zIndex: 1,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            ) : (
              <motion.span
                style={{
                  fontSize: fontSize,
                  position: "relative",
                  zIndex: 1,
                  display: "inline-block",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {visual.icon}
              </motion.span>
            )}
          </div>

          <div style={{ marginTop: "8px", fontWeight: "600" }}>
            {visual.reward[language]}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CurrentReward;
