import { TRPCError } from "@trpc/server";
import { authedProcedure, createTRPCRouter } from "../../trpc";
import todoValidator from "./validator";
import { z } from "zod";

export const todoRoutes = createTRPCRouter({
  getAll: authedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return todos;
  }),
  create: authedProcedure
    .input(todoValidator.create)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.todo.create({
        data: {
          title: input.title,
          userId: ctx.user.id,
        },
      });

      return true;
    }),
  update: authedProcedure
    .input(todoValidator.update)
    .mutation(async ({ ctx, input }) => {
      const existingTodo = await ctx.db.todo.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!existingTodo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existingTodo.userId !== ctx.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await ctx.db.todo.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          completed: input.completed,
        },
      });
      return true;
    }),
  delete: authedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const existingTodo = await ctx.db.todo.findUnique({
      where: {
        id: input,
      },
    });
    if (!existingTodo) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    if (existingTodo.userId !== ctx.user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    await ctx.db.todo.delete({
      where: {
        id: input,
      },
    });
    return true;
  }),
});
