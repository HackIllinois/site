import { Typography } from "@mui/material";
import styles from "./JoinUsSponsors.module.scss";
import Image from "next/image";
import { tsukimi } from "@/theme/fonts";

const alienAssets = [
    "/landing/sponsors/aliens/alien1.svg",
    "/landing/sponsors/aliens/alien2.svg",
    "/landing/sponsors/aliens/alien3.svg",
    "/landing/sponsors/aliens/alien4.svg",
    "/landing/sponsors/aliens/alien5.svg",
    "/landing/sponsors/aliens/alien6.svg"
];

const JoinUsSponsors = () => {
    return (
        <div className={styles.joinUsSection}>
            <Image
                src="/landing/sponsors/background.png"
                alt="Sponsors Background"
                fill
                className={styles.background}
                priority
            />

            <div className={styles.ufoContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/landing/sponsors/ufo.svg"
                    alt="UFO"
                    className={styles.ufoImage}
                />

                <div className={styles.joinUsContentContainer}>
                    <Typography
                        variant="h4"
                        component="h2"
                        className={styles.joinUsHeading}
                    >
                        JOIN US
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h3"
                        className={styles.newsletterSubheader}
                    >
                        NEWSLETTER SIGN UP
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className={styles.joinUsDescription}
                    >
                        Follow us on Instagram (@HackIllinois) or subscribe to our newsletter to be notified of our event updates! There will be regular content and posts.
                    </Typography>
                    <div className={styles.emailSubscription}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.emailInput}
                        />
                        <button className={styles.subscribeButton}>
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                <div className={styles.sponsorSectionContentContainer}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            color: "white",
                            textAlign: "center",
                            fontFamily: tsukimi.style.fontFamily,
                            fontWeight: 700
                        }}
                    >
                        SPONSORS
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            color: "#ccc",
                            textAlign: "center",
                            fontFamily: "Montserrat"
                        }}
                    >
                        To be announced soon!
                    </Typography>
                </div>

                <div className={styles.aliensContainer}>
                    {alienAssets.map((src, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={index}
                            src={src}
                            alt={`Alien ${index + 1}`}
                            className={`${styles.alienImage} ${
                                styles[`alien${index}`]
                            }`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JoinUsSponsors;
