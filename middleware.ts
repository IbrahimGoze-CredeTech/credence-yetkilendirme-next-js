import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  restrictedRoutes,
  // publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // if(process.env.AUTH_SECRET = )
  const token = await getToken({ req, secret: process.env.AUTH_SECRET || "" });
  const role = token?.role;

  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isAPiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isRestrictedRoute = restrictedRoutes.some(
    (route) => route.route === nextUrl.pathname && route.role !== role
  );
  console.log("isRestrictedRoute: ", isRestrictedRoute);

  if (isAPiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (isRestrictedRoute) {
    // console.log("isRestrictedRoute: ", isRestrictedRoute);
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
