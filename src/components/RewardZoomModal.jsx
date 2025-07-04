// components/ImageModal.js
import React from "react";
import { motion } from "framer-motion";

const RewardZoomModal = ({ imageSrc, altText, onClose, type = "image" }) => {
  if (!imageSrc) return null;

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
        zIndex: 9999999,
        cursor: "pointer",
      }}
    >
      {type === "image" ? (
        <motion.img
          src={imageSrc}
          alt={altText || "reward enlarged"}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            maxWidth: "80vw",
            maxHeight: "80vh",
          }}
        />
      ) : (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: "150px",
            color: "#fff",
          }}
        >
          {imageSrc}
        </motion.span>
      )}
    </div>
  );
};

export default RewardZoomModal;
