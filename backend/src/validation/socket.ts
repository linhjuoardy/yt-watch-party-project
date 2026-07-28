import { z } from "zod";

export const joinRoomSchema = z.object({
  roomCode: z.string(),

  username: z.string(),
});

export const leaveRoomSchema = z.object({
  roomCode: z.string(),

  userId: z.string(),
});

export const playSchema = z.object({
  roomCode: z.string(),
});

export const pauseSchema = z.object({
  roomCode: z.string(),
});

export const seekSchema = z.object({
  roomCode: z.string(),

  seconds: z.number(),
});

export const changeVideoSchema = z.object({
  roomCode: z.string(),

  videoId: z.string(),
});
