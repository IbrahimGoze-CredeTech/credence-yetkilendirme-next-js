import { User, type NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";

// import { LoginSchema } from "./schemas";
// import { getUserByEmail } from "./data/user";
// import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      // name: "Credentials",
      // credentials: {
      //   name: { label: "Email", type: "text" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        // if (!credentials?.name || !credentials?.password)
        //   throw new Error("Both e-mail and password are required");
        const { name, password } = validatedFields.data;

        try {
          const res = await fetch(
            `http://192.168.30.90/KullaniciGirisler/KullaniciAd/${name}/KullaniciParola/${password}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // const res = await fetch("https://dummyjson.com/products/1");

          // Try...catch can't handle http response directly so we added !res.ok
          // await HandleResponse(res);
          if (!res.ok) {
            const errorMessage = await res.text();
            // const errorMessage = await res.json();
            throw new Error(errorMessage || "Invalid credentials");
          }

          const parsedResponse = await res.text();
          // const parsedResponse = await res.json();
          // console.log("parsed response: ", parsedResponse);
          console.log("User created successfully");

          return {
            id: "1",
            name: name,
            access_token: parsedResponse,
            role: "user",
          } as User;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
            // await HandleError(error);
          }
          console.log("Error occurred during authorization ", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
