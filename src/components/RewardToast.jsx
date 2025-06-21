import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSound } from "../contexts/SoundContext";
import wrong from "../assets/wrong.avif";
import { Link } from "react-router-dom";

const RewardToast = ({ reward }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || "ar";
  const { isSoundOn } = useSound();

  useEffect(() => {
    if (reward && isSoundOn) {
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
    }
  }, [reward]);

  if (!reward) return null;

  //   const imageAnimation = {
  //     initial: { scale: 5, opacity: 0.2 },
  //     animate: {
  //       scale: 1,
  //       opacity: 1,
  //       transition: { duration: 0.7, ease: "easeOut" },
  //     },
  //   };

  //   const rewardImage =
  //     reward.flag || reward.image || reward.shield || reward.sword || null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          bottom: "2%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999999,
        }}
      >
        <Link to="/profile">
          <motion.div
            className="toast"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#2C3E50",
              color: "white",
              padding: "15px 20px",
              borderRadius: "16px",
              border: "2px solid white",
              minWidth: "260px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* زر الإغلاق */}
            {/* <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              position: "absolute",
              top: "-25px",
              right: "-20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <img
              src={wrong}
              alt="close"
              style={{ width: "60px", height: "60px" }}
            />
          </motion.button> */}

            <h3 style={{ fontSize: "14px", marginBottom: "8px" }}>
              {t("new_reward")}
            </h3>

            {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            {rewardImage ? (
              <motion.img
                src={rewardImage}
                alt={reward.reward[language]}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                }}
                initial="initial"
                animate="animate"
                variants={imageAnimation}
              />
            ) : (
              <motion.div
                style={{ fontSize: 70 }}
                initial="initial"
                animate="animate"
                variants={imageAnimation}
              >
                {reward.icon}
              </motion.div>
            )}
            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
              {reward.reward[language]}
            </p>
          </div> */}
          </motion.div>
        </Link>
      </div>
    </AnimatePresence>
  );
};

export default RewardToast;
