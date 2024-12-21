import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = ["/login"].includes(path);
  const isPrivatePath = ["/ink", "pigment", "/product"].includes(path);

  const token = request.cookies.get("token")?.value || "";

  if (path === "/") {
    return NextResponse.redirect(
      new URL(token ? "/ink" : "/login", request.nextUrl),
    );
  }
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL("/ink", request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/ink", "/pigment", "/product"],
};
