import * as z from "zod";

// Define a Zod schema for the Option interface
const optionSchema = z.object({
  value: z.string().min(1, { message: "Value cannot be empty" }),
  label: z.string().optional(), // You mentioned you only need `value`, so `label` is optional
  disable: z.boolean().optional(),
  fixed: z.boolean().optional(),
});

// #region Common Schemas
const sayfaFieldSchema = z.object({
  sayfaRoute: z
    .string({ required_error: "Sayfa Adi Boş Olamaz" })
    .min(1, { message: "sayfa adı boş olamaz" }),
});
const kisiFieldSchema = z.object({
  kisiAdi: z.string().min(1, { message: "Kisi adı boş olamaz" }),
});
const rolFieldSchema = z.object({
  rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
});

const baslamaTarihiFieldSchema = z.object({
  baslamaTarihi: z.date({
    required_error: "Başlangıç tarihi girilmesi zorunludur.",
  }),
});

const bitisTarihiFieldSchema = z.object({
  bitisTarihi: z.date({
    required_error: "Bitiş tarihi girilmesi zorunludur.",
  }),
});

const ciftImzaFieldSchema = z.object({
  ciftImza: z.boolean().default(false),
});

const ekstraImzaFieldSchema = z.object({
  ekstraImza: z.array(optionSchema).optional(),
});
// #endregion

export const loginSchema = z.object({
  name: z.string().min(2, { message: "email is required" }),
  password: z.string().min(2, { message: "Password is required" }),
});

export const talepRolAtamaSchema = kisiFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .extend({
    rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
  });
export const talepKisiSayfaEditSchema = kisiFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .merge(sayfaFieldSchema)
  .extend({
    isPermitted: z.boolean().default(false),
  });

export const talepKisiSayfaAtamaSchema = kisiFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .merge(sayfaFieldSchema);

export const talepKisiSayfaCikarmaSchema = kisiFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .merge(sayfaFieldSchema);

export const talepRolSayfaAtamaSchema = rolFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .merge(sayfaFieldSchema);

export const talepRolSayfaCikarmaSchema = rolFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .merge(sayfaFieldSchema);

export const yetkiTalepSchema = kisiFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .extend({
    yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
    eylemTuru: z.string().min(1, { message: "Eylem türü boş olamaz" }),
  });

export const rolYetkiSchema = rolFieldSchema
  .merge(baslamaTarihiFieldSchema)
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .extend({
    yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
    eylemTuru: z.string().min(1, { message: "Eylem türü boş olamaz" }),
  });

// export const YetkiAtamaSchema = KisiFieldSchema.merge(BaslamaTarihiFieldSchema)
//   .merge(BitisTarihiFieldSchema)
//   .merge(CiftImzaFieldSchema)
//   .merge(EkstraImzaFieldSchema)
//   .extend({
//     yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
//   });

export const talepRolCikarmaSchema = kisiFieldSchema
  .merge(bitisTarihiFieldSchema)
  .merge(ciftImzaFieldSchema)
  .merge(ekstraImzaFieldSchema)
  .extend({
    rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
  });

export const kisiSchema = z.object({
  kisiAdi: z
    .string()
    .min(1, { message: "Kisi adı boş olamaz" })
    .max(20, { message: "Kisi adı 20 karakterden fazla olamaz" }),
  kisiSoyadi: z.string().min(1, { message: "Kisi soyadı boş olamaz" }),
  kullaniciAdi: z
    .string()
    .max(20, { message: "Kullanıcı adı 20 karakterden fazla olamaz" })
    .regex(/\./, { message: "Kullanıcı adı bir nokta içermelidir" }),
  kisiSifre: z.string().min(1, { message: "Kisi şifresi boş olamaz" }),
});

export const kisiSilmeSchema = z.object({
  kullaniciAdi: z
    .string()
    .max(20, { message: "Kullanıcı adı 20 karakterden fazla olamaz" })
    .regex(/\./, { message: "Kullanıcı adı bir nokta içermelidir" }),
});

export const rolSchema = z.object({
  rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
  supervizorRol: z.string().min(1, { message: "Supervizor rol boş olamaz" }),
  riskWeight: z.string().refine((value) => {
    if (value === "") return true;
    return !isNaN(parseInt(value));
  }),

  // riskWeight: z
  //   .number()
  //   .int()
  //   .min(0, { message: "Risk weight must be positive" })
  //   .nullable(),
});

export const rolSilSchema = z.object({
  rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
});

export const yetkiSchema = z.object({
  yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
});

export const sayfaSchema = z.object({
  sayfaRoute: z
    .string()
    .min(1, { message: "Sayfa adı boş olamaz" })
    .transform((value) => (value.startsWith("/") ? value : `/${value}`)),
});
