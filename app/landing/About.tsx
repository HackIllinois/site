"use client";

import { Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import styles from "./About.module.scss";
import { useParallaxScrollY } from "@/hooks/use-parallax-scrollY";
import { motion, Variants } from "framer-motion";

const About = () => {
    const { offsetY, ref } = useParallaxScrollY();

    const parallaxStyle = {
        transform: `translateY(${offsetY * 0.05}px)`
    };
    const parallaxStyle2 = {
        transform: `translateY(${offsetY * 0.15}px)`
    };

    const parallaxStyleMobile = {
        transform: `translateY(${offsetY * 0.04}px)`
    };
    const parallaxStyle2Mobile = {
        transform: `translateY(${offsetY * 0.1}px)`
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Delay between each child starting
                delayChildren: 0.2 // Initial delay before sequence starts
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 }, // Start lower and transparent
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section ref={ref} className={styles.aboutSection}>
            <div className={styles.aboutBackgrounds}>
                <Image
                    src="/landing/about/desktop/planets.svg"
                    alt="Planets Background"
                    fill
                    className={styles.planetsBackground}
                    priority
                    style={parallaxStyle}
                />
                <Image
                    src="/landing/about/desktop/stars.svg"
                    alt="Stars Background"
                    fill
                    className={styles.starsBackground}
                    priority
                    style={parallaxStyle2}
                />
                <Image
                    src="/landing/about/desktop/stars.svg"
                    alt="Stars Background"
                    fill
                    className={clsx(styles.starsBackground, styles.mobile)}
                    priority
                    style={parallaxStyle2Mobile}
                />
                <Image
                    src="/design-reference/tiny stars.svg"
                    alt="Tiny Stars"
                    fill
                    className={styles.tinyStarsBackground}
                    priority
                />

                <Image
                    src="/landing/about/mobile/planets.png"
                    alt="Planets Background"
                    fill
                    className={clsx(styles.planetsBackground, styles.mobile)}
                    priority
                    style={parallaxStyleMobile}
                />
                <Image
                    src="/landing/about/mobile/tiny stars.png"
                    alt="Tiny Stars"
                    fill
                    className={clsx(styles.tinyStarsBackground, styles.mobile)}
                    priority
                />
            </div>

            {/* 3. Convert container to motion.div and apply container variants */}
            <motion.div
                className={styles.content}
                variants={containerVariants}
                initial="hidden"
                // Use whileInView so it animates when scrolled to, not just on page load
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Trigger once when 30% visible
            >
                {/* 4. Wrap each Typography block in a motion div with item variants */}

                {/* Header */}
                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontFamily: "Tsukimi Rounded",
                            mt: 8,
                            mb: 4
                        }}
                    >
                        ABOUT THE EVENT
                    </Typography>
                </motion.div>

                {/* Paragraph 1 */}
                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            mt: 4,
                            mb: 4,
                            fontSize: { xs: "16px", md: "20px" },
                            color: "white",

                            "& strong": {
                                background:
                                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                fontWeight: 700
                            },

                            "& span": {
                                color: "#F480FF",
                                fontWeight: 700
                            }
                        }}
                    >
                        HackIllinois is University of Illinois at
                        Urbana-Champaign&apos;s premier collegiate hackathon.
                        Prospective attendees can register by the{" "}
                        <strong>
                            priority deadline on January 4, 2026 to be entered
                            into a raffle to win an iPad
                        </strong>
                        , or the <span>final deadline on January 27, 2026</span>
                        .
                    </Typography>
                </motion.div>

                {/* Paragraph 2 */}
                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            mt: 4,
                            mb: 4,
                            fontSize: {
                                xs: "16px",
                                md: "20px"
                            }
                        }}
                    >
                        {`Participants can work individually or in teams to submit projects to a specific track for a chance to win prizes. Whether you're a beginner or an experienced hacker, HackIllinois offers workshops, mentorship, and an inclusive environment for everyone to learn and create.`}
                    </Typography>
                </motion.div>

                {/* Final Tagline */}
                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            mt: 4,
                            fontSize: 28,
                            fontFamily: "Tsukimi Rounded",
                            fontWeight: 600,

                            "& span": {
                                background:
                                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.7))"
                            }
                        }}
                    >
                        <span>LAUNCH YOUR LEGACY!</span>
                    </Typography>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
