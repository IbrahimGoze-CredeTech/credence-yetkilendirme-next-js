"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { TalepRolSayfaAtamaSchema } from "@/schemas";
import { fetcherPost } from "@/utils";
import { z } from "zod";

// Rolleri ve ilişkili sayfa yollarını getiren bir fonksiyon
export async function RoleAtanabilirSayfalar(
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

  const sayfalar = await db.sayfa.findMany({ select: { SayfaRoute: true } });

  const sayfaRoutes = sayfalar.map((item) => item.SayfaRoute);

  // Filter the sayfalar array remove the sayfaRoute that are already assigned to the kisi (present in kisiSayfalar)
  const filteredSayfalar = sayfaRoutes.filter(
    (sayfaRoute) => !rolSayfaRoutes.includes(sayfaRoute)
  );

  return filteredSayfalar;
}

//#region Post Requests
type RolSayfaAtamaRequest = {
  rolAdi: string;
  sayfaRoute: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  ciftImza: boolean;
  ekstraImza: string[];
};
export async function rolSayfaAtamaPost(
  values: z.infer<typeof TalepRolSayfaAtamaSchema>
) {
  const session = await auth();

  const validateFields = TalepRolSayfaAtamaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    rolAdi,
    SayfaRoute,
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

  const rolSayfaAtamaRequest: RolSayfaAtamaRequest = {
    rolAdi: rolAdi,
    sayfaRoute: SayfaRoute,
    baslangicTarihi: baslamaTarihi.toISOString(),
    bitisTarihi: bitisTarihi.toISOString(),
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  const response = await fetcherPost(
    "/Talep/rol-sayfa-atama",
    session?.token,
    JSON.stringify(rolSayfaAtamaRequest)
  );
  // console.log("response: ", response);

  return { success: response.message, error: "" };
}
//#endregion

// Belirli bir role ait sayfa yollarını getiren bir fonksiyon
// export async function rolunSayfalari(rolId: number): Promise<string[]> {
//   const rol = await db.rol.findUnique({
//     where: { rolId },
//     select: {
//       RolSayfa: {
//         select: {
//           Sayfa: {
//             select: {
//               SayfaRoute: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   // Sayfa yollarını bir dizi olarak döndür
//   const sayfaRoutes = rol?.RolSayfa.map(
//     (rolSayfa) => rolSayfa.Sayfa?.SayfaRoute || ""
//   );

//   console.log(`Rol (${rolId}) Sayfa Yolları:`, sayfaRoutes);
//   return sayfaRoutes || [];
// }
