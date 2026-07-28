import { z } from "zod";

export const participantSchema = z.object({
  userId: z.string(),

  roomCode: z.string(),
});
