import Container from '@mui/material/Container';
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Polstack App | Login",
  description: "One Step Ahead Before You Can Access Our App!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
      }}
    >
      {children}
    </Container>
  );
}

export default AuthLayout;
