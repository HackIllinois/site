import Image from "next/image";
import styles from "./Footer.module.scss";
import { socials } from "@/modules/FooterData";
import BACKGROUND from "@/public/footer/background.svg";

type FooterIcon = {
    id: number;
    name: string;
    image: string;
    url: string;
};

const Footer: React.FC = () => {
    return (
        <div className={styles.footerContainer}>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <div className={styles.footer}>
                <div id="social-section">
                    <span className={styles.title}>
                        Stay up to date with HackIllinois!
                    </span>
                    <div className={styles.icons}>
                        {socials.map((icon: FooterIcon) => (
                            <a href={icon.url} key={icon.id} target="_blank">
                                <div className={styles.icon}>
                                    <Image
                                        src={icon.image}
                                        alt={icon.name}
                                        className={styles.image}
                                        width={100}
                                        height={100}
                                        style={{ fill: "#F5ECA1" }}
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
