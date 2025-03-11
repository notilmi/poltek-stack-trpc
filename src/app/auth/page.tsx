import React from "react";
import { AuthForm } from "./auth-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import VerifyNotification from "./_components/verify-notification";
import ErrorNotification from "./_components/error-notification";
import Stack from "@mui/material/Stack";

/**
 * TODO: Fix Auth Search Params Missing After Redireted From The Authjs Verify Request
 */
async function Page() {
  const session = await auth();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        p: {
          xs: 2,
          md: 4,
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack direction="column" spacing={4}>
        <AuthForm />
        <VerifyNotification />
        <ErrorNotification />
      </Stack>
    </Container>
  );
}

export default Page;
