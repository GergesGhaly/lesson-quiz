import {
  ref,
  get,
  set,
  update,
  onDisconnect,
} from "firebase/database";
import { db } from "./firebase";

export const generateRoomId = (length = 6) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

export const createUniqueRoomId = async () => {
  let id, exists;
  do {
    id = generateRoomId();
    const snapshot = await get(ref(db, `rooms/${id}`));
    exists = snapshot.exists();
  } while (exists);
  return id;
};

export const createRoom = async (playerName, playerId, player1Avatar) => {
  const roomId = await createUniqueRoomId();
  const roomRef = ref(db, `rooms/${roomId}`);
  const newRoom = {
    player1: playerName,
    player1Avatar: player1Avatar,
    player1Id: playerId,
    player2: null,
    player2Id: null,
    status: "waiting",
    createdAt: Date.now(),
  };
  await set(roomRef, newRoom);
  onDisconnect(roomRef).remove();
  return { id: roomId, ...newRoom, player1Avatar };
};

export const joinAvailableRoom = async (
  playerName,
  playerId,
  player2Avatar
) => {
  const roomsRef = ref(db, "rooms");
  const snapshot = await get(roomsRef);
  const rooms = snapshot.val();

  for (const id in rooms) {
    const room = rooms[id];
    if (room.status === "waiting" && !room.player2Id) {
      const roomRef = ref(db, `rooms/${id}`);
      await update(roomRef, {
        player2: playerName,
        player2Id: playerId,
        player2Avatar: player2Avatar,
        status: "ready",
      });
      onDisconnect(roomRef).remove();
      return {
        id,
        ...room,
        player2: playerName,
        player2Id: playerId,
        player2Avatar,
      };
    }
  }

  return null;
};

// export const finalizeRoom = async (roomId) => {
//   const roomRef = ref(db, `rooms/${roomId}`);
//   await update(roomRef, { status: "closed" });
// };


export const finalizeRoom = async (roomId) => {
  const roomRef = ref(db, `rooms/${roomId}`);
  const snapshot = await get(roomRef);
  const roomData = snapshot.val();

  // إذا لم توجد الغرفة أو كانت منتهية بالفعل، لا تفعل شيئًا
  if (!roomData || roomData.status === "ended") return;

  await update(roomRef, { status: "ended" });
};


export const getPlayerPoints = async (roomId) => {
  const pointsSnap = await get(ref(db, `rooms/${roomId}/playerPoints`));
  return pointsSnap.exists() ? pointsSnap.val() : {};
};
