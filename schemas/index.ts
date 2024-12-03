import * as z from "zod";

// Define a Zod schema for the Option interface
const OptionSchema = z.object({
  value: z.string().min(1, { message: "Value cannot be empty" }),
  label: z.string().optional(), // You mentioned you only need `value`, so `label` is optional
  disable: z.boolean().optional(),
  fixed: z.boolean().optional(),
});

//#region Common Schemas
const SayfaFieldSchema = z.object({
  SayfaRoute: z
    .string({ required_error: "Sayfa Adi Boş Olamaz" })
    .min(1, { message: "sayfa adı boş olamaz" }),
});
const KisiFieldSchema = z.object({
  kisiAdi: z.string().min(1, { message: "Kisi adı boş olamaz" }),
});
const RolFieldSchema = z.object({
  rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
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
export const TalepKisiSayfaEditSchema = KisiFieldSchema.merge(
  BaslamaTarihiFieldSchema
)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .merge(SayfaFieldSchema)
  .extend({
    isPermitted: z.boolean().default(false),
  });

export const TalepKisiSayfaAtamaSchema = KisiFieldSchema.merge(
  BaslamaTarihiFieldSchema
)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .merge(SayfaFieldSchema);

export const TalepKisiSayfaCikarmaSchema = KisiFieldSchema.merge(
  BaslamaTarihiFieldSchema
)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .merge(SayfaFieldSchema);

export const TalepRolSayfaAtamaSchema = RolFieldSchema.merge(
  BaslamaTarihiFieldSchema
)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .merge(SayfaFieldSchema);

export const TalepRolSayfaCikarmaSchema = RolFieldSchema.merge(
  BaslamaTarihiFieldSchema
)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .merge(SayfaFieldSchema);

export const YetkiTalepSchema = KisiFieldSchema.merge(BaslamaTarihiFieldSchema)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .extend({
    yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
    eylemTuru: z.string().min(1, { message: "Eylem türü boş olamaz" }),
  });

export const RolYetkiSchema = RolFieldSchema.merge(BaslamaTarihiFieldSchema)
  .merge(BitisTarihiFieldSchema)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
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

export const TalepRolCikarmaSchema = KisiFieldSchema.merge(
  BitisTarihiFieldSchema
)
  .merge(CiftImzaFieldSchema)
  .merge(EkstraImzaFieldSchema)
  .extend({
    rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
  });

export const KisiSchema = z.object({
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

export const KisiSilmeSchema = z.object({
  kullaniciAdi: z
    .string()
    .max(20, { message: "Kullanıcı adı 20 karakterden fazla olamaz" })
    .regex(/\./, { message: "Kullanıcı adı bir nokta içermelidir" }),
});

export const RolSchema = z.object({
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

export const RolSilSchema = z.object({
  rolAdi: z.string().min(1, { message: "Rol adı boş olamaz" }),
});

export const YetkiSchema = z.object({
  yetkiAdi: z.string().min(1, { message: "Yetki adı boş olamaz" }),
});

export const SayfaSchema = z.object({
  sayfaRoute: z
    .string()
    .min(1, { message: "Sayfa adı boş olamaz" })
    .transform((value) => (value.startsWith("/") ? value : `/${value}`)),
});
