"use server";

import type { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  talepRolSayfaAtamaSchema,
  talepRolSayfaCikarmaSchema,
} from "@/schemas";
import { FetcherPost } from "@/utils";

// Rolleri ve ilişkili sayfa yollarını getiren bir fonksiyon
export async function RolAtanabilirSayfalar(rolAdi: string): Promise<string[]> {
  const rol = await db.rol.findUnique({
    where: { RolAdi: rolAdi },
    select: {
      RolSayfa: {
        select: {
          Sayfa: {
            select: {
              SayfaRoute: true,
            },
          },
        },
      },
    },
  });

  const rolSayfaRoutes =
    rol?.RolSayfa.map((rolSayfa) => rolSayfa.Sayfa?.SayfaRoute || "") || [];

  const sayfalar = await db.sayfa.findMany({ select: { SayfaRoute: true } });

  const sayfaRoutes = sayfalar.map((item) => item.SayfaRoute);

  // Filter the sayfalar array remove the sayfaRoute that are already assigned to the kisi (present in kisiSayfalar)
  const filteredSayfalar = sayfaRoutes.filter(
    (sayfaRoute) => !rolSayfaRoutes.includes(sayfaRoute)
  );

  return filteredSayfalar;
}

export async function RolCikarilabilirSayfalar(
  rolAdi: string
): Promise<string[]> {
  const rol = await db.rol.findUnique({
    where: { RolAdi: rolAdi },
    select: {
      RolSayfa: {
        select: {
          Sayfa: {
            select: {
              SayfaRoute: true,
            },
          },
        },
      },
    },
  });

  const rolSayfaRoutes =
    rol?.RolSayfa.map((rolSayfa) => rolSayfa.Sayfa?.SayfaRoute || "") || [];

  // const sayfalar = await db.sayfa.findMany({ select: { SayfaRoute: true } });

  // const sayfaRoutes = sayfalar.map((item) => item.SayfaRoute);

  // // Filter the sayfalar array remove the sayfaRoute that are already assigned to the kisi (present in kisiSayfalar)
  // const filteredSayfalar = sayfaRoutes.filter(
  //   (sayfaRoute) => !rolSayfaRoutes.includes(sayfaRoute)
  // );

  return rolSayfaRoutes;
}

// #region Post Requests
type RolSayfaRequestType = {
  rolAdi: string;
  sayfaRoute: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  ciftImza: boolean;
  ekstraImza: string[];
};
export async function rolSayfaAtamaPost(
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

  const rolSayfaAtamaRequest: RolSayfaRequestType = {
    rolAdi: rolAdi,
    sayfaRoute: sayfaRoute,
    baslangicTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  const response = await FetcherPost(
    "/Talep/rol-sayfa-atama",
    session?.token,
    JSON.stringify(rolSayfaAtamaRequest)
  );

  return { success: response.success, error: response.error };
}

export async function rolSayfaCikarmaPost(
  values: z.infer<typeof talepRolSayfaCikarmaSchema>
) {
  const session = await auth();

  const validateFields = talepRolSayfaCikarmaSchema.safeParse(values);

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

  const rolSayfaCikarmaRequest: RolSayfaRequestType = {
    rolAdi: rolAdi,
    sayfaRoute,
    baslangicTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  const response = await FetcherPost(
    "/Talep/rol-sayfa-cikarma",
    session?.token,
    JSON.stringify(rolSayfaCikarmaRequest)
  );

  return { success: response.success, error: response.error };
}
// #endregion
