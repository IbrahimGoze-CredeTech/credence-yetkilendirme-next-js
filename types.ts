export enum authorityDataKeys {
  kisiAdi = "kisiAdi",
  kisiSoyadi = "kisiSoyadi",
  rolAdi = "rolAdi",
  baslangicTarihi = "baslangicTarihi",
  bitisTarihi = "bitisTarihi",
  talepEden = "talepEden",
  onaylayan = "onaylayan",
  onaylanmaTarihi = "onaylanmaTarihi",
  yetkiAdi = "yetkiAdi",
  departman = "departman",
  siniflandirmaSeviyesi = "siniflandirmaSeviyesi",
}

// export type Yetki = {
//   yetkiId: number;
//   yetkiAdi: string;
//   siniflandirma: string;
// };

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
  yetkiler: Yetki[];
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

export type Yetki = {
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
