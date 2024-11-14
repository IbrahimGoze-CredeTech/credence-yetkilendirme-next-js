import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  // restrictedRoutes,
  // publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // if(process.env.AUTH_SECRET = )

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET || "",
    secureCookie: process.env.NODE_ENV === "production",
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  // const roles = token?.role;
  const pages = token?.pages;
  console.log("page: ", pages);
  console.log("nextUrl.pathname: ", req.nextUrl.pathname);

  // console.log("---role: ", role);

  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isAPiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isRestrictedRoute = !pages?.includes(nextUrl.pathname);
  console.log("isRestrictedRoute: ", isRestrictedRoute);

  // const isRestrictedRoute = restrictedRoutes.some(
  //   (route) => route.route === nextUrl.pathname && !roles?.includes(route.role)
  // );
  // console.log("isRestrictedRoute: ", roles?.includes("sa"));

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
  matcher: ["/((?!.*\\..*|_next|unauthorized).*)", "/(api|trpc)(.*)"],
};
