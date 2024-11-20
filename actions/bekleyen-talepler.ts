"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  WaitingKisiSayfaEditGridType,
  WaitingKisiYetkiEditGridType,
  WaitingRolAtamaGridType,
  WaitingRolCikarmaGridType,
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

export async function GetWaitingRolAtamalar(): Promise<
  WaitingRolAtamaGridType[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  // console.log("kisi in  bekleyenRolAtamalar: ", kisi);
  const rolAtamalar = await db.$queryRaw<WaitingRolAtamaGridType[]>`
  EXEC GetWaitingRolAtamalar @KisiId = ${+kisi.id}
`;

  return rolAtamalar.map((item) => ({
    RolAtamaId: item.RolAtamaId,
    RolAdi: item.RolAdi,
    KisiAdi: item.KisiAdi,
    RolBaslangicTarihi: item.RolBaslangicTarihi,
    RolBitisTarihi: item.RolBitisTarihi,
  }));
}

export async function GetWaitingRolCikarmalar(): Promise<
  WaitingRolCikarmaGridType[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  // console.log("kisi in  bekleyenRolAtamalar: ", kisi);

  // Get All the imza with the KisiId Only if imza has a DurumId of 1
  const rolCikarmalar = await db.$queryRaw<WaitingRolCikarmaGridType[]>`
  EXEC GetWaitingRolCikarmalar @KisiId = ${+kisi.id}
`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rolCikarmalar.map((item) => ({
    RolCikarmaId: item.RolCikarmaId,
    RolAdi: item.RolAdi,
    KisiAdi: item.KisiAdi,
    RolCikarmaTarihi: item.RolCikarmaTarihi,
  }));
}

export async function GetWaitingKisiYetkiEdit(): Promise<
  WaitingKisiYetkiEditGridType[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiYetkiEdits = await db.$queryRaw<WaitingKisiYetkiEditGridType[]>`
  EXEC GetWaitingKisiYetkiEdits @KisiId = ${+kisi.id}
`;

  // console.log("kisiYetkiEdits: ", kisiYetkiEdits);

  return kisiYetkiEdits.map((item) => ({
    KisiYetkiEditId: item.KisiYetkiEditId,
    YetkiAdi: item.YetkiAdi,
    KisiAdi: item.KisiAdi,
    EylemTuruId: item.EylemTuruId,
    YetkiBaslamaTarihi: item.YetkiBaslamaTarihi,
    YetkiBitisTarihi: item.YetkiBitisTarihi,
  }));
}

export async function GetWaitingKisiSayfaEdit(): Promise<
  WaitingKisiSayfaEditGridType[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiSayfaEdits = await db.$queryRaw<WaitingKisiSayfaEditGridType[]>`
  EXEC GetWaitingKisiSayfaEdits @KisiId = ${+kisi.id}
`;

  // console.log("kisiYetkiEdits: ", kisiYetkiEdits);

  return kisiSayfaEdits.map((item) => ({
    KisiSayfaEditId: item.KisiSayfaEditId,
    KisiId: item.KisiId,
    KisiAdi: item.KisiAdi,
    SayfaId: item.SayfaId,
    SayfaRoute: item.SayfaRoute,
    IsPermitted: item.IsPermitted,
    BaslangicTarihi: item.BaslangicTarihi,
    BitisTarihi: item.BitisTarihi,
  }));
}
