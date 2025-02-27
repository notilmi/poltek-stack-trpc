import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import EditProfileForm from "./edit-profile-form";

async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/auth");

  return (
    <div>
      <EditProfileForm />
    </div>
  );
}

export default Page;
