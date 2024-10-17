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

export async function getUserRole(KisiId: number): Promise<string | null> {
  try {
    // get the role of the user from the kisiRol table
    const kisiRol = await db.kisiRol.findFirst({ where: { KisiId } });
    const rol = await db.rol.findFirst({
      where: { RolId: kisiRol?.RolId },
      select: { RolAdi: true },
    });
    return rol?.RolAdi || null;

    // const kisi = db.kisiRol.findUnique({ where: { KisiId : KisiId } });
    // return kisi?;
  } catch (error) {
    console.error(error); // Log the error if necessary
    return null; // Return null or handle it as needed
  }
}
// export async function getUserById(id: string | undefined) {
//   try {
//     const user = db.user.findUnique({ where: { id } });
//     return user;
//   } catch (error) {
//     return null;
//   }
// }
