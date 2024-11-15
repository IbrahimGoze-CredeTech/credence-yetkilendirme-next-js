"use server";

import { db } from "@/lib/db";

// Rolleri ve ilişkili sayfa yollarını getiren bir fonksiyon
export async function rollerVeSayfalar(): Promise<
  { rolId: number; rolAdi: string; sayfaRoute: string }[]
> {
  const roller = await db.rol.findMany({
    select: {
      RolId: true,
      RolAdi: true,
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

  // Rolleri ve ilişkili sayfa yollarını işleyip düz bir liste haline getir
  const rolSayfaListesi = roller.flatMap((rol) =>
    rol.RolSayfa.map((rolSayfa) => ({
      rolId: rol.RolId,
      rolAdi: rol.RolAdi,
      sayfaRoute: rolSayfa.Sayfa?.SayfaRoute || "",
    }))
  );

  console.log("Roller ve Sayfalar:", rolSayfaListesi);
  return rolSayfaListesi;
}

// Belirli bir role ait sayfa yollarını getiren bir fonksiyon
export async function rolunSayfalari(rolId: number): Promise<string[]> {
  const rol = await db.rol.findUnique({
    where: { rolId },
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

  // Sayfa yollarını bir dizi olarak döndür
  const sayfaRoutes = rol?.RolSayfa.map(
    (rolSayfa) => rolSayfa.Sayfa?.SayfaRoute || ""
  );

  console.log(`Rol (${rolId}) Sayfa Yolları:`, sayfaRoutes);
  return sayfaRoutes || [];
}
