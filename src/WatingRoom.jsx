import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import vs from "./assets/vs.avif";
import { motion } from "framer-motion";
import StartMatchButton from "./components/StartMatchButton";

const WatingRoom = ({
  player1,
  player2,
  roomId,
  playerName,
  avatar1,
  avatar2,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [showStartButton, setShowStartButton] = useState(false);

  const isHost = playerName === player1;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✨ تأخير عرض زر البدء ثانية واحدة بعد تحقق الشروط
  useEffect(() => {
    let timeout;
    if (roomId && playerName && player2 && isHost) {
      timeout = setTimeout(() => {
        setShowStartButton(true);
      }, 1000); // تأخير 1 ثانية
    } else {
      setShowStartButton(false); // إعادة الإخفاء إن تغيّرت الشروط
    }

    return () => clearTimeout(timeout);
  }, [roomId, playerName, player2, isHost]);

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
        minHeight: "100vh",
        width: "100%",
        gap: isMobile ? "10px" : "20px",
      }}
    >
      {isHost && (
        <h4 style={{ fontSize: isMobile ? "17px" : "19px" }}>
          Room ID: {roomId}
        </h4>
      )}
      <div
        style={{
          // width: "100%",
          // height: "80vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "10px" : "20px",
        }}
      >
        {/* الكرت الأول للاعب الذي أنشأ الغرفة */}
        <UserCard playerName={player1} avatar={avatar1} />

        {/* صورة VS */}
        <div style={{ width: isMobile ? "80px" : "100px" }}>
          <img src={vs} style={{ width: "100%" }} alt="vs" />
        </div>

        {/* الكرت الثاني: لاعب آخر أو أنيميشن انتظار */}
        {player2 ? (
          <UserCard playerName={player2} avatar={avatar2} />
        ) : (
          <div
            style={{
              // width: "200px",
              // height: "150px",
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
              padding: "10px",
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
        )}
      </div>

      {showStartButton && <StartMatchButton roomId={roomId} />}
    </div>
  );
};

export default WatingRoom;
