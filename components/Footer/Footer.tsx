import Image from "next/image";
import styles from "./Footer.module.scss";
import { socials } from "@/modules/FooterData";
import Subscribe from "@/components/Subscribe/Subscribe";

interface FooterProps {
    title?: string;
    newsletterTitle?: string;
}

type FooterIcon = {
    id: number;
    name: string;
    image: string;
    url: string;
};

const Footer: React.FC<FooterProps> = ({
    title = "Stay up to date with HackIllinois!",
    newsletterTitle = "Sign up for our newsletter to get new updates!"
}) => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footer}>
                <div id="social-section">
                    <span className={styles.title}>{title}</span>
                    <div className={styles.icons}>
                        {socials.map((icon: FooterIcon) => (
                            <a href={icon.url} key={icon.id} target="_blank">
                                <div className={styles.icon}>
                                    {/* eslint-disable-next-line */}
                                    <img
                                        src={icon.image}
                                        alt={icon.name}
                                        className={styles.image}
                                    />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                {/* <div id="newsletter-section">
                    <span className={styles.newsletterTitle}>
                        {newsletterTitle}
                    </span>
                    <Subscribe />
                </div> */}
            </div>
        </div>
    );
};

export default Footer;
