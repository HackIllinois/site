"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { Typography } from "@mui/material";
import clsx from "clsx";

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
            {/* Hero Section - Hackastra */}
            <section className={styles.heroSection}>
                <div className={styles.heroSectionContent}>
                    <Image
                        src="/design-reference/hackastra.svg"
                        alt="Hackastra"
                        width={850}
                        height={267}
                        className={styles.hackastraLogo}
                        priority
                    />
                    <button 
                        className={styles.heroRegisterButton}
                        onClick={handleRegisterClick}
                        aria-label="Register Now"
                    >
                        REGISTER NOW!
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section className={styles.aboutSection}>
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
                            mt: 4,
                            mb: 4
                        }}
                    >
                        {`HackIllinois is University of Illinois at Urbana-Champaign's premier collegiate hackathon. Join us in-person from February 27th to March 1st at the Siebel Center for Computer Science!

                        Participants can work individually or in teams to submit projects to a specific track for a chance to win prizes. Whether you're a beginner or an experienced hacker, HackIllinois offers workshops, mentorship, and an inclusive environment for everyone to learn and create.`}
                    </Typography>
                    <Typography
                        component="p"
                        sx={{
                            mt: 4,
                            mb: 8
                        }}
                    >
                        LAUNCH YOUR LEGACY!
                    </Typography>
                </div>
            </section>

            {/* HackVoyagers Section */}
            <section className={styles.hackVoyagersSection}>
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
            </section>

            {/* Join Us Section */}
            <section className={styles.joinUsSection}>
                <div className={styles.joinUsContent}>
                    <Image
                        src="/design-reference/JOIN US.svg"
                        alt="Join Us"
                        width={600}
                        height={150}
                        className={styles.joinUsText}
                    />
                </div>
            </section>

            {/* Sponsors Section */}
            <section className={styles.sponsorsSection}>
                <div className={styles.sponsorsContent}>
                    <Image
                        src="/design-reference/SPONSORS.svg"
                        alt="Sponsors"
                        width={800}
                        height={200}
                        className={styles.sponsorsText}
                    />
                    <Typography
                        component="p"
                        sx={{
                            mt: 4,
                            mb: 8
                        }}
                    >
                        [Sponsors will be displayed here]
                    </Typography>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className={styles.faqContent}>
                    <Image
                        src="/design-reference/FAQ (1).svg"
                        alt="FAQ"
                        width={1100}
                        height={275}
                        className={styles.faqText}
                    />
                    <Typography
                        component="p"
                        sx={{
                            mt: 4,
                            mb: 8
                        }}
                    >
                        [FAQ content will be displayed here]
                    </Typography>
                </div>
            </section>

            {/* Footer - Stay Up To Date */}
            <footer className={styles.stayUpToDateSection}>
                <div className={styles.footerContent}>
                    <Image
                        src="/design-reference/STAY UP TO DATE.svg"
                        alt="Stay Up To Date"
                        width={1200}
                        height={250}
                        className={styles.stayUpToDateText}
                    />
                    <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className={styles.emailInput}
                            required
                        />
                        <button type="submit" className={styles.subscribeButton}>
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </footer>
        </main>
    );
};

export default Home;
