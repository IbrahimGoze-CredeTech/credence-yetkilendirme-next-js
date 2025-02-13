"use server";

import { CurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import type {
  IPreviousKisiSayfaAtama,
  IPreviousKisiSayfaCikarma,
  IPreviousKisiSayfaEdit,
  IPreviousKisiYetkiEdit,
  IPreviousRolAtama,
  IPreviousRolCikarma,
  IPreviousRolSayfaAtama,
  IPreviousRolSayfaCikarma,
  IPreviousRolYetkiEdit,
} from "@/types";

export async function PreviousRolAtama(): Promise<IPreviousRolAtama[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolAtamalar = await db.$queryRaw<IPreviousRolAtama[]>`
      EXEC PreviousRolAtamas @KisiId = ${+kisi.id}`;

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
    console.error(e);
    return [];
  }
}

export async function PreviousRolCikarma(): Promise<IPreviousRolCikarma[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolCikarmalar = await db.$queryRaw<IPreviousRolCikarma[]>`
  EXEC PreviousRolCikarmas @KisiId = ${+kisi.id}`;

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
    console.error(error);
  }
  return [];
}

export async function PreviousKisiYetkiEdit(): Promise<
  IPreviousKisiYetkiEdit[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiYetkiEdit = await db.$queryRaw<IPreviousKisiYetkiEdit[]>`
  EXEC PreviousKisiYetkiEdits @KisiId = ${+kisi.id}`;

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
    console.error(error);
  }
  return [];
}

export async function PreviousKisiSayfaEdit(): Promise<
  IPreviousKisiSayfaEdit[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousKisiSayfaEdit[]>`
  EXEC PreviousKisiSayfaEdits @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      KisiAdi: item.KisiAdi,
      SayfaRoute: item.SayfaRoute,
      IsPermitted: item.IsPermitted,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function PreviousKisiSayfaAtama(): Promise<
  IPreviousKisiSayfaAtama[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousKisiSayfaAtama[]>`
  EXEC PreviousKisiSayfaAtamas @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      KisiAdi: item.KisiAdi,
      SayfaRoute: item.SayfaRoute,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function PreviousKisiSayfaCikarma(): Promise<
  IPreviousKisiSayfaCikarma[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousKisiSayfaCikarma[]>`
  EXEC PreviousKisiSayfaCikarmas @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      KisiAdi: item.KisiAdi,
      SayfaRoute: item.SayfaRoute,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

// #region Rol Sayfa
export async function PreviousRolSayfaAtama(): Promise<
  IPreviousRolSayfaAtama[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousRolSayfaAtama[]>`
  EXEC PreviousRolSayfaAtamas @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      RolAdi: item.RolAdi,
      SayfaRoute: item.SayfaRoute,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function PreviousRolSayfaCikarma(): Promise<
  IPreviousRolSayfaCikarma[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousRolSayfaCikarma[]>`
  EXEC PreviousRolSayfaCikarmas @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      RolAdi: item.RolAdi,
      SayfaRoute: item.SayfaRoute,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}
// #endregion

export async function PreviousRolYetkiEdit(): Promise<IPreviousRolYetkiEdit[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdit = await db.$queryRaw<IPreviousRolYetkiEdit[]>`
  EXEC PreviousRolYetkiEdits @KisiId = ${+kisi.id}`;

    return kisiSayfaEdit.map((item) => ({
      RolAdi: item.RolAdi,
      YetkiAdi: item.YetkiAdi,
      EylemAdi: item.EylemAdi,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
      ImzaAd: item.ImzaAd,
      ImzaSoyad: item.ImzaSoyad,
      ImzaTarihi: item.ImzaTarihi,
      ImzaDurumu: item.ImzaDurumu,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}
