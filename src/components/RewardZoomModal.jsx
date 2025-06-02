// components/ImageModal.js
import React from "react";

const RewardZoomModal = ({ imageSrc, altText, onClose }) => {
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
        zIndex: 9999,
        cursor: "pointer",
      }}
    >
      <img
        src={imageSrc}
        alt={altText || "reward enlarged"}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      />
    </div>
  );
};

export default RewardZoomModal;
