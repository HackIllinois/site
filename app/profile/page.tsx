"use client";
import {
    authenticate,
    getChallenge,
    getProfile,
    getQRCode,
    getRegistrationOrDefault,
    getRSVP,
    isAuthenticated,
    logOut
} from "@/util/api";
import styles from "./styles.module.scss";
import APPLICATION_STATUS_BACKGROUND from "@/public/registration/backgrounds/application_status_background.svg";
import APPLICATION_STATUS_BOARD from "@/public/registration/backgrounds/application_status_board.svg";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Head from "next/head";
import { ProfileType, RegistrationData, RSVPType } from "@/util/types";
import { registrationFromAPI } from "@/util/helpers";
import Loading from "@/components/Loading/Loading";
import { usePathname, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import Modal from "react-modal";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import useWindowSize from "@/hooks/use-window-size";
import {
    Rejected,
    Waitlisted
} from "@/components/Profile/RSVP/ModalViews/Rejected";
import Accepted from "@/components/Profile/RSVP/ModalViews/Accepted";
import CloseButton from "@/components/CloseButton/CloseButton";
import Image from "next/image";
import LOGOUT from "@/public/registration/logout.svg";
import AvatarSelectorForm from "@/components/AvatarSelectorForm/AvatarSelectorForm";

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
    const [isLoading, setIsLoading] = useState(false);

    const [qrCodeURL, setQRCodeURL] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [avatarSelector, setAvatarSelector] = useState(false);

    const openAvatarSelector = () => {
        setModalOpen(true);
        setAvatarSelector(true);
    };

    // Extracts the avatarId from the adonix metadata url
    const avatarId = profile?.avatarUrl.split("/").at(-1)?.slice(undefined, -4);

    const getButtonText = () => {
        if (RSVP?.status === "REJECTED" || RSVP?.status === "WAITLISTED") {
            return "Details";
        }

        if (RSVP?.response === "ACCEPTED") {
            return "View QR Code";
        }

        return "RSVP";
    };

    return (
        <>
            {isLoading && <Loading />}
            <Head>
                <title>HackIllinois | Profile</title>
            </Head>
            {RSVP && RSVP.status !== "TBD" && RSVP.response !== "DECLINED" && (
                <Modal
                    className={styles.modal}
                    style={{
                        overlay: { zIndex: 1000 },
                        content: {
                            borderRadius: "2rem",
                            inset:
                                windowSizeHook?.width &&
                                windowSizeHook?.width < 768
                                    ? "10px"
                                    : "40px",
                            padding: 0,
                            background:
                                "linear-gradient(0deg, #98c8d3 0%, #5ea6b7 41%, #0a3147 100%)"
                        }
                    }}
                    isOpen={modalOpen}
                    onRequestClose={() => {
                        setModalOpen(false);
                    }}
                    ariaHideApp={false}
                >
                    <CloseButton handleClose={() => setModalOpen(false)} />
                    <div className={styles.modalContent}>
                        <ModalContent
                            status={RSVP.status}
                            response={RSVP.response}
                            isPro={RSVP.admittedPro}
                            isProApplicant={isProApplicant}
                            qrUrl={qrCodeURL}
                            reimburse={RSVP.reimbursementValue}
                            avatarSelector={avatarSelector}
                            avatarId={avatarId}
                            onRequestClose={() => setModalOpen(false)}
                        />
                    </div>
                </Modal>
            )}
            <div
                style={{
                    backgroundImage: `url(${APPLICATION_STATUS_BACKGROUND?.src})`
                }}
                className={styles.screen}
            >
                <button className={styles.signOutButton} onClick={logOut}>
                    <div className={styles.signOut}>
                        <Image alt="Logout" src={LOGOUT} />
                    </div>
                </button>
                <button
                    onClick={openAvatarSelector}
                    className={styles.profileImageMobile}
                >
                    {profile && (
                        <Image
                            src={profile.avatarUrl}
                            alt={avatarId!}
                            width={110}
                            height={110}
                        />
                    )}
                </button>
                <div
                    style={{
                        backgroundImage: `url(${APPLICATION_STATUS_BOARD?.src})`
                    }}
                    className={styles.container}
                >
                    <h2>
                        {registration
                            ? `${
                                  registration?.preferredName
                                      ? `${registration?.preferredName.trim()}'s `
                                      : " "
                              }
                        Application Status`
                            : "Loading..."}
                    </h2>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <div className={styles.col}>
                                <h3>Type</h3>
                                <ValueItem
                                    label="Pro"
                                    isHighlighted={
                                        RSVP && RSVP.status !== "TBD"
                                            ? RSVP!.admittedPro
                                            : isProApplicant
                                    }
                                />
                                <ValueItem
                                    label="General"
                                    isHighlighted={
                                        RSVP && RSVP.status !== "TBD"
                                            ? !RSVP!.admittedPro
                                            : !isProApplicant
                                    }
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
                                RSVP.status !== "TBD" &&
                                RSVP.response !== "DECLINED" && (
                                    <OlympianButton
                                        text={getButtonText()}
                                        onClick={() => setModalOpen(true)}
                                        small
                                    />
                                )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={openAvatarSelector}
                    className={styles.profileImage}
                >
                    {avatarId && (
                        <Image
                            src={`/profile/characters/${avatarId}.svg`}
                            alt={avatarId}
                            width={400}
                            height={600}
                        />
                    )}
                </button>
            </div>
        </>
    );
};

const QR: React.FC<{ qrUrl: string | null }> = ({ qrUrl }) => {
    return (
        <>
            <h1>Your QR Code</h1>
            {qrUrl && <QRCodeSVG value={qrUrl} className={styles.qr} />}
        </>
    );
};

type ModalContentProps = {
    status: "ACCEPTED" | "REJECTED" | "WAITLISTED";
    response: "ACCEPTED" | "PENDING";
    isPro: boolean;
    isProApplicant: boolean;
    qrUrl: string | null;
    avatarSelector: boolean;
    avatarId: string | undefined;
    reimburse: number;
    onRequestClose: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({
    status,
    response,
    isPro,
    isProApplicant,
    qrUrl,
    avatarSelector,
    avatarId,
    reimburse,
    onRequestClose
}) => {
    switch (status) {
        case "ACCEPTED":
            if (response === "ACCEPTED") {
                if (avatarSelector) {
                    return (
                        <AvatarSelectorForm
                            avatarId={avatarId ?? ""}
                            closeModal={onRequestClose}
                        />
                    );
                }

                return <QR qrUrl={qrUrl} />;
            }

            if (isPro) {
                return (
                    <Accepted
                        acceptedType={"PRO"}
                        reimburse={reimburse}
                        onRequestClose={onRequestClose}
                    />
                );
            }

            if (isProApplicant) {
                return (
                    <Accepted
                        acceptedType={"PRO_TO_GENERAL"}
                        reimburse={reimburse}
                        onRequestClose={onRequestClose}
                    />
                );
            }

            return (
                <Accepted
                    acceptedType={"GENERAL"}
                    reimburse={reimburse}
                    onRequestClose={onRequestClose}
                />
            );
        case "REJECTED":
            return <Rejected />;
        case "WAITLISTED":
            return <Waitlisted />;
    }
};

export default Profile;
