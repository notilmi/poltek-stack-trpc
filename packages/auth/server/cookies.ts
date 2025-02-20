import type { JwtExpiryUnit } from "./types";

export function createCookieExpiry(amount: number, unit: JwtExpiryUnit): Date {
  const now = new Date();
  let expires: Date;
  switch (unit) {
    case "minutes":
      expires = new Date(now.getTime() + amount * 60 * 1000);
      break;
    case "days":
      expires = new Date(now.getTime() + amount * 24 * 60 * 60 * 1000);
      break;
    case "months":
      expires = new Date(
        now.getFullYear(),
        now.getMonth() + amount,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      );
      break;
    case "years":
      expires = new Date(
        now.getFullYear() + amount,
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      );
      break;
    default:
      expires = new Date();
  }
  return new Date(
    Date.UTC(
      expires.getFullYear(),
      expires.getMonth(),
      expires.getDate(),
      expires.getHours(),
      expires.getMinutes(),
      expires.getSeconds(),
      expires.getMilliseconds(),
    ),
  );
}

export function createCookieMaxAge(
  amount: number,
  unit: "minutes" | "days" | "months" | "years",
): number {
  switch (unit) {
    case "minutes":
      return amount * 60;
    case "days":
      return amount * 24 * 60 * 60;
    case "months":
      return amount * 30 * 24 * 60 * 60;
    case "years":
      return amount * 365 * 24 * 60 * 60;
    default:
      return 0;
  }
}
