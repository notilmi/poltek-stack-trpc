import type { JwtExpiryUnit, UserMetadata } from "./types";
import { createCookieExpiry, createCookieMaxAge } from "./cookies";
import { jwtVerify, SignJWT } from "jose";
import { v4 as uuidv4 } from "uuid";
import type { User } from "@prisma/client";

/**
 * @description Calculates the expiration date for a JWT based on the provided amount and unit.
 * @param {number} amount - The amount of time the JWT should be valid for.
 * @param {JwtExpiryUnit} unit - The unit of time for the JWT's validity.
 * @returns {number} The expiration timestamp in seconds.
 */
export function createJwtExpiry(amount: number, unit: JwtExpiryUnit) {
  switch (unit) {
    case "minutes":
      return Math.floor(Date.now() / 1000 + amount * 60);
    case "days":
      return Math.floor(Date.now() / 1000 + amount * 24 * 60 * 60);
    case "months":
      return Math.floor(Date.now() / 1000 + amount * 30 * 24 * 60 * 60);
    case "years":
      return Math.floor(Date.now() / 1000 + amount * 365 * 24 * 60 * 60);
    default:
      return Math.floor(Date.now() / 1000);
  }
}

/**
 * @description Creates an option for a JWT cookie.
 * @param {number} amount - The amount of time the cookie should be valid for.
 * @param {JwtExpiryUnit} unit - The unit of time for the cookie's validity.
 * @returns {Object} An object containing the cookie's options.
 */
export function createJwtCookieOption(amount: number, unit: JwtExpiryUnit) {
  return {
    path: "/",
    secure: true,
    domain: process.env.JWT_HOSTNAME!,
    httpOnly: true,
    maxAge: createCookieMaxAge(amount, unit),
    expires: createCookieExpiry(amount, unit),
    sameSite: "strict",
  };
}

/**
 * Verifies a JWT.
 *
 * @param {string} jwt - The JWT to verify.
 * @returns {Promise<Object>} The payload of the JWT if it is valid, otherwise false.
 */
export async function verifyJwt(jwt: string) {
  try {
    const secret = new TextEncoder().encode(getJwtSecret());
    const { payload } = await jwtVerify(jwt, secret, {
      issuer: getJwtIssuer(),
    });

    return payload;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * Gets the issuer of the JWT.
 *
 * @returns {string} The issuer of the JWT.
 */
export function getJwtIssuer() {
  const issuer = process.env.JWT_HOSTNAME;
  if (!issuer) throw new Error("JWT Hostname Is Not Defined In .env");
  return issuer;
}

/**
 * Gets the secret key used to sign the JWT.
 *
 * @returns {string} The secret key used to sign the JWT.
 */
export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT Secret Is Not Defined In .env");
  return secret;
}

/**
 * Signs a JWT.
 *
 * @param {"Refresh" | "Access" | "Id"} type - The type of JWT to sign.
 * @returns {Promise<string>} The signed JWT.
 */
export async function signJwt(
  user: User | UserMetadata,
  type: "Refresh" | "Access" | "Id",
) {
  try {
    const secret = new TextEncoder().encode(getJwtSecret());

    // Common payload for all token types
    const commonPayload = {
      sub: user.id,
      jti: uuidv4(),
      iss: getJwtIssuer(),
      user_metadata: {
        id: user.id,
        name: user.name,
        username: user.username,
        picture: user.picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        oauth: user.oauth,
      },
    };

    switch (type) {
      case "Refresh": {
        return await new SignJWT(commonPayload)
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime("30d")
          .sign(secret);
      }
      case "Access": {
        return await new SignJWT({
          ...commonPayload,
        })
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime("7d")
          .sign(secret);
      }
      case "Id": {
        return await new SignJWT(commonPayload)
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime("7d")
          .sign(secret);
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function signJwtWithDIPA(
  user: User | UserMetadata,
  dipaYear: number,
  type: "Refresh" | "Access" | "Id",
) {
  try {
    const secret = new TextEncoder().encode(getJwtSecret());

    // Common payload for all token types
    const commonPayload = {
      sub: user.id.toString(),
      jti: uuidv4(),
      iss: getJwtIssuer(),
      user_metadata: {
        id: user.id,
        name: user.name,
        username: user.username,
        picture: user.picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        oauth: user.oauth,
      },
    };

    switch (type) {
      case "Refresh": {
        return await new SignJWT(commonPayload)
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime("30d")
          .sign(secret);
      }
      case "Access": {
        return await new SignJWT({
          ...commonPayload,
        })
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime("7d")
          .sign(secret);
      }
      case "Id": {
        return await new SignJWT(commonPayload)
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime("7d")
          .sign(secret);
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
