import styles from "./styles.module.scss";
import OlympianButton from "@/components/OlympianButton/OlympianButton";

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
            <b className={styles.confirmRejectText}>
                Are you sure you want to decline?
            </b>

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
