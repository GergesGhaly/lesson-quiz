import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import reawrd from "../assets/Eternal all.png";
import getAllRewardsSound from "/sound/getAllReawrds.mp3";
import { useSound } from "../contexts/SoundContext";

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const GetsAllRewards = ({ onClose }) => {
  const { isSoundOn } = useSound();
  const audioRef = useRef(null);
  const [showShine, setShowShine] = useState(false);

  useEffect(() => {
    // تشغيل الصوت عند الدخول
    if (isSoundOn) {
      audioRef.current = new Audio(getAllRewardsSound);
      audioRef.current.play().catch((err) => {
        console.warn("فشل تشغيل صوت النصر:", err);
      });
    }

    // تفعيل اللمعان بعد 6 ثوانٍ
    const timer = setTimeout(() => {
      setShowShine(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isSoundOn]);

  return (
    <motion.div
      onClick={onClose}
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        height: "100dvh",
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999999,
        cursor: "pointer",
      }}
    >
      <motion.div
        variants={{
          initial: { scale: 0.8, opacity: 0 },
          animate: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              duration: 1,
            },
          },
        }}
        style={{ position: "relative", display: "inline-block" }}
      >
        {/* الصورة */}
        <img
          src={reawrd}
          alt="Victory"
          style={{
            width: "auto",
            maxHeight: "90dvh",
            objectFit: "contain",
            borderRadius: "12px",
            display: "block",
          }}
        />

        {/* تأثير اللمعان */}
        {showShine && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "150%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(120deg, transparent 45%, rgba(255,255,255,0.6) 50%, transparent 55%)",
              pointerEvents: "none",
              zIndex: 2,
              mixBlendMode: "screen",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default GetsAllRewards;
