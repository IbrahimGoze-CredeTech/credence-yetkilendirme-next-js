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
export type WaitingRolAtamaGridType = {
  rolAtamaId: number;
  rolAdi: string | undefined;
  kisiAdi: string;
  rolBaslangicTarihi: Date | null;
  rolBitisTarihi: Date | null;
};

export type WaitingRolCikarmaGridType = {
  RolCikarmaId: number;
  RolAdi: string | undefined;
  KisiAdi: string;
  RolCikarmaTarihi: Date | null;
};

export type WaitingKisiYetkiEditGridType = {
  KisiYetkiEditId: number;
  YetkiAdi: string;
  EylemTuruId: number;
  KisiAdi: string;
  YetkiBaslamaTarihi: Date | null;
  YetkiBitisTarihi: Date | null;
};

export interface WaitingKisiSayfaEditGridType {
  KisiSayfaEditId: number;
  KisiId: number;
  KisiAdi: string;
  SayfaId: number;
  SayfaRoute: string;
  IsPermitted: boolean;
  BaslangicTarihi: Date | null;
  BitisTarihi: Date | null;
}
//#endregion

//#region PreviousTalepGridTypes
export interface PreviousRolAtamaDetails {
  rolAdi: string;
  rolAtananAd: string;
  rolAtananSoyad: string;
  rolBaslangicTarihi: Date;
  rolBitisTarihi: Date;
  imzaAd: string;
  imzaSoyad: string;
  imzaDurumTarihi: Date;
  durumAd: string;
}

export interface PreviousRolCikarmaDetails {
  rolCikarilanAd: string;
  rolCikarilanSoyad: string;
  rolAdi: string;
  rolCikarmaTarihi: string; // Since the value is a string representing a date, we keep it as string type.
  imzaAd: string;
  imzaSoyad: string;
  imzaTarihi: Date | null; // Date or null, because imzaTarihi could be null.
  imzaDurumu: string;
}

export interface PreviousKisiYetkiEditDetails {
  ad: string;
  soyad: string;
  yetkiAdi: string;
  eylemAdi: string;
  yetkiBaslangicTarihi: Date | null;
  yetkiBitisTarihi: string;
  imzaAd: string;
  imzaSoyad: string;
  imzaTarihi: Date | null;
  imzaDurumu: string;
}

export interface PreviousKisiSayfaEditDetails {
  kisiAdi: string; // Full name from CONCAT(k.Ad, ' ', k.Soyad)
  sayfaRoute: string; // Route information from s.SayfaRoute
  isPermitted: boolean; // Permission flag from kse.IsPermitted
  baslangicTarihi: Date | null; // Start date from kse.BaslangicTarihi
  bitisTarihi: Date | null; // End date from kse.BitisTarihi
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

// export interface RolAtamaTalepler {
//   rolAdi: string;
//   rolAtananAd: string;
//   rolAtananSoyad: string;
//   rolBaslangicTarihi: string;
//   rolBitisTarihi: string;
//   imzaAd: string;
//   imzaSoyad: string;
//   imzaDurumTarihi: string;
//   durumAd: string;
// }

// export interface RolCikarmaTalepler {
//   rolCikarilanAd: string;
//   rolCikarilanSoyad: string;
//   rolAdi: string;
//   rolCikarmaTarihi: string;
//   imzaAd: string;
//   imzaSoyad: string;
//   imzaTarihi: string;
//   imzaDurumu: string;
// }

// export interface KisiYetkiEditTalepler {
//   kisiYetkiEditId: number;
//   ad: string;
//   soyad: string;
//   yetkiAdi: string;
//   eylemAdi: string;
//   yetkiBaslangicTarihi: string;
//   yetkiBitisTarihi: string;
//   imzaAd: string;
//   imzaSoyad: string;
//   imzaTarihi: string;
//   imzaDurumu: string;
// }
// export interface kisiSayfaEdit {
//   kisiAdi: string;
//   sayfaRoute: string;
//   isPermitted: boolean;
//   sayfaBaslangicTarihi: string;
//   sayfaBitisTarihi: string;
// }
export interface RolSayfa {
  rolId: string;
  rolAdi: string;
  sayfaId: string;
  sayfaRoute: string;
  sayfaBaslangicTarihi: string;
  sayfaBitisTarihi: string;
}

export type KisiSayfaFromType = { sayfaRoute: string; isPermitted: boolean };
