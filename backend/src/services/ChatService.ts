import ChatMessage from "../models/ChatMessage";

export default class ChatService {
  async saveMessage(
    roomCode: string,
    sender: string,
    message: string
  ) {
    return ChatMessage.create({
      roomCode,
      sender,
      message,
    });
  }

  async getMessages(roomCode: string) {
    return ChatMessage.find({
      roomCode,
    }).sort({
      createdAt: 1,
    });
  }
}
