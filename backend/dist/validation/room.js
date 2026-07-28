"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomSchema = void 0;
const zod_1 = require("zod");
exports.createRoomSchema = zod_1.z.object({
    roomCode: zod_1.z.string().min(3),
    videoId: zod_1.z.string(),
    hostId: zod_1.z.string(),
});
