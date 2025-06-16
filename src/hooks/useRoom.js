import { useEffect, useState } from "react";
import { db, onValue, ref, remove, update } from "../utils/firebase";

const useRoom = (roomId, playerId, navigate) => {
  const [room, setRoom] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  //   const [result, setResult] = useState({ show: false, isWin: false, score: 0 });

  useEffect(() => {
    if (!roomId) return;

    const roomRef = ref(db, `rooms/${roomId}`);
    const unsubscribe = onValue(roomRef, (snap) => {
      const data = snap.val();
      if (!data) return setRoom(null);
      if (data.status === "closed") {
        // alert("تم إغلاق الغرفة");
        // navigate("/");
      }
      setRoom({ id: roomId, ...data });

      const readyToStart =
        data.status === "started" &&
        data.player1 &&
        data.player2 &&
        data.player1Id !== data.player2Id;
      setGameStarted(readyToStart);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleUnload = () => {
    if (!roomId) return;
    const roomRef = ref(db, `rooms/${roomId}`);
    if (room?.player1Id === playerId) remove(roomRef);
    else update(roomRef, { player2: null, player2Id: null, status: "waiting" });
  };

  return { room, setRoom, gameStarted, setGameStarted, handleUnload };
};

export default useRoom;
