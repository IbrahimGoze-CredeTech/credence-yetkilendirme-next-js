import { db } from "@/lib/db";

export async function getUserByUserName(KullaniciAdi: string) {
  try {
    const kisi = db.kisi.findUnique({ where: { KullaniciAdi } });
    return kisi;
  } catch (error) {
    console.error(error); // Log the error if necessary
    return null; // Return null or handle it as needed
  }
}

export async function getUserById(id: string | undefined) {
  if (!id) return null;
  try {
    const kisi = db.kisi.findUnique({ where: { KisiId: +id } });
    return kisi;
  } catch (error) {
    console.error(error); // Log the error if necessary
    return null; // Return null or handle it as needed
  }
}

export async function getUserRole(KisiId: number): Promise<string[]> {
  try {
    const roles = await db.kisiRol.findMany({
      where: { KisiId },
      orderBy: {
        Rol: { RiskWeight: "desc" }, // Sort by RiskWeight in descending order
      },
      select: {
        Rol: {
          select: {
            RolAdi: true,
          },
        },
      },
    });

    return roles.map((role) => role.Rol.RolAdi);
  } catch (error) {
    console.error(error); // Log the error if necessary
    return [""]; // Return null or handle it as needed
  }
}
