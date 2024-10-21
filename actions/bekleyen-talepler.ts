"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { RolAtamaGridType } from "@/types";
import { Imza, RolAtama, RolCikarma, Talep } from "@prisma/client";

export type ExpendedTalep = {
  talep: Talep;
  imzalar: Imza[];
  rolAtama?: RolAtama[];
  rolCikarma?: RolCikarma[];
};

export async function bekleyenTalepler(): Promise<boolean> {
  // let talepler:Talep[];
  const kisi = await currentUser();

  if (!kisi) {
    return false;
  }
  // console.log("kisi: ", kisi);

  // Get All the imza with the KisiId Only if imza has a DurumId of 1
  const imzalar = await db.imza.findFirst({
    where: {
      KisiId: +kisi.id,
      DurumId: 1,
    },
  });
  // console.log("imzalar: ", imzalar);

  if (!imzalar) {
    return false;
  }
  return true;
}

export async function bekleyenRolAtamalar(): Promise<RolAtamaGridType[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  // console.log("kisi in  bekleyenRolAtamalar: ", kisi);

  // Get All the imza with the KisiId Only if imza has a DurumId of 1
  const imzalar = await db.imza.findMany({
    where: {
      KisiId: +kisi.id,
      DurumId: 1,
    },
  });

  const rolAtamalar = await Promise.all(
    imzalar.map(async (imza) => {
      const rolAtama = await db.rolAtama.findFirstOrThrow({
        where: {
          RolAtamaId: imza.TalepId,
        },
      });
      const kisi = await db.kisi.findFirst({
        where: {
          KisiId: rolAtama.KisiId,
        },
      });
      const rol = await db.rol.findFirst({
        where: {
          RolId: rolAtama.RolId,
        },
      });
      return {
        rolAtamaId: rolAtama.RolAtamaId,
        rolAdi: rol?.RolAdi,
        kisiAdi: kisi?.Ad + " " + kisi?.Soyad,
        rolBaslangicTarihi: rolAtama.RolBaslangicTarihi,
        rolBitisTarihi: rolAtama.RolBitisTarihi,
      };
    })
  );

  return rolAtamalar;
}
