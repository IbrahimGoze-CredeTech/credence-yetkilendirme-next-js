import { db } from "@/lib/db";
import {
  KisiAccessibleRoutes,
  KisiYetkiView,
  RoleAccessibleRoutes,
  RolYetkiView,
} from "@prisma/client";

export async function GetKisiAccessibleRoutes(): Promise<
  KisiAccessibleRoutes[]
> {
  const kisiAccessibleRoutes = await db.kisiAccessibleRoutes.findMany({
    orderBy: { KisiId: "asc" },
  });

  // console.log("kisiAccessibleRoutes: ", kisiAccessibleRoutes);
  return kisiAccessibleRoutes;
}

export async function GetRoleAccessibleRoutes(): Promise<
  RoleAccessibleRoutes[]
> {
  const roleAccessibleRoutes = await db.roleAccessibleRoutes.findMany({
    orderBy: { RolId: "asc" },
  });

  return roleAccessibleRoutes;
}

export async function GetRoleYetkisView(): Promise<RolYetkiView[]> {
  const roleYetkis = await db.rolYetkiView.findMany({
    orderBy: { RolId: "asc" },
  });

  return roleYetkis;
  // return [];
}

export async function GetKisiYetkisView(): Promise<KisiYetkiView[]> {
  const roleYetkis = await db.kisiYetkiView.findMany({
    orderBy: { KisiId: "asc" },
  });

  // console.log("roleYetkis: ", roleYetkis);

  return roleYetkis;
  // return [];
}
