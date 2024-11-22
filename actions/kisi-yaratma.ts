"use server";

import { auth } from "@/auth";
import { KisiSchema, KisiSilmeSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { fetcherPost } from "@/utils";
import { db } from "@/lib/db";

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

export async function GetKullaniciAdlari(): Promise<string[]> {
  const kullaniciAdlari = await db.kisi.findMany({
    select: {
      KullaniciAdi: true,
    },
  });

  const mappedKullaniciAdlari = kullaniciAdlari.map(
    (kullanici) => kullanici.KullaniciAdi ?? ""
  );
  // console.log("kullaniciAdlari: ", mappedKullaniciAdlari);
  return mappedKullaniciAdlari;
}
