"use client";

import { Box, Link, Typography } from "@mui/material";
import styles from "./JoinUsSponsors.module.scss";
import Image from "next/image";
import { tsukimi } from "@/theme/fonts";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { GradientButtonInstagram } from "@/components/GradientButton/GradientButtonInstagram";
import clsx from "clsx";
import { motion, useAnimation, Variants, useInView } from "framer-motion"; // Added useInView
import { useParallaxScrollY } from "@/hooks/use-parallax-scrollY";
import { useEffect, useRef } from "react"; // Added hooks

const alienAssets = [
    "/landing/sponsors/aliens/alien1.svg",
    "/landing/sponsors/aliens/alien2.svg",
    "/landing/sponsors/aliens/alien3.svg",
    "/landing/sponsors/aliens/alien4.svg",
    "/landing/sponsors/aliens/alien5.svg",
    "/landing/sponsors/aliens/alien6.svg"
];

const alienSponsors = [
    {
        name: "FulcrumGT",
        tier: "title",
        image: "/sponsor_icons/multi-color/fulcrum-gt.svg",
        alienIndex: 0
    },
    {
        name: "John Deere",
        tier: "gold",
        image: "/sponsor_icons/multi-color/john-deere.png",
        alienIndex: 1
    },
    {
        name: "Stripe",
        tier: "gold",
        image: "/sponsor_icons/multi-color/stripe.svg",
        alienIndex: 2
    },
    {
        name: "IMC",
        tier: "gold",
        image: "/sponsor_icons/multi-color/imc.png",
        alienIndex: 3
    },

    {
        name: "Modal",
        image: "/sponsor_icons/multi-color/modal.svg",
        tier: "gold",
        alienIndex: 4
    },
    {
        name: "Capital One",
        tier: "gold",
        image: "/sponsor_icons/multi-color/capital-one.png",
        alienIndex: 5
    }
];

const bottomSponsorsRows: Array<{
    name: string;
    image: string;
    tier: string;
    squareBox?: boolean;
    invertToWhite?: boolean;
    shiftRight?: boolean;
}> = [
    // Row 1: silver tier (6 sponsors)
    {
        name: "Supermemory",
        tier: "silver",
        image: "/sponsor_icons/multi-color/supermemory.svg"
    },
    {
        name: "T-Mobile",
        image: "/sponsor_icons/multi-color/tmobile.png",
        tier: "silver",
        squareBox: true
    },
    {
        name: "Solana Foundation",
        image: "/sponsor_icons/multi-color/solana.svg",
        tier: "silver"
    },
    {
        name: "Caterpillar",
        tier: "gold",
        image: "/sponsor_icons/multi-color/caterpillar.png"
    },
    // Row 2: bronze + prize (5 sponsors)
    {
        name: "Exa",
        image: "/sponsor_icons/multi-color/exa.svg",
        tier: "bronze"
    },
    {
        name: "Actian",
        image: "/sponsor_icons/multi-color/actian.svg",
        tier: "bronze"
    },
    {
        name: "Cloudflare",
        image: "/sponsor_icons/multi-color/cloudflare.svg",
        tier: "prize"
    },
    {
        name: "OpenAI",
        image: "/sponsor_icons/multi-color/openai.png",
        tier: "prize"
    },
    {
        name: "Aedify AI",
        image: "/sponsor_icons/multi-color/aedify-ai.svg",
        tier: "prize"
    },
    {
        name: "Nora",
        image: "/sponsor_icons/multi-color/nora.png",
        tier: "prize"
    }
];

const sponsorBackgroundColor = "rgba(193, 193, 193, 0.7)";

const MotionImage = motion(Image);

