import { KisiYetki, Rol, RolYetki } from "@prisma/client";

export type KisiOzet = {
  id: number;
  ad: string;
  soyad: string;
  roller: string[];
  yetkiler: string[];
  departman: string | null;
};

export type Kisi = {
  kisiAdi: string;
  kisiSoyadi: string;
  roller: Rol[];
  departman: string;
  yetkiler: RolYetki[];
  ekstraYetkiler: KisiYetki[]; // Depending on what `ekstraYetkiler` contains, you can refine this type further
};

export type RolOld = {
  kisiId: number;
  kisiAdi: string;
  kisiSoyadi: string;
  rolId: number;
  rolAdi: string;
  baslangicTarihi: string; // You can change this to `Date` if the backend provides `Date` objects
  bitisTarihi: string; // Same here
  talepEden: string;
  onaylayan: string;
  onaylanmaTarihi: string; // Same here for `Date`
};

export type YetkiRolOld = {
  rolId: number;
  rolAdi: string;
  yetkiId: number;
  yetkiAdi: string;
  eylemlerTuruId: number;
};

export type EkstraYetkiOld = {
  kisiId: number;
  kisiAdi: string;
  kisiSoyadi: string;
  yetkiId: number;
  yetkiAdi: string;
  eylemTuruId: number;
  ekstraYetkiBaslangicTarihi: string; // Can be changed to `Date` if necessary
  ekstraYetkiBitisTarihi: string; // Can be changed to `Date` if necessary
  ekstraYetkiTalepEden: string;
  ekstraYetkiOnaylayan: string;
  ekstraYetkiOnaylanmaTarihi: string; // Can be changed to `Date` if necessary
};
export type RolYetkiOld = {
  rolId: number; // Rol ID
  rolAdi: string; // Rol Adı
  yetkiId: number; // Yetki ID
  yetkiAdi: string; // Yetki Adı
  eylemlerTuruId: number; // Eylem Türü ID
};

export type RolYetkiOzet = {
  id: number;
  rolAdi: string;
  yetkiler: string[];
};

export type Talep = {
  olusturulmaTarihi: string;
  durum: string;
  durumTarihi: string;
  talepEdenKisiAdi: string;
  rolAtama?: RolAtamaClient;
  rolCikarma?: RolCikarmaClient;
  imzalar?: Imza[];
};

export type RolAtamaClient = {
  // kisiId: number;
  kisiAdi: string;
  // rolId: number;
  rolAdi: string;
  rolBaslangicTarihi: string;
  rolBitisTarihi: string;
};

export type RolCikarmaClient = {
  // kisiId: number;
  kisiAdi: string;
  // rolId: number;
  rolAdi: string;
  rolCikarmaTarihi: string;
};

export type Imza = {
  kisiAdi: string;
  talepId: number;
  durumTarihi: string;
  durum: string;
};

export type Yetki = {
  yetkiId: number;
  yetkiAdi: string;
  siniflandirma: string;
};

//#region WaitingTalepGridType
export type IWaitingRolAtama = {
  RolAtamaId: number;
  RolAdi: string | undefined;
  KisiAdi: string;
  RolBaslangicTarihi: Date | null;
  RolBitisTarihi: Date | null;
};

export type IWaitingRolCikarma = {
  RolCikarmaId: number;
  RolAdi: string | undefined;
  KisiAdi: string;
  RolCikarmaTarihi: Date | null;
};

export type IWaitingKisiYetkiEdit = {
  KisiYetkiEditId: number;
  YetkiAdi: string;
  EylemTuruId: number;
  KisiAdi: string;
  YetkiBaslamaTarihi: Date | null;
  YetkiBitisTarihi: Date | null;
};

export interface IWaitingKisiSayfaEdit {
  KisiSayfaEditId: number;
  KisiId: number;
  KisiAdi: string;
  SayfaId: number;
  SayfaRoute: string;
  IsPermitted: boolean;
  BaslangicTarihi: Date | null;
  BitisTarihi: Date | null;
}

export interface IWaitingKisiSayfaAtama {
  KisiSayfaAtamaId: number;
  KisiId: number;
  KisiAdi: string;
  SayfaId: number;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Assuming datetime fields are returned as ISO strings, null for optional
  BitisTarihi: string | null; // Adjust type if using Date objects in TypeScript
}

export interface IWaitingRolSayfaAtama {
  RolSayfaAtamaId: number;
  RolId: number;
  RolAdi: string;
  SayfaId: number;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Assuming datetime fields are returned as ISO strings, null for optional
  BitisTarihi: string | null; // Adjust type if using Date objects in TypeScript
}

