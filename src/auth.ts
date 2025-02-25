import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@prisma/client";
import crypto from "crypto";
import { z, ZodError } from "zod";
import { db } from "./server/db";

export function saltAndHashPassword(password: string): string {
  const salt = process.env.PASSWORD_SALT ?? "";
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash;
}

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user: User | null = null;

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const pwHash = saltAndHashPassword(password);

          user = await db.user.findFirst({
            where: {
              email,
              password: pwHash,
            },
          });

          if (!user) throw new Error("Invalid credentials.");

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          return null;
        }
      },
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY ?? "",
      from: process.env.RESEND_FROM ?? "",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
});
