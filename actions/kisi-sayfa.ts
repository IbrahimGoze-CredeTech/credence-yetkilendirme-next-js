"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { fetcherGet } from "@/utils";

export async function kisininSayfalar(kisiName: string): Promise<string[]> {
  const session = await auth();

  //Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiSayfalar = await db.kisiSayfa.findMany({
    where: {
      KisiId: kisi?.KisiId,
    },
    select: {
      Sayfa: { select: { SayfaRoute: true } },
    },
  });

  const KisiRolSayfalar = await db.kisiRol.findMany({
    where: {
      KisiId: kisi?.KisiId,
    },
    select: {
      Rol: {
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
      },
    },
  });
  const sayfaRoutes = KisiRolSayfalar.flatMap(
    (rol) =>
      rol.Rol?.RolSayfa.map((rolSayfa) => rolSayfa.Sayfa?.SayfaRoute) || []
  );
  console.log("SayfaRoutes: ", sayfaRoutes);

  // const sayfalar = await fetcherGet(
  //   `/Sayfa/kisi-sayfa/${kisi?.KisiId}`,
  //   session?.token
  // );

  // const sayfa_adları = sayfalar.map((sayfa: { sayfaAdi: string }) => sayfa.sayfaAdi);
  // return sayfa_adları;
  return [""];
}

export async function kisiAtanabilirSayfalar(
  kisiAd: string
): Promise<string[]> {
  const session = await auth();

  //Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiAd.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiSayfalar = await fetcherGet(
    `/Sayfa/kisi-sayfa/${kisi?.KisiId}`,
    session?.token
  );

  const sayfalar = await fetcherGet(`/Sayfa`, session?.token);

  // Filter the roller array to remove roles that are already assigned to the kisi (present in kisiRoller)
  const filteredSayfalar = sayfalar.filter(
    (sayfa: { sayfaAdi: string }) =>
      !kisiSayfalar.some(
        (kisiRol: { sayfaAdi: string }) => kisiRol.sayfaAdi === sayfa.sayfaAdi
      )
  );

  const filteredSayfalarNames = filteredSayfalar.map(
    (sayfa: { sayfaAdi: string }) => sayfa.sayfaAdi
  );
  return filteredSayfalarNames;
}
