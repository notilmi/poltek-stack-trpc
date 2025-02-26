import { z } from "zod";

export const updateProfileSchema = z.object({
  image: z.string().url().optional(),
  name: z.string().min(2).max(50).optional(),
});
