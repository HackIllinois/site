import "./globals.scss";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import RootLayout from "@/components/RootLayout";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HackIllinois",
    description:
        "The official website of the University of Illinois at Urbana-Champaign's Premier Hackathon!"
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <RootLayout>{children}</RootLayout>
            </body>
        </html>
    );
}
