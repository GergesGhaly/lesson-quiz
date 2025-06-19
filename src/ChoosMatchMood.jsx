import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import bg from "../src/assets/selectModeBg.jpg";

const MotionLink = motion(Link); // دمج Link مع motion

const ChoosMatchMood = () => {
  const { t } = useTranslation();

  const SlectGameMode = (matchType) => {
    localStorage.setItem("matchType", matchType);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const JoinRoomWithId = () => {};

  const JoinRoundomRoom = () => {};

  const cardStyle = {
    width: isMobile ? "150px" : "200px",
    height: isMobile ? "150px" : "200px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: "1.5",
    borderRadius: "16px",
    backgroundColor: "#f0f0f0",
    fontSize: isMobile ? "14px" : "20px",
    fontWeight: "medium",
    textDecoration: "none",
    color: "#333",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "0.3s",
    cursor: "pointer",
    userSelect: "none",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#fafafa",
        gap: isMobile ? "10px" : "40px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h5
        style={{
          marginBottom: "20px",
          fontSize: "18px",
          color: "white",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        {t("Choose_Match_Mood")}
      </h5>

      <div
        style={{
          display: "flex",
          gap: isMobile ? "15px" : "40px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MotionLink
          onClick={() => SlectGameMode("create")}
          to="/competition"
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1.03 }}
          style={{
            ...cardStyle,
            backgroundColor: "#4CAF50",
            color: "white",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {t("Create_Room")}
        </MotionLink>

        <MotionLink
          onClick={() => SlectGameMode("join_friend")}
          to="/EnterRoomCodePage"
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1.03 }}
          style={{
            ...cardStyle,
            backgroundColor: "#2196F3",
            color: "white",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {t("Join_with_Friend")}
        </MotionLink>

        <MotionLink
          onClick={() => SlectGameMode("join_random")}
          to="/competition"
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1.03 }}
          style={{
            ...cardStyle,
            backgroundColor: "#f39121",
            color: "white",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {t("Join_Random_room")}
        </MotionLink>
      </div>
    </div>
  );
};

export default ChoosMatchMood;
