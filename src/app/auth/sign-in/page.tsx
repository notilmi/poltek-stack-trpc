import React, { Suspense } from "react";
import { AuthForm, AuthFormSkeleton } from "../_components/auth-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import ErrorNotification from "../_components/error-notification";
import VerifyNotification from "../_components/verify-notification";

async function Page() {
  const session = await auth();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <Suspense fallback={<AuthFormSkeleton />}>
      <div className="flex flex-col items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 self-center text-lg font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </Link>
        <AuthForm />
        <ErrorNotification />
        <VerifyNotification />
      </div>
    </Suspense>
  );
}

export default Page;
