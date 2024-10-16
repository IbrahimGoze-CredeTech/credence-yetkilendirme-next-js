"use server";

import { signOut } from "@/auth";

export async function logout() {
  // Do some server stuff before logging out
  await signOut();
  // window.location.href = "/auth/login";
}
