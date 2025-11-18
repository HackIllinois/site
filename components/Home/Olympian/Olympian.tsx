import styles from "./Olympian.module.scss";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Image from "next/image";

const Olympian: React.FC = () => {
    return (
        <section className={styles.olympianMain}>
            <Image
                src="/backgrounds/Rectangle 23.svg"
                alt="Space background"
                fill
                className={styles.backgroundImage}
                priority
            />

            {/* Left side ellipses */}
            <Image
                src="/backgrounds/Ellipse 8.svg"
                alt=""
                width={400}
                height={400}
                className={styles.ellipse8}
            />
            <Image
                src="/backgrounds/Ellipse 11.svg"
                alt=""
                width={350}
                height={350}
                className={styles.ellipse11}
            />
            <Image
                src="/backgrounds/Ellipse 10.svg"
                alt=""
                width={800}
                height={800}
                className={styles.ellipse10}
            />

            {/* Center ellipses (under HACKSTRONAUT text) */}
            <Image
                src="/backgrounds/Ellipse 12.svg"
                alt=""
                width={200}
                height={200}
                className={styles.ellipse12}
            />
            <Image
                src="/backgrounds/Ellipse 14.svg"
                alt=""
                width={150}
                height={150}
                className={styles.ellipse14}
            />
            <Image
                src="/backgrounds/Ellipse 13.svg"
                alt=""
                width={180}
                height={180}
                className={styles.ellipse13}
            />

            {/* Right side ellipses */}
            <Image
                src="/backgrounds/Ellipse 15.svg"
                alt=""
                width={450}
                height={450}
                className={styles.ellipse15}
            />
            <Image
                src="/backgrounds/Ellipse 9.svg"
                alt=""
                width={850}
                height={850}
                className={styles.ellipse9}
            />

            <div className={styles.content}>
                <h1 className={styles.title}>HACKSTRONAUT</h1>
                <OlympianButton
                    text="Register Now"
                    link="/register"
                    bottomPadding
                />
            </div>
        </section>
    );
};

export default Olympian;
