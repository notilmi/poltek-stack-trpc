import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ProfileEditForm, ProfileEditFormSkeleton } from "./edit-profile-form";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import BackButton from "@/app/_components/back-button";

export const metadata: Metadata = {
  title: "Polstack App | Profile",
  description: "Edit Your Profile",
};

async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/auth");

  const userDetails = await api.profile.getById({ userId: session.user.id! });

  return (
    <div>
      <BackButton className="mb-4" />
      <Suspense fallback={<ProfileEditFormSkeleton />}>
        <ProfileEditForm
          name={userDetails.name ?? undefined}
          avatar={userDetails.image ?? undefined}
        />
      </Suspense>
    </div>
  );
}

export default Page;
