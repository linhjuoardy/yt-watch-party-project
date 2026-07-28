import Room from "../models/Room";

export default class RoomManager {
  async createRoom(
    roomCode: string,
    videoId: string,
    hostId: string
  ) {
    return Room.create({
      roomCode,
      videoId,
      hostId,
    });
  }

  async getRoom(roomCode: string) {
    return Room.findOne({
      roomCode,
    });
  }

  async deleteRoom(roomCode: string) {
    return Room.deleteOne({
      roomCode,
    });
  }
}
