"use server";

import type { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  talepKisiSayfaAtamaSchema,
  talepKisiSayfaCikarmaSchema,
  talepKisiSayfaEditSchema,
} from "@/schemas";
import type { KisiSayfaFromType } from "@/types";
import { FetcherGet, FetcherPost } from "@/utils";

type KisiSayfaType = {
  kisiId: number;
  kisiAd: string;
  kisiSoyad: string;
  sayfaRoute: string;
  isPermitted: boolean;
};

export async function kisininSayfalar(
  kisiName: string
): Promise<KisiSayfaFromType[]> {
  const session = await auth();

  // Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });
  const pages: KisiSayfaFromType[] = await FetcherGet(
    `/Sayfa/kisi-sayfa/${kisi?.KisiId}`,
    session?.token
  );

  const transformedArray = pages.map(({ sayfaRoute, isPermitted }) => ({
    sayfaRoute,
    isPermitted,
  }));

  return transformedArray;
}

export async function kisiAtanabilirSayfalar(
  kisiAd: string
): Promise<string[]> {
  const session = await auth();

  // Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiAd.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiSayfalar: KisiSayfaType[] = await FetcherGet(
    `/Sayfa/kisi-sayfa/${kisi?.KisiId}`,
    session?.token
  );

  const kisiSayfaRoutes = kisiSayfalar.map((item) => item.sayfaRoute);

  const sayfalar = await db.sayfa.findMany({ select: { SayfaRoute: true } });

  const sayfaRoutes = sayfalar.map((item) => item.SayfaRoute);

  // Filter the sayfalar array remove the sayfaRoute that are already assigned to the kisi (present in kisiSayfalar)
  const filteredSayfalar = sayfaRoutes.filter(
    (sayfaRoute) => !kisiSayfaRoutes.includes(sayfaRoute)
  );

  return filteredSayfalar;
}

export async function kisiCikarilabilirSayfalar(
  kisiAd: string
): Promise<string[]> {
  const session = await auth();

  // Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiAd.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiSayfalar: KisiSayfaType[] = await FetcherGet(
    `/Sayfa/kisi-sayfa/${kisi?.KisiId}`,
    session?.token
  );

  const kisiSayfaRoutes = kisiSayfalar.map((item) => item.sayfaRoute);

  return kisiSayfaRoutes;
}

// #region Post Requests

export async function kisiSayfaEditPost(
  values: z.infer<typeof talepKisiSayfaEditSchema>
) {
  type KisiSayfaEditRequestType = {
    kisiAdi: string;
    sayfaRoute: string;
    isPermitted: boolean;
    baslangicTarihi: string;
    bitisTarihi: string;
    ciftImza: boolean;
    ekstraImza: string[];
  };

  const session = await auth();

  const validateFields = talepKisiSayfaEditSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    kisiAdi,
    sayfaRoute,
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

  const kisiSayfaEditRequest: KisiSayfaEditRequestType = {
    kisiAdi: kisiAdi,
    sayfaRoute,
    isPermitted: isPermitted,
    baslangicTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  await FetcherPost(
    "/Talep/kisi-sayfa-edit",
    session?.token,
    JSON.stringify(kisiSayfaEditRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}

export async function kisiSayfaAtamaPost(
  values: z.infer<typeof talepKisiSayfaAtamaSchema>
) {
  type KisiSayfaAtamaRequestType = {
    kisiAdi: string;
    sayfaRoute: string;
    baslangicTarihi: string;
    bitisTarihi: string;
    ciftImza: boolean;
    ekstraImza: string[];
  };

  const session = await auth();

  const validateFields = talepKisiSayfaAtamaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    kisiAdi,
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

  const kisiSayfaAtamaRequest: KisiSayfaAtamaRequestType = {
    kisiAdi: kisiAdi,
    sayfaRoute,
    baslangicTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  const response = await FetcherPost(
    "/Talep/kisi-sayfa-atama",
    session?.token,
    JSON.stringify(kisiSayfaAtamaRequest)
  );

  return { success: response.success, error: response.error };
}

export async function kisiSayfaCikarmaPost(
  values: z.infer<typeof talepKisiSayfaCikarmaSchema>
) {
  type KisiSayfaCikarmaRequestType = {
    kisiAdi: string;
    sayfaRoute: string;
    baslangicTarihi: string;
    bitisTarihi: string;
    ciftImza: boolean;
    ekstraImza: string[];
  };

  const session = await auth();

  const validateFields = talepKisiSayfaCikarmaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    kisiAdi,
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

  const kisiSayfaAtamaRequest: KisiSayfaCikarmaRequestType = {
    kisiAdi: kisiAdi,
    sayfaRoute,
    baslangicTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  const response = await FetcherPost(
    "/Talep/kisi-sayfa-cikarma",
    session?.token,
    JSON.stringify(kisiSayfaAtamaRequest)
  );

  return { success: response.success, error: response.error };
}
// #endregion
