import { useEffect, useRef, useState } from "react";
import socket from "../../lib/socket";

import Button from "../ui/Button";
import Input from "../ui/Input";

interface Message {
    id: string;
    username: string;
    message: string;
    timestamp: number;
}

interface Props {
    roomCode: string;
    messages?: Message[];
}

export default function ChatPanel({
    roomCode,
    messages = [],
}: Props) {
    const [text, setText] = useState("");

    const bottomRef = useRef<HTMLDivElement>(null);

    const username =
        sessionStorage.getItem("username") ?? "Guest";

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    function sendMessage() {
        if (!text.trim()) return;

        socket.emit("send-message", {
            roomCode,
            username,
            message: text,
        });

        setText("");
    }

    return (
        <div>
            <h3>Chat</h3>

            <div
                style={{
                    height: 300,
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    padding: 10,
                    marginBottom: 10,
                }}
            >
                {messages.map((msg) => (
                    <div key={msg.id} style={{ marginBottom: 10 }}>
                        <strong>{msg.username}</strong>

                        <p>{msg.message}</p>

                        <small>
                            {new Date(
                                msg.timestamp
                            ).toLocaleTimeString()}
                        </small>
                    </div>
                ))}

                <div ref={bottomRef} />
            </div>

            <Input
                value={text}
                placeholder="Type a message..."
                onChange={(e) => setText(e.target.value)}
            />

            <Button onClick={sendMessage}>
                Send
            </Button>
        </div>
    );
}