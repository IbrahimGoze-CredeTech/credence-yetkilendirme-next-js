"use server";

import { auth } from "@/auth";
import { fetcherPUT } from "@/utils";

export async function talepOnayla(
  onaylandi: boolean,
  talepId: number
): Promise<boolean> {
  const session = await auth();

  if (onaylandi) {
    const response = await fetcherPUT(
      "/Talep/onayla",
      session?.token,
      JSON.stringify({ talepId: talepId })
    );
    if (response) {
      return true;
    }
    return false;
  } else {
    const response = await fetcherPUT(
      "/Talep/reddet",
      session?.token,
      JSON.stringify({ talepId: talepId })
    );
    if (response) {
      return true;
    }
    return false;
  }
}
