import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import vs from "./assets/vs.avif";
import { motion } from "framer-motion";

const WatingRoom = ({ player1, player2 }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dotTransition = {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* الكرت الأول للاعب الذي أنشأ الغرفة */}
      <UserCard playerName={player1}  />

      {/* صورة VS */}
      <div style={{ width: "100px" }}>
        <img src={vs} style={{ width: "100%" }} alt="vs" />
      </div>

      {/* الكرت الثاني: لاعب آخر أو أنيميشن انتظار */}
      {player2 ? (
        <UserCard playerName={player2} />
      ) : (
        <div
          style={{
            width: "200px",
            height: "150px",
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
          في انتظار الخصم
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
  );
};

export default WatingRoom;
