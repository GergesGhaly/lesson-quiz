// components/CurrentReward.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUnlockedRewards } from "../utils/localStorageHelpers";
import { getRewardsDisplay } from "../utils/rewardUtils";
import { useTranslation } from "react-i18next";
import RewardZoomModal from "./RewardZoomModal";

const CurrentReward = ({ imageSize, fontSize }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "ar";
  const [lastReward, setLastReward] = useState(null);
  // حالة لإظهار المودال مع الصورة المختارة
  const [modalImage, setModalImage] = useState(null);
  const [modalType, setModalType] = useState("image");

  useEffect(() => {
    const rewardsKeys = getUnlockedRewards();
    const fullRewards = getRewardsDisplay(rewardsKeys);
    if (!fullRewards || fullRewards.length === 0) return;

    let lastVisualReward = null;
    let lastFlagReward = null;
    let lastShieldReward = null;
    let lastSwordReward = null;

    for (let i = fullRewards.length - 1; i >= 0; i--) {
      const reward = fullRewards[i];

      if (!lastVisualReward && (reward.image || reward.icon)) {
        lastVisualReward = reward;
      }
      if (!lastFlagReward && reward.flag) {
        lastFlagReward = reward;
      }
      if (!lastShieldReward && reward.shield) {
        lastShieldReward = reward;
      }
      if (!lastSwordReward && reward.sword) {
        lastSwordReward = reward;
      }

      if (
        lastVisualReward &&
        lastFlagReward &&
        lastShieldReward &&
        lastSwordReward
      )
        break;
    }

    setLastReward({
      visual: lastVisualReward,
      flag: lastFlagReward,
      shield: lastShieldReward,
      sword: lastSwordReward,
    });
  }, []);

  if (
    !lastReward ||
    (!lastReward.visual &&
      !lastReward.flag &&
      !lastReward.shield &&
      !lastReward.sword)
  ) {
    return (
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h3>🏆 {t("current_reward")}</h3>
        <p>{t("no_rewards")}.</p>
      </div>
    );
  }

  const { visual, flag, shield, sword } = lastReward;
  return (
    <div
      style={{
        display: "flex",

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
            padding: "10px",

            textAlign: "center",
          }}
        >
          {/* حاوية مكدسة للشارة والصورة/الأيقونة */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {flag && (
              <motion.img
                src={flag.flag}
                alt="flag"
                style={{ width: imageSize, cursor: "pointer" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setModalImage(flag.flag);
                  setModalType("image");
                }}
              />
            )}

            {shield && (
              <motion.img
                src={shield.shield}
                alt="shield"
                style={{ width: imageSize, cursor: "pointer" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setModalImage(shield.shield);
                  setModalType("image");
                }}
              />
            )}

            {sword && (
              <motion.img
                src={sword.sword}
                alt="sword"
                style={{ width: imageSize, cursor: "pointer" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setModalImage(sword.sword);
                  setModalType("image");
                }}
              />
            )}

            {visual?.image ? (
              <motion.img
                src={visual.image}
                alt="visual reward"
                style={{ width: imageSize, cursor: "pointer" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setModalImage(visual.image);
                  setModalType("image");
                }}
              />
            ) : (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: fontSize, cursor: "pointer" }}
                onClick={() => {
                  setModalImage(visual.icon);
                  setModalType("icon");
                }}
              >
                {visual?.icon}
              </motion.span>
            )}
          </div>

          <div style={{ marginTop: "8px", fontWeight: "600" }}>
            {visual.reward[language]}
          </div>
        </motion.div>
      )}
      {/* مودال الصورة */}
      {/* استدعاء المودال */}
      <RewardZoomModal
        imageSrc={modalImage}
        altText="reward enlarged"
        onClose={() => setModalImage(null)}
        type={modalType}
      />
    </div>
  );
};

export default CurrentReward;
