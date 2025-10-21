"use client";
import { createTheme } from "@mui/material/styles";
import { Tsukimi_Rounded } from "next/font/google";

const tsukimi = Tsukimi_Rounded({
    weight: ["700"],
    subsets: ["latin"]
});

const theme = createTheme({
    typography: {
        h1: {
            // registration page titles
            color: "#fff",
            fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
            fontSize: "40px",
            fontWeight: 700
        }
    }
});
export default theme;
