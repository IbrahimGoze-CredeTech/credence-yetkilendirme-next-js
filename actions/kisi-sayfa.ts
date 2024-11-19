"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { KisiSayfaFromType } from "@/types";
import { fetcherGet } from "@/utils";

export async function kisininSayfalar(
  kisiName: string
): Promise<KisiSayfaFromType[]> {
  const session = await auth();

  //Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });
  const pages: KisiSayfaFromType[] = await fetcherGet(
    `/Sayfa/kisi-sayfa/${kisi?.KisiId}`,
    session?.token
  );

  // const allPages = await db.sayfa.findMany();

  // Filter the roller array to remove roles that are already assigned to the kisi (present in kisiRoller)
  // const filteredPages = allPages.filter(
  //   (page) =>
  //     !pages.some((kisiRol) => kisiRol.sayfaRoute === page.SayfaRoute)
  // );

  const transformedArray = pages.map(({ sayfaRoute, isPermitted }) => ({
    sayfaRoute,
    isPermitted,
  }));

  // console.log(transformedArray);

  return transformedArray;
}

export async function kisiAtanabilirSayfalar(
  kisiAd: string
): Promise<KisiSayfaFromType[]> {
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

  // const sayfalar = await fetcherGet(`/Sayfa`, session?.token);

  const sayfalar = await db.sayfa.findMany();
  // console.log("sayfalar: ", sayfalar);

  // Filter the sayfalar array remove the sayfaRoute that are already assigned to the kisi (present in kisiSayfalar)
  const filteredSayfalar = sayfalar.filter(
    (sayfa: { SayfaRoute: string }) =>
      !kisiSayfalar.some(
        (kisiRol: { sayfaRoute: string }) =>
          kisiRol.sayfaRoute === sayfa.SayfaRoute
      )
  );

  // console.log("filtered Sayfalar: ", filteredSayfalar);

  return filteredSayfalar;
}
