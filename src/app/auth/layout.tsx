import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Polstack App | Login",
  description: "One Step Ahead Before You Can Access Our App!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">{children}</div>
    </main>
  );
}

export default AuthLayout;
