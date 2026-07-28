import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import Page from "../../components/layout/Page";

export default function Home() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
const [username, setUsername] = useState("");
	
  return (
    <Page>
      <Card>

        <h1>Video Chat</h1>
        

        <Button
    onClick={() => {
    const finalName =
        username.trim() || "Guest";

    sessionStorage.setItem("username", finalName);

    navigate(`/room/${roomCode}`, {
        state: {
            username: finalName,
        },
    });
}}
>
    Create Room
</Button>
<Input
    placeholder="Enter Your Name"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
/>

        <Input
    placeholder="Enter Room Code"
    value={roomCode}
    onChange={(e) => setRoomCode(e.target.value)}
/>

        <Button
   onClick={() => {
    const finalName =
        username.trim() || "Guest";

    sessionStorage.setItem("username", finalName);

    navigate(`/room/${roomCode}`, {
        state: {
            username: finalName,
        },
    });
}}
>
    Join Room
</Button>


      </Card>
    </Page>
  );
}