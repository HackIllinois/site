"use client";
import { createTheme } from "@mui/material/styles";
import { Tsukimi_Rounded } from "next/font/google";

export const tsukimi = Tsukimi_Rounded({
    subsets: ["latin"],
    weight: ["500", "600", "700"]
});

export const registrationTheme = createTheme({
    typography: {
        h1: {
            // registration page titles
            color: "#fff",
            fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
            fontSize: "40px",
            fontWeight: 700,
            textAlign: "left",
            "@media (min-width:0px)": {
                // xsm and up
                fontSize: "20px"
            },
            "@media (min-width:900px)": {
                // md and up
                fontSize: "40px"
            },
            "@media (min-width:1200px)": {
                // lg and up
                fontSize: "40px"
            },
            "@media (min-width:1536px)": {
                // xl and up
                fontSize: "40px"
            }
        },
        h3: {
            // question text
            color: "#fff",
            fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
            fontSize: "22px",
            fontWeight: 600
        },
        body1: {
            fontFamily: `Montserrat, sans-serif`,
            fontSize: "22px",
            color: "#fff",
            fontWeight: 400,
            "@media (max-width:560px)": {
                fontSize: "14px"
            }
        }
    }
});
