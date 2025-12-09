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
            <div className={styles.faqFooterContent} id="newsletter">
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
    );
};

export default FaqSection;
