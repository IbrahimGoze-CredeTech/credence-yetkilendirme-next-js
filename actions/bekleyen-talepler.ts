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

export async function bekleyenTalepler(): Promise<ExpendedTalep[] | null> {
  // let talepler:Talep[];
  const kisi = await currentUser();

  if (!kisi) {
    return null;
  }
  // console.log("kisi: ", kisi);

  // Get All the imza with the KisiId Only if imza has a DurumId of 1
  const imzalar = await db.imza.findMany({
    where: {
      KisiId: kisi.KisiId,
      DurumId: 1,
    },
  });

  const expendedTalepler = await Promise.all(
    imzalar.map(async (imza) => {
      // Find the talep related to the imza
      const talep = await db.talep.findFirstOrThrow({
        where: { TalepId: imza.TalepId },
      });

      // Get all imzalar related to this talep
      const relatedImzalar = await db.imza.findMany({
        where: { TalepId: talep.TalepId },
      });

      // Find associated RolAtama (if any) for this talep
      const rolAtama = await db.rolAtama.findMany({
        where: { RolAtamaId: talep.TalepId },
      });

      // Find associated RolCikarma (if any) for this talep
      const rolCikarma = await db.rolCikarma.findMany({
        where: { RolCikarmaId: talep.TalepId },
      });

      // Build and return the ExpendedTalep object
      return {
        talep,
        imzalar: relatedImzalar,
        rolAtama: rolAtama.length > 0 ? rolAtama : undefined,
        rolCikarma: rolCikarma.length > 0 ? rolCikarma : undefined,
      } as ExpendedTalep;
    })
  );

  return expendedTalepler;
}

export async function bekleyenRolAtamalar(): Promise<RolAtamaGridType[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  console.log("kisi in  bekleyenRolAtamalar: ", kisi);

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
        rolAdi: rol?.RolAdi,
        kisiAdi: kisi?.Ad + " " + kisi?.Soyad,
        rolBaslangicTarihi: rolAtama.RolBaslangicTarihi,
        rolBitisTarihi: rolAtama.RolBitisTarihi,
      };
    })
  );

  return rolAtamalar;
}
