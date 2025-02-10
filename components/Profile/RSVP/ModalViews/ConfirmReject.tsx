import styles from "./styles.module.scss";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Image from "next/image";

type ConfirmRejectProps = {
    handleGoBack: () => void;
    handleAPIDecline: () => void;
};

export default function ConfirmReject({
    handleGoBack,
    handleAPIDecline
}: ConfirmRejectProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <b className={styles.confirmRejectText}>
                    Are you sure you want to decline?
                </b>
                <Image
                    src="/profile/characters/hades.svg"
                    alt="hades"
                    className={styles.character}
                    width={300}
                    height={500}
                />
            </div>

            <div className={styles.buttonGroup}>
                <OlympianButton
                    text="Go Back"
                    onClick={handleGoBack}
                    medium
                    gold
                />
                <OlympianButton
                    text="Decline"
                    onClick={handleAPIDecline}
                    medium
                    blue
                />
            </div>
        </div>
    );
}
