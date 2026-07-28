import dotenv from "dotenv";

dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app";
import { connectDB } from "./config/db";
import { initializeSocket } from "./sockets";

const PORT = process.env.PORT || 5000;

async function startServer() {

    await connectDB();

    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

    initializeSocket(io);

    httpServer.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });

}

startServer();
