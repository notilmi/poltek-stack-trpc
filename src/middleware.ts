import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { type NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

async function middleware(req: NextRequest) {
  const session = await auth();

  if (req.headers.has("x-middleware-subrequest")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!session) {
    const url = new URL(req.url);
    url.pathname = "/auth";
    return NextResponse.redirect(url.toString(), 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!|auth|api|auth/|_next/static|api/trpc|_next/image|favicon.ico).*)",
  ],
};

export default middleware;
