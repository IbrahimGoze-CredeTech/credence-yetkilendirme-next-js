/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type{string[]}
 */
// export const publicRoutes = ["/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type{string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type{string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type{string}
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DEFAULT_LOGIN_REDIRECT = "/";

/**
 * The restricted routes that require a specific role to access
 * @type{route:string,role:string}[]
 */
export const restrictedRoutes = [
  {
    route: "/kisi-rol-yetki",
    role: "sa",
  },
];
