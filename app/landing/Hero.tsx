import { GradientButton } from "@/components/GradientButton/GradientButton";
import clsx from "clsx";
import Image from "next/image";
import styles from "./Hero.module.scss";

const Hero = () => {
    return (
        <section className={styles.heroSection}>
            {/* Background Elements */}
            <div className={styles.heroBackgrounds}>
                <Image
                    src="/landing/hero/desktop/fight.svg"
                    alt="Stars Background"
                    fill
                    className={styles.starsBackground}
                    priority
                />
                <Image
                    src="/landing/hero/desktop/stars.svg"
                    alt="Tiny Stars Background"
                    fill
                    className={styles.tinyStarsBackground}
                    priority
                />
                <Image
                    src="/landing/hero/mobile/fight.svg"
                    alt="Stars Background"
                    fill
                    className={clsx(styles.starsBackground, styles.mobile)}
                    priority
                />
                <Image
                    src="/landing/hero/mobile/stars.svg"
                    alt="Tiny Stars Background"
                    fill
                    className={clsx(styles.tinyStarsBackground, styles.mobile)}
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
                <GradientButton text="REGISTER NOW" link="/register/general" />
            </div>
        </section>
    );
};

export default Hero;
