"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("../models/Room"));
class RoomManager {
    async createRoom(roomCode, videoId, hostId) {
        return Room_1.default.create({
            roomCode,
            videoId,
            hostId,
        });
    }
    async getRoom(roomCode) {
        return Room_1.default.findOne({
            roomCode,
        });
    }
    async deleteRoom(roomCode) {
        return Room_1.default.deleteOne({
            roomCode,
        });
    }
}
exports.default = RoomManager;
