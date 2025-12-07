"use client";
import { EventCountdownPill } from "@/components/EventCountdown/EventCountdown";
import React from "react";
import About from "./landing/About";
import FaqSection from "./landing/FaqSection";
import HackVoyagers from "./landing/HackVoyagers";
import Hero from "./landing/Hero";
import JoinUsSponsors from "./landing/JoinUsSponsors";
import styles from "./page.module.scss";

const Home: React.FC = () => {
    return (
        <>
            <main className={styles.main}>
                {/* Hero Section - Hackastra */}
                <Hero />

                {/* About Section */}
                <About />

                {/* HackVoyagers Section */}
                <HackVoyagers />

                {/* Join Us Section */}
                <JoinUsSponsors />

                {/* FAQ Section */}
                <FaqSection />
            </main>

            <EventCountdownPill
                targetDateTime="2026-02-27T18:00:00-06:00" // 6pm CST (with timezone)
                label="Countdown to HackIllinois 2026"
            />
        </>
    );
};

export default Home;
