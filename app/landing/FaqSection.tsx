"use client";

import { FAQ } from "@/components/FAQ/FAQ";
import { SocialIconsRow } from "@/components/GradientButton/GradientSocialButton";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { tsukimi } from "@/theme/fonts";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import styles from "./FaqSection.module.scss";

// Create a motion component for Next.js Image
const MotionImage = motion(Image);

// 1. Define Animation Variants for sequential fade-up
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            // Stagger the animation of children by 0.2 seconds
            staggerChildren: 0.2,
            // Delay the start slightly after coming into view
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly down and transparent
    visible: {
        opacity: 1,
        y: 0, // Move to natural position
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const FaqSection = () => {
    // A slow, rhythmic pulse to simulate an alarm light reflecting off the background
    // Duration is set to 4s to ensure it is not photosensitive/epileptic
    const alarmPulseVariants: Variants = {
        alarm: {
            filter: ["brightness(0.5)", "brightness(1)", "brightness(0.5)"],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className={styles.faqSection}>
            <Image
                src="/landing/faq/ground-bar.svg"
                alt="FAQ Ground Bar"
                fill
                className={styles.faqGroundBar}
                priority
            />

            {/* Desktop Background with Alarm Effect */}
            <MotionImage
                src="/landing/faq/desktop/background.png"
                alt="FAQ Background"
                fill
                className={styles.faqBackground}
                priority
                variants={alarmPulseVariants}
                animate="alarm"
            />

            {/* Mobile Background with Alarm Effect */}
            <MotionImage
                src="/landing/faq/mobile/background.png"
                alt="FAQ Background"
                fill
                className={clsx(styles.faqBackground, styles.mobile)}
                priority
                variants={alarmPulseVariants}
                animate="alarm"
            />

            <div className={styles.faqContent}>
                {/* Animate just the header here using the item variant directly */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
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
                </motion.div>

                <FAQ />
            </div>

            {/* Animate the footer section sequentially */}
            <motion.div
                className={styles.faqFooterContent}
                id="newsletter"
                // Apply container variants here to orchestrate children
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Item 1: Header */}
                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontFamily: "Tsukimi Rounded"
                        }}
                    >
                        STAY UP TO DATE WITH HACKILLINOIS!
                    </Typography>
                </motion.div>

                {/* Item 2: Social Icons (Included for smooth visual flow) */}
                <motion.div variants={itemVariants}>
                    <SocialIconsRow />
                </motion.div>

                <Box>
                    {/* Item 3: Helper Text */}
                    <motion.div variants={itemVariants}>
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
                    </motion.div>

                    {/* Item 4: Newsletter Component */}
                    <motion.div variants={itemVariants}>
                        <NewsletterSubscription />
                    </motion.div>
                </Box>
            </motion.div>

            {/* City Skyline */}
            <div className={styles.footerCitySkyline}></div>
        </section>
    );
};

export default FaqSection;
