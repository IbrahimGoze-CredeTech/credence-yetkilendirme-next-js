import * as z from "zod";

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
});
