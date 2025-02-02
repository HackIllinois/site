"use client";
import Loading from "@/components/Loading/Loading";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Accepted from "@/components/Profile/RSVP/ModalViews/Accepted";
import Rejected from "@/components/Profile/RSVP/ModalViews/Rejected";
import useWindowSize from "@/hooks/use-window-size";
import APPLICATION_STATUS_BACKGROUND from "@/public/registration/backgrounds/application_status_background.svg";
import APPLICATION_STATUS_BOARD from "@/public/registration/backgrounds/application_status_board.svg";
import {
    authenticate,
    getChallenge,
    getQRCode,
    getRegistrationOrDefault,
    getRSVP,
    isAuthenticated
} from "@/util/api";
import { registrationFromAPI } from "@/util/helpers";
import { RegistrationData, RSVPType } from "@/util/types";
import clsx from "clsx";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";

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

    const [registration, setRegistration] = useState<RegistrationData | null>(
        null
    );
    const [RSVP, setRSVP] = useState<RSVPType | null>(null);
    const [isProApplicant, setIsProApplicant] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [qrCodeURL, setQRCodeURL] = useState<string | null>(null);
    const [qrCodeOpen, setQRCodeOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleOpenQRCode = async () => {
        const qrCode = await getQRCode();
        setQRCodeURL(qrCode);
        setQRCodeOpen(true);
    };

    const handleSetDetailsOpen = () => {
        setDetailsOpen(true);
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
            <QRModal
                qrCodeOpen={qrCodeOpen}
                qrCodeURL={qrCodeURL}
                handleCloseQRCode={handleCloseQRCode}
            />
            {RSVP && (
                <DetailsModal
                    isProApplicant={isProApplicant}
                    rsvp={RSVP}
                    detailsOpen={detailsOpen}
                    handleCloseDetails={() => setDetailsOpen(false)}
                />
            )}

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
                            {RSVP?.status === "ACCEPTED" && (
                                <div className={styles.col}>
                                    <h3>Response</h3>
                                    <ValueItem
                                        label="Decision Pending"
                                        isHighlighted={
                                            !RSVP?.status ||
                                            RSVP?.response === "PENDING"
                                        }
                                    />
                                    <ValueItem
                                        label="Accepted"
                                        isHighlighted={
                                            RSVP?.response === "ACCEPTED"
                                        }
                                    />
                                    <ValueItem
                                        label="Declined"
                                        isHighlighted={
                                            RSVP?.response === "DECLINED"
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <div className={clsx(styles.col, styles.qrCodeCol)}>
                            {RSVP &&
                                (RSVP.status === "ACCEPTED" &&
                                RSVP.response === "ACCEPTED" ? (
                                    <OlympianButton
                                        text="View QR Code"
                                        onClick={handleOpenQRCode}
                                        medium
                                    />
                                ) : ["ACCEPTED", "REJECTED"].includes(
                                      RSVP.status
                                  ) ? (
                                    <OlympianButton
                                        text="Details"
                                        onClick={handleSetDetailsOpen}
                                        medium
                                    />
                                ) : (
                                    <></>
                                ))}
                        </div>

                        <OlympianButton
                            text="Details"
                            onClick={handleSetDetailsOpen}
                            medium
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const QRModal: React.FC<{
    qrCodeOpen: boolean;
    handleCloseQRCode: () => void;
    qrCodeURL: string | null;
}> = ({ qrCodeOpen, handleCloseQRCode, qrCodeURL }) => {
    const windowSizeHook = useWindowSize();

    return (
        <Modal
            className={styles.modal}
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
            <div className={styles.modalContent}>
                <h2>Your QR Code</h2>
                {qrCodeURL && <QRCodeSVG value={qrCodeURL} />}
                <button className={styles.link} onClick={handleCloseQRCode}>
                    Close
                </button>
            </div>
        </Modal>
    );
};

const DetailsModal: React.FC<{
    isProApplicant: boolean;
    rsvp: RSVPType;
    detailsOpen: boolean;
    handleCloseDetails: () => void;
}> = ({ rsvp, detailsOpen, handleCloseDetails }) => {
    const [displayedPage, setDisplayedPage] = useState<
        "rejected" | "accepted" | undefined
    >();

    const handleLoadDisplayedPage = () => {
        if (rsvp.status === "REJECTED") {
            setDisplayedPage("rejected");
            return;
        } else {
            setDisplayedPage("accepted");
        }
    };

    useEffect(() => {
        handleLoadDisplayedPage();
    }, [rsvp?.response, rsvp?.status, rsvp?.admittedPro]);

    return (
        <Modal
            className={styles.modal}
            style={{
                overlay: { zIndex: 1000 }
            }}
            isOpen={detailsOpen}
            onRequestClose={handleCloseDetails}
            ariaHideApp={false}
        >
            <div className={styles.modalContent}>
                {displayedPage === "accepted" && (
                    <Accepted
                        reimburse={0}
                        handleConfirm={() => {}}
                        handleDecline={() => {}}
                    >
                        <b>Congrats, stuff is happening</b>
                    </Accepted>
                )}
                {displayedPage === "rejected" && (
                    <Rejected handleCancel={() => {}} />
                )}
            </div>
        </Modal>
    );
};

export default Profile;
