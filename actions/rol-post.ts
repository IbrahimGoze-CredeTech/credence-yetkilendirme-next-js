"use server";

import { auth } from "@/auth";
import {
  RolYetkiSchema,
  TalepRolAtamaSchema,
  TalepRolCikarmaSchema,
} from "@/schemas";
import { RolAtamaClient, RolCikarmaClient } from "@/types";
import { fetcherPost } from "@/utils";
import { z } from "zod";

//#region TalepRolAtama
type RolAtamaRequest = {
  rolAtama: RolAtamaClient;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function rolAtama(values: z.infer<typeof TalepRolAtamaSchema>) {
  const session = await auth();

  const validateFields = TalepRolAtamaSchema.safeParse(values);

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

  const rolAtama: RolAtamaClient = {
    kisiAdi,
    rolAdi,
    rolBaslangicTarihi: baslamaTarihi.toISOString(),
    rolBitisTarihi: bitisTarihi.toISOString(),
  };

  const rolAtamaRequest: RolAtamaRequest = {
    rolAtama,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await fetcherPost(
    "/Talep/rol-atama",
    session?.token,
    JSON.stringify(rolAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
//#endregion

//#region TalepRolCikarma
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

  await fetcherPost(
    "/Talep/rol-cikarma",
    session?.token,
    JSON.stringify(rolCikarmaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
//#endregion

//#region TalepRolYetki
type RolYetkiRequest = {
  rolAdi: string;
  yetkiAdi: string;
  eylemTuru: string;
  baslamaTarihi: string;
  bitisTarihi: string;
  ciftImza: boolean;
  ekstraImza: string[];
};
export async function rolYetkiPost(values: z.infer<typeof RolYetkiSchema>) {
  const session = await auth();

  const validateFields = RolYetkiSchema.safeParse(values);

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

  const rolYetkiRequest: RolYetkiRequest = {
    rolAdi: rolAdi,
    yetkiAdi: yetkiAdi,
    eylemTuru: eylemTuru,
    baslamaTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await fetcherPost(
    "/Talep/rol-yetki",
    session?.token,
    JSON.stringify(rolYetkiRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}

//#endregion
