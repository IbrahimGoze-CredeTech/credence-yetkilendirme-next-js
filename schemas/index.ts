import * as z from "zod";

export const LoginSchema = z.object({
  name: z.string().min(1, { message: "email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Define a Zod schema for the Option interface
const OptionSchema = z.object({
  value: z.string().min(1, { message: "Value cannot be empty" }),
  label: z.string().optional(), // You mentioned you only need `value`, so `label` is optional
  disable: z.boolean().optional(),
  fixed: z.boolean().optional(),
});

export const TalepRolAtamaSchema = z.object({
  rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
  kisiAdi: z.string().min(1, { message: "Kisi adı boş olamaz" }),
  rolBaslamaTarihi: z.date({
    required_error: "Rol Baslangic tarihi girilmesi zorunludur.",
  }),
  rolBitisTarihi: z.date({
    required_error: "Rol Bitis tarihi girilmesi zorunludur.",
  }),
  ciftImza: z.boolean().default(false),
  ekstraImza: z.array(OptionSchema),
});
