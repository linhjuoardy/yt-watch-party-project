"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
const roomHandlers_1 = require("./roomHandlers");
function initializeSocket(io) {
    io.on("connection", (socket) => {
        console.log("Socket Connected", socket.id);
        (0, roomHandlers_1.registerRoomHandlers)(io, socket);
    });
}
