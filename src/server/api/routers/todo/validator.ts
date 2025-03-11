import { z } from "zod";

const todoValidator = {
  create: z.object({
    title: z.string().min(1, "Title must be filled"),
  }),
  update: z.object({
    id: z.string().min(1, "ID must be filled"),
    title: z.string().min(1, "Title must be filled").optional(),
    completed: z.boolean().optional(),
  }),
};

export default todoValidator;
