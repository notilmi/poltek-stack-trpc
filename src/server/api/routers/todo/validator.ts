import { z } from "zod";

export const todoValidators = {
  create: z.object({
    title: z.string().min(1, "Title is required"),
  }),
  update: z.object({
    id: z.string().min(1, "Id is required"),
    title: z.string().min(1, "Title is required"),
    completed: z.boolean(),
  }),
  delete: z.object({
    id: z.string().min(1, "Id is required"),
  }),
};
