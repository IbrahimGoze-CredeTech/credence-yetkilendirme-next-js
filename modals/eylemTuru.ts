export enum EylemTuruEnum {
  Oku = 1,
  Yaz = 2,
  Engel = 3,
}
export const eylemTuru = {
  Oku: 1,
  Yaz: 2,
  Engel: 3,
};

export const eylemTuruStringArray = ["Oku", "Yaz", "Engel"];

export type EylemTuruType = keyof typeof eylemTuru; // EylemTuru, 'Oku' | 'Yaz' | 'Engel' türüne sahip olur.
