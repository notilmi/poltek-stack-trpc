import { type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./server/db";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";

export const authConfig = {
  // trustHost: true,
  pages: {
    signIn: "/auth",
    error: "/auth",
    verifyRequest: "/auth/",
    newUser: "/auth/profile?new=true",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.email = token.email ?? "";
      session.user.name = token.name;
      session.user.image = token.picture;

      return session;
    },
  },
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
} satisfies NextAuthConfig;
