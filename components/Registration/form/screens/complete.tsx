import Image from "next/image";
import styles from "./styles.module.scss";
import background from "@/public/registration/complete/background.svg";
import scroll from "@/public/registration/complete/scroll.svg";
import button from "@/public/registration/complete/button.svg";
import Button from "@/components/form/Button";

const Complete = () => {
    return(
        <div className={styles.complete}>
            <div className={styles.completeContainer}>
                <div className={styles.completeCol1}>
                    <h1>HackIllinois</h1>
                    <h2>Confirmation</h2>
                    <p>Thank you for signing up for Hackillinois 2024! Please check the status of your account in your email.</p>
                    <div className={styles.completeSubConatiner}>
                        <p>Be sure to follow our Instagram (@hackillinois) and X (@hackillinois) for additional information!</p>
                    </div>
                </div>
                <div className={styles.completeCol2}>
                    <Image src={scroll} className={styles.completeScroll} alt="scroll" />
                    <Button className={styles.button} onClick={() => window.location.pathname = "/"}><Image src={button} alt="submit button"/></Button>
                </div>
            </div>
            <Image src={background} className={styles.completeBackground} alt="complete" />
        </div>
    );
};

export default Complete;
