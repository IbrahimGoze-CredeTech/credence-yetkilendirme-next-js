import { db } from "@/lib/db";

export async function GetKisiAccessibleRoutes() {
  const kisiAccessibleRoutes = await db.kisiAccessibleRoutes.findMany({
    orderBy: { KisiId: "desc" },
  });

  console.log("kisiAccessibleRoutes: ", kisiAccessibleRoutes);
}
