"use client";
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
    <p>
      Access denied. You do not have permission to sign in.
      <code className="bg-destructive-30 rounded-sm p-1">AccessDenied</code>
    </p>
  ),
  [Error.AccountNotLinked]: (
    <p>
      This account is not linked to an existing account. Please sign in with the
      original account.
      <code className="bg-destructive-30 rounded-sm p-1">AccountNotLinked</code>
    </p>
  ),
  [Error.CallbackRouteError]: (
    <p>
      There was a problem signing in. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">
        CallbackRouteError
      </code>
    </p>
  ),
  [Error.CredentialsSignin]: (
    <p>
      Invalid credentials. Please check your username and password.
      <code className="bg-destructive-30 rounded-sm p-1">
        CredentialsSignin
      </code>
    </p>
  ),
  [Error.MissingCSRF]: (
    <p>
      CSRF token missing. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">MissingCSRF</code>
    </p>
  ),
  [Error.OAuthAccountNotLinked]: (
    <p>
      This OAuth account is not linked to an existing account.
      <code className="bg-destructive-30 rounded-sm p-1">
        OAuthAccountNotLinked
      </code>
    </p>
  ),
  [Error.OAuthCallbackError]: (
    <p>
      Error occurred during OAuth sign in. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">
        OAuthCallbackError
      </code>
    </p>
  ),
  [Error.OAuthSignInError]: (
    <p>
      Could not start OAuth sign in. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">OAuthSignInError</code>
    </p>
  ),
  [Error.Verification]: (
    <p>
      The verification code is invalid or has expired. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">Verification</code>
    </p>
  ),
  [Error.WebAuthnVerificationError]: (
    <p>
      WebAuthn verification failed. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">
        WebAuthnVerificationError
      </code>
    </p>
  ),
  [Error.Default]: (
    <p>
      An unknown error occurred. Please try again.
      <code className="bg-destructive-30 rounded-sm p-1">Unknown</code>
    </p>
  ),
};

function ErrorNotification() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  if (error) {
    return (
      <div className="w-full rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
        {errorMap[error] || "Please contact us if this error persists."}
      </div>
    );
  }
}

export default ErrorNotification;
