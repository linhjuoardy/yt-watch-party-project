import { z } from "zod";

export const createRoomSchema = z.object({
  roomCode: z.string().min(3),

  videoId: z.string(),

  hostId: z.string(),
});
