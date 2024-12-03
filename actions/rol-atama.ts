// "use server";

// import { auth } from "@/auth";
// import { TalepRolAtamaSchema } from "@/schemas";
// import { RolAtamaClient } from "@/types";
// import { fetcherPost } from "@/utils";
// import { z } from "zod";

// type RolAtamaRequest = {
//   // talepEdenKisiId: number;
//   // talep: Talep;
//   rolAtama: RolAtamaClient;
//   ciftImza: boolean;
//   ekstraImza: string[];
// };

// export async function rolAtama(values: z.infer<typeof TalepRolAtamaSchema>) {
//   const session = await auth();

//   const validateFields = TalepRolAtamaSchema.safeParse(values);

//   if (!validateFields.success) {
//     return { success: "", error: validateFields.error.errors[0].message };
//   }

//   const { kisiAdi, rolAdi, baslamaTarihi, bitisTarihi, ciftImza, ekstraImza } =
//     values;

//   let ekstraImzaArray: string[] = [];
//   if (ekstraImza === undefined) {
//     ekstraImzaArray = [];
//   } else {
//     ekstraImzaArray = ekstraImza.map((ekstraImza) => ekstraImza.value);
//   }

//   // const talep: Talep = {
//   //   // talepEdenKisiId: 1,
//   //   // talepId: 0,
//   //   olusturulmaTarihi: "2024-10-14T09:13:38.191Z",
//   //   durum: "",
//   //   durumTarihi: "2024-10-14T09:13:38.191Z",
//   //   talepEdenKisiAdi: "",
//   // };

//   const rolAtama: RolAtamaClient = {
//     kisiAdi,
//     rolAdi,
//     rolBaslangicTarihi: baslamaTarihi.toISOString(),
//     rolBitisTarihi: bitisTarihi.toISOString(),
//     // rolId: 0,
//     // kisiId: 0,
//   };

//   const rolAtamaRequest: RolAtamaRequest = {
//     // talepEdenKisiId: session?.user.id,
//     // talep,
//     rolAtama,
//     ciftImza: ciftImza,
//     ekstraImza: ekstraImzaArray,
//   };

//   // console.log("session?.token: ", session?.user.id);

//   await fetcherPost(
//     "/Talep/rol-atama",
//     session?.token,
//     JSON.stringify(rolAtamaRequest)
//   );
//   return { success: "Talep Yaratıldı", error: "" };
// }
