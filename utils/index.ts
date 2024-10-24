import { YetkiRolOld } from "../types";
import jwt from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isYetkiArray = (data: any): data is YetkiRolOld[] => {
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

export const formatDate = (dateValue: { toISOString: () => string }) => {
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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const fetcherGet = async (url: string, token: string | undefined) => {
  if (!token) {
    throw new Error("Token is not defined");
  }
  // console.log("token", token);

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    // const response = await fetch("https:/localhost:7210/api" + url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok at: " + url);
  }

  return response.json();
};

/**
 * Sends a POST request to the given URL with the provided JSON body and token.
 *
 * @param {string} url - The URL to which the request will be sent.
 * @param {string} jsonBody - The JSON string to be sent as the body of the request.
 * @returns {Promise<Response>} The response from the server.
 */
export const fetcherPost = async (
  url: string,
  token: string | undefined,
  jsonBody: string
) => {
  if (!token) {
    throw new Error("Token is not defined");
  }

  // const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
  const response = await fetch("https://localhost:7210/api" + url, {
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

/**
 * Sends a PUT request to the given URL with the provided JSON body and token.
 *
 * @param {string} url - The URL to which the request will be sent.
 * @param {string} jsonBody - The JSON string to be sent as the body of the request.
 * @returns {Promise<Response>} The response from the server.
 */
export const fetcherPUT = async (
  url: string,
  token: string | undefined,
  jsonBody: string
) => {
  if (!token) {
    throw new Error("Token is not defined");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    // const response = await fetch("https://localhost:7210/api" + url, {
    method: "PUT",
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
