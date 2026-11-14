import { MLH_CODE_OF_CONDUCT_URL } from "@/app/register/general/constants/registration";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const linkSx = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "14px",
    color: "var(--footer-link)",
    textDecoration: "none",
    py: 0.5,
    "&:hover": {
        color: "var(--footer-link-hover)",
        textDecoration: "underline"
    }
} as const;

const iconLinkSx = {
    color: "var(--footer-link)",
    display: "flex",
    alignItems: "center",
    p: 0.5,
    "&:hover": {
        color: "var(--footer-link-hover)"
    }
} as const;

const Footer = () => {
    return (
        <Box
            id="site-footer"
            component="footer"
            sx={{
                width: "100%",
                background:
                    "linear-gradient(to bottom, var(--footer-bg-from) 0%, var(--footer-bg-to) 100%)",
                color: "white",
                py: 2.5,
                px: 2,
                pb: 4,
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
                    gap: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "center" },
                        alignItems: { xs: "flex-start", md: "center" },
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 1.5, md: 3 },
                        flexWrap: "wrap",
                        fontSize: "14px",
                        width: { xs: "100%", md: "auto" }
                    }}
                >
                    <MuiLink
                        href={MLH_CODE_OF_CONDUCT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={linkSx}
                    >
                        MLH Code of Conduct
                    </MuiLink>

                    <Typography
                        component="span"
                        sx={{
                            display: { xs: "none", md: "inline" },
                            color: "rgba(255, 255, 255, 0.4)",
                            fontSize: "14px"
                        }}
                    >
                        |
                    </Typography>

                    <MuiLink
                        href="https://info.hackillinois.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={linkSx}
                    >
                        HackIllinois Info Site
                    </MuiLink>

                    <Typography
                        component="span"
                        sx={{
                            display: { xs: "none", md: "inline" },
                            color: "rgba(255, 255, 255, 0.4)",
                            fontSize: "14px"
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
                            sx={linkSx}
                        >
                            Contact Us
                        </MuiLink>
                    </Box>

                    <Typography
                        component="span"
                        sx={{
                            display: { xs: "none", md: "inline" },
                            color: "rgba(255, 255, 255, 0.4)",
                            fontSize: "14px"
                        }}
                    >
                        |
                    </Typography>

                    <MuiLink href="/legal" sx={linkSx}>
                        Legal
                    </MuiLink>
                </Box>

                {/* Social Icons and Copyright Row */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2.5,
                        flexWrap: "wrap",
                        justifyContent: { xs: "flex-start", md: "center" }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center"
                        }}
                    >
                        <MuiLink
                            href="https://www.linkedin.com/company/hackillinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={iconLinkSx}
                        >
                            <LinkedInIcon sx={{ fontSize: "1.5rem" }} />
                        </MuiLink>
                        <MuiLink
                            href="https://x.com/HackIllinois"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={iconLinkSx}
                        >
                            <TwitterIcon sx={{ fontSize: "1.5rem" }} />
                        </MuiLink>
                    </Box>

                    <Typography
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "14px",
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
