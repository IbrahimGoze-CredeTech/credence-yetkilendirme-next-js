"use server";

import { auth } from "@/auth";
import { TalepKisiSayfaEditSchema } from "@/schemas";
import { fetcherPost } from "@/utils";
import { z } from "zod";

type KisiSayfaEditRequest = {
  kisiAdi: string;
  sayfaRoute: string;
  isPermitted: boolean;
  baslangicTarihi: string;
  bitisTarihi: string;
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

  let ekstraImzaArray: string[] = [];
  if (ekstraImza === undefined) {
    ekstraImzaArray = [];
  } else {
    ekstraImzaArray = ekstraImza.map((ekstraImza) => ekstraImza.value);
  }

  // const sayfaAtama = {
  //   kisiAdi: kisiAdi,
  //   sayfaRoute: SayfaRoute,
  //   isPermitted: isPermitted,
  //   BaslangicTarihi: baslamaTarihi.toISOString(),
  //   BitisTarihi: bitisTarihi.toISOString(),
  // };

  const sayfaAtamaRequest: KisiSayfaEditRequest = {
    kisiAdi: kisiAdi,
    sayfaRoute: SayfaRoute,
    isPermitted: isPermitted,
    baslangicTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  console.log("values kisiSayfaEdit: ", sayfaAtamaRequest);

  await fetcherPost(
    "/Talep/kisi-sayfa-edit",
    session?.token,
    JSON.stringify(sayfaAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}

export async function getKisiSayfaEdit() {}
