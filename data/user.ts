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

export async function getUserPages(KisiId: number): Promise<string[]> {
  try {
    // Get role-based pages
    const rolePages = await db.kisiRol.findMany({
      where: { KisiId },
      select: {
        Rol: {
          select: {
            RolAdi: true,
            RolSayfa: {
              select: {
                Sayfa: {
                  select: {
                    SayfaRoute: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Query 2: Get direct pages from KisiSayfa (both permitted and denied pages)
    const kisiPages = await db.kisiSayfa.findMany({
      where: { KisiId },
      select: {
        Sayfa: {
          select: {
            SayfaRoute: true,
          },
        },
        IsPermitted: true, // Include the permission status
      },
    });

    // Extract page routes from RolSayfa (role-based permissions)
    const rolePageRoutes = rolePages
      .map((role) => role.Rol.RolSayfa.map((p) => p.Sayfa.SayfaRoute))
      .flat();

    // Extract page routes from KisiSayfa (direct pages, including IsPermitted)
    const kisiPageRoutes = kisiPages.map((page) => ({
      route: page.Sayfa.SayfaRoute,
      isPermitted: page.IsPermitted,
    }));

    // Combine both role-based pages and KisiSayfa pages
    const combinedRoutes = Array.from(
      new Set([...rolePageRoutes, ...kisiPageRoutes.map((p) => p.route)])
    );
    // console.log("combinedRoutes: ", combinedRoutes);

    // Now, filter out any routes that are denied in KisiSayfa (where IsPermitted = false)
    const permittedRoutes = combinedRoutes.filter((route) => {
      // Check if KisiSayfa allows the page (if IsPermitted is true, or no entry in KisiSayfa for the page)
      const kisiPage = kisiPageRoutes.find((page) => page.route === route);
      return kisiPage ? kisiPage.isPermitted : true; // If not in KisiSayfa, consider the role permission as allowed
    });

    return permittedRoutes;
  } catch (error) {
    console.error(error); // Log the error if necessary
    return []; // Return empty array or handle it as needed
  }
}
