import { z } from "zod";

export const chatSchema = z.object({
  roomCode: z.string(),

  sender: z.string(),

  message: z.string().min(1),
});
