import { FAQ } from "@/components/FAQ/FAQ";
import { SocialIconsRow } from "@/components/GradientButton/GradientSocialButton";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { tsukimi } from "@/theme/fonts";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import styles from "./FaqSection.module.scss";

const FaqSection = () => {
    return (
        <section className={styles.faqSection}>
            <Image
                src="/landing/faq/desktop/background.png"
                alt="FAQ Background"
                fill
                className={styles.faqBackground}
                priority
            />
            <Image
                src="/landing/faq/mobile/background.png"
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
    );
};

export default FaqSection;
