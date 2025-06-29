import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion"; // ✅ استيراد framer-motion
import { useUser } from "./hooks/useUser";
import boy1 from "./assets/players/boy1.avif";
import boy2 from "./assets/players/boy2.avif";
import deacon from "./assets/players/deacon.jpg";
import girl1 from "./assets/players/girl1.jpg";
import girl2 from "./assets/players/girl2.avif";
import girl3 from "./assets/players/girl3.avif";
import man from "./assets/players/man.jpg";
import woman from "./assets/players/woman.jpg";

const generatePlayerId = () => {
  return "player_" + Math.random().toString(36).substr(2, 9);
};

const avatarOptions = [boy1, boy2, girl1, girl2, girl3, deacon, man, woman];

const PlayerDataUi = () => {
  const { setUser } = useUser();

  const [playerName, setPlayerName] = useState(
    localStorage.getItem("playerName") || ""
  );
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedAvatar = localStorage.getItem("playerAvatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
      const index = avatarOptions.findIndex(
        (avatar) => avatar === storedAvatar
      );
      setClickedIndex(index);
    }
  }, []);
  const handleSave = () => {
    if (playerName.length > 6) {
      setErrorMessage("اختر اسم أقصر");
      return;
    }

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

    setUser({
      userId: playerId,
      name: playerName,
      avatar: selectedAvatar,
    });

    // ✅ تحديد المسار حسب المكان السابق
    const from = location.state?.from || location.pathname;
    if (from === "/profile") {
      navigate("/profile");
    } else {
      navigate("/ChoosMatchMood");
    }
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
        placeholder="Choose a name with fewer 6 letters"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "100%",
          maxWidth: "300px",
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
