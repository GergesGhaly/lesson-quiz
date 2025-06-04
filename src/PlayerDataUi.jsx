import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// دالة لإنشاء معرف فريد بسيط
const generatePlayerId = () => {
  return "player_" + Math.random().toString(36).substr(2, 9);
};

const PlayerDataUi = () => {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!playerName.trim()) {
      alert("يرجى إدخال اسم اللاعب");
      return;
    }

    // حفظ الاسم
    localStorage.setItem("playerName", playerName);

    // التحقق من وجود playerId مسبقًا، أو إنشاؤه
    let playerId = localStorage.getItem("playerId");
    if (!playerId) {
      playerId = generatePlayerId();
      localStorage.setItem("playerId", playerId);
    }

    navigate("/competition");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Player Data</h1>
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default PlayerDataUi;
