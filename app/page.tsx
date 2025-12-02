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
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const router = useRouter();

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

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
                {/* Background Elements */}
                <div className={styles.heroBackgrounds}>
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
                        alt="Tiny Stars"
                        fill
                        className={styles.tinyStarsBackground}
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
                {/* Background Elements */}
                <div className={styles.aboutBackgrounds}>
                    <Image
                        src="/design-reference/planets.svg"
                        alt="Planets Background"
                        fill
                        className={styles.planetsBackground}
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
                        alt="Tiny Stars"
                        fill
                        className={styles.tinyStarsBackground}
                        priority
                    />
                </div>
                
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
                        style={{ fontFamily: 'Montserrat' }}
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
              <JoinUsSponsors />

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                {/* Frame 368 Background */}
                <Image
                    src="/design-reference/Frame 368.svg"
                    alt="FAQ Background"
                    fill
                    className={styles.frame368Background}
                    priority
                />
                
                <div className={styles.faqContent}>
                    <Typography
                        variant="h1"
                        component="h1"
                        className={styles.faqHeading}
                        fontFamily="Montserrat"
                    >
                        FAQ
                    </Typography>
                    
                    <div className={styles.faqItems}>
                         <div className={styles.faqItem}>
                             <button 
                                 className={styles.faqQuestion}
                                 onClick={() => toggleFAQ(0)}
                             >
                                 <span>Who is eligible to attend?</span>
                                 <svg className={`${styles.dropdownArrow} ${openFAQ === 0 ? styles.dropdownArrowOpen : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                     <path d="M6 9l6 6 6-6"/>
                                 </svg>
                             </button>
                            <div className={`${styles.faqAnswer} ${openFAQ === 0 ? styles.faqAnswerVisible : styles.faqAnswerHidden}`}>
                                <Typography variant="body1" component="p" fontFamily="Montserrat">
                                    HackIllinois is open to all current college students and recent graduates (within 1 year of graduation). You don't need any prior coding experience - we welcome students of all skill levels! Whether you're a beginner or an experienced hacker, there's a place for you at HackIllinois.
                                </Typography>
                            </div>
                        </div>
                        
                         <div className={styles.faqItem}>
                             <button 
                                 className={styles.faqQuestion}
                                 onClick={() => toggleFAQ(1)}
                             >
                                 <span>How can I get help during event?</span>
                                 <svg className={`${styles.dropdownArrow} ${openFAQ === 1 ? styles.dropdownArrowOpen : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                     <path d="M6 9l6 6 6-6"/>
                                 </svg>
                             </button>
                            <div className={`${styles.faqAnswer} ${openFAQ === 1 ? styles.faqAnswerVisible : styles.faqAnswerHidden}`}>
                                <Typography variant="body1" component="p" fontFamily="Montserrat">
                                    We'll have mentors available throughout the entire hackathon to help you with your projects! You can also attend our workshops and tech talks to learn new skills. Our staff and sponsors will be on-site to answer questions and provide guidance. Additionally, we'll have a dedicated help desk and online support channels to ensure you get the assistance you need.
                                </Typography>
                            </div>
                        </div>
                        
                         <div className={styles.faqItem}>
                             <button 
                                 className={styles.faqQuestion}
                                 onClick={() => toggleFAQ(2)}
                             >
                                 <span>Where is HackIllinois located?</span>
                                 <svg className={`${styles.dropdownArrow} ${openFAQ === 2 ? styles.dropdownArrowOpen : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                     <path d="M6 9l6 6 6-6"/>
                                 </svg>
                             </button>
                            <div className={`${styles.faqAnswer} ${openFAQ === 2 ? styles.faqAnswerVisible : styles.faqAnswerHidden}`}>
                                <Typography variant="body1" component="p" fontFamily="Montserrat">
                                    HackIllinois 2026 will be held at the Siebel Center for Computer Science at the University of Illinois Urbana-Champaign. The address is 201 N Goodwin Ave, Urbana, IL 61801. The event will take place from February 27th to March 1st. We'll provide more detailed location and parking information closer to the event date.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer Content */}
                    <div className={styles.faqFooterContent}>
                        <Typography
                            variant="h2"
                            component="h2"
                            className={styles.footerHeading}
                        >
                            STAY UP TO DATE WITH HACKILLINOIS!
                        </Typography>
                        
                        {/* Social Media Icons */}
                        <div className={styles.socialMediaIcons}>
                            <div className={styles.socialIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </div>
                            <div className={styles.socialIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="url(#instagramGradient)">
                                    <rect x="2" y="2" width="20" height="20" rx="4"/>
                                    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
                                    <circle cx="18" cy="6" r="1" fill="white"/>
                                    <defs>
                                        <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#833AB4"/>
                                            <stop offset="50%" stopColor="#E1306C"/>
                                            <stop offset="100%" stopColor="#F77737"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className={styles.socialIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </div>
                            <div className={styles.socialIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077B5">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </div>
                            <div className={styles.socialIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </div>
                            <div className={styles.socialIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#666">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </div>
                        </div>
                        
                        <Typography
                            variant="body1"
                            component="p"
                            className={styles.footerDescription}
                        >
                            Sign up for our newsletter to get new updates!
                        </Typography>
                        
                        <form onSubmit={handleSubscribe} className={styles.footerSubscribeForm}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className={styles.footerEmailInput}
                                required
                            />
                            <button type="submit" className={styles.footerSubscribeButton}>
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* City Skyline */}
                <div className={styles.footerCitySkyline}></div>
            </section>
        </main>
    );
};

export default Home;
