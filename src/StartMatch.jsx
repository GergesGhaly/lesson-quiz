import React, { useState } from "react";
import wall from "./assets/startChallengWall.jpg";
import vs from "./assets/vs.png";
import UserCard from "./components/UserCard";

const StartMatch = ({ onStart }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [questionCount, setQuestionCount] = useState(5);

  const handleStart = () => {
    if (player1 && player2) {
      onStart({ player1, player2, questionCount });
    } else {
      alert("يرجى إدخال اسم كلا اللاعبين.");
    }
  };

  return (
    <div
      style={{
        // maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        backgroundImage: `url(${wall})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <UserCard
        totalPoints={15}
        currentReward={{
          name: "Intimidating",
          description:
            "Reduce all item prices by 5 while this hero is in your shop.",
        }}
        pastRewards={["Beginner Medal", "Effort Medal", "Elite Shield"]}
      />

      <img
        src={vs}
        alt="vs"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 999999,
        }}
      />
      <UserCard
        totalPoints={15}
        currentReward={{
          name: "Intimidating",
          description:
            "Reduce all item prices by 5 while this hero is in your shop.",
        }}
        pastRewards={["Beginner Medal", "Effort Medal", "Elite Shield"]}
      />
    </div>
  );
};

export default StartMatch;
