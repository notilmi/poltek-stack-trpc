import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  compareHashPassword,
  saltAndHashPassword,
} from "packages/auth/server/utils";
import { createCookieMaxAge } from "packages/auth/server/cookies";
import { signJwt } from "packages/auth/server/jwt";

export const authRouter = createTRPCRouter({
  loginWithCredentials: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pengguna Tidak Ditemukan",
        });

      const passwordMatch = compareHashPassword(input.password, user.password);

      if (!passwordMatch)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Username / Password Salah.",
        });

      const accessToken = await signJwt(user, "Access");
      const refreshToken = await signJwt(user, "Refresh");
      const idToken = await signJwt(user, "Id");

      ctx.headers.set(
        "Set-Cookie",
        `access_token=${accessToken}; Path=/; HttpOnly; Secure; Max-Age=${createCookieMaxAge(7, "days")}`,
      );

      ctx.headers.set(
        "Set-Cookie",
        `refresh_token=${refreshToken}; Path=/; HttpOnly; Secure; Max-Age=${createCookieMaxAge(30, "days")}`,
      );

      ctx.headers.set(
        "Set-Cookie",
        `id_token=${idToken}; Path=/; HttpOnly; Secure; Max-Age=${createCookieMaxAge(7, "days")}`,
      );

      return {
        ok: true,
        message: "Login Berhasil!",
      };
    }),

  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // eslint-disable-next-line
      const { password, ...data } = await ctx.db.user.create({
        data: {
          username: input.username,
          name: input.name,
          password: saltAndHashPassword(input.password),
        },
      });

      return data;
    }),
});
