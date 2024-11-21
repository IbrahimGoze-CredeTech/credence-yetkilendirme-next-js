"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  IPreviousKisiSayfaAtama,
  IPreviousKisiSayfaEdit,
  IPreviousKisiYetkiEdit,
  IPreviousRolAtama,
  IPreviousRolCikarma,
} from "@/types";

export async function PreviousRolAtama(): Promise<IPreviousRolAtama[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const rolAtamalar = await db.$queryRaw<IPreviousRolAtama[]>`
  EXEC GetPreviousRolAtamaDetails @UserId = ${+kisi.id}`;

  return rolAtamalar.map((item) => ({
    RolAdi: item.RolAdi,
    RolAtananAd: item.RolAtananAd,
    RolAtananSoyad: item.RolAtananSoyad,
    RolBaslangicTarihi: item.RolBaslangicTarihi,
    RolBitisTarihi: item.RolBitisTarihi,
    ImzaAd: item.ImzaAd,
    ImzaSoyad: item.ImzaSoyad,
    ImzaDurumTarihi: item.ImzaDurumTarihi,
    DurumAd: item.DurumAd,
  }));
}

export async function PreviousRolCikarma(): Promise<IPreviousRolCikarma[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const rolCikarmalar = await db.$queryRaw<IPreviousRolCikarma[]>`
  EXEC GetPreviousRolCikarmaDetails @UserId = ${+kisi.id}`;

  return rolCikarmalar.map((item) => ({
    RolCikarilanAd: item.RolCikarilanAd,
    RolCikarilanSoyad: item.RolCikarilanSoyad,
    RolAdi: item.RolAdi,
    RolCikarmaTarihi: item.RolCikarmaTarihi,
    ImzaAd: item.ImzaAd,
    ImzaSoyad: item.ImzaSoyad,
    ImzaTarihi: item.ImzaTarihi,
    ImzaDurumu: item.ImzaDurumu,
  }));
}

export async function PreviousKisiYetkiEdit(): Promise<
  IPreviousKisiYetkiEdit[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiYetkiEdit = await db.$queryRaw<IPreviousKisiYetkiEdit[]>`
  EXEC GetPreviousKisiYetkiEditDetails @UserId = ${+kisi.id}`;

  return kisiYetkiEdit.map((item) => ({
    Ad: item.Ad,
    Soyad: item.Soyad,
    YetkiAdi: item.YetkiAdi,
    EylemAdi: item.EylemAdi,
    YetkiBaslangicTarihi: item.YetkiBaslangicTarihi,
    YetkiBitisTarihi: item.YetkiBitisTarihi,
    ImzaAd: item.ImzaAd,
    ImzaSoyad: item.ImzaSoyad,
    ImzaTarihi: item.ImzaTarihi,
    ImzaDurumu: item.ImzaDurumu,
  }));
}

export async function PreviousKisiSayfaEdit(): Promise<
  IPreviousKisiSayfaEdit[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiSayfaEdit = await db.$queryRaw<IPreviousKisiSayfaEdit[]>`
  EXEC GetPreviousKisiSayfaEditDetails @KisiId = ${+kisi.id}`;

  return kisiSayfaEdit.map((item) => ({
    KisiAdi: item.KisiAdi,
    SayfaRoute: item.SayfaRoute,
    IsPermitted: item.IsPermitted,
    BaslangicTarihi: item.BaslangicTarihi,
    BitisTarihi: item.BitisTarihi,
  }));
}

export async function PreviousKisiSayfaAtama(): Promise<
  IPreviousKisiSayfaAtama[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  const kisiSayfaEdit = await db.$queryRaw<IPreviousKisiSayfaAtama[]>`
  EXEC GetPreviousKisiSayfaAtamaDetails @KisiId = ${+kisi.id}`;

  return kisiSayfaEdit.map((item) => ({
    KisiAdi: item.KisiAdi,
    SayfaRoute: item.SayfaRoute,
    BaslangicTarihi: item.BaslangicTarihi,
    BitisTarihi: item.BitisTarihi,
  }));
}
