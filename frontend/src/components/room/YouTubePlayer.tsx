import {
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react";

import YouTube from "react-youtube";
import type { YouTubeEvent } from "react-youtube";

import socket from "../../lib/socket";

export interface YouTubePlayerRef {
    play: () => void;
    pause: () => void;
    seek: (time: number) => void;
    loadVideo: (videoId: string) => void;
    getCurrentTime: () => number;
}

interface Props {
    videoId: string;
    roomCode: string;
}

const YouTubePlayer = forwardRef<YouTubePlayerRef, Props>(
    ({ videoId, roomCode }, ref) => {
        const playerRef = useRef<any>(null);
        const isRemoteAction = useRef(false);

        useImperativeHandle(ref, () => ({
            play() {
    isRemoteAction.current = true;
    playerRef.current?.playVideo();

    setTimeout(() => {
        isRemoteAction.current = false;
    }, 150);
},

            pause() {
    isRemoteAction.current = true;
    playerRef.current?.pauseVideo();

    setTimeout(() => {
        isRemoteAction.current = false;
    }, 150);
},
seek(time: number) {
    isRemoteAction.current = true;
    playerRef.current?.seekTo(time, true);

    setTimeout(() => {
        isRemoteAction.current = false;
    }, 150);
},

           loadVideo(videoId: string) {
    isRemoteAction.current = true;
    playerRef.current?.loadVideoById(videoId);

    setTimeout(() => {
        isRemoteAction.current = false;
    }, 400);
},

            getCurrentTime() {
                return (
                    playerRef.current?.getCurrentTime() ?? 0
                );
            },
        }));

        return (
            <YouTube
                videoId={videoId || "dQw4w9WgXcQ"}
                opts={{
                    width: "100%",
                    height: "500",
                    playerVars: {
                        autoplay: 0,
                    },
                }}
                onReady={(event: YouTubeEvent) => {
                    playerRef.current = event.target;
                }}
                onPlay={() => {
                    if (isRemoteAction.current) return;
                    if (!playerRef.current) return;

                    socket.emit("video-play", {
                        roomCode,
                        currentTime:
                            playerRef.current.getCurrentTime(),
                    });
                }}
                onPause={() => {
                    if (isRemoteAction.current) return;
                    if (!playerRef.current) return;

                    socket.emit("video-pause", {
                        roomCode,
                        currentTime:
                            playerRef.current.getCurrentTime(),
                    });
                }}
                onStateChange={(event) => {
                    if (isRemoteAction.current) return;
                    if (!playerRef.current) return;

                    // Seeking
                    if (event.data === 3) {
                        socket.emit("video-seek", {
                            roomCode,
                            currentTime:
                                playerRef.current.getCurrentTime(),
                        });
                    }
                }}
            />
        );
    }
);

YouTubePlayer.displayName = "YouTubePlayer";

export default YouTubePlayer;