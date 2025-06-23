import React, { useState, useEffect } from "react";
import CurrentReward from "./CurrentReward";

const UserCard = React.memo(({  playerName, avatar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#e4d4b892",
        borderRadius: "12px",
        padding: "12px",
        maxWidth: "220px",
        fontFamily: "serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        gap: isMobile ? "3px" : "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          // flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div>
          <img
            style={{ width: 55, height: 55, borderRadius: "50%" }}
            src={avatar}
            alt=""
          />
        </div>
        <div style={{ textAlign: "start" }}>
          <h4>{playerName}</h4>
          {/* <h5>{totalPoints} 💰</h5> */}
        </div>
      </div>

      {/* <div
        style={{
          // marginTop: "10px",
          zIndex: 9999,
          // bottom: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // gap: "5px",
        }}
      >
        <div>
          <CurrentReward
            imageSize={isMobile ? 50 : 100}
            fontSize={isMobile ? 30 : 50}
            title={false}
          />
        </div>
      </div> */}
    </div>
  );
});

export default UserCard;
