"use client";
import { createTheme, Theme } from "@mui/material/styles";

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
        h3: {
            // labels for inputs, etc
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400,
            fontSize: "1.2rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "1rem"
            }
        },
        body1: {
            // body font (placeholders, inputs) -- default
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400
        },
        body2: {
            // use for smaller descriptions/notes
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: "1rem"
        }
    },
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: () => ({
                    // input labels!
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 400,
                    fontSize: "1.4rem",
                    [theme.breakpoints.down("md")]: {
                        fontSize: "1rem"
                    },
                    // prevent color changing on error
                    "&.Mui-error": {
                        color: "#ffffff"
                    }
                })
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    // use body2 (small notes) for helper text
                    ...theme.typography.body2
                })
            }
        }
    }
});

export default theme;
