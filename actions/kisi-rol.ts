"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { fetcherGet } from "@/utils";

export async function kisininRolleri(kisiName: string): Promise<string[]> {
  const session = await auth();

  //Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const roller = await fetcherGet(
    `/Kisi/roller/${kisi?.KisiId}`,
    session?.token
  );

  const rol_adları = roller.map((rol: { rolAdi: string }) => rol.rolAdi);
  return rol_adları;
}

export async function kisiAtanabilirRoller(
  kisiName: string
): Promise<string[]> {
  const session = await auth();

  //Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiRoller = await fetcherGet(
    `/Kisi/roller/${kisi?.KisiId}`,
    session?.token
  );

  const roller = await fetcherGet(`/Rol`, session?.token);

  // Filter the roller array to remove roles that are already assigned to the kisi (present in kisiRoller)
  const filteredRoller = roller.filter(
    (rol: { rolAdi: string }) =>
      !kisiRoller.some(
        (kisiRol: { rolAdi: string }) => kisiRol.rolAdi === rol.rolAdi
      )
  );

  const filteredRollerNames = filteredRoller.map(
    (rol: { rolAdi: string }) => rol.rolAdi
  );
  return filteredRollerNames;
}
