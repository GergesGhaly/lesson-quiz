// src/components/RewardPopup.jsx
import React, { useEffect } from "react";

const RewardPopup = ({ reward, onClose }) => {
  useEffect(() => {
    if (reward) {
      const audio = new Audio("/sound/new-level.mp3");
      audio.play().catch((err) => {
        console.warn("فشل تشغيل الصوت:", err);
      });
    }
  }, [reward]);

  if (!reward) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 15,
          textAlign: "center",
          maxWidth: 300,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 40 }}>{reward.reward}</div>
        <h4 style={{ margin: "15px 0" }}>لقد حصلت على مكافأة جديدة!</h4>
        <button
          onClick={onClose}
          style={{
            marginTop: 8,
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          حسناً
        </button>
      </div>
    </div>
  );
};

export default RewardPopup;
