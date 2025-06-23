import React from "react";
import GlowingScore from "./GlowingScore";

const PlayerItem = ({ player, points = 0, highlight }) => {
  if (!player) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "#ffffff1c",
        borderRadius: "10px",
        padding: "5px 10px",
        flexDirection: "row",
      }}
    >
      <img
        src={player.avatar}
        alt={player.name}
        style={{
          width: 45,
          height: 45,
          borderRadius: "50%",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <h5 style={{ margin: 0, fontSize: "15px" }}>{player.name}</h5>
        <GlowingScore score={points} highlight={highlight} />
      </div>
    </div>
  );
};

export default PlayerItem;
