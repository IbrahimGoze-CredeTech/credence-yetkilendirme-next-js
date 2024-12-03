"use server";

import { db } from "@/lib/db";

export async function rolunYetkileri(
  rolName: string
): Promise<{ yetkiAdi: string; eylemTuruId: number }[]> {
  const roleYetkis = await db.rolYetkiView.findMany({
    orderBy: { RolId: "asc" },
  });
  // Filter the roleYetkis to get the ones that match the rolName
  const roleYetkisFiltered = roleYetkis.filter(
    (roleYetki) => roleYetki.RolAdi === rolName
  );
  // Map the filtered roleYetkis to get the yetkiAdi and eylemTuruId
  const roleYetkisMapped = roleYetkisFiltered.map((roleYetki) => ({
    yetkiAdi: roleYetki.YetkiAdi,
    eylemTuruId: roleYetki.EylemlerTuruId,
  }));
  return roleYetkisMapped;
}
