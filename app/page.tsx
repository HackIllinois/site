"use client";
import { FAQ } from "@/components/FAQ/FAQ";
import { GradientButton } from "@/components/GradientButton/GradientButton";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { tsukimi } from "@/theme/fonts";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import JoinUsSponsors from "./landing/JoinUsSponsors";
import styles from "./page.module.scss";
import { SocialIconsRow } from "@/components/GradientButton/GradientSocialButton";
import clsx from "clsx";
import { EventCountdownPill } from "@/components/EventCountdown/EventCountdown";

const Home: React.FC = () => {
    const [email, setEmail] = useState("");
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log("Subscribing email:", email);
            alert("Thank you for subscribing to HackVoyagers newsletter!");
            setEmail("");
        }
    };

    return (
        <>
            <main className={styles.main}>
                {/* Hero Section - Hackastra */}
                <section className={styles.heroSection}>
                    {/* Background Elements */}
                    <div className={styles.heroBackgrounds}>
                        <Image
                            src="/landing/hero/desktop/fight.svg"
                            alt="Stars Background"
                            fill
                            className={styles.starsBackground}
                            priority
                        />
                        <Image
                            src="/landing/hero/desktop/stars.svg"
                            alt="Tiny Stars Background"
                            fill
                            className={styles.tinyStarsBackground}
                            priority
                        />
                        <Image
                            src="/landing/hero/mobile/fight.svg"
                            alt="Stars Background"
                            fill
                            className={clsx(
                                styles.starsBackground,
                                styles.mobile
                            )}
                            priority
                        />
                        <Image
                            src="/landing/hero/mobile/stars.svg"
                            alt="Tiny Stars Background"
                            fill
                            className={clsx(
                                styles.tinyStarsBackground,
                                styles.mobile
                            )}
                            priority
                        />
                    </div>

                    <div className={styles.heroSectionContent}>
                        <Image
                            src="/design-reference/hackastra.svg"
                            alt="Hackastra"
                            width={850}
                            height={267}
                            className={styles.hackastraLogo}
                            priority
                        />
                        <GradientButton
                            text="REGISTER NOW"
                            link="/register/general"
                        />
                    </div>
                </section>

                {/* About Section */}
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
                            className={clsx(
                                styles.planetsBackground,
                                styles.mobile
                            )}
                            priority
                        />
                        <Image
                            src="/landing/about/mobile/tiny stars.png"
                            alt="Tiny Stars"
                            fill
                            className={clsx(
                                styles.tinyStarsBackground,
                                styles.mobile
                            )}
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
                            Urbana-Champaign&apos;s premier collegiate
                            hackathon. Join us in-person from{" "}
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

                {/* HackVoyagers Section */}
                <section className={styles.hackVoyagersSection}>
                    {/* Background Elements */}
                    <div className={styles.hackVoyagersBackgrounds}>
                        <Image
                            src="/design-reference/clouds.svg"
                            alt="Clouds Background"
                            fill
                            className={styles.cloudsBackground}
                            priority
                        />
                        <Image
                            src="/design-reference/tiny stars.svg"
                            alt="Tiny Stars"
                            fill
                            className={styles.tinyStarsBackground}
                            priority
                        />
                    </div>

                    <div className={styles.robotContainer}>
                        <Image
                            src="/design-reference/hackvoyagersrobotg.svg"
                            alt="HackVoyagers Robot"
                            width={500}
                            height={400}
                            className={styles.robotImage}
                        />
                    </div>
                    <div className={styles.textContainer}>
                        <h3 className={styles.introducingText}>Introducing</h3>
                        <Image
                            src="/design-reference/HACKVOYAGERS.svg"
                            alt="HackVoyagers"
                            width={600}
                            height={150}
                            className={styles.hackVoyagersText}
                        />
                        <div className={styles.hackVoyagersButtonContainer}>
                            <GradientButton
                                text="LEARN MORE"
                                link="/challenge/landing-page"
                            />
                        </div>
                    </div>
                </section>

                {/* Join Us Section */}
                <JoinUsSponsors />

                {/* FAQ Section */}
                <section className={styles.faqSection}>
                    <Image
                        src="/landing/faq/desktop/background.png"
                        alt="FAQ Background"
                        fill
                        className={styles.faqBackground}
                        priority
                    />
                    <Image
                        src="/landing/faq/mobile/background.svg"
                        alt="FAQ Background"
                        fill
                        className={clsx(styles.faqBackground, styles.mobile)}
                        priority
                    />

                    <div className={styles.faqContent}>
                        <Typography
                            variant="h2"
                            sx={{
                                color: "white",
                                textAlign: "center",
                                fontFamily: tsukimi.style.fontFamily,
                                fontWeight: 700
                            }}
                        >
                            FAQ
                        </Typography>

                        <FAQ />
                    </div>
                    <div className={styles.faqFooterContent}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                fontFamily: "Tsukimi Rounded"
                            }}
                        >
                            STAY UP TO DATE WITH HACKILLINOIS!
                        </Typography>

                        {/* Social Media Icons */}
                        <SocialIconsRow />

                        <Box>
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 18,
                                    mb: 2
                                }}
                            >
                                Sign up for our newsletter to get new updates!
                            </Typography>
                            <NewsletterSubscription />
                        </Box>
                    </div>

                    {/* City Skyline */}
                    <div className={styles.footerCitySkyline}></div>
                </section>
            </main>

            <EventCountdownPill
                targetDateTime="2026-02-27T18:00:00-06:00" // 6pm CST (with timezone)
                label="Countdown to HackIllinois 2026"
            />
        </>
    );
};

export default Home;
