import { get, ref, update } from "firebase/database";
import { db } from "../utils/firebase";

const StartMatchButton = ({ roomId }) => {
  const playerId = localStorage.getItem("playerId");

  const handleStartMatch = async () => {
    const roomSnap = await get(ref(db, `rooms/${roomId}`));
    const roomData = roomSnap.val();

    if (!roomData || !roomData.players) return;

    const currentPlayer = roomData.players[playerId];

    if (currentPlayer?.isCreator) {
      await update(ref(db, `rooms/${roomId}`), {
        status: "countdown",
      });
    } else {
      alert("فقط من أنشأ الغرفة يمكنه بدء المباراة.");
    }
  };

  return (
    <button
      onClick={handleStartMatch}
      style={{
        background: "#4CAF50",
        width: "100%",
        maxWidth: "300px",
        color: "white",
        padding: "10px 20px",
        fontSize: "18px",
        marginTop: "20px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
      }}
    >
      ابدأ المباراة
    </button>
  );
};

export default StartMatchButton;
