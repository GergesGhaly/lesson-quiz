import React from "react";
import GlowingScore from "./GlowingScore";
import CountdownCircle from "./CountdownCircle";

const PlayersHeader = ({ room, player1Points, player2Points, countdown }) => {
  const isDraw = player1Points === player2Points;

  return (
    <div
      style={{
        display: "flex ",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        position: "absolute",
        top: "0px",
        left: "0px",
        padding: "5px 20px",
        zIndex: "9999",
        backgroundColor: "#0000003e",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {/* Player 1 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          <img
            style={{ width: 45, height: 45, borderRadius: "50%" }}
            src={room.player1Avatar}
            alt=""
          />
          <h5>{room.player1}</h5>
        </div>

        <GlowingScore
          score={player1Points}
          highlight={!isDraw && player1Points > player2Points}
        />
      </div>

      {/* Countdown */}
      <CountdownCircle totalTime={countdown} />

      {/* Player 2 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <GlowingScore
          score={player2Points}
          highlight={!isDraw && player2Points > player1Points}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          <img
            style={{ width: 45, height: 45, borderRadius: "50%" }}
            src={room.player2Avatar}
            alt=""
          />
          <h5>{room.player2 || "Waiting..."}</h5>
        </div>
      </div>
    </div>
  );
};

export default PlayersHeader;
