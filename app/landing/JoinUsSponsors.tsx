import { Typography } from "@mui/material";
import styles from "./JoinUsSponsors.module.scss";
import Image from "next/image";

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

                <div className={styles.contentContainer}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            color: "black",
                            textAlign: "center"
                        }}
                    >
                        Join Us Section
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
