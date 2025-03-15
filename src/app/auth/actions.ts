"use server";

import { signIn } from "@/auth";

export async function handleSendMagicLink(formData: FormData) {
  "use server";
  await signIn("resend", formData);
}
