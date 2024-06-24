import { NextResponse } from "next/server";
import { getDataFromToken } from "./utils/helper";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = ["/login"].includes(path);
  const isPrivatePath = ["/ink", "pigment", "/product"].includes(path);

  const token = request.cookies.get("token")?.value || "";

  const { id } = await getDataFromToken(token);

  if (path === "/") {
    return NextResponse.redirect(
      new URL(token ? "/ink" : "/login", request.nextUrl),
    );
  }
  if (isPublicPath && id) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL("/ink", request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (isPrivatePath && !id) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/ink", "/pigment", "/product"],
};
