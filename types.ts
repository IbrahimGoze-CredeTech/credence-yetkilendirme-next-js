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
  yetkiler: YetkiRol[];
  ekstraYetkiler: EkstraYetki[]; // Depending on what `ekstraYetkiler` contains, you can refine this type further
};

export type Rol = {
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

export type YetkiRol = {
  rolId: number;
  rolAdi: string;
  yetkiId: number;
  yetkiAdi: string;
  eylemlerTuruId: number;
};

export type EkstraYetki = {
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
export type RolYetki = {
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
  // talepId: number;
  // talepEdenKisiId: number;
  olusturulmaTarihi: string;
  durum: string;
  durumTarihi: string;
  talepEdenKisiAdi: string;
  rolAtama?: RolAtama;
  rolCikarma?: RolCikarma;
  imzalar?: Imza[];
};

export type RolAtama = {
  // kisiId: number;
  kisiAdi: string;
  // rolId: number;
  rolAdi: string;
  rolBaslangicTarihi: string;
  rolBitisTarihi: string;
};

export type RolCikarma = {
  kisiId: number;
  kisiAdi: string;
  rolId: number;
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
  rolAdi: string | undefined;
  kisiAdi: string;
  rolBaslangicTarihi: Date | null;
  rolBitisTarihi: Date | null;
};
