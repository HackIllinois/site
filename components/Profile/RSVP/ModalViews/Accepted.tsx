import AcceptRSVPForm from "@/components/AcceptRSVPForm/AcceptRSVPForm";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import { useState } from "react";
import styles from "./styles.module.scss";
import ConfirmReject from "./ConfirmReject";
import { RSVPDecideDecline } from "@/util/api";
import Loading from "@/components/Loading/Loading";

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
    const [declined, setDeclined] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleConfirm = async () => {
        setAccepted(true);
    };

    const handleDecline = async () => {
        setDeclined(true);
    };

    if (accepted) {
        return <AcceptRSVPForm closeModal={onRequestClose} />;
    }

    if (declined) {
        return (
            <ConfirmReject
                handleGoBack={() => setDeclined(false)}
                handleAPIDecline={async () => {
                    setIsLoading(true);
                    await RSVPDecideDecline();
                    setIsLoading(false);
                    onRequestClose();
                    window.location.reload();
                }}
            />
        );
    }

    if (isLoading) {
        return <Loading />;
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
                    If you would like to attend HackIllinois 2025, click{" "}
                    <code>Confirm</code> to finish the RSVP process. If you
                    won&apos;t be attending please click <code>Decline</code> .{" "}
                    <b>This cannot be reversed</b>.
                </p>
                {reimburse > 0 && (
                    <p>
                        Additionally, you have been approved for a travel
                        reimbursement of ${reimburse.toLocaleString("en-US")}.
                        Receiving this reimbursement is contingent on you coming
                        to HackIllinois in-person and submitting a project.
                    </p>
                )}
            </div>
            <div className={styles.buttonGroup}>
                <OlympianButton
                    text="Accept"
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
