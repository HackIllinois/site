import { auth } from "@/auth";
import { getChallenge, getRegistrationOrDefault } from "./util/api";
import { RegistrationType } from "./util/types";

export default auth(async req => {
    if (process.env.HYPE_SITE) {
        const newUrl = new URL("/", "https://hype.hackillinois.org");
        return Response.redirect(newUrl);
    }

    if (
        !req.auth &&
        (req.nextUrl.pathname.startsWith("/register") ||
            req.nextUrl.pathname.startsWith("/profile"))
    ) {
        const newUrl = new URL(
            `/login?to=${encodeURIComponent(req.nextUrl.pathname)}`,
            req.nextUrl.origin
        );
        return Response.redirect(newUrl);
    }

    if (req.nextUrl.pathname.startsWith("/profile")) {
        const registration = await getRegistrationOrDefault();
        if (!registration.hasSubmitted) {
            const newUrl = new URL("/register", req.nextUrl.origin);
            return Response.redirect(newUrl);
        }
        return;
    }

    if (req.nextUrl.pathname.startsWith("/register")) {
        const registration = await getRegistrationOrDefault();
        const path = await determineRegistration(
            req.nextUrl.pathname,
            registration
        );
        if (path === req.nextUrl.pathname) {
            return;
        }
        const newUrl = new URL(path, req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
});

async function determineRegistration(
    pathname: string,
    registration: RegistrationType
) {
    if (registration.hasSubmitted) {
        return pathname === "/register/confirmation"
            ? "/register/confirmation"
            : "/profile";
    }

    if (pathname === "/register/challenge") {
        const { complete } = await getChallenge();
        if (complete) {
            return "/register/challenge/status";
        }
    }

    const generalPages = [
        "/register/education",
        "/register/hack-specific",
        "/register/transportation",
        "/register/review",
        "/register/confirmation"
    ];

    if (generalPages.includes(pathname) && registration.legalName === "") {
        return "/register";
    }
    generalPages.shift();

    if (generalPages.includes(pathname) && registration.degree === "") {
        return "/register/education";
    }
    generalPages.shift();

    if (
        generalPages.includes(pathname) &&
        registration.hackInterest.length === 0
    ) {
        return "/register/hack-specific";
    }

    if (pathname === "/register/confirmation") {
        return "/register/review";
    }

    return pathname;
}
