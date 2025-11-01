"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
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
export default theme;
