import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  // publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  console.log("isLoggedIn: ", isLoggedIn);

  const isAPiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAPiAuthRoute) {
    return;
  }
  // console.log("isAuthRoute: ", isAuthRoute);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // console.log("in Middleware \n");
    return;
  }

  if (!isLoggedIn) {
    // console.log("----NOT LOGGED INN: ", isLoggedIn);
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
