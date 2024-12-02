"use server";

import { db } from "@/lib/db";

export async function rolunYetkileri(
  rolName: string
): Promise<{ yetkiAdi: string; eylemTuruId: number }[]> {
  const roleYetkis = await db.rolYetkiView.findMany({
    orderBy: { RolId: "asc" },
  });
  // Filter the roleYetkis to get the ones that match the rolName
  const roleYetkisFiltered = roleYetkis.filter(
    (roleYetki) => roleYetki.RolAdi === rolName
  );
  // Map the filtered roleYetkis to get the yetkiAdi and eylemTuruId
  const roleYetkisMapped = roleYetkisFiltered.map((roleYetki) => ({
    yetkiAdi: roleYetki.YetkiAdi,
    eylemTuruId: roleYetki.EylemlerTuruId,
  }));
  console.log("roleYetkis: ", roleYetkisMapped);
  return roleYetkisMapped;

  // const session = await auth();

  // //Get the kisi surname from the name by splinting the spaces
  // const kisiNameArray = kisiName.split(" ");
  // const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  // const kisi = await db.kisi.findFirst({
  //   where: {
  //     Soyad: kisiSurname,
  //   },
  // });

  // const kisiYetkiler: {
  //   ad: string;
  //   soyad: string;
  //   yetkiId: number;
  //   yetkiAdi: string;
  //   eylemTuruId: number;
  //   isDirect: boolean;
  // }[] = await fetcherGet(`/Kisi/yetkiler/${kisi?.KisiId}`, session?.token);
  // // console.log("kisiYetkiler: ", kisiYetkiler);

  // const allYetkiler = await db.yetki.findMany();

  // const enrichedYetkiler = allYetkiler.map((yetki) => {
  //   if (kisiYetkiler.some((kisiYetki) => kisiYetki.yetkiId === yetki.YetkiId)) {
  //     return {
  //       yetkiAdi: yetki.YetkiAdi,
  //       eylemTuruId:
  //         kisiYetkiler.find((kisiYetki) => kisiYetki.yetkiId === yetki.YetkiId)
  //           ?.eylemTuruId ?? 3,
  //     };
  //   }
  //   return {
  //     yetkiAdi: yetki.YetkiAdi,
  //     eylemTuruId: 3, // Preserve original if present
  //   };
  // });

  // // console.log("Enriched Yetkiler: ", enrichedYetkiler);
  // return enrichedYetkiler;
}
