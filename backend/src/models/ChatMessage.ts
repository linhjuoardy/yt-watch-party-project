import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    roomCode: String,

    sender: String,

    message: String,
  },
  {
    timestamps: true,
  }
);

export default model("ChatMessage", chatSchema);
