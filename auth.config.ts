import { User, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByUserName, getUserRole } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { name, password } = validatedFields.data;

        const kisi = await getUserByUserName(name);

        // We need to check if they have a password cause they might login using google
        // And Credentials provider can't handle that
        if (!kisi || !kisi.Sifre) {
          console.log("In AuthConfig that says user not found");
          return null;
          // throw new CredentialsSignin("Invalid Credentials");
        }

        const passwordMatch = await bcrypt.compare(password, kisi.Sifre);

        if (passwordMatch) {
          const rolAdi = await getUserRole(kisi.KisiId);

          return {
            id: kisi.KisiId + "",
            name: kisi.Ad + " " + kisi.Soyad,
            role: rolAdi[0],
            kullaniciAdi: kisi.KullaniciAdi,
          } as User;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
