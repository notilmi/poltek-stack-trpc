import { TRPCError } from "@trpc/server";
import { authedProcedure, createTRPCRouter } from "../../trpc";
import { todoValidators } from "./validator";
import { z } from "zod";

export const todoRoutes = createTRPCRouter({
  getAll: authedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todos.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return todos;
  }),
  getById: authedProcedure
    .input(z.string().describe("Todo ID"))
    .query(async ({ input, ctx }) => {
      const todo = await ctx.db.todos.findUnique({
        where: {
          id: input,
        },
      });
      return todo;
    }),
  create: authedProcedure
    .input(todoValidators.create)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.todos.create({
        data: {
          title: input.title,
          userId: ctx.user.id,
        },
      });

      return {
        success: true,
        message: "Todo created successfully",
      };
    }),
  update: authedProcedure
    .input(todoValidators.update)
    .mutation(async ({ input, ctx }) => {
      const existingTodo = await ctx.db.todos.findUnique({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });

      if (ctx.user.id !== existingTodo?.userId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You can only update your own todos",
        });

      await ctx.db.todos.update({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
        data: {
          title: input.title,
          completed: input.completed,
        },
      });

      return {
        success: true,
        message: "Todo updated successfully",
      };
    }),
  delete: authedProcedure
    .input(todoValidators.delete)
    .mutation(async ({ input, ctx }) => {
      const existingTodo = await ctx.db.todos.findUnique({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });

      if (ctx.user.id !== existingTodo?.userId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You can only delete your own todos",
        });

      await ctx.db.todos.delete({
        where: {
          id: input.id,
          userId: ctx.user.id,
        },
      });
      return {
        success: true,
        message: "Todo deleted successfully",
      };
    }),
});
