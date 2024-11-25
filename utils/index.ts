import { YetkiRolOld } from "../types";
import jwt from "jsonwebtoken";

const isLocalHost: boolean = false;

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
  const response = await fetch(
    isLocalHost
      ? "https:/localhost:7210/api" + url
      : process.env.NEXT_PUBLIC_API_URL + url,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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

  const response = await fetch(
    isLocalHost
      ? "https:/localhost:7210/api" + url
      : process.env.NEXT_PUBLIC_API_URL + url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: jsonBody,
    }
  );

  if (!response.ok) {
    let errorMessage = `Network response was not ok, status: ${response.status}`;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json(); // Parse JSON error
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } else {
        const textData = await response.text(); // Fallback to plain text
        if (textData) {
          errorMessage = textData;
        }
      }
    } catch (e) {
      console.error("Failed to parse error response:", e);
    }

    return {
      success: false,
      error: errorMessage,
      status: response.status,
    };
  }

  const data = await response.json();
  return {
    success: true,
    data,
  };

  // if (!response.ok) {
  //   let errorMessage = `Network response was not ok, status: ${response.status}`;
  //   try {
  //     const errorData = await response.json(); // Parse the JSON response from the server
  //     if (errorData && errorData.message) {
  //       errorMessage = errorData.message; // Use the error message from the server
  //     }
  //   } catch (e) {
  //     console.error("Failed to parse error response:", e);
  //   }

  //   switch (response.status) {
  //     case 400:
  //       throw new Error(errorMessage); // Throw the detailed error message
  //     case 401:
  //       throw new Error("Unauthorized");
  //     case 403:
  //       throw new Error("Forbidden");
  //     default:
  //       throw new Error(errorMessage);
  //   }
  // }

  // return response.json();
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

  const response = await fetch(
    isLocalHost
      ? "https:/localhost:7210/api" + url
      : process.env.NEXT_PUBLIC_API_URL + url,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: jsonBody,
    }
  );

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

//#region Data Formatting
export interface DataItem {
  date: string;
  [key: string]: unknown;
}
// Function to format the date string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR");
};

// Function to format a list of data
export const formatDataList = (dataList: DataItem[]) => {
  return dataList.map((data) => ({
    ...data,
    date: formatDate(data.date),
  }));
};
//#endregion
