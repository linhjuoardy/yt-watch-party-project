import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

interface Props {
  roomCode: string;
}

export default function RoomHeader({ roomCode }: Props) {
  const navigate = useNavigate();

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        <h2>Room: {roomCode}</h2>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Button onClick={copyRoomCode}>
          Copy Code
        </Button>

        <Button onClick={() => navigate("/")}>
          Leave Room
        </Button>
      </div>
    </header>
  );
}
