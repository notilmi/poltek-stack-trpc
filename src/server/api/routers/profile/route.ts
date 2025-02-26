import { authedProcedure, createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { updateProfileSchema } from "./validator";

export const profileRoutes = createTRPCRouter({
  update: authedProcedure
    .input(updateProfileSchema)
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
});
