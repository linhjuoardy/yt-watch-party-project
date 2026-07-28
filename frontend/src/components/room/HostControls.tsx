import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";

import socket from "../../lib/socket";

interface HostControlsProps {
  roomCode: string;
}

export default function HostControls({
  roomCode,
}: HostControlsProps) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleChangeVideo = () => {
    if (!videoUrl.trim()) return;

    let videoId = "";

    try {
      const url = new URL(videoUrl);

      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.slice(1);
      } else {
        videoId = url.searchParams.get("v") || "";
      }
    } catch {
      videoId = videoUrl;
    }

    if (!videoId) return;

    socket.emit("change-video", {
      roomCode,
      videoId,
    });

    setVideoUrl("");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "20px",
        alignItems: "center",
      }}
    >
      <Input
        placeholder="YouTube URL or Video ID"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <Button onClick={handleChangeVideo}>
        Change Video
      </Button>
    </div>
  );
}