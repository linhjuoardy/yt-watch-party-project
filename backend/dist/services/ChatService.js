"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatMessage_1 = __importDefault(require("../models/ChatMessage"));
class ChatService {
    async saveMessage(roomCode, sender, message) {
        return ChatMessage_1.default.create({
            roomCode,
            sender,
            message,
        });
    }
    async getMessages(roomCode) {
        return ChatMessage_1.default.find({
            roomCode,
        }).sort({
            createdAt: 1,
        });
    }
}
exports.default = ChatService;
