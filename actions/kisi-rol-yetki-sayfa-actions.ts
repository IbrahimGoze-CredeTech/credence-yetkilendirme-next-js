"use server";

import { auth } from "@/auth";
import {
  KisiSchema,
  KisiSilmeSchema,
  RolSchema,
  RolSilSchema,
  SayfaSchema,
  YetkiSchema,
} from "@/schemas";
import { z } from "zod";
import { fetcherPost } from "@/utils";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function yetkiYaratma(values: z.infer<typeof YetkiSchema>) {
  const session = await auth();

  const validateFields = YetkiSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { yetkiAdi } = values;

  const yetki = {
    yetkiAdi: yetkiAdi,
  };

  // console.log("kisi: ", JSON.stringify(yetki));

  await fetcherPost("/Yetki", session?.token, JSON.stringify(yetki));
}

export async function yetkiSilme(values: z.infer<typeof YetkiSchema>) {
  const validateFields = YetkiSchema.safeParse(values);

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

export async function SayfaYaratma(values: z.infer<typeof SayfaSchema>) {
  const session = await auth();

  const validateFields = SayfaSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { sayfaRoute } = values;

  const yetki = {
    sayfaRoute: sayfaRoute,
  };

  const response = await fetcherPost(
    "/Sayfa",
    session?.token,
    JSON.stringify(yetki)
  );

  return { success: response.success, error: response.error };
}

export async function sayfaSilme(values: z.infer<typeof SayfaSchema>) {
  const validateFields = SayfaSchema.safeParse(values);

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

//#region Rol
export async function rolYaratma(values: z.infer<typeof RolSchema>) {
  const session = await auth();

  const validateFields = RolSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { rolAdi, supervizorRol, riskWeight } = values;
  // console.log("kisiAdi: ", kisiAdi);
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

  // console.log("kisi: ", JSON.stringify(rol));

  const response = await fetcherPost(
    "/Rol",
    session?.token,
    JSON.stringify(rol)
  );

  return { success: response.success, error: response.error };
}

export async function rolSilme(values: z.infer<typeof RolSilSchema>) {
  const validateFields = RolSilSchema.safeParse(values);

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
//#endregion

//#region Kisi
export async function kisiYaratma(values: z.infer<typeof KisiSchema>) {
  const session = await auth();

  const validateFields = KisiSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { kisiAdi, kisiSifre, kisiSoyadi, kullaniciAdi } = values;
  // console.log("kisiAdi: ", kisiAdi);

  const hashedPassword = await bcrypt.hash(kisiSifre, 10);
  const kisi = {
    kisiAdi: kisiAdi,
    kisiSoyadi: kisiSoyadi,
    kullaniciAdi: kullaniciAdi,
    sifre: hashedPassword,
  };
  // console.log("kisi: ", JSON.stringify(kisi));

  const response = await fetcherPost(
    "/Kisi",
    session?.token,
    JSON.stringify(kisi)
  );
  console.log("---response: ", response);

  return { success: response.success, error: response.error };
}

export async function kisiSilme(values: z.infer<typeof KisiSilmeSchema>) {
  const validateFields = KisiSilmeSchema.safeParse(values);

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
//#endregion
