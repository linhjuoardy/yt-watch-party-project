export interface Participant {
    socketId: string;
    username: string;
    role: "host" | "moderator" | "viewer";
}

export interface ChatMessage {
    id: string;
    username: string;
    message: string;
    timestamp: number;
    system?: boolean;
}

export interface RoomState {
    roomId: roomCode;

    hostId: string;

    participants: Participant[];

    videoId: string;

    isPlaying: boolean;

    currentTime: number;

    updatedAt: number;

    chat: ChatMessage[];
}

export const rooms = new Map<string, RoomState>();