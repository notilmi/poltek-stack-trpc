import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import EditProfileForm from "./edit-profile-form";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Polstack App | Profile",
  description: "Edit Your Profile",
};

async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/auth");

  return (
    <div>
      <EditProfileForm
        name={session.user.name ?? undefined}
        avatar={session.user.image ?? undefined}
      />
    </div>
  );
}

export default Page;
