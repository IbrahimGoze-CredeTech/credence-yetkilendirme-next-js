import { db } from "@/lib/db";
import { KisiAccessibleRoutes, RoleAccessibleRoutes } from "@prisma/client";

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
