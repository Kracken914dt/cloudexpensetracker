import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];
const PUBLIC_PATHNAMES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get("jwt");

  const isPublicRoute = PUBLIC_PATHNAMES.includes(pathname);

  if (!jwt && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (jwt && isPublicRoute) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/|api/).*)"],
};
