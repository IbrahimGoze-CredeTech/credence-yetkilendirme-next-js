"use server";

import { auth } from "@/auth";
import { TalepRolSayfaAtamaSchema } from "@/schemas";
import { RolSayfa } from "@/types";
import { fetcherPost } from "@/utils";
import { z } from "zod";

type SayfaAtamaRequest = {
  // talepEdenKisiId: number;
  // talep: Talep;
  sayfaAtama: RolSayfa;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function sayfaAtama(
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

  // const talep: Talep = {
  //   // talepEdenKisiId: 1,
  //   // talepId: 0,
  //   olusturulmaTarihi: "2024-10-14T09:13:38.191Z",
  //   durum: "",
  //   durumTarihi: "2024-10-14T09:13:38.191Z",
  //   talepEdenKisiAdi: "",
  // };

  const sayfaAtama: RolSayfa = {
    rolAdi,
    sayfaRoute: SayfaRoute,
    sayfaBaslangicTarihi: baslamaTarihi.toISOString(),
    sayfaBitisTarihi: bitisTarihi.toISOString(),
  };

  const sayfaAtamaRequest: SayfaAtamaRequest = {
    // talepEdenKisiId: session?.user.id,
    // talep,
    sayfaAtama,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };

  // console.log("session?.token: ", session?.user.id);

  await fetcherPost(
    "/Sayfa/rol-sayfa",
    session?.token,
    JSON.stringify(sayfaAtamaRequest)
  );
  return { success: "Talep Yaratıldı", error: "" };
}
