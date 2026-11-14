"use client";
import { EventCountdownPill } from "@/components/EventCountdown/EventCountdown";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ResourcesButton } from "@/components/ResourcesButton/ResourcesButton";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

export default function StandardSiteLayout({
    children,
    hideFooter
}: {
    children: React.ReactNode;
    hideFooter: boolean;
}) {
    return (
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
    );
}
