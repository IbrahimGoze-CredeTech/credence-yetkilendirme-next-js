"use server";

import { auth } from "@/auth";
import { TalepRolCikarmaSchema } from "@/schemas";
import { RolCikarmaClient } from "@/types";
import { fetcherPost } from "@/utils";
import { z } from "zod";

type RolCikarmaRequest = {
  talepEdenKisiId: number;
  rolCikarma: RolCikarmaClient;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function rolCikarma(
  values: z.infer<typeof TalepRolCikarmaSchema>
) {
  const session = await auth();

  const validateFields = TalepRolCikarmaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { kisiAdi, rolAdi, bitisTarihi, ciftImza, ekstraImza } = values;

  let ekstraImzaArray: string[] = [];
  if (ekstraImza === undefined) {
    ekstraImzaArray = [];
  } else {
    ekstraImzaArray = ekstraImza.map((ekstraImza) => ekstraImza.value);
  }

  const rolCikarma: RolCikarmaClient = {
    kisiAdi,
    rolAdi,
    rolCikarmaTarihi: bitisTarihi.toISOString(),
  };

  const rolCikarmaRequest: RolCikarmaRequest = {
    talepEdenKisiId: session?.user.id,
    rolCikarma: rolCikarma,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  console.log("rolCikarmaRequest: ", JSON.stringify(rolCikarmaRequest));

  await fetcherPost(
    "/Talep/rol-cikarma",
    session?.token,
    JSON.stringify(rolCikarmaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
