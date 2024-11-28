import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const token = req.cookies.get("accessToken")?.value;

	if (
		pathname.startsWith("/_next/") ||
		pathname.startsWith("/static/") ||
		pathname.startsWith("/api/") ||
		/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp)$/i.test(pathname)
	) {
		return NextResponse.next();
	}

	// If logged in and accessing login route, redirect to home
	if (
		token &&
		(pathname === "/auth/login" ||
			pathname === "/auth/registration" ||
			pathname === "/auth/forgetpin")
	) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	// If not logged in and accessing protected routes, redirect to login
	if (!token && pathname === "/auth/profile") {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	// For other cases, allow access
	return NextResponse.next();
}
