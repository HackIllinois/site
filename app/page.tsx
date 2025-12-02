"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { Typography } from "@mui/material";
import clsx from "clsx";
import JoinUsSponsors from "./landing/JoinUsSponsors";

const Home: React.FC = () => {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleRegisterClick = () => {
        router.push("/register");
    };

    const handleLearnMoreClick = () => {
        router.push("/challenge");
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log("Subscribing email:", email);
            alert("Thank you for subscribing to HackVoyagers newsletter!");
            setEmail("");
        }
    };

    return (
        <main className={styles.main}>
            {/* Interactive Overlays - Position absolutely over background */}
            <div className={styles.interactiveOverlays}>
                {/* Hero Section */}
                <div className={styles.heroSection}>
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
                        className={clsx(styles.starsBackground, styles.mobile)}
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

                    <div className={styles.heroSectionContent}>
                        <Image
                            src="/design-reference/hackastra.svg"
                            alt="Hackastra"
                            width={850}
                            height={267}
                            className={styles.hackastraLogo}
                            priority
                        />
                        [Button goes here]
                        {/* <button 
                            className={styles.heroRegisterButton}
                            onClick={handleRegisterClick}
                            aria-label="Register Now"
                        >
                            <Image
                                src="/design-reference/register button.svg"
                                alt="Register Button"
                                width={300}
                                height={84}
                                className={styles.registerButtonImage}
                            />
                        </button> */}
                    </div>
                </div>

                {/* About Section */}
                <div className={styles.aboutSection}>
                    {/* <Image
                        src="/design-reference/planets.svg"
                        alt="Planets Background"
                        fill
                        className={styles.planetsBackground}
                        priority
                    />
                    <Image
                        src="/design-reference/tiny stars.svg"
                        alt="Tiny Stars Background"
                        fill
                        className={styles.aboutTinyStarsBackground}
                        priority
                    /> */}
                    <div className={styles.content}>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                mt: 8,
                                mb: 4
                            }}
                        >
                            ABOUT THE EVENT
                        </Typography>

                        <Typography
                            component="p"
                            sx={{
                                mt: 8,
                                mb: 4
                            }}
                        >
                            {`HackIllinois is University of Illinois at Urbana-Champaign's premier collegiate hackathon. Join us in-person from February 27th to March 1st at the Siebel Center for Computer Science!

                            Participants can work individually or in teams to submit projects to a specific track for a chance to win prizes. Whether you're a beginner or an experienced hacker, HackIllinois offers workshops, mentorship, and an inclusive environment for everyone to learn and create.`}
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                mt: 8,
                                mb: 4
                            }}
                        >
                            LAUNCH YOUR LEGACY!
                        </Typography>
                    </div>

                    {/* <Image
                        src="/design-reference/text.svg"
                        alt="About HackVoyagers"
                        width={1000}
                        height={500}
                        className={styles.aboutText}
                    /> */}
                </div>

                {/* HackVoyagers Section */}
                <div className={styles.hackVoyagersSection}>
                    <Image
                        src="/design-reference/clouds.svg"
                        alt="Clouds Background"
                        fill
                        className={styles.cloudsBackground}
                        priority
                    />
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
                        <Image
                            src="/design-reference/INTRODUCING.svg"
                            alt="Introducing"
                            width={400}
                            height={100}
                            className={styles.introducingText}
                        />
                        <Image
                            src="/design-reference/HACKVOYAGERS.svg"
                            alt="HackVoyagers"
                            width={600}
                            height={150}
                            className={styles.hackVoyagersText}
                        />
                        <button
                            className={styles.learnMoreButton}
                            onClick={handleLearnMoreClick}
                            aria-label="Learn More"
                        >
                            <Image
                                src="/design-reference/voyagers button learn more.svg"
                                alt="Learn More Button"
                                width={180}
                                height={55}
                                className={styles.learnMoreButtonImage}
                            />
                        </button>
                    </div>
                </div>

                {/* Join Us Section */}
                <JoinUsSponsors />

                {/* FAQ Section */}
                <div className={styles.faqSection}>
                    <Image
                        src="/design-reference/FAQ (1).svg"
                        alt="FAQ"
                        width={1100}
                        height={275}
                        className={styles.faqText}
                    />
                </div>

                {/* Stay Up To Date Section */}
                <div className={styles.stayUpToDateSection}>
                    <Image
                        src="/design-reference/STAY UP TO DATE.svg"
                        alt="Stay Up To Date"
                        width={1200}
                        height={250}
                        className={styles.stayUpToDateText}
                    />
                </div>
            </div>
        </main>
    );
};

export default Home;
