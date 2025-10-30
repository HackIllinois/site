"use client";
import { createTheme } from "@mui/material/styles";

let theme = createTheme();
theme = createTheme(theme, {
    palette: {
        primary: {
            main: "#ffffff"
        }
    },
    typography: {
        fontFamily: "Montserrat, Roboto, Tsukimi Rounded, sans-serif",
        h1: {
            // titles/headers
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700
        },
        h2: {
            // page/section headers
            fontFamily: "Tsukimi Rounded, sans-serif",
            fontWeight: 600,
            fontSize: "3rem",
            [theme.breakpoints.down("sm")]: {
                fontSize: "2rem"
            },
            color: "#ffffff"
        },
        body1: {
            // body font (placeholders, labels)
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400
        },
        body2: {
            // smaller description/notes
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 200
        }
    }
});

export default theme;
