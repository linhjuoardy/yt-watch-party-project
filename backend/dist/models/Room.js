"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    roomCode: {
        type: String,
        required: true,
        unique: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    hostId: {
        type: String,
        required: true,
    },
    currentTime: {
        type: Number,
        default: 0,
    },
    isPlaying: {
        type: Boolean,
        default: false,
    },
    updatedAtPlayback: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Room", roomSchema);
