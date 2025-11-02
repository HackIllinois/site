import { Montserrat } from "next/font/google";
import { Tsukimi_Rounded } from "next/font/google";

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
