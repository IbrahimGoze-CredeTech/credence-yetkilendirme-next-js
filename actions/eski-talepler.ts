"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  PreviousKisiSayfaEditDetails,
  PreviousKisiYetkiEditDetails,
  PreviousRolAtamaDetails,
  PreviousRolCikarmaDetails,
} from "@/types";

export async function GetPreviousRolAtamaDetails(): Promise<
  PreviousRolAtamaDetails[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const rolAtamalar = await db.$queryRaw<PreviousRolAtamaDetails[]>`
  EXEC GetPreviousRolAtamaDetails @UserId = ${+kisi.id}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rolAtamalar.map((item: any) => ({
    rolAdi: item.RolAdi,
    rolAtananAd: item.RolAtananAd,
    rolAtananSoyad: item.RolAtananSoyad,
    rolBaslangicTarihi: item.RolBaslangicTarihi,
    rolBitisTarihi: item.RolBitisTarihi,
    imzaAd: item.ImzaAd,
    imzaSoyad: item.ImzaSoyad,
    imzaDurumTarihi: item.ImzaDurumTarihi,
    durumAd: item.DurumAd,
  }));
}

export async function GetPreviousRolCikarmaDetails(): Promise<
  PreviousRolCikarmaDetails[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const rolCikarmalar = await db.$queryRaw<PreviousRolCikarmaDetails[]>`
  EXEC GetPreviousRolCikarmaDetails @UserId = ${+kisi.id}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rolCikarmalar.map((item: any) => ({
    rolCikarilanAd: item.RolCikarilanAd,
    rolCikarilanSoyad: item.RolCikarilanSoyad,
    rolAdi: item.RolAdi,
    rolCikarmaTarihi: item.RolCikarmaTarihi,
    imzaAd: item.ImzaAd,
    imzaSoyad: item.ImzaSoyad,
    imzaTarihi: item.ImzaTarihi,
    imzaDurumu: item.ImzaDurumu,
  }));
}

export async function GetPreviousKisiYetkiEditDetails(): Promise<
  PreviousKisiYetkiEditDetails[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiYetkiEdit = await db.$queryRaw<PreviousKisiYetkiEditDetails[]>`
  EXEC GetPreviousKisiYetkiEditDetails @UserId = ${+kisi.id}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return kisiYetkiEdit.map((item: any) => ({
    ad: item.Ad,
    soyad: item.Soyad,
    yetkiAdi: item.YetkiAdi,
    eylemAdi: item.EylemAdi,
    yetkiBaslangicTarihi: item.YetkiBaslangicTarihi,
    yetkiBitisTarihi: item.YetkiBitisTarihi,
    imzaAd: item.ImzaAd,
    imzaSoyad: item.ImzaSoyad,
    imzaTarihi: item.ImzaTarihi,
    imzaDurumu: item.ImzaDurumu,
  }));
}

export async function GetPreviousKisiSayfaEditDetails(): Promise<
  PreviousKisiSayfaEditDetails[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiSayfaEdit = await db.$queryRaw<PreviousKisiSayfaEditDetails[]>`
  EXEC GetPreviousKisiSayfaEditDetails @KisiId = ${+kisi.id}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return kisiSayfaEdit.map((item: any) => ({
    kisiAdi: item.KisiAdi,
    sayfaRoute: item.SayfaRoute,
    isPermitted: item.IsPermitted,
    baslangicTarihi: item.BaslangicTarihi,
    bitisTarihi: item.BitisTarihi,
  }));
}
