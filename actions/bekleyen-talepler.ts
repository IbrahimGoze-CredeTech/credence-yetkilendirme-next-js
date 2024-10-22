"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  KisiYetkiEditGridType,
  RolAtamaGridType,
  RolCikarmaGridType,
} from "@/types";
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
      const rolAtama = await db.rolAtama.findFirst({
        where: {
          RolAtamaId: imza.TalepId,
        },
      });
      if (!rolAtama) return;
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
  return rolAtamalar.filter(
    (rolAtama): rolAtama is RolAtamaGridType => rolAtama !== undefined
  );
}

export async function bekleyenRolCikarmalar(): Promise<RolCikarmaGridType[]> {
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

  const rolCikarmalar = await Promise.all(
    imzalar.map(async (imza) => {
      const rolCikarma = await db.rolCikarma.findFirst({
        where: {
          RolCikarmaId: imza.TalepId,
        },
      });
      if (!rolCikarma) return;
      const kisi = await db.kisi.findFirst({
        where: {
          KisiId: rolCikarma.KisiId,
        },
      });
      const rol = await db.rol.findFirst({
        where: {
          RolId: rolCikarma.RolId,
        },
      });
      return {
        rolCikarmaId: rolCikarma.RolCikarmaId,
        rolAdi: rol?.RolAdi,
        kisiAdi: kisi?.Ad + " " + kisi?.Soyad,
        rolCikarmaTarihi: rolCikarma.RolCikarmaTarihi,
      };
    })
  );

  if (rolCikarmalar.length === 0) return [];

  return rolCikarmalar.filter(
    (rolCikarma): rolCikarma is RolCikarmaGridType => rolCikarma !== undefined
  );
}

export async function bekleyenKisiYetkiEdit(): Promise<
  KisiYetkiEditGridType[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const imzalar = await db.imza.findMany({
    where: {
      KisiId: +kisi.id,
      DurumId: 1,
    },
  });

  const kisiYetkiEdits = await Promise.all(
    imzalar.map(async (imza) => {
      const kisiYetki = await db.kisiYetkiEdit.findFirst({
        where: {
          KisiYetkiEditId: imza.TalepId,
        },
      });
      if (!kisiYetki) return;
      const kisi = await db.kisi.findFirst({
        where: {
          KisiId: kisiYetki.KisiId,
        },
      });
      const yetki = await db.yetki.findFirst({
        where: {
          YetkiId: kisiYetki.YetkiId,
        },
      });
      return {
        kisiYetkiEditId: kisiYetki.KisiYetkiEditId,
        yetkiAdi: yetki?.YetkiAdi,
        kisiAdi: kisi?.Ad + " " + kisi?.Soyad,
        eylemTuruId: kisiYetki.EylemTuruId,
        yetkiBaslamaTarihi: kisiYetki.YetkiBaslnagicTarihi,
        yetkiBitisTarihi: kisiYetki.YetkiBitisTarihi,
      };
    })
  );

  if (kisiYetkiEdits.length === 0) return [];

  return kisiYetkiEdits.filter(
    (kisiYetkiEdit): kisiYetkiEdit is KisiYetkiEditGridType =>
      kisiYetkiEdit !== undefined
  );
}
