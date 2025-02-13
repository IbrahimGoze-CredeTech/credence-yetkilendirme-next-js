"use server";

import { db } from "@/lib/db";

export async function kisininRolleri(kisiName: string): Promise<string[]> {
  // Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const roller = await db.kisiRol
    .findMany({
      where: {
        KisiId: kisi?.KisiId,
      },
      select: {
        Rol: {
          select: {
            RolAdi: true,
          },
        },
      },
    })
    .then((data) => data.map((rol) => rol.Rol.RolAdi));

  return roller;
}

export async function kisiAtanabilirRoller(
  kisiName: string
): Promise<string[]> {
  // Get the kisi surname from the name by splinting the spaces
  const kisiNameArray = kisiName.split(" ");
  const kisiSurname = kisiNameArray[kisiNameArray.length - 1];
  const kisi = await db.kisi.findFirst({
    where: {
      Soyad: kisiSurname,
    },
  });

  const kisiRoller = await db.kisiRol
    .findMany({
      where: {
        KisiId: kisi?.KisiId,
      },
      select: {
        Rol: {
          select: {
            RolAdi: true,
          },
        },
      },
    })
    .then((data) => data.map((rol) => rol.Rol.RolAdi));

  const roller = await db.rol
    .findMany({
      select: {
        RolAdi: true,
      },
    })
    .then((data) => data.map((rol) => rol.RolAdi));

  const availableRoles = roller.filter((role) => !kisiRoller.includes(role));
  return availableRoles; // These are the roles not assigned to the Kisi
}
