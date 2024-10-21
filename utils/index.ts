import { YetkiRol } from "../types";
import jwt from "jsonwebtoken";

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

export const createToken = (userId: string) => {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("JWT secret is not defined in environment variables");
  }
  // Set the payload for the JWT, including userId
  const payload = { userId };

  // Generate the token with an expiration time (e.g., 4 hour)
  const token = jwt.sign(payload, secret, { expiresIn: "4h" });

  return token;
};

export const fetcherGet = async (url: string, token: string | undefined) => {
  if (!token) {
    throw new Error("Token is not defined");
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetcherPost = async (
  url: string,
  token: string | undefined,
  jsonBody: string
) => {
  if (!token) {
    throw new Error("Token is not defined");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: jsonBody,
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error("Unauthorized");
      case 403:
        throw new Error("Forbidden");
      default:
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
    }
  }

  return response.json();
};
