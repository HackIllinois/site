import { Box, Link, Typography } from "@mui/material";
import styles from "./JoinUsSponsors.module.scss";
import Image from "next/image";
import { tsukimi } from "@/theme/fonts";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { GradientButtonInstagram } from "@/components/GradientButton/GradientButtonInstagram";
import clsx from "clsx";

const alienAssets = [
    "/landing/sponsors/aliens/alien1.svg",
    "/landing/sponsors/aliens/alien2.svg",
    "/landing/sponsors/aliens/alien3.svg",
    "/landing/sponsors/aliens/alien4.svg",
    "/landing/sponsors/aliens/alien5.svg",
    "/landing/sponsors/aliens/alien6.svg"
];

const JoinUsSponsors = () => {
    return (
        <div className={styles.joinUsSection}>
            <Image
                src="/landing/sponsors/background.png"
                alt="Sponsors Background"
                fill
                className={styles.background}
                priority
            />

            <div className={styles.ufoContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={styles.ufoImage}
                />

                <img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={clsx(styles.ufoImage, styles.mobile)}
                />

                <div className={styles.joinUsContentContainer}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: "Tsukimi Rounded",
                            fontWeight: 600,
                            color: "#3F2B75",
                            textAlign: "center"
                        }}
                    >
                        JOIN US
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            fontFamily: "Montserrat",
                            color: "#3F2B75",
                            textAlign: "center",
                            maxWidth: "700px",
                            margin: "20px auto",
                            fontSize: {
                                xs: "14px",
                                md: "20px"
                            }
                        }}
                    >
                        Follow us on{" "}
                        <b>
                            Instagram (
                            <Link
                                href="https://www.instagram.com/hackillinois"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline={"always"}
                                color="inherit"
                            >
                                @HackIllinois
                            </Link>
                            )
                        </b>{" "}
                        or <b>subscribe to our newsletter</b> to be notified of
                        our event updates! There will be regular content and
                        posts.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            gap: "30px",
                            zIndex: 95
                        }}
                    >
                        <Box
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "block"
                                }
                            }}
                        >
                            <GradientButtonInstagram />
                        </Box>
                        <Box>
                            <Typography
                                variant="body2"
                                component="p"
                                sx={{
                                    fontFamily: "Tsukimi Rounded",
                                    fontSize: {
                                        xs: "14px",
                                        md: "20px"
                                    },
                                    color: "#3F2B75",
                                    fontWeight: 600,
                                    mb: 1
                                }}
                            >
                                NEWSLETTER SIGN UP
                            </Typography>
                            <NewsletterSubscription />
                        </Box>
                    </Box>
                </div>

                <div className={styles.sponsorSectionContentContainer}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: tsukimi.style.fontFamily,
                            fontWeight: 700,
                            mt: {
                                xs: "20px",
                                md: 0
                            }
                        }}
                    >
                        SPONSORS
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            color: "#ccc",
                            textAlign: "center",
                            fontFamily: "Montserrat"
                        }}
                    >
                        To be announced soon!
                    </Typography>
                </div>

                <div className={styles.aliensContainer}>
                    {alienAssets.map((src, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={index}
                            src={src}
                            alt={`Alien ${index + 1}`}
                            className={`${styles.alienImage} ${
                                styles[`alien${index}`]
                            }`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JoinUsSponsors;
