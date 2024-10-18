"use server";

import { auth } from "@/auth";
import { TalepRolAtamaSchema } from "@/schemas";
import { RolAtama, Talep } from "@/types";
import { fetcherPost } from "@/utils";
import { z } from "zod";

type RolAtamaRequest = {
  talep: Talep;
  rolAtama: RolAtama;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function rolAtama(values: z.infer<typeof TalepRolAtamaSchema>) {
  const session = await auth();

  const validateFields = TalepRolAtamaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    kisiAdi,
    rolAdi,
    rolBaslamaTarihi,
    rolBitisTarihi,
    ciftImza,
    ekstraImza,
  } = values;

  const ekstraImzaArray: string[] = ekstraImza.map(
    (ekstraImza) => ekstraImza.value
  );

  const talep: Talep = {
    // talepEdenKisiId: 1,
    // talepId: 0,
    olusturulmaTarihi: "2024-10-14T09:13:38.191Z",
    durum: "",
    durumTarihi: "2024-10-14T09:13:38.191Z",
    talepEdenKisiAdi: "",
  };

  const rolAtama: RolAtama = {
    kisiAdi,
    rolAdi,
    rolBaslangicTarihi: rolBaslamaTarihi.toISOString(),
    rolBitisTarihi: rolBitisTarihi.toISOString(),
    // rolId: 0,
    // kisiId: 0,
  };

  const rolAtamaRequest: RolAtamaRequest = {
    talep,
    rolAtama,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  console.log("session?.token: ", session?.token);

  await fetcherPost(
    "/Talep/rol-atama",
    session?.token,
    JSON.stringify(rolAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
