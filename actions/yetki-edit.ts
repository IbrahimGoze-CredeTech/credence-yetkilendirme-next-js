"use server";

import { auth } from "@/auth";
import { YetkiEditSchema } from "@/schemas";
import { fetcherPost } from "@/utils";
import { z } from "zod";

type YetkiEditRequest = {
  yetkiAdi: string;
  kisiAdi: string;
  eylemTuru: string;
  yetkiBaslamaTarihi: string;
  yetkiBitisTarihi: string;
  ciftImza: boolean;
  ekstraImza: string[];
};
export async function yetkiEdit(values: z.infer<typeof YetkiEditSchema>) {
  const session = await auth();

  const validateFields = YetkiEditSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    yetkiAdi,
    kisiAdi,
    eylemTuru,
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

  const yetkiEditRequest: YetkiEditRequest = {
    yetkiAdi,
    kisiAdi,
    eylemTuru,
    yetkiBaslamaTarihi: baslamaTarihi.toISOString(),
    yetkiBitisTarihi: bitisTarihi.toISOString(),
    ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await fetcherPost(
    "/Talep/yetki-edit",
    session?.token,
    JSON.stringify(yetkiEditRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