export interface IWaitingRolSayfaCikarma {
  RolSayfaCikarmaId: number;
  RolId: number;
  RolAdi: string;
  SayfaId: number;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Assuming datetime fields are returned as ISO strings, null for optional
  BitisTarihi: string | null; // Adjust type if using Date objects in TypeScript
}

export interface IWaitingKisiSayfaCikarma {
  KisiSayfaCikarmaId: number;
  KisiId: number;
  KisiAdi: string;
  SayfaId: number;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Assuming datetime fields are returned as ISO strings, null for optional
  BitisTarihi: string | null; // Adjust type if using Date objects in TypeScript
}

export interface IWaitingRolYetkiEdit {
  RolYetkiEditId: number;
  RolAdi: string;
  YetkiAdi: string;
  EylemTuruId: number;
  BaslangicTarihi: Date | null;
  BitisTarihi: Date | null;
}
//#endregion

//#region PreviousTalepGridTypes
export interface IPreviousRolAtama {
  RolAdi: string;
  RolAtananAd: string;
  RolAtananSoyad: string;
  RolBaslangicTarihi: Date;
  RolBitisTarihi: Date;
  ImzaAd: string;
  ImzaSoyad: string;
  ImzaDurumTarihi: Date;
  DurumAd: string;
}

export interface IPreviousRolCikarma {
  RolCikarilanAd: string;
  RolCikarilanSoyad: string;
  RolAdi: string;
  RolCikarmaTarihi: string; // Since the value is a string representing a date, we keep it as string type.
  ImzaAd: string;
  ImzaSoyad: string;
  ImzaTarihi: Date | null; // Date or null, because imzaTarihi could be null.
  ImzaDurumu: string;
}

export interface IPreviousRolYetkiEdit {
  RolAdi: string;
  YetkiAdi: string;
  EylemAdi: string;
  ImzaAd: string;
  BaslangicTarihi: Date | null; // Date or null, because baslangicTarihi could be null.
  BitisTarihi: Date | null; // Date or null, because bitisTarihi could be null.
  ImzaSoyad: string;
  ImzaTarihi: Date | null; // Date or null, because imzaTarihi could be null.
  ImzaDurumu: string;
}

export interface IPreviousKisiYetkiEdit {
  Ad: string;
  Soyad: string;
  YetkiAdi: string;
  EylemAdi: string;
  YetkiBaslangicTarihi: Date | null;
  YetkiBitisTarihi: string;
  ImzaAd: string;
  ImzaSoyad: string;
  ImzaTarihi: Date | null;
  ImzaDurumu: string;
}

export interface IPreviousKisiSayfaEdit {
  KisiAdi: string; // Full name from CONCAT(k.Ad, ' ', k.Soyad)
  SayfaRoute: string; // Route information from s.SayfaRoute
  IsPermitted: boolean; // Permission flag from kse.IsPermitted
  BaslangicTarihi: Date | null; // Start date from kse.BaslangicTarihi
  BitisTarihi: Date | null; // End date from kse.BitisTarihi
}

export interface IPreviousKisiSayfaAtama {
  KisiAdi: string;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Nullable datetime as ISO string
  BitisTarihi: string | null; // Nullable datetime as ISO string
}

export interface IPreviousRolSayfaAtama {
  RolAdi: string;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Nullable datetime as ISO string
  BitisTarihi: string | null; // Nullable datetime as ISO string
}

export interface IPreviousRolSayfaCikarma {
  RolAdi: string;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Nullable datetime as ISO string
  BitisTarihi: string | null; // Nullable datetime as ISO string
}

export interface IPreviousKisiSayfaCikarma {
  KisiAdi: string;
  SayfaRoute: string;
  BaslangicTarihi: string | null; // Nullable datetime as ISO string
  BitisTarihi: string | null; // Nullable datetime as ISO string
}
//#endregion

export interface TalepKayit {
  talep_Olusturulma_Tarihi: Date;
  talep_Durum_Tarihi: string;
  talepEdenAd: string;
  talepEdenSoyad: string;
  imzaDurumTarih: string;
  imzaAd: string;
  imzaSoyad: string;
  talepTipi: string;
}

export interface RolSayfa {
  rolId: string;
  rolAdi: string;
  sayfaId: string;
  sayfaRoute: string;
  sayfaBaslangicTarihi: string;
  sayfaBitisTarihi: string;
}

export type KisiSayfaFromType = { sayfaRoute: string; isPermitted: boolean };
