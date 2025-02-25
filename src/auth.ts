import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
