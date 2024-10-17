import { TalepRolAtamaSchema } from "@/schemas";
import { RolAtama, Talep } from "@/types";
import { z } from "zod";

type RolAtamaRequest = {
  talep: Talep;
  rolAtama: RolAtama;
  ciftImza: boolean;
  ekstraImza: string[];
};

export async function rolAtama(values: z.infer<typeof TalepRolAtamaSchema>) {
  const validateFields = TalepRolAtamaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const {
    kisiAdi,
    rolAdi,
    rolBaslamaTarihi,
    rolBitisTarihi,
    ciftImza,
    ekstraImza,
  } = values;

  const ekstraImzaArray: string[] = ekstraImza.map(
    (ekstraImza) => ekstraImza.value
  );

  const talep: Talep = {
    // talepEdenKisiId: 1,
    // talepId: 0,
    olusturulmaTarihi: "2024-10-14T09:13:38.191Z",
    durum: "",
    durumTarihi: "2024-10-14T09:13:38.191Z",
    talepEdenKisiAdi: "",
  };

  const rolAtama: RolAtama = {
    kisiAdi,
    rolAdi,
    rolBaslangicTarihi: rolBaslamaTarihi.toISOString(),
    rolBitisTarihi: rolBitisTarihi.toISOString(),
    // rolId: 0,
    // kisiId: 0,
  };

  const rolAtamaRequest: RolAtamaRequest = {
    talep,
    rolAtama,
    ciftImza: ciftImza,
    ekstraImza: ekstraImzaArray,
  };
  // console.log("rolAtamaRequest: ", rolAtamaRequest);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Talep/rol-atama`,
    // "https://localhost:7210/api/Talep/rol-atama",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rolAtamaRequest),
    }
  );
  if (!response.ok)
    return { success: "", error: "Network Response was not Ok" };
  return { success: "Talep Yaratıldı", error: "" };
}
