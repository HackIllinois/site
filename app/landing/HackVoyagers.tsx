"use client";

import { GradientButton } from "@/components/GradientButton/GradientButton";
import Image from "next/image";
import styles from "./HackVoyagers.module.scss";
import { useParallaxScrollY } from "@/hooks/use-parallax-scrollY";
import { motion, Variants } from "framer-motion";

const HackVoyagers = () => {
    const { offsetY, ref } = useParallaxScrollY();

    const parallaxStyle2 = {
        transform: `translateY(${offsetY * 0.1}px)`
    };

    // 1. Define Variants

    // Base state for the section trigger
    const sectionTrigger: Variants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    // Animation for the robot image (fade in from left)
    const robotVariants: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
        }
    };

    // Container for text elements to handle staggering
    const textContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4 // Wait a bit until after robot starts
            }
        }
    };

    // Individual text/button items (fade up)
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        // 2. Convert section to motion.section to handle the viewport trigger
        <motion.section
            ref={ref}
            className={styles.hackVoyagersSection}
            variants={sectionTrigger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% in view
        >
            {/* Background Elements (kept static or parallax only) */}
            <div className={styles.hackVoyagersBackgrounds}>
                <Image
                    src="/design-reference/clouds.svg"
                    alt="Clouds Background"
                    fill
                    className={styles.cloudsBackground}
                    style={parallaxStyle2}
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

            {/* 3. Wrap Robot container with motion div */}
            <motion.div
                className={styles.robotContainer}
                variants={robotVariants}
            >
                <Image
                    src="/design-reference/hackvoyagersrobotg.svg"
                    alt="HackVoyagers Robot"
                    width={500}
                    height={400}
                    className={styles.robotImage}
                />
            </motion.div>

            {/* 4. Wrap Text container and apply stagger variants */}
            <motion.div
                className={styles.textContainer}
                variants={textContainerVariants}
            >
                {/* 5. Wrap individual items with item variants */}
                <motion.h3
                    className={styles.introducingText}
                    variants={itemVariants}
                >
                    Introducing
                </motion.h3>

                <motion.div variants={itemVariants}>
                    <Image
                        src="/design-reference/HACKVOYAGERS.svg"
                        alt="HackVoyagers"
                        width={600}
                        height={150}
                        className={styles.hackVoyagersText}
                    />
                </motion.div>

                <motion.div
                    className={styles.hackVoyagersButtonContainer}
                    variants={itemVariants}
                >
                    <GradientButton
                        text="LEARN MORE"
                        link="/challenge/landing-page"
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default HackVoyagers;
