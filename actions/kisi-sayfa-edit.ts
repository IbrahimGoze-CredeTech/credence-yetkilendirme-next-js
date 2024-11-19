"use server";

import { auth } from "@/auth";
import { TalepKisiSayfaEditSchema } from "@/schemas";
import { fetcherPost } from "@/utils";
import { z } from "zod";

type KisiSayfaEditRequest = {
  kisiAdi: string;
  sayfaRoute: string;
  isPermitted: boolean;
  sayfaBaslangicTarihi: string;
  sayfaBitisTarihi: string;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function kisiSayfaEdit(
  values: z.infer<typeof TalepKisiSayfaEditSchema>
) {
  const session = await auth();

  const validateFields = TalepKisiSayfaEditSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    kisiAdi,
    SayfaRoute,
    isPermitted,
    baslamaTarihi,
    bitisTarihi,
    ciftImza,
    ekstraImza,
  } = values;

  console.log("values: ", values);

  let ekstraImzaArray: string[] = [];
  if (ekstraImza === undefined) {
    ekstraImzaArray = [];
  } else {
    ekstraImzaArray = ekstraImza.map((ekstraImza) => ekstraImza.value);
  }

  const sayfaAtama = {
    kisiAdi: kisiAdi,
    sayfaRoute: SayfaRoute,
    isPermitted: isPermitted,
    sayfaBaslangicTarihi: baslamaTarihi.toISOString(),
    sayfaBitisTarihi: bitisTarihi.toISOString(),
  };

  const sayfaAtamaRequest: KisiSayfaEditRequest = {
    kisiAdi: sayfaAtama.kisiAdi,
    sayfaRoute: sayfaAtama.sayfaRoute,
    isPermitted: sayfaAtama.isPermitted,
    sayfaBaslangicTarihi: sayfaAtama.sayfaBaslangicTarihi,
    sayfaBitisTarihi: sayfaAtama.sayfaBitisTarihi,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await fetcherPost(
    "/Talep/kisi-sayfa-edit",
    session?.token,
    JSON.stringify(sayfaAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
