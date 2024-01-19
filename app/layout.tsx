import Navbar from "@/components/Navbar/Navbar";
import "./globals.scss";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HackIllinois",
    description:
        "The official website of the University of Illinois at Urbana-Champaign's Premier Hackathon!"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
