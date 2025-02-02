import React from "react";
import styles from "./styles.module.scss";

type AcceptedType = "PRO" | "PRO_TO_GENERAL" | "GENERAL";

type AcceptedProps = {
    acceptedType: AcceptedType;
    reimburse: number;
};

export default function Accepted({ acceptedType, reimburse }: AcceptedProps) {
    return (
        <ChooseRSVP
            acceptedType={acceptedType}
            reimburse={reimburse}
            handleConfirm={() => {}}
            handleDecline={() => {}}
        />
    );
}

type ChooseRSVPProps = {
    acceptedType: AcceptedType;
    reimburse: number;
    handleConfirm: () => void;
    handleDecline: () => void;
};

export function ChooseRSVP({ reimburse, acceptedType }: ChooseRSVPProps) {
    return (
        <div className={styles.container}>
            <div className={styles.textBlock}>
                <AcceptedVerbage acceptedType={acceptedType} />
                <p>
                    If you would like to attend HackIllinois 2025, click Confirm
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
        </div>
    );
}

type AcceptedVerbageProps = {
    acceptedType: AcceptedType;
};

function AcceptedVerbage({ acceptedType }: AcceptedVerbageProps) {
    switch (acceptedType) {
        case "GENERAL":
            return (
                <>
                    <b>Congratulations! You&apos;ve been accepted as a</b>
                    <b> </b>
                    <b className={styles.shiny}>General Attendee</b>
                </>
            );
        case "PRO_TO_GENERAL":
            return (
                <>
                    <b>
                        Unfortunately, we couldn&apos;t offer you a spot as a
                        HackKnight, but you&apos;ve been accepted as a
                    </b>
                    <b> </b>
                    <b className={styles.shiny}>General Attendee</b>
                </>
            );
        case "PRO":
            return (
                <>
                    <b>Congratulations! You&apos;ve been accepted as a</b>
                    <b> </b>
                    <b className={styles.shiny}>HackOlympian</b>
                </>
            );
    }
}
