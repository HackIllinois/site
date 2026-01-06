import type { Metadata } from "next";
import { montserrat, tsukimi } from "../theme/fonts";
import "./globals.scss";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
    title: "HackIllinois 2026",
    description:
        "Launch your Legacy and build your dreams at HackIllinois 2026. February 27 - March 1, 2026. Registrations open.",
    openGraph: {
        title: "HackIllinois 2026",
        description:
            "Launch your Legacy and build your dreams at HackIllinois 2026. February 27 - March 1, 2026. Registrations open.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "HackIllinois 2026"
            }
        ],
        type: "website"
    }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.variable} ${tsukimi.variable} 
                            ${montserrat.className}`} // compatibility
            >
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
