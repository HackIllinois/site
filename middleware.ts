import { API_BASE_URL, LOCAL_AUTH_ENABLED } from "@/util/api-config";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname, search, searchParams } = request.nextUrl;

    // In local development with mock users, allow access to render local dev sign-in controls.
    if (LOCAL_AUTH_ENABLED) {
        return NextResponse.next();
    }

    // Skip explicitly public routes that match prefix patterns.
    if (
        pathname.startsWith("/profile-unavailable") ||
        pathname.startsWith("/rsvp-unavailable") ||
        pathname.startsWith("/registration-closed") ||
        pathname === "/challenge" ||
        pathname === "/challenge/landing-page"
    ) {
        return NextResponse.next();
    }

    // Check for auth token in cookies, query parameters, or authorization header.
    const hasAuthToken = Boolean(
        request.cookies.get("jwt")?.value ||
        request.cookies.get("token")?.value ||
        searchParams.get("token") ||
        searchParams.get("jwt") ||
        request.headers.get("authorization")?.startsWith("Bearer ")
    );

    if (hasAuthToken) {
        return NextResponse.next();
    }

    // Avoid redirect loops if the request returned with an error parameter.
    if (searchParams.has("error")) {
        return NextResponse.next();
    }

    // Redirect directly to Google OAuth on Adonix before rendering protected page UI.
    const callbackPath =
        pathname === "/register" ? "/register/general" : `${pathname}${search}`;
    const callbackUrl = new URL(callbackPath, request.url).toString();
    const authUrl = `${API_BASE_URL}/auth/login/google/?redirect=${encodeURIComponent(callbackUrl)}`;

    return NextResponse.redirect(new URL(authUrl));
}

export const config = {
    matcher: [
        "/register",
        "/register/:path*",
        "/profile",
        "/profile/:path*",
        "/profile-setup",
        "/profile-setup/:path*",
        "/rsvp",
        "/rsvp/:path*",
        "/challenge/description",
        "/challenge/result/:path*"
    ]
};
