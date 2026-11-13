import { Montserrat } from "next/font/google";
import { Tsukimi_Rounded } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat"
});

export const tsukimi = Tsukimi_Rounded({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-tsukimi-rounded"
});

export const jersey = Jersey_10({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jersey"
});

// Self-hosted (variable font, weights 200-700, latin subset) so the nav
// buttons don't silently fall back to Arial when the Google Fonts download
// fails while the dev server or build starts. Oswald is OFL-licensed.
export const oswald = localFont({
    src: "./font-files/Oswald-latin-variable.woff2",
    weight: "200 700",
    style: "normal",
    display: "swap",
    variable: "--font-oswald"
});
