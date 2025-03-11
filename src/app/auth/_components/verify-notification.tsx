"use client";
import Alert from "@mui/material/Alert";
import { useSearchParams } from "next/navigation";
import React from "react";
import AlertTitle from "@mui/material/AlertTitle";
enum Verify {
  email = "email",
}

const verifyMap = {
  [Verify.email]: (
    <>
      <AlertTitle>Email Sent!</AlertTitle>A verification email has been sent to
      your email address. Please check your inbox and follow the instructions to
      verify your account.
    </>
  ),
};

function VerifyNotification() {
  const search = useSearchParams();
  const verify = search.get("type") as Verify;

  if (verify) {
    return (
      <Alert severity="success">
        {verifyMap[verify] || "Permintaan Berhasil Diproses."}
      </Alert>
    );
  }
}

export default VerifyNotification;
