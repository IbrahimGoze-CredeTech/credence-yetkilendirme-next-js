"use server";

import { auth } from "@/auth";
import { RolSchema, RolSilSchema } from "@/schemas";
import { z } from "zod";
import { fetcherPost } from "@/utils";
import { db } from "@/lib/db";

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
