import React, { useEffect, useState } from "react";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  set,
  update,
  push,
  onValue,
  remove,
  onDisconnect,
} from "firebase/database";
import { db } from "./utils/firebase";
import WatingRoom from "./WatingRoom";
import { useNavigate } from "react-router-dom";
import MatchResultModal from "./MatchResultModal";
import Home from "./Home";
import CountdownCircle from "./components/CountdownCircle";

const StartMatch = () => {
  const playerName = localStorage.getItem("playerName");
  const playerId = localStorage.getItem("playerId");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showResult, setShowResult] = useState(false);
  // const [matchResult, setMatchResult] = useState({ isWin: false, score: 0 });
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  const [readyToShow, setReadyToShow] = useState(false);

  let roomRefCleanup = null;

  const finalizeMatch = async () => {
    const roomRef = ref(db, `rooms/${room.id}`);
    await update(roomRef, { status: "closed" });

    try {
      const playerPointsSnap = await get(
        ref(db, `rooms/${room.id}/playerPoints`)
      );
      const playerPoints = playerPointsSnap.exists()
        ? playerPointsSnap.val()
        : {};

      const player1Points = playerPoints[room.player1Id] || 0;
      const player2Points = playerPoints[room.player2Id] || 0;

      const currentPlayerPoints =
        playerId === room.player1Id ? player1Points : player2Points;

      const didWin =
        (playerId === room.player1Id && player1Points > player2Points) ||
        (playerId === room.player2Id && player2Points > player1Points);

      setIsWin(didWin);
      setScore(currentPlayerPoints);
    } catch (err) {
      console.error("خطأ في جلب النقاط:", err);
      setIsWin(false);
      setScore(0);
    } finally {
      setShowResult(true);
    }
  };

  const handleUnload = () => {
    if (room && room.id) {
      const roomRef = ref(db, `rooms/${room.id}`);

      if (room.player1Id === playerId) {
        remove(roomRef).catch(console.error);
      } else if (room.player2Id === playerId) {
        update(roomRef, {
          player2: null,
          player2Id: null,
          status: "waiting",
        }).catch(console.error);
      }
    }
  };

  const joinOrCreateRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const roomsRef = ref(db, "rooms");
      const allRoomsSnapshot = await get(roomsRef);
      let joinedRoom = null;

      if (allRoomsSnapshot.exists()) {
        const rooms = allRoomsSnapshot.val();
        for (const [key, roomData] of Object.entries(rooms)) {
          if (
            roomData.player1Id === playerId ||
            roomData.player2Id === playerId
          ) {
            joinedRoom = { id: key, ...roomData };
            break;
          }
        }
      }

      if (!joinedRoom) {
        const waitingRoomsQuery = query(
          roomsRef,
          orderByChild("status"),
          equalTo("waiting")
        );
        const waitingSnapshot = await get(waitingRoomsQuery);

        if (!waitingSnapshot.exists()) {
          const newRoomRef = push(roomsRef);
          const newRoomData = {
            player1: playerName,
            player1Id: playerId,
            player2: null,
            player2Id: null,
            status: "waiting",
            createdAt: Date.now(),
          };
          await set(newRoomRef, newRoomData);
          onDisconnect(ref(db, `rooms/${newRoomRef.key}`)).remove();
          joinedRoom = { id: newRoomRef.key, ...newRoomData };
        } else {
          const waitingRooms = waitingSnapshot.val();

          for (const [key, roomData] of Object.entries(waitingRooms)) {
            const player2Exists = roomData.player2 && roomData.player2 !== "";
            const isSamePlayerTryingToJoin =
              roomData.player1Id === playerId ||
              roomData.player2Id === playerId;

            if (!player2Exists && !isSamePlayerTryingToJoin) {
              const roomRef = ref(db, `rooms/${key}`);
              await update(roomRef, {
                player2: playerName,
                player2Id: playerId,
                status: "ready",
              });
              onDisconnect(roomRef).update({
                player2: null,
                player2Id: null,
                status: "waiting",
              });
              joinedRoom = {
                id: key,
                ...roomData,
                player2: playerName,
                player2Id: playerId,
                status: "ready",
              };
              break;
            }
          }

          if (!joinedRoom) {
            const newRoomRef = push(roomsRef);
            const newRoomData = {
              player1: playerName,
              player1Id: playerId,
              player2: null,
              player2Id: null,
              status: "waiting",
              createdAt: Date.now(),
            };
            await set(newRoomRef, newRoomData);
            onDisconnect(ref(db, `rooms/${newRoomRef.key}`)).remove();
            joinedRoom = { id: newRoomRef.key, ...newRoomData };
          }
        }
      }

      setRoom(joinedRoom);
      const roomRef = ref(db, `rooms/${joinedRoom.id}`);
      roomRefCleanup = onValue(roomRef, (snapshot) => {
        const updatedRoom = snapshot.val();

        if (!updatedRoom) {
          setRoom(null);
          setGameStarted(false);
          return;
        }

        if (
          updatedRoom.status === "closed" &&
          room &&
          room.status !== "closed"
        ) {
          alert("اللاعب الآخر قام بالخروج");
          navigate("/");
          return;
        }

        setRoom({ id: joinedRoom.id, ...updatedRoom });

        const bothPlayersReady =
          updatedRoom.status === "ready" &&
          updatedRoom.player1 &&
          updatedRoom.player2 &&
          updatedRoom.player1Id !== updatedRoom.player2Id;

        setGameStarted(bothPlayersReady);
      });
    } catch (err) {
      setError("Failed to join or create room.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    joinOrCreateRoom();
    window.addEventListener("beforeunload", handleUnload);

    let unlisten = null;
    if (typeof navigate.listen === "function") {
      unlisten = navigate.listen(() => {
        handleUnload();
      });
    }

    return () => {
      handleUnload();
      if (roomRefCleanup) roomRefCleanup();
      window.removeEventListener("beforeunload", handleUnload);
      if (typeof unlisten === "function") unlisten();
    };
  }, [playerName, playerId, navigate]);

  useEffect(() => {
    if (gameStarted && room?.id) {
      setCountdown(60);

      // 🟢 إعداد النقاط الأولية لكل لاعب = 0
      const pointsRef = ref(db, `rooms/${room.id}/playerPoints`);
      get(pointsRef).then((snapshot) => {
        const points = snapshot.val() || {};
        const updates = {};
        if (!(room.player1Id in points)) updates[room.player1Id] = 0;
        if (!(room.player2Id in points)) updates[room.player2Id] = 0;

        if (Object.keys(updates).length > 0) {
          update(pointsRef, updates).catch(console.error);
        }
      });

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            finalizeMatch();
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, room?.id]);

  useEffect(() => {
    if (!room?.id || !playerId) return;

    const pointsRef = ref(db, `rooms/${room?.id}/playerPoints`);

    const unsubscribe = onValue(pointsRef, (snapshot) => {
      const pointsData = snapshot.val();
      if (!pointsData) return;

      const playerScore = pointsData[playerId] || 0;
      const otherPlayerId = Object.keys(pointsData).find(
        (id) => id !== playerId
      );

      // انتظر إلى أن تكون بيانات الخصم متوفرة
      if (!otherPlayerId || !(otherPlayerId in pointsData)) return;

      const otherScore = pointsData[otherPlayerId];

      setScore(playerScore);
      setIsWin(playerScore > otherScore);
      setTimeout(() => {
        setReadyToShow(true); // ← ثم إظهار المودال بعد وقت قصير
      }, 300); // أعطه وقتًا لتهيئة isWin
    });

    return () => unsubscribe();
  }, [room?.id, playerId]);

  if (loading || !room || room.status === "waiting") {
    return (
      <WatingRoom
        player1={room?.player1}
        player2={room?.player2}
        playerName={playerName}
      />
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 20px",
      }}
    >
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p>Player 1</p>
            <p> {room.player1}</p>
          </div>

          <CountdownCircle totalTime={countdown} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p>Player 2</p>
            <p> {room.player2 || "Waiting for player 2..."}</p>
          </div>
        </div>
      )}

      {gameStarted && (
        <div style={{ color: "green", fontWeight: "bold" }}>
          <Home match={true} playerId={playerId} roomId={room.id} countdown={countdown} />
        </div>
      )}

      {showResult && (
        <MatchResultModal
          // matchResult={matchResult}
          roomId={room.id}
          // playerId={playerId}
          isWin={isWin}
          score={score}
          readyToShow={readyToShow}
        />
      )}
    </div>
  );
};

export default StartMatch;
