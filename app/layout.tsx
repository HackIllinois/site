"use client";

import { clearFooterTheme } from "@/app/register/general/constants/registration";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
    montserrat,
    tsukimi,
    jersey,
    oswald,
    rye,
    specialElite
} from "../theme/fonts";
import "./globals.scss";

const StandardSiteLayout = dynamic(() => import("./StandardSiteLayout"));

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideFooter = pathname === "/schedule" || pathname === "/faq";
    const isFrontier = ["/", "/challenge", "/job-board"].includes(pathname);
    const isRegister = pathname.startsWith("/register");

    // Drop step-specific inline footer vars when leaving /register so :root navy returns.
    useEffect(() => {
        if (isRegister) return;
        clearFooterTheme();
    }, [isRegister]);

    return (
        <html lang="en">
            <head>
                {!isFrontier && (
                    <>
                        <title>HackIllinois 2026</title>
                        <meta
                            name="description"
                            content="Launch your Legacy and build your dreams at HackIllinois 2026. February 27 - March 1, 2026. Registrations open."
                        />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, viewport-fit=cover"
                        />

                        {/* OpenGraph */}
                        <meta property="og:title" content="HackIllinois 2026" />
                        <meta
                            property="og:description"
                            content="Launch your Legacy and build your dreams at HackIllinois 2026. February 27 - March 1, 2026. Registrations open."
                        />
                        <meta property="og:type" content="website" />
                        <meta property="og:site_name" content="HackIllinois" />
                        <meta
                            property="og:url"
                            content="https://hackillinois.org"
                        />
                        <meta
                            property="og:image"
                            content="https://hackillinois.org/og-image.jpg"
                        />
                        <meta property="og:image:width" content="1200" />
                        <meta property="og:image:height" content="630" />
                        <meta
                            property="og:image:alt"
                            content="HackIllinois 2026"
                        />

                        {/* Twitter */}
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            name="twitter:title"
                            content="HackIllinois 2026"
                        />
                        <meta
                            name="twitter:description"
                            content="Launch your Legacy and build your dreams at HackIllinois 2026. February 27 - March 1, 2026. Registrations open."
                        />
                        <meta
                            name="twitter:image"
                            content="https://hackillinois.org/og-image.jpg"
                        />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Ultra&display=swap"
                            rel="stylesheet"
                        />
                    </>
                )}
            </head>
            <body
                className={`${montserrat.variable} ${tsukimi.variable} ${jersey.variable} ${oswald.variable} ${rye.variable} ${specialElite.variable}
                            ${montserrat.className}${isRegister ? " register-route" : ""}`} // compatibility
            >
                {isFrontier ? (
                    children
                ) : (
                    <StandardSiteLayout hideFooter={hideFooter}>
                        {children}
                    </StandardSiteLayout>
                )}
            </body>
        </html>
    );
}
