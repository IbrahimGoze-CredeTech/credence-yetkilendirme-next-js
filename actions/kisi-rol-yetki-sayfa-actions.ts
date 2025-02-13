"use server";

import bcrypt from "bcryptjs";
import type { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  kisiSchema,
  kisiSilmeSchema,
  rolSchema,
  rolSilSchema,
  sayfaSchema,
  yetkiSchema,
} from "@/schemas";
import { FetcherPost } from "@/utils";

export async function yetkiYaratma(values: z.infer<typeof yetkiSchema>) {
  const session = await auth();

  const validateFields = yetkiSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { yetkiAdi } = values;

  const yetki = {
    yetkiAdi: yetkiAdi,
  };

  await FetcherPost("/Yetki", session?.token, JSON.stringify(yetki));
}

export async function yetkiSilme(values: z.infer<typeof yetkiSchema>) {
  const validateFields = yetkiSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  try {
    await db.yetki.update({
      where: {
        YetkiAdi: values.yetkiAdi,
      },
      data: {
        IsDeleted: true,
      },
    });
    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function SayfaYaratma(values: z.infer<typeof sayfaSchema>) {
  const session = await auth();

  const validateFields = sayfaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { sayfaRoute } = values;

  const yetki = {
    sayfaRoute: sayfaRoute,
  };

  const response = await FetcherPost(
    "/Sayfa",
    session?.token,
    JSON.stringify(yetki)
  );

  return { success: response.success, error: response.error };
}

export async function sayfaSilme(values: z.infer<typeof sayfaSchema>) {
  const validateFields = sayfaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  try {
    await db.sayfa.update({
      where: {
        SayfaRoute: values.sayfaRoute,
      },
      data: {
        IsDeleted: true,
      },
    });
    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: error };
  }
}

// #region Rol
export async function rolYaratma(values: z.infer<typeof rolSchema>) {
  const session = await auth();

  const validateFields = rolSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { rolAdi, supervizorRol, riskWeight } = values;
  // Find the rolId of the supervizorRol
  const supervizorRolObject = await db.rol.findFirst({
    where: {
      RolAdi: supervizorRol,
    },
  });

  const rol = {
    rolAdi: rolAdi,
    supervizorRolId: supervizorRolObject?.RolId,
    riskWeight: riskWeight,
  };

  const response = await FetcherPost(
    "/Rol",
    session?.token,
    JSON.stringify(rol)
  );

  return { success: response.success, error: response.error };
}

export async function rolSilme(values: z.infer<typeof rolSilSchema>) {
  const validateFields = rolSilSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  try {
    await db.rol.update({
      where: {
        RolAdi: values.rolAdi,
      },
      data: {
        IsDeleted: true,
      },
    });
    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: error };
  }
}
// #endregion

// #region Kisi
export async function kisiYaratma(values: z.infer<typeof kisiSchema>) {
  const session = await auth();

  const validateFields = kisiSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { kisiAdi, kisiSifre, kisiSoyadi, kullaniciAdi } = values;

  const hashedPassword = await bcrypt.hash(kisiSifre, 10);
  const kisi = {
    kisiAdi: kisiAdi,
    kisiSoyadi: kisiSoyadi,
    kullaniciAdi: kullaniciAdi,
    sifre: hashedPassword,
  };

  const response = await FetcherPost(
    "/Kisi",
    session?.token,
    JSON.stringify(kisi)
  );

  return { success: response.success, error: response.error };
}

export async function kisiSilme(values: z.infer<typeof kisiSilmeSchema>) {
  const validateFields = kisiSilmeSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  try {
    await db.kisi.update({
      where: { KullaniciAdi: values.kullaniciAdi },
      data: { IsDeleted: true },
    });
    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: error };
  }
}
// #endregion
