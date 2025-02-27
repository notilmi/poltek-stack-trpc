import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { type NextRequestWithAuth } from "./types";

export { auth as middleware } from "@/auth";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req: NextRequestWithAuth) => {
  if (!req.auth) {
    const url = new URL(req.url);
    url.pathname = "/auth";
    return Response.redirect(url.toString(), 302);
  }
});

export const config = {
  matcher: [
    "/((?!api|auth/|_next/static|api/trpc|_next/image|favicon.ico|$).*)",
  ],
};
