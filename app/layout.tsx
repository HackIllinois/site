// "use client";

import Navbar from "@/components/Navbar/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import theme from "../theme";
import { montserrat, tsukimi } from "../theme/fonts";
import "./globals.scss";

export const metadata: Metadata = {
    title: "HackIllinois",
    description:
        "The official website of the University of Illinois at Urbana-Champaign's Premier Hackathon!"
};

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
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
