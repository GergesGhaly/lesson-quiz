import React from "react";
import falg from "../assets/rewardsFlags/8.avif";
import CurrentReward from "./CurrentReward";
const UserCard = React.memo( ({
  totalPoints = 240,
  currentReward = {},
  pastRewards = [],
  playerName,
}) => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#e4d4b892",
        borderRadius: "12px",
        padding: "15px",
        width: "220px",
        // height: "350px",
        fontFamily: "serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        gap: "10px",
      }}
    >
      <h4>🏆 Total Points: {totalPoints}</h4>
      <div>
        {/* <img src={falg} style={{ width: "80%", objectFit: "cover" }} alt="" /> */}
        {/* <div
          style={{
            position: "absolute",

            top: "60px",
            left: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // width: "100%",
            zIndex: 9999,
          }}
        >
          <ul
            style={{
              textAlign: "left",
            }}
          >
            {pastRewards.map((reward, index) => (
              <li key={index}>✅</li>
            ))}
          </ul>
        </div> */}
      </div>

      <div
        style={{
          marginTop: "10px",
          zIndex: 9999,

          bottom: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {/* <h1 style={{ fontSize: "40px", zIndex: 9999 }}>🏆</h1> */}
        <div>
          {/* <h5>{currentReward.name}</h5> */}
          <CurrentReward imageSize={100} fontSize={50} />
          <h5>{playerName}</h5>
        </div>
      </div>
    </div>
  );
})

export default UserCard;
