import type { User } from "@prisma/client";

/**
 * Enum for JWT expiration units.
 *
 * @enum {("minutes" | "days" | "months" | "years")}
 */
export type JwtExpiryUnit = "minutes" | "days" | "months" | "years";

/**
 * Type for user metadata, excluding the password.
 *
 * @typedef {Omit<User, "password">} UserMetadata
 */
export type UserMetadata = Omit<User, "password">;

/**
 * Base type for JWT tokens.
 *
 * @typedef {Object} BaseTokenType
 * @property {string} sub - User ID.
 * @property {number} exp - Expiration time in seconds.
 * @property {number} iat - Issued at time in seconds.
 * @property {string} jti - UUID.
 * @property {string} iss - Issuer name.
 * @property {UserMetadata} user_metadata - User metadata.
 */
export type BaseTokenType = {
  sub: string; // User Id
  exp: number; // Expiration Time (in Seconds)
  iat: number; // Issued At (in Seconds)
  jti: string; // UUID
  iss: string; // Issuer Name

  user_metadata: UserMetadata;
};

/**
 * Type for access tokens.
 *
 * @typedef {BaseTokenType & { role: User["role"] }} AccessToken
 */
export type AccessTokenType = BaseTokenType & {};

/**
 * Type for ID tokens.
 *
 * @typedef {BaseTokenType} IdTokenType
 */
export type IdTokenType = BaseTokenType;

/**
 * Type for refresh tokens.
 *
 * @typedef {BaseTokenType} RefreshTokenType
 */
export type RefreshTokenType = BaseTokenType;
