// src/components/CoinAnimation.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import coin from "../assets/coin.avif";

const CoinAnimation = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.5 }}
          animate={{ opacity: 1, y: -20, scale: 1.2 }}
          exit={{ opacity: 0, y: -100, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#ffdb0f",
            pointerEvents: "none",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {/* Animation على صورة العملة فقط */}
          <motion.img
            src={coin}
            alt="coin"
            style={{ width: 80, height: 80 }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1.2, rotate: 360 }}
            exit={{ scale: 0.5, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 10,
              duration: 0.6,
            }}
          />
          <motion.h6
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ fontSize: 30, margin: 0 }}
          >
            +1
          </motion.h6>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoinAnimation;
