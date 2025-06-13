import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/" || path === "/login" || path === "/signup" || path === "/forgot-password"

  // Get the session cookie
  const session = request.cookies.get("session")?.value

  // If the path requires authentication and there's no session, redirect to login
  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the user is logged in and trying to access login/signup pages, redirect to dashboard
  if (isPublicPath && path !== "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Match all paths except for static files, api routes, etc.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
