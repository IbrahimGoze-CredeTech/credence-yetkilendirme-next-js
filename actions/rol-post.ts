"use server";

import type { z } from "zod";
import { auth } from "@/auth";
import {
  rolYetkiSchema,
  talepRolAtamaSchema,
  talepRolCikarmaSchema,
} from "@/schemas";
import type { RolAtamaClientType, RolCikarmaClientType } from "@/types";
import { FetcherPost } from "@/utils";

// #region TalepRolAtama
type RolAtamaRequestType = {
  rolAtama: RolAtamaClientType;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function rolAtama(values: z.infer<typeof talepRolAtamaSchema>) {
  const session = await auth();

  const validateFields = talepRolAtamaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { kisiAdi, rolAdi, baslamaTarihi, bitisTarihi, ciftImza, ekstraImza } =
    values;

  let ekstraImzaArray: string[] = [];
  if (ekstraImza === undefined) {
    ekstraImzaArray = [];
  } else {
    ekstraImzaArray = ekstraImza.map((ekstraImza) => ekstraImza.value);
  }

  const rolAtama: RolAtamaClientType = {
    kisiAdi,
    rolAdi,
    rolBaslangicTarihi: baslamaTarihi.toISOString(),
    rolBitisTarihi: bitisTarihi.toISOString(),
  };

  const rolAtamaRequest: RolAtamaRequestType = {
    rolAtama,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await FetcherPost(
    "/Talep/rol-atama",
    session?.token,
    JSON.stringify(rolAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
// #endregion

// #region TalepRolCikarma
type RolCikarmaRequestType = {
  talepEdenKisiId: number;
  rolCikarma: RolCikarmaClientType;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function rolCikarma(
  values: z.infer<typeof talepRolCikarmaSchema>
) {
  const session = await auth();

  const validateFields = talepRolCikarmaSchema.safeParse(values);

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

  const rolCikarma: RolCikarmaClientType = {
    kisiAdi,
    rolAdi,
    rolCikarmaTarihi: bitisTarihi.toISOString(),
  };

  const rolCikarmaRequest: RolCikarmaRequestType = {
    talepEdenKisiId: session?.user.id,
    rolCikarma: rolCikarma,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await FetcherPost(
    "/Talep/rol-cikarma",
    session?.token,
    JSON.stringify(rolCikarmaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
// #endregion

// #region TalepRolYetki
type RolYetkiRequestType = {
  rolAdi: string;
  yetkiAdi: string;
  eylemTuru: string;
  baslamaTarihi: string;
  bitisTarihi: string;
  ciftImza: boolean;
  ekstraImza: string[];
};
export async function rolYetkiPost(values: z.infer<typeof rolYetkiSchema>) {
  const session = await auth();

  const validateFields = rolYetkiSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    rolAdi,
    yetkiAdi,
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

  // const rolAtama: RolAtamaClient = {
  //   kisiAdi,
  //   rolAdi,
  //   rolBaslangicTarihi: baslamaTarihi.toISOString(),
  //   rolBitisTarihi: bitisTarihi.toISOString(),
  // };

  const rolYetkiRequest: RolYetkiRequestType = {
    rolAdi: rolAdi,
    yetkiAdi: yetkiAdi,
    eylemTuru: eylemTuru,
    baslamaTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await FetcherPost(
    "/Talep/rol-yetki",
    session?.token,
    JSON.stringify(rolYetkiRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}

// #endregion
