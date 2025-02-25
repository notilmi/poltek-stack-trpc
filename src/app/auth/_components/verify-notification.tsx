"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

enum Verify {
  email = "email",
}

const verifyMap = {
  [Verify.email]: (
    <p>
      A verification email has been sent to your email address. Please check
      your inbox and follow the instructions to verify your account.
    </p>
  ),
};

function VerifyNotification() {
  const search = useSearchParams();
  const verify = search.get("type") as Verify;

  if (verify) {
    return (
      <div className="w-full rounded-lg border border-muted-foreground/20 bg-muted-foreground/10 p-4 text-muted-foreground">
        {verifyMap[verify] || "Permintaan Berhasil Diproses."}
      </div>
    );
  }
}

export default VerifyNotification;
