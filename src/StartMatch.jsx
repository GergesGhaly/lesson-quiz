import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, onValue, ref } from "./utils/firebase";
import {
  createRoom,
  joinAvailableRoom,
  finalizeRoom,
  getPlayerPoints,
} from "./utils/multiplayerHelpers";

import WatingRoom from "./WatingRoom";
import MatchResultModal from "./MatchResultModal";
import CountdownCircle from "./components/CountdownCircle";
import Home from "./Home";
import useCountdown from "./hooks/useCountdown";
import useRoom from "./hooks/useRoom";

const StartMatch = () => {
  const playerName = localStorage.getItem("playerName");
  const playerId = localStorage.getItem("playerId");
  const playerAvatar = localStorage.getItem("playerAvatar");
  const gameType = localStorage.getItem("matchType");

  const navigate = useNavigate();
  const [gameEnded, setGameEnded] = useState(false);

  const [result, setResult] = useState({ show: false, isWin: false, score: 0 });
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState(null);

  const { room, setRoom, gameStarted, setGameStarted, handleUnload } = useRoom(
    roomId,
    playerId,
    navigate
  );
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
      if (updatedRoom.status === "ended") {
        endGame(); // سيتم استدعاؤها مرة واحدة لكل لاعب عند تحديث الحالة إلى "ended"
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
      }
    });
  };

  const startGameFlow = async () => {
    setLoading(true);
    try {
      let joinedRoom;
      if (gameType === "create")
        joinedRoom = await createRoom(playerName, playerId, playerAvatar);
      else
        joinedRoom = await joinAvailableRoom(
          playerName,
          playerId,
          playerAvatar
        );

      if (!joinedRoom) return navigate("/");
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

    await finalizeRoom(room.id);
    const points = await getPlayerPoints(room.id);
    const myScore = points[playerId] || 0;
    const opponentId = Object.keys(points).find((id) => id !== playerId);
    const win = myScore > (points[opponentId] || 0);
    setResult({ show: true, isWin: win, score: myScore });
  };

  useEffect(() => {
    startGameFlow();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  if (!room) return <div>لم يتم العثور على الغرفة</div>;

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
          <div>Player 1: {room.player1}</div>
          <CountdownCircle totalTime={countdown} />
          <div>Player 2: {room.player2 || "Waiting..."}</div>
        </div>
      )}

      {gameStarted && (
        <Home
          match={true}
          playerId={playerId}
          roomId={room.id}
          countdown={countdown}
        />
      )}

      {result.show && (
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
