import { API_BASE_URL, LOCAL_AUTH_ENABLED } from "@/util/api-config";
import { NextRequest, NextResponse } from "next/server";

// Adonix sets the sign-in cookie on its own registrable domain, e.g.
// "hackillinois.org" for adonix.hackillinois.org.
const AUTH_COOKIE_DOMAIN = new URL(API_BASE_URL).hostname
    .split(".")
    .slice(-2)
    .join(".");

/** Whether a browser sends the Adonix sign-in cookie to this site host. */
const receivesAuthCookie = (hostname: string) =>
    hostname === AUTH_COOKIE_DOMAIN ||
    hostname.endsWith(`.${AUTH_COOKIE_DOMAIN}`);

export function middleware(request: NextRequest) {
    const { pathname, search, searchParams } = request.nextUrl;
    // The Host header, not nextUrl: the dev server reports its own bind
    // address in nextUrl whatever host the browser asked for.
    const hostname = (
        request.headers.get("host") ?? request.nextUrl.host
    ).replace(/:\d+$/, "");

    // In local development with mock users, allow access to render local dev sign-in controls.
    if (LOCAL_AUTH_ENABLED) {
        return NextResponse.next();
    }

    // Cloudflare preview deployments (*.workers.dev) and localhost never
    // receive the sign-in cookie, so checking for it here would send a
    // signed-in visitor back to Google forever. Let the page check sign-in
    // from the browser instead, where the cookie does reach Adonix.
    if (!receivesAuthCookie(hostname)) {
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
