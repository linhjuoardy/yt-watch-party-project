import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import socket from "../../lib/socket";
import Page from "../../components/layout/Page";

import RoomHeader from "../../components/room/RoomHeader";
import HostControls from "../../components/room/HostControls";
import YouTubePlayer, {
    type YouTubePlayerRef,
} from "../../components/room/YouTubePlayer";
import ParticipantPanel from "../../components/room/ParticipantPanel";
import ChatPanel from "../../components/room/ChatPanel";


export default function Room() {
    const { roomId } = useParams();
    const location = useLocation();

const username =
    location.state?.username ||
    sessionStorage.getItem("username") ||
    "Guest";

    const [participants, setParticipants] = useState<any[]>([]);

    const [roomState, setRoomState] = useState({
        videoId: "",
        currentTime: 0,
        isPlaying: false,
    });

    const [messages, setMessages] = useState<any[]>([]);
    const playerRef = useRef<YouTubePlayerRef>(null);

    useEffect(() => {
        

        sessionStorage.setItem("username", username);

        socket.on("participants", (participants) => {
            setParticipants(participants);
        });

        socket.on("room-state", (state) => {
    setRoomState(state);

    // Wait until the player finishes loading
    setTimeout(() => {
        playerRef.current?.loadVideo(state.videoId);

        setTimeout(() => {
            playerRef.current?.seek(state.currentTime);

            if (state.isPlaying) {
                playerRef.current?.play();
            } else {
                playerRef.current?.pause();
            }
        }, 500);
    }, 100);
});

        socket.on("chat-history", (history) => {
            setMessages(history);
        });

        socket.on("new-message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on("video-play", ({ currentTime }) => {
    setRoomState((prev) => ({
        ...prev,
        currentTime,
        isPlaying: true,
    }));

    playerRef.current?.seek(currentTime);
    playerRef.current?.play();
});

        socket.on("video-pause", ({ currentTime }) => {
    setRoomState((prev) => ({
        ...prev,
        currentTime,
        isPlaying: false,
    }));

    playerRef.current?.seek(currentTime);
    playerRef.current?.pause();
});

        socket.on("video-seek", ({ currentTime }) => {
    setRoomState((prev) => ({
        ...prev,
        currentTime,
    }));

    playerRef.current?.seek(currentTime);
});

       socket.on("video-changed", ({ videoId }) => {
    setRoomState({
        videoId,
        currentTime: 0,
        isPlaying: false,
    });

    playerRef.current?.loadVideo(videoId);

    setTimeout(() => {
        playerRef.current?.seek(0);
        playerRef.current?.pause();
    }, 500);
});
    

        socket.emit("join-room", {
            roomCode: roomId!,
            username,
        });
        socket.on("kicked", () => {
    alert("You have been removed from the room.");
    window.location.href = "/";
});

        return () => {
            socket.off("participants");
            socket.off("room-state");
            socket.off("chat-history");
            socket.off("new-message");
            socket.off("video-play");
            socket.off("video-pause");
            socket.off("video-seek");
            socket.off("video-changed");
            socket.emit("leave-room");
        };
    }, [roomId]);

    return (
        <Page>
            <RoomHeader roomCode={roomId!} />

            <HostControls
    roomCode={roomId!}
/>

            <div className="room-layout">
                <div>
                    <YouTubePlayer
    ref={playerRef}
    roomCode={roomId!}
    videoId={roomState.videoId}
/>
                </div>

                <div className="room-sidebar">
                    <ParticipantPanel
    participants={participants}
    roomCode={roomId!}
    currentUserId={socket.id ?? ""}
/>

                    

                    <ChatPanel
                        roomCode={roomId!}
                        messages={messages}
                    />
                </div>
            </div>
        </Page>
    );
}