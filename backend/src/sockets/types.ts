export interface ConnectedUser {
    socketId: string;
    userId: string;
    username: string;
    roomCode: string;
    role: "host" | "moderator" | "viewer";
}
