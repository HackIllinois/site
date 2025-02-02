import React from "react";
import styles from "./styles.module.scss";

type Accepted = {
    children: React.ReactNode;
    reimburse: number;
    handleCzonfirm: () => void;
    handleDecline: () => void;
};

export default function Accepted({ children, reimburse }: Accepted) {
    return (
        <div className={styles.container}>
            <div className={styles.textBlock}>
                {children}
                <p>
                    If you would like to attend HackIllinois 2024, click Confirm
                    to finish the RSVP process. If you won&apos;t be attending
                    please click Decline. This cannot be reversed.
                </p>
                {reimburse > 0 && (
                    <p>
                        Additionally, you have been approved for a travel
                        reimbursement of ${reimburse.toFixed(2)}. Receiving this
                        reimbursement is contingent on you coming to
                        HackIllinois in-person and submitting a project.
                    </p>
                )}
            </div>
            <div className={styles.buttonGroup}>
                {/* <ConfirmButton onClick={handleConfirm} />
                <DeclineButton onClick={handleDecline} /> */}
            </div>
            {/* <div className={styles.mobileButtonGroup}>
                <button onClick={handleConfirm}>
                    <Image
                        alt="confirm button"
                        src={MobileConfirmButton}
                        width={309}
                        height={54}
                    />
                </button>
                <button onClick={handleDecline}>
                    <Image
                        alt="decline button"
                        src={MobileDeclineButton}
                        width={309}
                        height={54}
                    />
                </button>
            </div> */}
        </div>
    );
}
