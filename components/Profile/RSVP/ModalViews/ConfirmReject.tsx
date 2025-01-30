import styles from "./styles.module.scss";

type ConfirmRejectProps = {
    handleGoBack: () => void;
    handleAPIDecline: () => void;
};

export default function ConfirmReject({ handleGoBack }: ConfirmRejectProps) {
    return (
        <div className={styles.container}>
            <b>Are you sure you want to decline?</b>
            <div className={styles.buttonGroup}>
                <button
                    onClick={handleGoBack}
                    className={styles.unhoveredButton}
                >
                    GO BACK
                </button>
                {/* <DeclineButton onClick={handleDecline} /> */}
            </div>
            <div className={styles.mobileButtonGroup}>
                <button
                    onClick={handleGoBack}
                    className={styles.unhoveredButton}
                >
                    GO BACK
                </button>
                {/* <DeclineButton onClick={handleDecline} /> */}
            </div>
        </div>
    );
}
