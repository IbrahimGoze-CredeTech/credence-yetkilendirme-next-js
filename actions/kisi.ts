"use server";

import { db } from "@/lib/db";

export async function GetKullaniciAdlari(): Promise<string[]> {
  const kullaniciAdlari = await db.kisi.findMany({
    select: {
      KullaniciAdi: true,
    },
  });

  const mappedKullaniciAdlari = kullaniciAdlari.map(
    (kullanici) => kullanici.KullaniciAdi ?? ""
  );
  // console.log("kullaniciAdlari: ", mappedKullaniciAdlari);
  return mappedKullaniciAdlari;
}
