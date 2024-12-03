"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { fetcherGet } from "@/utils";

export async function kisininYetkileri(
  kisiName: string
): Promise<{ yetkiAdi: string; eylemTuruId: number }[]> {
  const session = await auth();

  //Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiYetkiler: {
    ad: string;
    soyad: string;
    yetkiId: number;
    yetkiAdi: string;
    eylemTuruId: number;
    isDirect: boolean;
  }[] = await fetcherGet(`/Kisi/yetkiler/${kisi?.KisiId}`, session?.token);

  const allYetkiler = await db.yetki.findMany();

  const enrichedYetkiler = allYetkiler.map((yetki) => {
    if (kisiYetkiler.some((kisiYetki) => kisiYetki.yetkiId === yetki.YetkiId)) {
      return {
        yetkiAdi: yetki.YetkiAdi,
        eylemTuruId:
          kisiYetkiler.find((kisiYetki) => kisiYetki.yetkiId === yetki.YetkiId)
            ?.eylemTuruId ?? 3,
      };
    }
    return {
      yetkiAdi: yetki.YetkiAdi,
      eylemTuruId: 3, // Preserve original if present
    };
  });

  return enrichedYetkiler;
}

export async function kisiAtanabilirYetkiler(kisiName: string): Promise<[]> {
  const session = await auth();

  //Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiYetkiler = await fetcherGet(
    `/Kisi/atanabilir-yetkiler/${kisi?.KisiId}`,
    session?.token
  );

  return kisiYetkiler;
}
