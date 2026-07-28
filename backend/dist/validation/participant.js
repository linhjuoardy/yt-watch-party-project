"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantSchema = void 0;
const zod_1 = require("zod");
exports.participantSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    roomCode: zod_1.z.string(),
});
