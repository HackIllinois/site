"use client";
import {
    authenticate,
    getChallenge,
    getQRCode,
    getRegistrationOrDefault,
    getRSVP,
    isAuthenticated
} from "@/util/api";
import styles from "./styles.module.scss";
import APPLICATION_STATUS_BACKGROUND from "@/public/registration/backgrounds/application_status_background.svg";
import APPLICATION_STATUS_BOARD from "@/public/registration/backgrounds/application_status_board.svg";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Head from "next/head";
import { RegistrationData, RSVPType } from "@/util/types";
import { registrationFromAPI } from "@/util/helpers";
import Loading from "@/components/Loading/Loading";
import { usePathname, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import Modal from "react-modal";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import useWindowSize from "@/hooks/use-window-size";

type ValueItemProps = {
    label: string;
    isHighlighted: boolean;
};

const ValueItem: React.FC<ValueItemProps> = ({ label, isHighlighted }) => {
    return (
        <div
            className={clsx(
                styles.valueItem,
                isHighlighted && styles.highlighted
            )}
        >
            <p>{label}</p>
        </div>
    );
};

const Profile: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const windowSizeHook = useWindowSize();

    const [registration, setRegistration] = useState<RegistrationData | null>(
        null
    );
    const [RSVP, setRSVP] = useState<RSVPType | null>(null);
    const [isProApplicant, setIsProApplicant] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [qrCodeURL, setQRCodeURL] = useState<string | null>(null);
    const [qrCodeOpen, setQRCodeOpen] = useState(false);

    const handleOpenQRCode = async () => {
        const qrCode = await getQRCode();
        setQRCodeURL(qrCode);
        setQRCodeOpen(true);
    };

    const handleCloseQRCode = () => {
        setQRCodeOpen(false);
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(pathname);
            return;
        }

        getRegistrationOrDefault().then(registration => {
            if (!registration.hasSubmitted) {
                router.push("/register");
            }

            setRegistration(registrationFromAPI(registration));
            Promise.all([getChallenge(), getRSVP()]).then(
                ([challenge, RSVP]) => {
                    setIsProApplicant(challenge.complete);
                    setRSVP(RSVP);
                    setIsLoading(false);
                }
            );
        });
    }, []);

    return (
        <>
            <Head>
                <title>HackIllinois | Profile</title>
            </Head>
            <Modal
                className={styles.qrModal}
                style={{
                    overlay: { zIndex: 1000 },
                    content: {
                        inset:
                            windowSizeHook?.width && windowSizeHook?.width < 768
                                ? "10px"
                                : "40px"
                    }
                }}
                isOpen={qrCodeOpen}
                onRequestClose={handleCloseQRCode}
                ariaHideApp={false}
            >
                <div className={styles.qrModalContent}>
                    <h2>Your QR Code</h2>
                    {qrCodeURL && <QRCodeSVG value={qrCodeURL} />}
                    <button className={styles.link} onClick={handleCloseQRCode}>
                        Close
                    </button>
                </div>
            </Modal>
            {isLoading && <Loading />}
            <div
                style={{
                    backgroundImage: `url(${APPLICATION_STATUS_BACKGROUND?.src})`
                }}
                className={styles.screen}
            >
                <div
                    style={{
                        backgroundImage: `url(${APPLICATION_STATUS_BOARD?.src})`
                    }}
                    className={styles.container}
                >
                    <h2>
                        {registration?.preferredName
                            ? `${registration?.preferredName.trim()}'s `
                            : " "}
                        Application Status
                    </h2>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <div className={styles.col}>
                                <h3>Type</h3>
                                <ValueItem
                                    label="Pro"
                                    isHighlighted={isProApplicant}
                                />
                                <ValueItem
                                    label="General"
                                    isHighlighted={!isProApplicant}
                                />
                            </div>
                            <div className={styles.col}>
                                <h3>Status</h3>
                                <ValueItem
                                    label="Decision Pending"
                                    isHighlighted={
                                        !RSVP?.status || RSVP?.status === "TBD"
                                    }
                                />
                                <ValueItem
                                    label="Waitlisted"
                                    isHighlighted={
                                        RSVP?.status === "WAITLISTED"
                                    }
                                />
                                <ValueItem
                                    label="Accepted"
                                    isHighlighted={RSVP?.status === "ACCEPTED"}
                                />
                                <ValueItem
                                    label="Rejected"
                                    isHighlighted={RSVP?.status === "REJECTED"}
                                />
                            </div>
                        </div>

                        <div className={clsx(styles.col, styles.qrCodeCol)}>
                            <OlympianButton
                                text="View QR Code"
                                onClick={handleOpenQRCode}
                                medium
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
