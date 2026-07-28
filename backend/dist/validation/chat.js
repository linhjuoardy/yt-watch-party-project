"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const zod_1 = require("zod");
exports.chatSchema = zod_1.z.object({
    roomCode: zod_1.z.string(),
    sender: zod_1.z.string(),
    message: zod_1.z.string().min(1),
});
