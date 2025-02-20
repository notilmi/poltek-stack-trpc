import * as crypto from "crypto";

export function saltAndHashPassword(password: string) {
  const salt = process.env.JWT_SECRET!;
  return crypto
    .createHash("sha256")
    .update(salt + password)
    .digest("hex");
}

export function compareHashPassword(password: string, hashedPassword: string) {
  if (saltAndHashPassword(password) === hashedPassword) {
    return true;
  }
  return false;
}
