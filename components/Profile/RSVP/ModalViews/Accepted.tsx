import AcceptRSVPForm from "@/components/AcceptRSVPForm/AcceptRSVPForm";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import { RSVPDecideAccept, RSVPDecideDecline } from "@/util/api";
import { useState } from "react";
import styles from "./styles.module.scss";

type AcceptedType = "PRO" | "PRO_TO_GENERAL" | "GENERAL";

type AcceptedProps = {
    acceptedType: AcceptedType;
    reimburse: number;
    onRequestClose: () => void;
};

export default function Accepted({
    acceptedType,
    reimburse,
    onRequestClose
}: AcceptedProps) {
    const [accepted, setAccepted] = useState(false);
    const handleConfirm = async () => {
        // TODO: Add a loading state and disable the buttons while loading
        await RSVPDecideAccept();
        setAccepted(true);
    };

    const handleDecline = async () => {
        // TODO: Add a loading state and disable the buttons while loading
        await RSVPDecideDecline();
        window.location.reload();
    };

    if (accepted) {
        return <AcceptRSVPForm closeModal={onRequestClose} />;
    }

    return (
        <ChooseRSVP
            acceptedType={acceptedType}
            reimburse={reimburse}
            handleConfirm={handleConfirm}
            handleDecline={handleDecline}
        />
    );
}

type ChooseRSVPProps = {
    acceptedType: AcceptedType;
    reimburse: number;
    handleConfirm: () => void;
    handleDecline: () => void;
};

export function ChooseRSVP({
    reimburse,
    acceptedType,
    handleConfirm,
    handleDecline
}: ChooseRSVPProps) {
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
                <OlympianButton
                    text="Confirm"
                    onClick={handleConfirm}
                    medium
                    gold
                />
                <OlympianButton
                    text="Decline"
                    onClick={handleDecline}
                    medium
                    blue
                />
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
                    <b className={styles.acceptedText}>
                        Congratulations! You&apos;ve been accepted as a
                    </b>
                    <b> </b>
                    <b className={styles.shiny}>General Attendee</b>
                    <b> </b>
                </>
            );
        case "PRO_TO_GENERAL":
            return (
                <>
                    <b className={styles.acceptedText}>
                        Unfortunately, we couldn&apos;t offer you a spot as a
                        HackKnight, but you&apos;ve been accepted as a
                    </b>
                    <b> </b>
                    <b className={styles.shiny}>General Attendee</b>
                    <b> </b>
                </>
            );
        case "PRO":
            return (
                <>
                    <b className={styles.acceptedText}>
                        Congratulations! You&apos;ve been accepted as a
                    </b>
                    <b> </b>
                    <b className={styles.shiny}>HackOlympian</b>
                    <b> </b>
                </>
            );
    }
}
