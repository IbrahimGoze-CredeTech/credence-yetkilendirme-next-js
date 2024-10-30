"use server";

import { auth } from "@/auth";
import { YetkiSchema } from "@/schemas";
import { z } from "zod";
import { fetcherPost } from "@/utils";

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

  console.log("kisi: ", JSON.stringify(yetki));

  await fetcherPost("/Yetki", session?.token, JSON.stringify(yetki));
}
