import { MLH_CODE_OF_CONDUCT_URL } from "@/app/register/general/constants/registration";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
    return (
        <Box
            id="site-footer"
            component="footer"
            sx={{
                width: "100%",
                background:
                    "linear-gradient(to bottom, #16133e 0%, #2a2654 100%)",
                color: "white",
                py: 2.5,
                px: 2,
                mt: "auto"
            }}
        >
            <Box
                sx={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "flex-start", md: "center" },
                    gap: 1.5
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "center" },
                        alignItems: { xs: "flex-start", md: "center" },
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 1, md: 3 },
                        flexWrap: "wrap",
                        fontSize: { xs: "0.75rem", md: "0.875rem" },
                        width: { xs: "100%", md: "auto" }
                    }}
                >
                    <MuiLink
                        href={MLH_CODE_OF_CONDUCT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "#a78bfa",
                            textDecoration: "none",
                            "&:hover": {
                                color: "#c4b5fd",
                                textDecoration: "underline"
                            }
                        }}
                    >
                        MLH Code of Conduct
                    </MuiLink>

                    <Typography
                        component="span"
                        sx={{
                            display: { xs: "none", md: "inline" },
                            color: "rgba(255, 255, 255, 0.4)"
                        }}
                    >
                        |
                    </Typography>

                    <MuiLink
                        href="https://info.hackillinois.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "#a78bfa",
                            textDecoration: "none",
                            "&:hover": {
                                color: "#c4b5fd",
                                textDecoration: "underline"
                            }
                        }}
                    >
                        HackIllinois Info Site
                    </MuiLink>

                    <Typography
                        component="span"
                        sx={{
                            display: { xs: "none", md: "inline" },
                            color: "rgba(255, 255, 255, 0.4)"
                        }}
                    >
                        |
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { xs: "flex-start", md: "center" },
                            gap: 0.5
                        }}
                    >
                        <MuiLink
                            href="mailto:contact@hackillinois.org"
                            sx={{
                                fontFamily: "Montserrat, sans-serif",
                                color: "#a78bfa",
                                textDecoration: "none",
                                "&:hover": {
                                    color: "#c4b5fd",
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            Contact Us
                        </MuiLink>
                    </Box>
                </Box>

                {/* Social Icons and Copyright Row */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: { xs: "flex-start", md: "center" }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center"
                        }}
                    >
                        <MuiLink
                            href="https://www.linkedin.com/company/hackillinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: "#a78bfa",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    color: "#c4b5fd"
                                }
                            }}
                        >
                            <LinkedInIcon sx={{ fontSize: "1.25rem" }} />
                        </MuiLink>
                        <MuiLink
                            href="https://x.com/HackIllinois"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: "#a78bfa",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    color: "#c4b5fd"
                                }
                            }}
                        >
                            <TwitterIcon sx={{ fontSize: "1.25rem" }} />
                        </MuiLink>
                    </Box>

                    <Typography
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "0.75rem",
                            color: "rgba(255, 255, 255, 0.6)"
                        }}
                    >
                        © HackIllinois 2026
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
