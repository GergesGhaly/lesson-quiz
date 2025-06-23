import React from "react";
import GlowingScore from "./GlowingScore";
import CountdownCircle from "./CountdownCircle";
import PlayerItem from "./PlayerItem";

// مكون رئيسي لعرض اللاعبين والتايمر
const PlayersHeader = ({ countdown, players = {}, playerPoints = {} }) => {
  const playerEntries = Object.entries(players);
  const [firstTwo, extraPlayers] = [
    playerEntries.slice(0, 2),
    playerEntries.slice(2),
  ];

  const scores = Object.values(playerPoints);
  const maxScore = Math.max(...scores, 0);
  const isTie = scores.filter((score) => score === maxScore).length > 1;

  const shouldHighlight = (score) => !isTie && score === maxScore;

  return (
    <>
      <TopBar
        players={firstTwo}
        playerPoints={playerPoints}
        countdown={countdown}
        shouldHighlight={shouldHighlight} // ✅ اسم صحيح
      />

      {extraPlayers.length > 0 && (
        <BottomBar
          players={extraPlayers}
          playerPoints={playerPoints}
          shouldHighlight={shouldHighlight} // ✅ اسم صحيح
        />
      )}
    </>
  );
};

// ✅ الشريط العلوي للاعبين الأساسيين + التايمر
// ✅ الشريط العلوي للاعبين الأساسيين + التايمر
const TopBar = ({ players, playerPoints, countdown, shouldHighlight }) => {
  const [p1, p2] = players;
  const p1Id = p1?.[0],
    p1Data = p1?.[1];
  const p2Id = p2?.[0],
    p2Data = p2?.[1];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        padding: "5px 20px",
        backgroundColor: "#0000003e",
        color: "white",
        fontWeight: "bold",
      }}
    >
      <PlayerItem
        player={p1Data}
        points={playerPoints[p1Id]}
        highlight={shouldHighlight(playerPoints[p1Id])}
      />
      <CountdownCircle totalTime={countdown} />
      <PlayerItem
        player={p2Data}
        points={playerPoints[p2Id]}
        highlight={shouldHighlight(playerPoints[p2Id])}
      />
    </div>
  );
};

// ✅ الشريط السفلي للاعبين الإضافيين
const BottomBar = ({ players, playerPoints, shouldHighlight }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: "8px 20px",
      backgroundColor: "#0000003e",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      color: "white",
    }}
  >
    {players.map(([id, player]) => (
      <PlayerItem
        key={id}
        player={player}
        points={playerPoints[id] || 0}
        highlight={shouldHighlight(playerPoints[id] || 0)}
        small
      />
    ))}
  </div>
);

export default PlayersHeader;
