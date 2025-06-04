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

// لو تستخدم React Router:
// import { useNavigate, useLocation } from "react-router-dom";

const StartMatch = () => {
  const playerName = localStorage.getItem("playerName");
  const playerId = localStorage.getItem("playerId");
  const navigate = useNavigate(); // لعمل إعادة توجيه

  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  // لو تستخدم React Router لتتبع تغيير المسار
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    let roomRefCleanup = null;
    let currentRoomId = null;

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

            // إعداد onDisconnect للاعب 1
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

                // إعداد onDisconnect للاعب 2
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

              // إعداد onDisconnect للاعب 1
              onDisconnect(ref(db, `rooms/${newRoomRef.key}`)).remove();

              joinedRoom = { id: newRoomRef.key, ...newRoomData };
            }
          }
        }

        currentRoomId = joinedRoom.id;
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
            room && // room موجود للتأكد
            room.status !== "closed"
          ) {
            alert("اللاعب الآخر قام بالخروج");
            navigate("/"); // إعادة توجيه للصفحة الرئيسية
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

    joinOrCreateRoom();

    // عند الخروج من الصفحة (إغلاق التبويب، تحديث، تغيير المسار خارج التطبيق)
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

    window.addEventListener("beforeunload", handleUnload);

    // لو تريد تتابع تغيير المسار داخلياً مع React Router (اختياري)
    // const unlisten = navigate.listen(() => {
    //   handleUnload();
    // });

    return () => {
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

      if (roomRefCleanup) roomRefCleanup();

      window.removeEventListener("beforeunload", handleUnload);

      // لو استخدمت React Router
      // unlisten();
    };
  }, [playerName, playerId]);

  if (loading || !room || room.status === "waiting") {
    return <WatingRoom player1={room?.player1} player2={room?.player2} />;
  }

  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Room ID: {room.id}</h2>
      <p>Player 1: {room.player1}</p>
      <p>Player 2: {room.player2 || "Waiting for player 2..."}</p>
      <p>Status: {room.status}</p>

      {gameStarted && (
        <div style={{ marginTop: 20, color: "green", fontWeight: "bold" }}>
          🎮 Game Started!
        </div>
      )}
    </div>
  );
};

export default StartMatch;
