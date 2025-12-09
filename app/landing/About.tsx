"use client";

import { Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import styles from "./About.module.scss";

const About = () => {
    return (
        <section className={styles.aboutSection}>
            {/* Background Elements */}
            <div className={styles.aboutBackgrounds}>
                <Image
                    src="/landing/about/desktop/planets.svg"
                    alt="Planets Background"
                    fill
                    className={styles.planetsBackground}
                    priority
                />
                <Image
                    src="/landing/about/desktop/stars.svg"
                    alt="Stars Background"
                    fill
                    className={styles.starsBackground}
                    priority
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
                />
                <Image
                    src="/landing/about/mobile/tiny stars.png"
                    alt="Tiny Stars"
                    fill
                    className={clsx(styles.tinyStarsBackground, styles.mobile)}
                    priority
                />
            </div>

            <div className={styles.content}>
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
                    HackIllinois is University of Illinois at
                    Urbana-Champaign&apos;s premier collegiate hackathon. Join
                    us in-person from{" "}
                    <strong>February 27th to March 1st</strong> at the{" "}
                    <strong>Siebel Center for Computer Science</strong>!
                </Typography>

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

                <Typography
                    component="p"
                    sx={{
                        mt: 4,
                        fontSize: 28,
                        fontFamily: "Tsukimi Rounded",
                        fontWeight: 600
                    }}
                >
                    LAUNCH YOUR LEGACY!
                </Typography>
            </div>
        </section>
    );
};

export default About;
