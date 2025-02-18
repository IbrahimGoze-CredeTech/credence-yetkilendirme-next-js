"use server";

import { AuthError } from "next-auth";
import type { z } from "zod";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { redirect } from "next/navigation";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: "", error: "Invalid Credentials!" };
  }

  const { name, password } = validatedFields.data;
  // dummy wait 2 seconds
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const res = await signIn("credentials", {
      name,
      password,
      redirect: false,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    // Handle the response based on signIn result
    if (res?.error) {
      return { success: "", error: "Invalid Credentials!" };
    }

    // Successful login
    return { success: "logged in", error: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      // const { type, cause } = error as AuthError;
      switch (error.type) {
        case "CredentialsSignin":
          return { success: "", error: "Invalid Credentials!" };
        default:
          return { success: "", error: "Somethingg went wrong!" };
      }
    }
    console.error("Error in login Action: ", error);
    throw error;
  } finally {
    // redirect(DEFAULT_LOGIN_REDIRECT);
    // return { success: "logged in", error: "" };
  }
}
