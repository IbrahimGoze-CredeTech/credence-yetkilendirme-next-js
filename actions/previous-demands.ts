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

  try {
    const rolAtamalar = await db.$queryRaw<IPreviousRolAtama[]>`
      EXEC PreviousRolAtama @KisiId = ${+kisi.id}`;

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
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function PreviousRolCikarma(): Promise<IPreviousRolCikarma[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolCikarmalar = await db.$queryRaw<IPreviousRolCikarma[]>`
  EXEC PreviousRolCikarma @KisiId = ${+kisi.id}`;

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
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function PreviousKisiYetkiEdit(): Promise<
  IPreviousKisiYetkiEdit[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiYetkiEdit = await db.$queryRaw<IPreviousKisiYetkiEdit[]>`
  EXEC PreviousKisiYetkiEdit @KisiId = ${+kisi.id}`;

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
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function PreviousKisiSayfaEdit(): Promise<
  IPreviousKisiSayfaEdit[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousKisiSayfaEdit[]>`
  EXEC PreviousKisiSayfaEdit @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      KisiAdi: item.KisiAdi,
      SayfaRoute: item.SayfaRoute,
      IsPermitted: item.IsPermitted,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function PreviousKisiSayfaAtama(): Promise<
  IPreviousKisiSayfaAtama[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousKisiSayfaAtama[]>`
  EXEC PreviousKisiSayfaAtama @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      KisiAdi: item.KisiAdi,
      SayfaRoute: item.SayfaRoute,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.log(error);
  }
  return [];
}
