import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { ExtendedUser } from "./next-auth";

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
    async signIn({ user, account }) {
      // console.log("user: ", user);
      // console.log("account: ", account);
      // TODO: Verify user
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
        // console.log("session.user.role: ", session.user.role);
      }
      if (session.user) {
        // session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      // console.log("session in auth: ", session);

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      if (user) token.role = user?.role;

      // const existingUser = await getUserById(token.sub);

      // if (!existingUser) return token;

      // token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  // adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,
});
