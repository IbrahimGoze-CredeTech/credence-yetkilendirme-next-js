"use server";

import { auth } from "@/auth";
import { fetcherPUT } from "@/utils";

export async function talepOnayla(onaylandi: boolean, talepId: number) {
  const session = await auth();

  if (onaylandi) {
    await fetcherPUT(
      "/Talep/onayla",
      session?.token,
      JSON.stringify({ talepId: talepId })
    );
  } else {
    await fetcherPUT(
      "/Talep/reddet",
      session?.token,
      JSON.stringify({ talepId: talepId })
    );
  }
}
