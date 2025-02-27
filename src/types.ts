import { type Session } from "next-auth";
import { type NextRequest } from "next/server";

export type NextRequestWithAuth = {
  auth: Session | null;
} & NextRequest;
