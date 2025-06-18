import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, onValue, ref } from "./utils/firebase";
import {
  createRoom,
  joinAvailableRoom,
  finalizeRoom,
  getPlayerPoints,
  evaluateMatchResult,
} from "./utils/multiplayerHelpers";

import WatingRoom from "./WatingRoom";
import MatchResultModal from "./MatchResultModal";
import CountdownCircle from "./components/CountdownCircle";
import Home from "./Home";
import useCountdown from "./hooks/useCountdown";
import useRoom from "./hooks/useRoom";
import LoadingScreen from "./LoadingScreen";
import usePlayerPoints from "./hooks/usePlayerPoints";
import GlowingScore from "./components/GlowingScore";
import PlayersHeader from "./components/PlayersHeader";
import { get, update } from "firebase/database";
import CountdownTimerBeforeMatchStart from "./components/CountdownTimerBeforeMatchStart";
import { useTranslation } from "react-i18next";
import { getQuizResults, saveQuizResults } from "./utils/localStorageHelpers";

const StartMatch = () => {
  const { t } = useTranslation();

  const playerName = localStorage.getItem("playerName");
  const playerId = localStorage.getItem("playerId");
  const playerAvatar = localStorage.getItem("playerAvatar");
  const gameType = localStorage.getItem("matchType");

  const navigate = useNavigate();
  const [showCountdown, setShowCountdown] = useState(false);

  const [gameEnded, setGameEnded] = useState(false);

  const [result, setResult] = useState({ show: false, isWin: false, score: 0 });
  const [loading, setLoading] = useState(true);
  // const [roomId, setRoomId] = useState(null);
  const [roomId, setRoomId] = useState(() => {
    const storedRoomId = localStorage.getItem("roomId");
    return storedRoomId || null;
  });

  const { room, setRoom, gameStarted, setGameStarted, handleUnload } = useRoom(
    roomId,
    playerId,
    navigate
  );

  const playerPoints = usePlayerPoints(room?.id);
  const player1Id = room?.player1Id;
  const player2Id = room?.player2Id;

  const player1Points = playerPoints?.[player1Id] || 0;
  const player2Points = playerPoints?.[player2Id] || 0;
  // const isDraw = player1Points === player2Points;

  const countdown = useCountdown(gameStarted, () => endGame());

  const watchRoom = (roomId) => {
    const roomRef = ref(db, `rooms/${roomId}`);
    return onValue(roomRef, (snap) => {
      const updatedRoom = snap.val();
      if (!updatedRoom) return setRoom(null);
      if (updatedRoom.status === "closed") {
        // alert("تم إغلاق الغرفة");
        // navigate("/");

        return;
      }

      if (updatedRoom.status === "countdown") {
        setShowCountdown(true);
      }

      if (updatedRoom.status === "ended") {
        endGame(); // سيتم استدعاؤها مرة واحدة لكل لاعب عند تحديث الحالة إلى "ended"
        return;
      }

      setRoom({ id: roomId, ...updatedRoom });

      // الحل هنا: تحديث gameStarted إذا بدأت المباراة
      if (
        updatedRoom.status === "started" &&
        updatedRoom.player1 &&
        updatedRoom.player2 &&
        updatedRoom.player1Id !== updatedRoom.player2Id
      ) {
        setGameStarted(true);
        setShowCountdown(false); // تأكيد إضافي لإخفاء شاشة العداد
      }
    });
  };

  const hasStarted = useRef(false);

  const startGameFlow = async () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    setLoading(true);
    try {
      let joinedRoom;

      if (gameType === "create") {
        joinedRoom = await createRoom(playerName, playerId, playerAvatar);
      } else if (gameType === "join_friend") {
        const roomRef = ref(db, `rooms/${roomId}`);
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
          const roomData = snapshot.val();
          joinedRoom = { id: roomId, ...roomData };
        } else {
          throw new Error("Room not found");
        }
      } else {
        joinedRoom = await joinAvailableRoom(
          playerName,
          playerId,
          playerAvatar
        );
      }

      if (!joinedRoom) return;
      setRoom(joinedRoom);
      setRoomId(joinedRoom.id);
      watchRoom(joinedRoom.id);
    } catch (e) {
      console.error(e);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const endGame = async () => {
    if (gameEnded) return; // لا تكرر التنفيذ
    setGameEnded(true);

    const points = await getPlayerPoints(room.id);
    const resultData = evaluateMatchResult(points, playerId);
    setResult({ show: true, ...resultData });



      // حساب النقاط الجديدة بناءً على الفوز أو الخسارة
  const finalScore = resultData.isWin ? resultData.score * 2 : resultData.score;

    const existingResults = getQuizResults();
    const updatedResults = [...existingResults, finalScore];
    saveQuizResults(updatedResults);

    // if (result.isWin) {
    //   // updateLocalResults(newScore)*2;
    // } else {
    //   // updateLocalResults(newScore);
    // }
  };

  useEffect(() => {
    startGameFlow();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleCountdownComplete = async () => {
    try {
      await update(ref(db, `rooms/${room.id}`), {
        status: "started",
      });
      setShowCountdown(false); // إخفاء واجهة العداد بعد انتهاءه
    } catch (error) {
      console.error("Error starting match:", error);
    }
  };

  if (loading) return <LoadingScreen progress={loading} />;

  if (!room)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          fontSize: "20px",
          width: "100%",
          textAlign: "center",
          gap: "10px",
        }}
      >
        <h5>{t("Room_not_found")}</h5>
        <Link to="/">{t("home")}</Link>
      </div>
    );

  if (showCountdown && !gameStarted) {
    return (
      <CountdownTimerBeforeMatchStart
        totalTime={5}
        onComplete={handleCountdownComplete}
      />
    );
  }

  if (!gameStarted) {
    return (
      <WatingRoom
        {...room}
        playerName={playerName}
        roomId={roomId}
        // setGameStarted={setGameStarted}
      />
    );
  }

  return (
    <div>
      {gameStarted && countdown !== null && (
        <PlayersHeader
          room={room}
          player1Points={player1Points}
          player2Points={player2Points}
          countdown={countdown}
        />
      )}

      {gameStarted && (
        <Home
          match={true}
          playerId={playerId}
          roomId={room.id}
          countdown={countdown}
        />
      )}

      {gameEnded && result.show && (
        <MatchResultModal
          roomId={room.id}
          isWin={result.isWin}
          score={result.score}
          readyToShow={true}
        />
      )}
    </div>
  );
};

export default StartMatch;
