export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!api|auth/|_next/static|api/trpc|_next/image|favicon.ico|$).*)",
  ],
};
