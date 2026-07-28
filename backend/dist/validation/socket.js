"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeVideoSchema = exports.seekSchema = exports.pauseSchema = exports.playSchema = exports.leaveRoomSchema = exports.joinRoomSchema = void 0;
const zod_1 = require("zod");
exports.joinRoomSchema = zod_1.z.object({
    roomCode: zod_1.z.string(),
    username: zod_1.z.string(),
});
exports.leaveRoomSchema = zod_1.z.object({
    roomCode: zod_1.z.string(),
    userId: zod_1.z.string(),
});
exports.playSchema = zod_1.z.object({
    roomCode: zod_1.z.string(),
});
exports.pauseSchema = zod_1.z.object({
    roomCode: zod_1.z.string(),
});
exports.seekSchema = zod_1.z.object({
    roomCode: zod_1.z.string(),
    seconds: zod_1.z.number(),
});
exports.changeVideoSchema = zod_1.z.object({
    roomCode: zod_1.z.string(),
    videoId: zod_1.z.string(),
});
