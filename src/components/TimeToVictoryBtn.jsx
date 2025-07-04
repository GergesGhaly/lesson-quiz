import React from "react";
import { motion } from "framer-motion";

const flameAnimation = {
  initial: { scale: 1, boxShadow: "0 0 10px 2px rgba(255, 100, 0, 0.5)" },
  animate: {
    boxShadow: [
      "0 0 10px 2px rgba(255, 100, 0, 0.5)",
      "0 0 25px 10px rgba(255, 150, 0, 0.9)",
      "0 0 10px 2px rgba(255, 100, 0, 0.5)",
    ],
    transition: {
      duration: 1.1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const TimeToVictoryBtn = ({ setShowAllRewards }) => {
  return (
    <motion.button
      onClick={() => setShowAllRewards(true)}
      variants={flameAnimation}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.1 }}
      style={{
        padding: "14px 28px",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        background: "linear-gradient(45deg, #ff6b00, #ff9e00, #ffd000)",
      }}
    >
       Time To Victory 
    </motion.button>
  );
};

export default TimeToVictoryBtn;
