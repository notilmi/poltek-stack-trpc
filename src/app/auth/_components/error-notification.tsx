"use client";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { useSearchParams } from "next/navigation";
import React from "react";

enum Error {
  AccessDenied = "AccessDenied",
  AccountNotLinked = "AccountNotLinked",
  CallbackRouteError = "CallbackRouteError",
  CredentialsSignin = "CredentialsSignin",
  Default = "Default",
  MissingCSRF = "MissingCSRF",
  OAuthAccountNotLinked = "OAuthAccountNotLinked",
  OAuthCallbackError = "OAuthCallbackError",
  OAuthSignInError = "OAuthSignInError",
  Verification = "Verification",
  WebAuthnVerificationError = "WebAuthnVerificationError",
}

const errorMap = {
  [Error.AccessDenied]: (
    <>
      Access denied. You do not have permission to sign in.
      <code className="bg-destructive-30 rounded-sm p-1">AccessDenied</code>
    </>
  ),
  [Error.AccountNotLinked]: (
    <>
      This account is not linked to an existing account. Please sign in with the
      original account.
      <code className="bg-destructive-30 rounded-sm p-1">AccountNotLinked</code>
    </>
  ),
  [Error.CallbackRouteError]: (
    <>
      There was a problem signing in. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">
        CallbackRouteError
      </code>
    </>
  ),
  [Error.CredentialsSignin]: (
    <>
      Invalid credentials. Please check your username and password.
      <code className="bg-destructive-30 rounded-sm p-1">
        CredentialsSignin
      </code>
    </>
  ),
  [Error.MissingCSRF]: (
    <>
      CSRF token missing. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">MissingCSRF</code>
    </>
  ),
  [Error.OAuthAccountNotLinked]: (
    <>
      This OAuth account is not linked to an existing account.
      <code className="bg-destructive-30 rounded-sm p-1">
        OAuthAccountNotLinked
      </code>
    </>
  ),
  [Error.OAuthCallbackError]: (
    <>
      Error occurred during OAuth sign in. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">
        OAuthCallbackError
      </code>
    </>
  ),
  [Error.OAuthSignInError]: (
    <>
      Could not start OAuth sign in. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">OAuthSignInError</code>
    </>
  ),
  [Error.Verification]: (
    <>
      The verification code is invalid or has expired. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">Verification</code>
    </>
  ),
  [Error.WebAuthnVerificationError]: (
    <>
      WebAuthn verification failed. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">
        WebAuthnVerificationError
      </code>
    </>
  ),
  [Error.Default]: (
    <>
      An unknown error occurred. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">Unknown</code>
    </>
  ),
};

function ErrorNotification() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Something Went Wrong</AlertTitle>
        {errorMap[error] || "Please contact us if this error persists."}
      </Alert>
    );
  }
}

export default ErrorNotification;
