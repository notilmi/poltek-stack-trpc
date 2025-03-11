"use client";
import { api } from "@/trpc/react";
import React from "react";

function Suspensed() {
  const [profile] = api.profile.me.useSuspenseQuery();

  return <div>{profile.id}</div>;
}

export default Suspensed;
