import { User, type NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByUserName, getUserRole } from "./data/user";
import bcrypt from "bcryptjs";

// import { LoginSchema } from "./schemas";
// import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        // if (!credentials?.name || !credentials?.password)
        //   throw new Error("Both e-mail and password are required");
        const { name, password } = validatedFields.data;

        const kisi = await getUserByUserName(name);
        // console.log("Config kisi: ", kisi);

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
            role: rolAdi,
          } as User;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
