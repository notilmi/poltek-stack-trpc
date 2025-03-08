import { authedProcedure, createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import profileSchema from "./validator";
import { z } from "zod";

export const profileRoutes = createTRPCRouter({
  update: authedProcedure
    .input(profileSchema.update)
    .mutation(async ({ input, ctx }) => {
      const { db, user } = ctx;

      try {
        const updatedProfile = await db.user.update({
          where: { id: user.id },
          data: {
            ...(input.image && { image: input.image }),
            ...(input.name && { name: input.name }),
          },
          select: {
            id: true,
            name: true,
            image: true,
          },
        });

        return updatedProfile;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update profile",
          cause: error,
        });
      }
    }),
  getById: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { db } = ctx;
      try {
        const profile = await db.user.findUnique({
          where: { id: input.userId },
          select: {
            id: true,
            name: true,
            image: true,
          },
        });
        if (!profile) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Profile not found",
          });
        }
        return profile;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get profile",
        });
      }
    }),
});
