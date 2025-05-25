import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ComboMessage = ({ visible, comboNumber }) => {
  const comboSoundRef = useRef(null);

  useEffect(() => {
    comboSoundRef.current = new Audio("/sound/combo.mp3");
  }, []);

  useEffect(() => {
    if (visible) {
      comboSoundRef.current?.play().catch(() => {});
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0.3, y: 20 }}
          animate={{ opacity: 1, y: 0, color: "#ffe600" }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translate(-50%)",
            fontSize: "40px",
            fontWeight: "bold",
            textShadow: "0 0 12px #FFD700",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to bottom, #FFD700, #FFA500)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 8px rgba(255, 215, 0, 0.5)",
              lineHeight: "1.2",
            }}
          >
            Questions
            <br />
            COMBO
            <div
              style={{
                fontSize: "60px",
                marginTop: "-10px",
              }}
            >
              +{comboNumber}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComboMessage;
