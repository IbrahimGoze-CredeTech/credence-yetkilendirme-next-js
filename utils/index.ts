import { YetkiRol } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isYetkiArray = (data: any): data is YetkiRol[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.yetkiId === "number" &&
        typeof item.yetkiAdi === "string" &&
        (typeof item.siniflandirma === "string" || item.siniflandirma === null) // Allow `null` for siniflandirma if needed
    )
  );
};

export const formatDate = (dateValue) => {
  if (!dateValue) return null; // If the value is null or undefined
  if (typeof dateValue === "string") return dateValue; // Already a string
  if (dateValue instanceof Date) return dateValue.toISOString().split("T")[0]; // Convert Date to "YYYY-MM-DD"
  return null; // If it doesn't match any expected type
};
