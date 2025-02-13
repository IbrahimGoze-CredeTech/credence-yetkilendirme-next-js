"use server";

import type { z } from "zod";
import { auth } from "@/auth";
import { talepRolSayfaAtamaSchema } from "@/schemas";
import type { IRolSayfa } from "@/types";
import { FetcherPost } from "@/utils";

type SayfaAtamaRequestType = {
  sayfaAtama: IRolSayfa;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function sayfaAtama(
  values: z.infer<typeof talepRolSayfaAtamaSchema>
) {
  const session = await auth();

  const validateFields = talepRolSayfaAtamaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    rolAdi,
    sayfaRoute,
    baslamaTarihi,
    bitisTarihi,
    ciftImza,
    ekstraImza,
  } = values;

  let ekstraImzaArray: string[] = [];
  if (ekstraImza === undefined) {
    ekstraImzaArray = [];
  } else {
    ekstraImzaArray = ekstraImza.map((ekstraImza) => ekstraImza.value);
  }

  const sayfaAtama: IRolSayfa = {
    rolAdi,
    sayfaRoute,
    sayfaBaslangicTarihi: baslamaTarihi.toISOString(),
    sayfaBitisTarihi: bitisTarihi.toISOString(),
    rolId: "",
    sayfaId: "",
  };

  const sayfaAtamaRequest: SayfaAtamaRequestType = {
    sayfaAtama,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await FetcherPost(
    "/Sayfa/rol-sayfa",
    session?.token,
    JSON.stringify(sayfaAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
