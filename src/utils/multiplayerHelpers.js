import {
  ref,
  get,
  set,
  update,
  onDisconnect,
  onValue,
} from "firebase/database";
import { db } from "./firebase";

export const generateRoomId = () => {
  const length = 5;
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
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

export const createRoom = async (playerName, playerId, avatar) => {
  const roomId = await createUniqueRoomId();
  const roomRef = ref(db, `rooms/${roomId}`);
  const playerRef = ref(db, `rooms/${roomId}/players/${playerId}`);

  const newRoom = {
    status: "waiting",
    createdAt: Date.now(),
    players: {
      [playerId]: {
        name: playerName,
        points: 0,
        isCreator: true,
        avatar,
      },
    },
  };

  await set(roomRef, newRoom);

  // ✅ تأكد أن الاتصال جاهز
  await get(playerRef); // يجبر الاتصال أن يكون نشطًا قبل onDisconnect

  // ✅ الآن onDisconnect مؤكد يعمل
  onDisconnect(playerRef).remove();

  return { id: roomId, ...newRoom };
};

export const joinAvailableRoom = async (playerName, playerId, avatar) => {
  const roomsRef = ref(db, "rooms");
  const snapshot = await get(roomsRef);
  const rooms = snapshot.val();

  for (const id in rooms) {
    const room = rooms[id];
    const players = room.players || {};

    if (
      (room.status === "waiting" || room.status === "ready") &&
      !players[playerId] &&
      Object.keys(players).length < 4
    ) {
      const roomRef = ref(db, `rooms/${id}`);
      const updatedPlayers = {
        ...players,
        [playerId]: {
          name: playerName,
          avatar,
        },
      };

      const newStatus =
        Object.keys(updatedPlayers).length > 1 ? "ready" : "waiting";

      await update(roomRef, {
        players: updatedPlayers,
        status: newStatus,
      });

      onDisconnect(ref(db, `rooms/${id}/players/${playerId}`)).remove();

      return {
        id,
        players: updatedPlayers,
        status: newStatus,
        createdAt: room.createdAt,
      };
    }
  }

  return null;
};

// export const createRoom = async (playerName, playerId, player1Avatar) => {
//   const roomId = await createUniqueRoomId();
//   const roomRef = ref(db, `rooms/${roomId}`);
//   const newRoom = {
//     player1: playerName,
//     player1Avatar: player1Avatar,
//     player1Id: playerId,
//     player2: null,
//     player2Id: null,
//     status: "waiting",
//     createdAt: Date.now(),
//   };
//   await set(roomRef, newRoom);
//   onDisconnect(roomRef).remove();
//   return { id: roomId, ...newRoom, player1Avatar };
// };

// export const joinAvailableRoom = async (
//   playerName,
//   playerId,
//   player2Avatar
// ) => {
//   const roomsRef = ref(db, "rooms");
//   const snapshot = await get(roomsRef);
//   const rooms = snapshot.val();

//   for (const id in rooms) {
//     const room = rooms[id];
//     if (
//       room.status === "waiting" &&
//       !room.player2Id &&
//       room.player1Id !== playerId
//     ) {
//       const roomRef = ref(db, `rooms/${id}`);
//       await update(roomRef, {
//         player2: playerName,
//         player2Id: playerId,
//         player2Avatar: player2Avatar,
//         status: "ready",
//       });
//       onDisconnect(roomRef).remove();
//       return {
//         id,
//         ...room,
//         player2: playerName,
//         player2Id: playerId,
//         player2Avatar,
//       };
//     }
//   }

//   return null;
// };

export const evaluateMatchResult = (points, playerId) => {
  const myScore = points[playerId] || 0;
  const opponentId = Object.keys(points).find((id) => id !== playerId);
  const win = myScore > (points[opponentId] || 0);
  return { score: myScore, isWin: win };
};

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
