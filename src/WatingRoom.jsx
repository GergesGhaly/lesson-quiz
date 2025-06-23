import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import vs from "./assets/vs.avif";
import { motion } from "framer-motion";
import StartMatchButton from "./components/StartMatchButton";
import AnimatedInfoDisplay from "./components/AnimatedInfoDisplay";

const MAX_PLAYERS = 4;

const WatingRoom = ({ players = {}, roomId, playerName }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [showStartButton, setShowStartButton] = useState(false);

  const playerEntries = Object.entries(players);
  const playerCount = playerEntries.length;

  // المضيف هو أول من دخل (أول مفتاح في كائن اللاعبين)
  // const hostId = playerEntries[0]?.[0];
  const isHost = playerEntries.some(
    ([_, player]) => player.name === playerName && player.isCreator === true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let timeout;
    if (roomId && playerName && playerCount > 1 && isHost) {
      timeout = setTimeout(() => {
        setShowStartButton(true);
      }, 1000);
    } else {
      setShowStartButton(false);
    }

    return () => clearTimeout(timeout);
  }, [roomId, playerName, playerCount, isHost]);

  const dotTransition = {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        width: "100%",
        gap: isMobile ? "10px" : "20px",
      }}
    >
      {isHost && (
        <h4
          style={{ fontSize: isMobile ? "17px" : "19px", marginBottom: "8px" }}
        >
          Room ID: {roomId}
        </h4>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* عرض كل اللاعبين الحاليين */}
        {playerEntries.map(([id, player]) => (
          <UserCard key={id} playerName={player.name} avatar={player.avatar} />
        ))}

        {/* عرض خانات انتظار حتى يتم الوصول لـ MAX_PLAYERS */}
        {Array.from({ length: MAX_PLAYERS - playerCount }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "130px",
              height: "80px",
              borderRadius: "12px",
              border: "2px dashed #888",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "sans-serif",
              backgroundColor: "#f9f9f9",
              fontSize: "18px",
              color: "#555",
              padding: "12px",
            }}
          >
            في انتظار لاعب
            <motion.div
              style={{
                display: "flex",
                gap: "5px",
                marginTop: "8px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#555",
                    borderRadius: "50%",
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ ...dotTransition, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {showStartButton && <StartMatchButton roomId={roomId}  isHost={isHost}/>}

      <AnimatedInfoDisplay />
    </div>
  );
};

export default WatingRoom;
