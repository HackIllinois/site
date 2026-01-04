"use client";

import { EventCountdownPill } from "@/components/EventCountdown/EventCountdown";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { montserrat, tsukimi } from "../theme/fonts";
import "./globals.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.variable} ${tsukimi.variable} 
                            ${montserrat.className}`} // compatibility
            >
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <Navbar />
                        {children}
                        <Footer />
                        <EventCountdownPill
                            targetDateTime="2026-02-27T18:00:00-06:00"
                            label="Countdown to HackIllinois 2026"
                        />
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
