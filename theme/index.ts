"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff"
        }
    },
    typography: {
        fontFamily: "Montserrat, Roboto, Tsukimi Rounded, sans-serif",
        h1: {
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700
        },
        h2: {
            fontFamily: "Tsukimi Rounded, sans-serif",
            fontWeight: 600,
            fontSize: "3rem",
            color: "#ffffff"
        },
        body1: {
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400
        }
    }
});

export default theme;
