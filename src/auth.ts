import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./server/db";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import type { User } from "@prisma/client";
// import { z, ZodError } from "zod";
// import { db } from "./server/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
    verifyRequest: "/auth/sign-in",
    newUser: "/welcome",
  },
  adapter: PrismaAdapter(db),
  providers: [
    // Credentials({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     try {
    //       let user: User | null = null;

    //       const { email, password } =
    //         await signInSchema.parseAsync(credentials);

    //       const pwHash = saltAndHashPassword(password);

    //       user = await db.user.findFirst({
    //         where: {
    //           email,
    //           password: pwHash,
    //         },
    //       });

    //       if (!user) throw new Error("Invalid credentials.");

    //       return user;
    //     } catch (error) {
    //       if (error instanceof ZodError) {
    //         // Return `null` to indicate that the credentials are invalid
    //         return null;
    //       }

    //       return null;
    //     }
    //   },
    // }),
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
