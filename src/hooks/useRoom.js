import { useEffect, useState } from "react";
import { db, onValue, ref, remove, update } from "../utils/firebase";

const useRoom = (roomId, playerId, navigate) => {
  const [room, setRoom] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = ref(db, `rooms/${roomId}`);
    const unsubscribe = onValue(roomRef, (snap) => {
      const data = snap.val();
      if (!data) return setRoom(null);
      if (data.status === "closed") {
        // navigate("/") أو أي إجراء آخر
      }

      setRoom({ id: roomId, ...data });

      // ✅ تحديث منطق بدء اللعبة بناءً على عدد اللاعبين
      const playersCount = Object.keys(data.players || {}).length;
      const readyToStart = data.status === "started" && playersCount > 1;
      setGameStarted(readyToStart);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleUnload = () => {
    if (!roomId || !playerId) return;

    const roomRef = ref(db, `rooms/${roomId}`);

    // إذا كان المستخدم داخل قائمة اللاعبين، نحذفه منها
    if (room?.players?.[playerId]) {
      const updatedPlayers = { ...room.players };
      delete updatedPlayers[playerId];

      const playersCount = Object.keys(updatedPlayers).length;
      const newStatus = playersCount > 1 ? "ready" : "waiting";

      if (playersCount === 0) {
        remove(roomRef);
      } else {
        update(roomRef, {
          [`players/${playerId}`]: null,
          status: newStatus,
        });
      }
    }
  };

  return { room, setRoom, gameStarted, setGameStarted, handleUnload };
};

export default useRoom;
