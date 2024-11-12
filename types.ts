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

export type RolAtamaGridType = {
  rolAtamaId: number;
  rolAdi: string | undefined;
  kisiAdi: string;
  rolBaslangicTarihi: Date | null;
  rolBitisTarihi: Date | null;
};

export type RolCikarmaGridType = {
  rolCikarmaId: number;
  rolAdi: string | undefined;
  kisiAdi: string;
  rolCikarmaTarihi: Date | null;
};

export type KisiYetkiEditGridType = {
  kisiYetkiEditId: number;
  yetkiAdi: string;
  eylemTuruId: number;
  kisiAdi: string;
  yetkiBaslamaTarihi: Date | null;
  yetkiBitisTarihi: Date | null;
};

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

export interface RolAtamaTalepler {
  rolAdi: string;
  rolAtananAd: string;
  rolAtananSoyad: string;
  rolBaslangicTarihi: string;
  rolBitisTarihi: string;
  imzaAd: string;
  imzaSoyad: string;
  imzaDurumTarihi: string;
  durumAd: string;
}

export interface RolCikarmaTalepler {
  rolCikarilanAd: string;
  rolCikarilanSoyad: string;
  rolAdi: string;
  rolCikarmaTarihi: string;
  imzaAd: string;
  imzaSoyad: string;
  imzaTarihi: string;
  imzaDurumu: string;
}

export interface KisiYetkiEditTalepler {
  kisiYetkiEditId: number;
  ad: string;
  soyad: string;
  yetkiAdi: string;
  eylemAdi: string;
  yetkiBaslangicTarihi: string;
  yetkiBitisTarihi: string;
  imzaAd: string;
  imzaSoyad: string;
  imzaTarihi: string;
  imzaDurumu: string;
}
