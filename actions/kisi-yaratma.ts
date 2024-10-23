"use server";

import { auth } from "@/auth";
import { KisiSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { fetcherPost } from "@/utils";

export async function kisiYaratma(values: z.infer<typeof KisiSchema>) {
  const session = await auth();

  const validateFields = KisiSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { kisiAdi, kisiSifre, kisiSoyadi, kullaniciAdi } = values;
  console.log("kisiAdi: ", kisiAdi);

  const hashedPassword = await bcrypt.hash(kisiSifre, 10);
  const kisi = {
    kisiAdi: kisiAdi,
    kisiSoyadi: kisiSoyadi,
    kullaniciAdi: kullaniciAdi,
    sifre: hashedPassword,
  };
  console.log("kisi: ", JSON.stringify(kisi));

  await fetcherPost("/Kisi", session?.token, JSON.stringify(kisi));
}
