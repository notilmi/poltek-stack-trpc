"use server";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import Suspensed from "./suspensed";
import { connection } from "next/server";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  await connection();
  void api.profile.me.prefetch();

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspensed />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
