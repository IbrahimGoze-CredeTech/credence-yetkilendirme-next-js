"use server";

import type { z } from "zod";
import { auth } from "@/auth";
import { yetkiTalepSchema } from "@/schemas";
import { FetcherPost } from "@/utils";

type YetkiEditRequestType = {
  yetkiAdi: string;
  kisiAdi: string;
  eylemTuru: string;
  yetkiBaslamaTarihi: string;
  yetkiBitisTarihi: string;
  ciftImza: boolean;
  ekstraImza: string[];
};
export async function yetkiEdit(values: z.infer<typeof yetkiTalepSchema>) {
  const session = await auth();

  const validateFields = yetkiTalepSchema.safeParse(values);

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

  const yetkiEditRequest: YetkiEditRequestType = {
    yetkiAdi,
    kisiAdi,
    eylemTuru,
    yetkiBaslamaTarihi: baslamaTarihi.toISOString(),
    yetkiBitisTarihi: bitisTarihi.toISOString(),
    ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await FetcherPost(
    "/Talep/yetki-edit",
    session?.token,
    JSON.stringify(yetkiEditRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}

export async function yetkiAtama(values: z.infer<typeof yetkiTalepSchema>) {
  const session = await auth();

  const validateFields = yetkiTalepSchema.safeParse(values);

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

  const yetkiAtamaRequest = {
    yetkiAdi,
    kisiAdi,
    eylemTuru,
    yetkiBaslamaTarihi: baslamaTarihi.toISOString(),
    yetkiBitisTarihi: bitisTarihi.toISOString(),
    ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await FetcherPost(
    "/Talep/yetki-atama",
    session?.token,
    JSON.stringify(yetkiAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
