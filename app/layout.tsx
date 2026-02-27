"use client";

import { EventCountdownPill } from "@/components/EventCountdown/EventCountdown";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ResourcesButton } from "@/components/ResourcesButton/ResourcesButton";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import theme from "../theme";
import { montserrat, tsukimi, jersey } from "../theme/fonts";
import "./globals.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideFooter = pathname === "/schedule" || pathname === "/faq";

    return (
        <html lang="en">
            <head>
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
                <meta property="og:url" content="https://hackillinois.org" />
                <meta
                    property="og:image"
                    content="https://hackillinois.org/og-image.jpg"
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="HackIllinois 2026" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="HackIllinois 2026" />
                <meta
                    name="twitter:description"
                    content="Launch your Legacy and build your dreams at HackIllinois 2026. February 27 - March 1, 2026. Registrations open."
                />
                <meta
                    name="twitter:image"
                    content="https://hackillinois.org/og-image.jpg"
                />
            </head>
            <body
                className={`${montserrat.variable} ${tsukimi.variable} ${jersey.variable} 
                            ${montserrat.className}`} // compatibility
            >
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <Navbar />
                        {children}
                        <ResourcesButton />
                        {!hideFooter && <Footer />}
                        <EventCountdownPill
                            startDateTime="2026-02-27T14:00:00-06:00"
                            endDateTime="2026-03-01T06:00:00-06:00"
                        />
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
