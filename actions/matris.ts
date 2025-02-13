"use server";

import { auth } from "@/auth";
import { CurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import type { IImzaOraniMatris } from "@/types";
import { FetcherGet } from "@/utils";

export async function TalepYaratmaMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/talep-yaratma-matris",
    session.token
  );

  return responseData;
}

export async function ImzaAtmaMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/imza-atma-matris",
    session.token
  );

  return responseData;
}

export async function ImzaAtananMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/imza-atanan-matris",
    session.token
  );

  return responseData;
}

export async function TalepYaratmaGunlukMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/talep-yaratma-gunluk-matris",
    session.token
  );

  return responseData;
}

export async function ImzaAtmaGunlukMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/imza-atma-gunluk-matris",
    session.token
  );

  return responseData;
}

export async function TalepTipiMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/talep-tipi-matris",
    session.token
  );

  return responseData;
}

export async function KisiRiskMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/kisi-risk-matris",
    session.token
  );

  return responseData;
}

export async function RolDagilimiMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/rol-dagilimi-matris",
    session.token
  );

  return responseData;
}

export async function ImzaOraniMatris(): Promise<IImzaOraniMatris[]> {
  const kisi = await CurrentUser();

  if (!kisi) {
    console.error("User not found");
    return [];
  }

  try {
    const imzaOrani = await db.$queryRaw<IImzaOraniMatris[]>`    
    EXEC ImzaOraniMatris
  `;

    return imzaOrani;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function KisiVerimlilikMatris() {
  const session = await auth();
  if (!session) {
    console.error("Session not found");
    return { error: "Session not found" };
  }

  const responseData = await FetcherGet(
    "/Matris/kisi-verimlilik-matris",
    session.token
  );

  return responseData;
}
