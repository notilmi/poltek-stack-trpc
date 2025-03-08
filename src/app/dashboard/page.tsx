import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const handleLogOut = async () => {
  "use server";
  await signOut();
};

async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <Image
        src={session?.user?.image ?? "/placeholder.svg"}
        alt="User Image"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h1 className="text-2xl">Welcome, {session?.user?.name}!</h1>
      <span>
        Start By Editing{" "}
        <code className="rounded-lg bg-muted p-1 font-semibold">
          dashboard/page.tsx
        </code>
      </span>
      <form action={handleLogOut} className="mt-4">
        <Button>
          <DoorOpen />
          Log Out
        </Button>
      </form>
    </div>
  );
}

export default DashboardPage;
