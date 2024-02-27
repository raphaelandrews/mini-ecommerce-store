import { authMiddleware } from "@clerk/nextjs";

import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "es", "pt", "cn", "de", "fr", "it", "jp", "ru", "sa"],
 
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },
 
  // Ensure that locale specific sign-in pages are public
  publicRoutes: ["/", "en", "es", "pt", "cn", "de", "fr", "it", "jp", "ru", "sa","/:locale", "/:locale/sign-in", "/:locale/sign-up", "/:path*","/api/:path*", "/api/uploadthing"],
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
 
