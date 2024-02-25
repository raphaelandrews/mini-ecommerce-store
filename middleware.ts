import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/:path*","/api/:path*", "/api/uploadthing"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
