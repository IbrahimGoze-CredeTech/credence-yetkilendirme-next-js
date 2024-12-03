import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById, getUserPages, getUserRole } from "./data/user";
import { db } from "./lib/db";
import { createToken } from "./utils";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    // async linkAccount({ user }) {
    //   await db.user.update({
    //     where: { id: user.id },
    //     data: { emailVerified: new Date() },
    //   });
    // },
  },
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);
      if (!existingUser) return false;
      // TODO: Verify user
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        // session.user.role = token.role;
        // session.role = typeof token.role === "string" ? token.role : "";
        session.user.role = typeof token.role === "string" ? token.role : "";
      }
      session.token = createToken(session.user.id);

      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      const role = await getUserRole(existingUser.KisiId);
      const pages = await getUserPages(existingUser.KisiId);
      if (!role) return token;
      token.role = role;
      token.pages = pages;

      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 4, // 4 hour
    updateAge: 60 * 60 * 2, // 2 hour
  },
  ...authConfig,
  jwt: {
    maxAge: 60 * 60 * 4, // 1 hour
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     access_token: string;
//     expires_at: number;
//     refresh_token?: string;
//     error?: "RefreshTokenError";
//   }
// }
