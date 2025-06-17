import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // ✅ استيراد framer-motion

const generatePlayerId = () => {
  return "player_" + Math.random().toString(36).substr(2, 9);
};

const avatarOptions = [
  "https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-103130.jpg",
  "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg",
  "https://img.freepik.com/premium-photo/3d-cartoon-avatar-man-minimal-3d-character-avatar-profile_652053-2068.jpg",
  "https://img.freepik.com/premium-photo/3d-cartoon-avatar-girl-minimal-3d-character_652053-2350.jpg?w=360",
  "https://img.freepik.com/premium-photo/3d-cartoon-avatar-girl-minimal-3d-character_652053-2338.jpg?w=360",
  "https://thumbs.dreamstime.com/b/d-render-cartoon-avatar-isolated-white-background-icon-ideal-social-media-entertainment-personalization-visuals-364200456.jpg",
];

const PlayerDataUi = () => {
  const [playerName, setPlayerName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSave = () => {
    if (!playerName.trim()) {
      setErrorMessage("يرجى إدخال اسم اللاعب");
      return;
    }

    if (!selectedAvatar) {
      setErrorMessage("يرجى اختيار صورة أفاتار");
      return;
    }

    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerAvatar", selectedAvatar);

    let playerId = localStorage.getItem("playerId");
    if (!playerId) {
      playerId = generatePlayerId();
      localStorage.setItem("playerId", playerId);
    }

    navigate("/ChoosMatchMood");
  };

  return (
    <div
      style={{
        textAlign: "center",
        // marginTop: "50px",
        padding: "25px 15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
      }}
    >
      <h3>Enter Your Name</h3>
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
          // marginBottom: "20px",
          // margin: "20px 0",
        }}
      />

      <h3>Choose Your Avatar</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "15px",
          // margin: "20px 0",
        }}
      >
        {avatarOptions.map((avatar, index) => (
          <motion.img
            key={index}
            src={avatar}
            alt={`avatar-${index}`}
            onClick={() => {
              setSelectedAvatar(avatar);
              setClickedIndex(index);
            }}
            initial={false}
            animate={{
              scale: clickedIndex === index ? 1.1 : 1,
            }}
            whileTap={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border:
                selectedAvatar === avatar
                  ? "4px solid #4CAF50"
                  : "2px solid #ccc",
              cursor: "pointer",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ color: "red", marginBottom: "20px" }}
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "background-color 0.3s ease",
          marginTop: "20px",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default PlayerDataUi;
