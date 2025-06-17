import { useEffect, useState } from "react";
import { db, onValue, ref } from "../utils/firebase";

const usePlayerPoints = (roomId) => {
  const [playerPoints, setPlayerPoints] = useState({});

  useEffect(() => {
    if (!roomId) return;

    const pointsRef = ref(db, `rooms/${roomId}/playerPoints`);
    const unsubscribe = onValue(pointsRef, (snapshot) => {
      const points = snapshot.val() || {};
      setPlayerPoints(points);
    });

    return () => unsubscribe();
  }, [roomId]);

  return playerPoints;
};

export default usePlayerPoints;
