"use client";
import React from "react";
import About from "./landing/About";
import FaqSection from "./landing/FaqSection";
import HackVoyagers from "./landing/HackVoyagers";
import Hero from "./landing/Hero";
import JoinUsSponsors from "./landing/JoinUsSponsors";
import styles from "./page.module.scss";

const Home: React.FC = () => {
    return (
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
    );
};

export default Home;
