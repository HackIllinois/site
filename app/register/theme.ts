"use client";
import { createTheme } from "@mui/material/styles";
import { Tsukimi_Rounded } from "next/font/google";

const tsukimi = Tsukimi_Rounded({
    subsets: ["latin"],
    weight: ["500", "600", "700"]
});

const RegistrationTheme = createTheme({
    typography: {
        h1: {
            // registration page titles
            color: "#fff",
            fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
            fontSize: "40px",
            fontWeight: 700,
            "@media (min-width:0px)": {
                // xsm and up
                fontSize: "30px",
                textAlign: "center"
            },
            "@media (min-width:900px)": {
                // md and up
                fontSize: "40px",
                textAlign: "left"
            },
            "@media (min-width:1200px)": {
                // lg and up
                fontSize: "40px",
                textAlign: "left"
            },
            "@media (min-width:1536px)": {
                // xl and up
                fontSize: "40px",
                textAlign: "left"
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
            // question response options text
            color: "#fff",
            fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
            fontSize: "22px",
            fontWeight: 500
        }
    }
});

export default RegistrationTheme;
