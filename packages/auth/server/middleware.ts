"use server";
import { type NextRequest, NextResponse } from "next/server";
import { signJwt, verifyJwt } from "./jwt";
import type { RefreshTokenType } from "./types";
import { createCookieExpiry } from "./cookies";

export async function validateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  try {
    const accessToken = request.cookies.get("app_access_token")?.value;
    const idToken = request.cookies.get("app_id_token")?.value;
    const refreshToken = request.cookies.get("app_refresh_token")?.value;

    if (!accessToken || !idToken) {
      if (!refreshToken) {
        return redirectToAuth(request);
      }

      const refreshTokenPayload = await verifyJwt(refreshToken);
      if (!refreshTokenPayload) {
        return redirectToAuth(request);
      }

      const { user_metadata } = refreshTokenPayload as RefreshTokenType;
      const newRefreshToken = await signJwt(user_metadata, "Refresh");
      const newAccessToken = await signJwt(user_metadata, "Access");
      const newIdToken = await signJwt(user_metadata, "Id");

      if (!newRefreshToken || !newAccessToken || !newIdToken) {
        return redirectToAuth(request);
      }

      response.cookies.set("app_access_token", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: createCookieExpiry(7, "days"),
      });
      response.cookies.set("app_id_token", newIdToken, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        expires: createCookieExpiry(7, "days"),
      });
      response.cookies.set("app_refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: createCookieExpiry(1, "months"),
      });

      return response;
    }

    const accessTokenPayload = await verifyJwt(accessToken);
    const idTokenPayload = await verifyJwt(idToken);
    const refreshTokenPayload = await verifyJwt(refreshToken!);

    if (!accessTokenPayload || !idTokenPayload || !refreshTokenPayload) {
      return redirectToAuth(request);
    }

    return response;
  } catch (error) {
    console.error(error);
    return redirectToAuth(request);
  }
}

function redirectToAuth(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth";
  return NextResponse.redirect(url);
}
