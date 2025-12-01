"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

const Home: React.FC = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();
    
    const handleRegisterClick = () => {
        router.push('/register');
    };
    
    const handleLearnMoreClick = () => {
        router.push('/challenge');
    };
    
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Subscribing email:', email);
            alert('Thank you for subscribing to HackVoyagers newsletter!');
            setEmail('');
        }
    };

    return (
        <main className={styles.main}>
            {/* Full Page Background */}
            <div className={styles.backgroundContainer}>
                <Image
                    src="/design-reference/entirebg.svg"
                    alt="HackVoyagers Page"
                    fill
                    className={styles.backgroundLayout}
                    priority
                />
            </div>

            {/* Interactive Overlays - Position absolutely over background */}
            <div className={styles.interactiveOverlays}>
                
                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <Image
                        src="/design-reference/fight.svg"
                        alt="Fight Background"
                        fill
                        className={styles.fightBackground}
                        priority
                    />
                    <Image
                        src="/design-reference/stars.svg"
                        alt="Stars Background"
                        fill
                        className={styles.starsBackground}
                        priority
                    />
                    <Image
                        src="/design-reference/tiny stars.svg"
                        alt="Tiny Stars Background"
                        fill
                        className={styles.tinyStarsBackground}
                        priority
                    />
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
                        <Image
                            src="/design-reference/register button.svg"
                            alt="Register Button"
                            width={300}
                            height={84}
                            className={styles.registerButtonImage}
                        />
                    </button>
                </div>

                {/* About Section */}
                <div className={styles.aboutSection}>
                    <Image
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
                    />
                    <Image
                        src="/design-reference/text.svg"
                        alt="About HackVoyagers"
                        width={1000}
                        height={500}
                        className={styles.aboutText}
                    />
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
                <div className={styles.joinUsSection}>
                    <button 
                        className={styles.joinUsButton}
                        onClick={handleRegisterClick}
                        aria-label="Join Us"
                    />
                </div>

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