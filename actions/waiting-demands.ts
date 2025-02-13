"use server";

import type { Imza, RolAtama, RolCikarma, Talep } from "@prisma/client";
import { CurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import type {
  IWaitingKisiSayfaAtama,
  IWaitingKisiSayfaCikarma,
  IWaitingKisiSayfaEdit,
  IWaitingKisiYetkiEditType,
  IWaitingRolAtamaType,
  IWaitingRolCikarmaType,
  IWaitingRolSayfaAtama,
  IWaitingRolSayfaCikarma,
  IWaitingRolYetkiEdit,
} from "@/types";

export type ExpendedTalepType = {
  talep: Talep;
  imzalar: Imza[];
  rolAtama?: RolAtama[];
  rolCikarma?: RolCikarma[];
};

// export async function bekleyenTalepler(): Promise<boolean> {
//   // let talepler:Talep[];
//   const kisi = await currentUser();

//   if (!kisi) {
//     return false;
//   }

//   // Get All the imza with the KisiId Only if imza has a DurumId of 1
//   const imzalar = await db.imza.findFirst({
//     where: {
//       KisiId: +kisi.id,
//       DurumId: 1,
//     },
//   });

//   if (!imzalar) {
//     return false;
//   }
//   return true;
// }

export async function WaitingRolAtamalar(): Promise<IWaitingRolAtamaType[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolAtamalar = await db.$queryRaw<IWaitingRolAtamaType[]>`
  EXEC WaitingRolAtamas @KisiId = ${+kisi.id}
`;

    return rolAtamalar.map((item) => ({
      RolAtamaId: item.RolAtamaId,
      RolAdi: item.RolAdi,
      KisiAdi: item.KisiAdi,
      RolBaslangicTarihi: item.RolBaslangicTarihi,
      RolBitisTarihi: item.RolBitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function WaitingRolCikarmalar(): Promise<
  IWaitingRolCikarmaType[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    // Get All the imza with the KisiId Only if imza has a DurumId of 1
    const rolCikarmalar = await db.$queryRaw<IWaitingRolCikarmaType[]>`
  EXEC WaitingRolCikarmas @KisiId = ${+kisi.id}
`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rolCikarmalar.map((item) => ({
      RolCikarmaId: item.RolCikarmaId,
      RolAdi: item.RolAdi,
      KisiAdi: item.KisiAdi,
      RolCikarmaTarihi: item.RolCikarmaTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function WaitingKisiYetkiEdit(): Promise<
  IWaitingKisiYetkiEditType[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiYetkiEdits = await db.$queryRaw<IWaitingKisiYetkiEditType[]>`
  EXEC WaitingKisiYetkiEdits @KisiId = ${+kisi.id}
`;

    return kisiYetkiEdits.map((item) => ({
      KisiYetkiEditId: item.KisiYetkiEditId,
      YetkiAdi: item.YetkiAdi,
      KisiAdi: item.KisiAdi,
      EylemTuruId: item.EylemTuruId,
      YetkiBaslamaTarihi: item.YetkiBaslamaTarihi,
      YetkiBitisTarihi: item.YetkiBitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function WaitingKisiSayfaEdit(): Promise<IWaitingKisiSayfaEdit[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaEdits = await db.$queryRaw<IWaitingKisiSayfaEdit[]>`
  EXEC WaitingKisiSayfaEdits @KisiId = ${+kisi.id}
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
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function WaitingKisiSayfaAtama(): Promise<
  IWaitingKisiSayfaAtama[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaAtama = await db.$queryRaw<IWaitingKisiSayfaAtama[]>`
  EXEC WaitingKisiSayfaAtamas @KisiId = ${+kisi.id}
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
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function WaitingKisiSayfaCikarma(): Promise<
  IWaitingKisiSayfaCikarma[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiSayfaAtama = await db.$queryRaw<IWaitingKisiSayfaCikarma[]>`
  EXEC WaitingKisiSayfaCikarmas @KisiId = ${+kisi.id}
`;

    return kisiSayfaAtama.map((item) => ({
      KisiSayfaCikarmaId: item.KisiSayfaCikarmaId,
      KisiId: item.KisiId,
      KisiAdi: item.KisiAdi,
      SayfaId: item.SayfaId,
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
export async function WaitingRolSayfaAtama(): Promise<IWaitingRolSayfaAtama[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolSayfaAtama = await db.$queryRaw<IWaitingRolSayfaAtama[]>`
  EXEC WaitingRolSayfaAtamas @KisiId = ${+kisi.id}
`;

    return rolSayfaAtama.map((item) => ({
      RolSayfaAtamaId: item.RolSayfaAtamaId,
      RolId: item.RolId,
      RolAdi: item.RolAdi,
      SayfaId: item.SayfaId,
      SayfaRoute: item.SayfaRoute,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function WaitingRolSayfaCikarma(): Promise<
  IWaitingRolSayfaCikarma[]
> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolSayfaAtama = await db.$queryRaw<IWaitingRolSayfaCikarma[]>`
  EXEC WaitingRolSayfaCikarmas @KisiId = ${+kisi.id}
`;

    return rolSayfaAtama.map((item) => ({
      RolSayfaCikarmaId: item.RolSayfaCikarmaId,
      RolId: item.RolId,
      RolAdi: item.RolAdi,
      SayfaId: item.SayfaId,
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

export async function WaitingRolYetkiEdit(): Promise<IWaitingRolYetkiEdit[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolYetkiEdit = await db.$queryRaw<IWaitingRolYetkiEdit[]>`
  EXEC WaitingRolYetkiEdits @KisiId = ${+kisi.id}
`;

    return rolYetkiEdit.map((item) => ({
      RolYetkiEditId: item.RolYetkiEditId,
      RolAdi: item.RolAdi,
      YetkiAdi: item.YetkiAdi,
      EylemTuruId: item.EylemTuruId,
      BaslangicTarihi: item.BaslangicTarihi,
      BitisTarihi: item.BitisTarihi,
    }));
  } catch (error) {
    console.error(error);
  }
  return [];
}
