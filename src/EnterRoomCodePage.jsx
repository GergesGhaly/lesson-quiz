import { get, onDisconnect, ref, update } from "firebase/database";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./utils/firebase";
import { useTranslation } from "react-i18next";
import bg from "../src/assets/enterCodeBg.jpg";

const CODE_LENGTH = 5; // عدد خانات الكود

const EnterRoomCodePage = () => {
  const { t } = useTranslation();

  const [codeArray, setCodeArray] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[a-zA-Z0-9_-]?$/.test(value)) return;

    const updatedCode = [...codeArray];
    updatedCode[index] = value;
    setCodeArray(updatedCode);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codeArray[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\s/g, "");
    if (!/^[a-zA-Z0-9_-]+$/.test(pasteData)) return;

    const chars = pasteData.slice(0, CODE_LENGTH).split("");
    const updatedCode = [...codeArray];

    chars.forEach((char, i) => {
      updatedCode[i] = char;
    });

    setCodeArray(updatedCode);

    // نقل المؤشر إلى الحقل التالي بعد آخر حرف تم لصقه
    const nextIndex =
      chars.length < CODE_LENGTH ? chars.length : CODE_LENGTH - 1;
    inputsRef.current[nextIndex]?.focus();
  };

  const fullCode = codeArray.join("").trim().toLowerCase();

  const playerName = localStorage.getItem("playerName");
  const playerId = localStorage.getItem("playerId");

  const handleJoinRoom = async () => {
    setError("");

    if (!fullCode.trim()) {
      setError("يرجى إدخال رمز الغرفة");
      return;
    }

    try {
      const roomRef = ref(db, `rooms/${fullCode}`);
      const snapshot = await get(roomRef);

      if (!snapshot.exists()) {
        setError("الغرفة غير موجودة");
        return;
      }

      const roomData = snapshot.val();

      if (roomData.status === "closed") {
        setError("الغرفة مغلقة");
        return;
      }

      if (roomData.player2Id && roomData.player2Id !== "") {
        setError("الغرفة ممتلئة بالفعل");
        return;
      }

      // تحديث بيانات الغرفة
      await update(roomRef, {
        player2: playerName,
        player2Id: playerId,
        status: "ready",
      });

      // onDisconnect لضمان إزالة اللاعب الثاني عند الخروج المفاجئ
      onDisconnect(roomRef).update({
        player2: null,
        player2Id: null,
        status: "waiting",
      });

      // الذهاب إلى صفحة StartMatch مع roomId
      localStorage.setItem("roomId", fullCode);
      localStorage.setItem("matchType", "join_friend");

      navigate(`/competition`);
      // localStorage.removeItem("roomId");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الانضمام إلى الغرفة");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "20px", fontSize: "18px" }}>
        {t("Enter_Room_Code")}
      </h3>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {codeArray.map((char, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            value={char}
            onPaste={handlePaste} // <-- تمت إضافتها هنا
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            style={{
              width: "45px",
              height: "50px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <button
        onClick={handleJoinRoom}
        style={{
          background: "#4CAF50",
          // width: "100%",
          // maxWidth: "300px",
          color: "white",
          padding: "10px 20px",
          fontSize: "18px",
          marginTop: "20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          // transition: "background-color 0.3s ease",
        }}
      >
        {t("Join_Room")}
      </button>
    </div>
  );
};

export default EnterRoomCodePage;
