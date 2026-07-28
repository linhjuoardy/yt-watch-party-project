import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default model("Room", roomSchema);
