"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const sockets_1 = require("./sockets");
const PORT = process.env.PORT || 5000;
async function startServer() {
    await (0, db_1.connectDB)();
    const httpServer = http_1.default.createServer(app_1.default);
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"]
        }
    });
    (0, sockets_1.initializeSocket)(io);
    httpServer.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}
startServer();