const JoinUsSponsors = () => {
    const ufoControls = useAnimation();
    const { offsetY, ref } = useParallaxScrollY();

    // 1. Create a Ref for the container holding the UFO
    const containerRef = useRef(null);

    // 2. Track when that container enters the viewport
    // amount: 0.3 means "trigger when 30% of the container is visible on screen"
    const isContainerInView = useInView(containerRef, {
        once: true,
        amount: 0.3
    });

    const ufoVariants: Variants = {
        hidden: {
            x: "50vw",
            y: "-50vh",
            scale: 0.5,
            opacity: 0,
            rotate: 15
        },
        enter: {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                duration: 5,
                bounce: 0.4
            }
        },
        float: {
            y: ["-20px", "20px"],
            rotate: ["-1deg", "1deg"],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
            }
        }
    };

    // 3. Trigger the animation via useEffect when the container comes into view
    useEffect(() => {
        const handleUfoEntrance = async () => {
            if (isContainerInView) {
                await ufoControls.start("enter");
                ufoControls.start("float");
            }
        };
        handleUfoEntrance();
    }, [isContainerInView, ufoControls]);

    const backgroundPulseVariants: Variants = {
        pulse: {
            filter: ["brightness(0.5)", "brightness(0.8)", "brightness(0.5)"],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const contentContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const parallaxStyle = {
        transform: `translateY(${offsetY * 0.1}px)`
    };

    return (
        <div className={styles.joinUsSection} ref={ref}>
            <MotionImage
                src="/landing/sponsors/background.png"
                alt="Sponsors Background"
                fill
                className={styles.background}
                priority
                variants={backgroundPulseVariants}
                animate="pulse"
            />

            <Image
                src="/landing/sponsors/foreground.svg"
                alt="Sponsors Foreground"
                fill
                className={styles.foreground}
                priority
            />
            <Image
                src="/landing/sponsors/foreground-rocks.svg"
                alt="Sponsors Foreground Rocks"
                fill
                className={styles.foreground}
                style={parallaxStyle}
                priority
            />

            {/* 4. Attach the containerRef here */}
            <div className={styles.ufoContainer} ref={containerRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={styles.ufoImage}
                    variants={ufoVariants}
                    initial="hidden"
                    animate={ufoControls}
                    // Removed onViewportEnter from here
                />

                <motion.img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={clsx(styles.ufoImage, styles.mobile)}
                    variants={ufoVariants}
                    initial="hidden"
                    animate={ufoControls}
                    // Removed onViewportEnter from here
                />

                <motion.div
                    className={styles.joinUsContentContainer}
                    variants={contentContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div variants={itemVariants}>
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
                    </motion.div>

                    <motion.div variants={itemVariants}>
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
                            or <b>subscribe to our newsletter</b> to be notified
                            of our event updates! There will be regular content
                            and posts.
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
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
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.sponsorSectionContentContainer}
                    variants={contentContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div variants={itemVariants}>
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
                    </motion.div>
                </motion.div>

                <Box
                    sx={{
                        width: "100%"
                    }}
                >
                    <div className={styles.aliensContainer}>
                        {alienAssets.map((src, index) => {
                            const sponsor = alienSponsors.find(
                                s => s.alienIndex === index
                            );
                            return (
                                <div
                                    key={index}
                                    className={`${styles.alienWrapper} ${styles[`alien${index}`]}`}
                                    style={{
                                        animationDelay: `${index * 0.15}s`
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt={`Alien ${index + 1}`}
                                        className={`${styles.alienImage} ${sponsor ? styles[sponsor.tier] : ""}`}
                                    />
                                    {sponsor && (
                                        <Box
                                            className={`${styles.sponsorLogo} ${styles[sponsor.tier]}`}
                                            sx={{
                                                backgroundColor:
                                                    sponsorBackgroundColor,
                                                p: 3,
                                                borderRadius: "999px"
                                            }}
                                        >
                                            <img
                                                src={sponsor.image}
                                                alt={sponsor.name}
                                                style={{
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.bottomSponsorsContainer}>
                        <div
                            className={styles.bottomSponsorsGrid}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "24px"
                            }}
                        >
                            {Array.from({
                                length: Math.ceil(bottomSponsorsRows.length / 4)
                            }).map((_, i) => (
                                <Box
                                    key={`sponsor-row-${i}`}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "24px",
                                        flexWrap: "wrap"
                                    }}
                                >
                                    {bottomSponsorsRows
                                        .slice(i * 4, i * 4 + 4)
                                        .map((sponsor, index) => (
                                            <Box
                                                key={`${i}-${index}-bottom-sponsor`}
                                                className={`${styles.bottomSponsorLogo} ${styles[`${sponsor.tier}Tier`]} ${sponsor.squareBox ? styles.squareBox : ""}`}
                                                sx={{
                                                    backgroundColor:
                                                        sponsorBackgroundColor,
                                                    borderRadius: "9999px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flex: "0 1 auto" // Allows box to size based on content/width
                                                }}
                                            >
                                                <img
                                                    src={sponsor.image}
                                                    alt={sponsor.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "contain"
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                </Box>
                            ))}
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default JoinUsSponsors;
