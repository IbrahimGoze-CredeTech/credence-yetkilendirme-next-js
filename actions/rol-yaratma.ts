"use server";

import { auth } from "@/auth";
import { RolSchema } from "@/schemas";
import { z } from "zod";
import { fetcherPost } from "@/utils";
import { db } from "@/lib/db";

export async function rolYaratma(values: z.infer<typeof RolSchema>) {
  const session = await auth();

  const validateFields = RolSchema.safeParse(values);

  if (!validateFields.success) {
    return { success: "", error: validateFields.error.errors[0].message };
  }

  const { rolAdi, supervizorRol } = values;
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
  };

  // const hashedPassword = await bcrypt.hash(kisiSifre, 10);
  // const kisi = {
  //   kisiAdi: kisiAdi,
  //   kisiSoyadi: kisiSoyadi,
  //   kullaniciAdi: kullaniciAdi,
  //   sifre: hashedPassword,
  // };
  console.log("kisi: ", JSON.stringify(rol));

  await fetcherPost("/Rol", session?.token, JSON.stringify(rol));
}
