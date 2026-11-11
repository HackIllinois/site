import { Montserrat } from "next/font/google";
import { Tsukimi_Rounded } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import { Rye, Special_Elite } from "next/font/google";

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

// Saloon Rush (Pro challenge) signage and wanted-poster type
export const rye = Rye({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-rye"
});

export const specialElite = Special_Elite({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-special-elite"
});
