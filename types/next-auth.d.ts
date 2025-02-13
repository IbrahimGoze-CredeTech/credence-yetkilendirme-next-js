/* eslint-disable */

import type { DefaultJWT, DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    token: string;
  }

  interface JWT extends DefaultJWT {
    role: string;
    token: string;
  }
}

// import { type DefaultSession } from "next-auth";
// import { DefaultJWT } from "@auth/core/jwt";

// export type ExtendedUser = DefaultSession["user"] & {
//   role: string;
// };

// declare module "next-auth" {
//   // Extend session to hold the access_token
//   interface Session {
//     user: ExtendedUser;
//     token: string;
//   }

//   // Extend token to hold the access_token before it gets put into session
//   interface JWT {
//     role: string;
//     token: string & DefaultJWT;
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     role: string;
//   }
// }
// declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//     token: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     user: ExtendedUser;
//     role: string;
//   }
// }
