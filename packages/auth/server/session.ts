"use server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";
import type { IdTokenType } from "./types";
import { redirect } from "next/navigation";

class AuthServerSession {
  /**
   * The request cookies instance.
   */
  private requestCookies: ReadonlyRequestCookies;

  /**
   * Creates a new instance of AuthServerSession.
   * @param requestCookies The request cookies instance.
   */
  constructor(requestCookies: ReadonlyRequestCookies) {
    this.requestCookies = requestCookies;

    /**
     * Binds the getUser method to the current instance.
     */
    this.getUser = this.getUser.bind(this);
  }

  /**
   * Retrieves the user metadata from the ID token.
   * @returns The user metadata or null if the ID token is invalid or missing.
   */
  public async getUser() {
    try {
      const idToken = this.requestCookies.get("app_id_token")?.value;

      if (!idToken) return null;

      const idTokenPayload: unknown = await verifyJwt(idToken);
      if (!idTokenPayload) return null;

      const { user_metadata } = idTokenPayload as IdTokenType;

      return user_metadata;
    } catch (error) {
      console.error("Error in getUser:", error);
      return null;
    }
  }

  public async logOut() {
    return redirect("/api/auth/logout");
  }
}

/**
 * Retrieves a new instance of AuthServerSession.
 * @returns A new instance of AuthServerSession.
 */
export async function getServerSession() {
  const cookiesInstance = await cookies();
  return new AuthServerSession(cookiesInstance);
}
