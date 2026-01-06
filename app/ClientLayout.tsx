"use client";

import { EventCountdownPill } from "@/components/EventCountdown/EventCountdown";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export default function ClientLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
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
    );
}
