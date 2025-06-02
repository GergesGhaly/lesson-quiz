import React from "react";
import { motion } from "framer-motion";

const RewardZoomModal = ({ imageSrc, altText, onClose, type = "image" }) => {
  if (!imageSrc) return null;

  const shineWrapperStyle = {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
    borderRadius: "15px",
    overflow: "hidden",
    // boxShadow: "0 0 20px gold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const shineOverlayStyle = {
    position: "absolute",
    top: 0,
    left: "-75%",
    width: "50%",
    height: "100%",
    background:
      "linear-gradient(120deg, transparent, rgba(255, 209, 3, 0.178), transparent)", // ذهبي

    transform: "skewX(-20deg)",
    zIndex: 2,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "pointer",
      }}
    >
      {type === "image" ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={shineWrapperStyle}
        >
          <img
            src={imageSrc}
            alt={altText || "reward enlarged"}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "contain",
              zIndex: 1,
            }}
          />
          <motion.div
            style={shineOverlayStyle}
            initial={{ left: "-75%" }}
            animate={{ left: "125%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              // repeat: Infinity,
            }}
          />
        </motion.div>
      ) : (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "150px",
            color: "#fff",
            textShadow: "0 0 15px gold",
            position: "relative",
            zIndex: 1,
          }}
        >
          {imageSrc}
        </motion.span>
      )}
    </div>
  );
};

export default RewardZoomModal;
