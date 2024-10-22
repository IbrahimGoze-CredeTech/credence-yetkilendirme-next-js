import * as z from "zod";

// Define a Zod schema for the Option interface
const OptionSchema = z.object({
  value: z.string().min(1, { message: "Value cannot be empty" }),
  label: z.string().optional(), // You mentioned you only need `value`, so `label` is optional
  disable: z.boolean().optional(),
  fixed: z.boolean().optional(),
});

//#region Common Schemas
const KisiFieldSchema = z.object({
  kisiAdi: z.string().min(1, { message: "Kisi adı boş olamaz" }),
});

const BaslamaTarihiFieldSchema = z.object({
  baslamaTarihi: z.date({
    required_error: "Başlangıç tarihi girilmesi zorunludur.",
  }),
});

const BitisTarihiFieldSchema = z.object({
  bitisTarihi: z.date({
    required_error: "Bitiş tarihi girilmesi zorunludur.",
  }),
});

const CiftImzaFieldSchema = z.object({
  ciftImza: z.boolean().default(false),
});

const EkstraImzaFieldSchema = z.object({
  ekstraImza: z.array(OptionSchema).optional(),
});
//#endregion

export const LoginSchema = z.object({
  name: z.string().min(2, { message: "email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
});

export const TalepRolAtamaSchema = KisiFieldSchema.merge(
  BaslamaTarihiFieldSchema
)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .extend({
    rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
  });
// export const TalepRolAtamaSchema = z.object({
//   rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
//   kisiAdi: z.string().min(1, { message: "Kisi adı boş olamaz" }),
//   rolBaslamaTarihi: z.date({
//     required_error: "Rol Baslangic tarihi girilmesi zorunludur.",
//   }),
//   rolBitisTarihi: z.date({
//     required_error: "Rol Bitis tarihi girilmesi zorunludur.",
//   }),
//   ciftImza: z.boolean().default(false),
//   ekstraImza: z.array(OptionSchema),
// });

export const YetkiEditSchema = KisiFieldSchema.merge(BaslamaTarihiFieldSchema)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .extend({
    yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
    eylemTuru: z.string().min(1, { message: "Eylem türü boş olamaz" }),
  });
// export const YetkiEditSchema = z.object({
//   kisiAdi: z.string().min(1, { message: "Kisi adı boş olamaz" }),
//   yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
//   yetkiBaslamaTarihi: z.date({
//     required_error: "Yetki Baslangic tarihi girilmesi zorunludur.",
//   }),
//   yetkiBitisTarihi: z.date({
//     required_error: "Yetki Bitis tarihi girilmesi zorunludur.",
//   }),
//   // eylemTuru: z.nativeEnum(EylemTuruEnum),
//   eylemTuru: z.string().min(1, { message: "Eylem türü boş olamaz" }),
//   ciftImza: z.boolean().default(false),
//   ekstraImza: z.array(OptionSchema).optional(),
// });

export const TalepRolCikarmaSchema = KisiFieldSchema.merge(
  BitisTarihiFieldSchema
)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .extend({
    rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
  });
// export const TalepRolCikarmaSchema = z.object({
//   rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
//   kisiAdi: z.string().min(1, { message: "Kisi adı boş olamaz" }),
//   rolBaslamaTarihi: z.date({
//     required_error: "Rol Baslangic tarihi girilmesi zorunludur.",
//   }),
//   rolBitisTarihi: z.date({
//     required_error: "Rol Bitis tarihi girilmesi zorunludur.",
//   }),
//   ciftImza: z.boolean().default(false),
//   ekstraImza: z.array(OptionSchema),
// });
