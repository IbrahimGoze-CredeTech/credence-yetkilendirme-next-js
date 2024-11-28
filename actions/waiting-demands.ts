"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  IWaitingKisiSayfaAtama,
  IWaitingKisiSayfaCikarma,
  IWaitingKisiSayfaEdit,
  IWaitingKisiYetkiEdit,
  IWaitingRolAtama,
  IWaitingRolCikarma,
  IWaitingRolSayfaAtama,
  IWaitingRolSayfaCikarma,
} from "@/types";
import { Imza, RolAtama, RolCikarma, Talep } from "@prisma/client";

export type ExpendedTalep = {
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

export async function WaitingRolAtamalar(): Promise<IWaitingRolAtama[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolAtamalar = await db.$queryRaw<IWaitingRolAtama[]>`
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
    console.log(error);
  }
  return [];
}

export async function WaitingRolCikarmalar(): Promise<IWaitingRolCikarma[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    // Get All the imza with the KisiId Only if imza has a DurumId of 1
    const rolCikarmalar = await db.$queryRaw<IWaitingRolCikarma[]>`
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
    console.log(error);
  }
  return [];
}

export async function WaitingKisiYetkiEdit(): Promise<IWaitingKisiYetkiEdit[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const kisiYetkiEdits = await db.$queryRaw<IWaitingKisiYetkiEdit[]>`
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
    console.log(error);
  }
  return [];
}

export async function WaitingKisiSayfaEdit(): Promise<IWaitingKisiSayfaEdit[]> {
  const kisi = await currentUser();

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
    console.log(error);
  }
  return [];
}

export async function WaitingKisiSayfaAtama(): Promise<
  IWaitingKisiSayfaAtama[]
> {
  const kisi = await currentUser();

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
    console.log(error);
  }
  return [];
}

export async function WaitingKisiSayfaCikarma(): Promise<
  IWaitingKisiSayfaCikarma[]
> {
  const kisi = await currentUser();

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
    console.log(error);
  }
  return [];
}

//#region Rol Sayfa
export async function WaitingRolSayfaAtama(): Promise<IWaitingRolSayfaAtama[]> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolSayfaAtama = await db.$queryRaw<IWaitingRolSayfaAtama[]>`
  EXEC WaitingRolSayfaAtamas @KisiId = ${+kisi.id}
`;

    console.log(rolSayfaAtama);

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
    console.log(error);
  }
  return [];
}

export async function WaitingRolSayfaCikarma(): Promise<
  IWaitingRolSayfaCikarma[]
> {
  const kisi = await currentUser();

  if (!kisi) {
    return [];
  }

  try {
    const rolSayfaAtama = await db.$queryRaw<IWaitingRolSayfaCikarma[]>`
  EXEC WaitingRolSayfaCikarmas @KisiId = ${+kisi.id}
`;

    // console.log(rolSayfaAtama);

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
    console.log(error);
  }
  return [];
}
//#endregion
