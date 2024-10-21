// import { type DefaultSession } from "next-auth";

// TODO: Make this role Enum and Token
export type ExtendedUser = DefaultSession["user"] & {
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
    role: string;
  }
}

// import { JWT } from "next-auth/jwt";

// declare module "next-auth/jwt" {
//   interface JWT {
//     role: UserRole;
//   }
// }
