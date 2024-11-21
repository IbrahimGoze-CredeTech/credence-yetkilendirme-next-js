"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  IWaitingKisiSayfaAtama,
  IWaitingKisiSayfaEdit,
  IWaitingKisiYetkiEdit,
  IWaitingRolAtama,
  IWaitingRolCikarma,
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

  // Get All the imza with the KisiId Only if imza has a DurumId of 1
  const imzalar = await db.imza.findFirst({
    where: {
      KisiId: +kisi.id,
      DurumId: 1,
    },
  });

  if (!imzalar) {
    return false;
  }
  return true;
}

export async function WaitingRolAtamalar(): Promise<IWaitingRolAtama[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const rolAtamalar = await db.$queryRaw<IWaitingRolAtama[]>`
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

export async function WaitingRolCikarmalar(): Promise<IWaitingRolCikarma[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  // Get All the imza with the KisiId Only if imza has a DurumId of 1
  const rolCikarmalar = await db.$queryRaw<IWaitingRolCikarma[]>`
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

export async function WaitingKisiYetkiEdit(): Promise<IWaitingKisiYetkiEdit[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiYetkiEdits = await db.$queryRaw<IWaitingKisiYetkiEdit[]>`
  EXEC GetWaitingKisiYetkiEdits @KisiId = ${+kisi.id}
`;

  return kisiYetkiEdits.map((item) => ({
    KisiYetkiEditId: item.KisiYetkiEditId,
    YetkiAdi: item.YetkiAdi,
    KisiAdi: item.KisiAdi,
    EylemTuruId: item.EylemTuruId,
    YetkiBaslamaTarihi: item.YetkiBaslamaTarihi,
    YetkiBitisTarihi: item.YetkiBitisTarihi,
  }));
}

export async function WaitingKisiSayfaEdit(): Promise<IWaitingKisiSayfaEdit[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiSayfaEdits = await db.$queryRaw<IWaitingKisiSayfaEdit[]>`
  EXEC GetWaitingKisiSayfaEdits @KisiId = ${+kisi.id}
`;

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

export async function WaitingKisiSayfaAtama(): Promise<
  IWaitingKisiSayfaAtama[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiSayfaAtama = await db.$queryRaw<IWaitingKisiSayfaAtama[]>`
  EXEC GetWaitingKisiSayfaAtamas @KisiId = ${+kisi.id}
`;

  return kisiSayfaAtama.map((item) => ({
    KisiSayfaAtamaId: item.KisiSayfaAtamaId,
    KisiId: item.KisiId,
    KisiAdi: item.KisiAdi,
    SayfaId: item.SayfaId,
    SayfaRoute: item.SayfaRoute,
    BaslangicTarihi: item.BaslangicTarihi,
    BitisTarihi: item.BitisTarihi,
  }));
}
