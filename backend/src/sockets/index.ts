import { Server } from "socket.io";
import { registerRoomHandlers } from "./roomHandlers";

export function initializeSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("Socket Connected", socket.id);

    registerRoomHandlers(io, socket);
  });
}