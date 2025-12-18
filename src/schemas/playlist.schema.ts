import { z } from "zod";

export const playlistSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
});

export type PlaylistInput = z.infer<typeof playlistSchema>;
