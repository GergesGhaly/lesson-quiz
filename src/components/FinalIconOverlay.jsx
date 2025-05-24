// src/components/FinalIconOverlay.jsx
import React, { useEffect } from "react";

const FinalIconOverlay = ({ show, icon }) => {
  useEffect(() => {
    if (show) {
      const audio = new Audio("/sound/win.mp3");
      audio.play().catch((err) => {
        console.warn("فشل تشغيل الصوت:", err);
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "230px",
        zIndex: 9999,
        flexDirection: "column",
      }}
    >
      {icon}
    </div>
  );
};

export default FinalIconOverlay;
