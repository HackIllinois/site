"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import LeftCurtain from "@/public/profile/left-curtain.svg";
import RightCurtain from "@/public/profile/right-curtain.svg";
import MobileLeftCurtain from "@/public/profile/mobile-left-curtain.svg";
import MobileRightCurtain from "@/public/profile/mobile-right-curtain.svg";
import MobileWindowPane from "@/public/profile/mobile-window-pane.svg";

import { Bookshelf } from "@/components/Profile/Bookshelf";
import { ModalOverlay, useModal } from "@/components/Profile/modal";
import { useEffect, useState } from "react";
import {
    getRSVP,
    getRegistration,
    getUser,
    rsvpAccept,
    rsvpDecline,
    setProfile
} from "@/utils/api";
import { RSVPType, RegistrationType, UserType } from "@/utils/types";
import {
    GeneralAttendeeAccepted,
    HackKnightAccepted,
    HackKnightRejected,
    Questions,
    Rejected
} from "@/components/Profile/modal-views";
import { RSVPSteps } from "@/components/Profile/modal-views/rsvp-steps";
import { avatars } from "@/components/Profile/avatars";

const Some: React.FC = () => {
    const { isModalOpen, closeModal, openModal } = useModal();
    const {
        isModalOpen: isQuestionsModalOpen,
        closeModal: closeQuestionsModal,
        openModal: openQuestionsModal
    } = useModal();
    const [user, setUser] = useState<UserType | null>(null);
    const [RSVP, setRSVP] = useState<RSVPType | null>(null);
    const [registration, setRegistration] = useState<RegistrationType | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);

    async function handleConfirm() {
        const response = await rsvpAccept();
        // do something with response if failed
    }

    async function handleDecline() {
        const response = await rsvpDecline();
        // do something with response if failed
    }

    function onActionClick() {
        // conditional action , different modals
        RSVP?.response === "PENDING" ? openModal() : openQuestionsModal();
    }

    useEffect(() => {
        // TODO: do some try catch?
        (async () => {
            // TOOD: Promise.all
            const user = await getUser();
            setUser(user);

            const RSVP = await getRSVP();
            setRSVP(RSVP);
        })();
        setLoading(false);

        openModal();
    }, []);

    useEffect(() => {
        if (RSVP?.admittedPro) return;

        setLoading(true);
        (async () => {
            const registration = await getRegistration();
            setRegistration(registration);
        })();
        setLoading(false);
    }, [RSVP]);

    return (
        <section className={styles.dashboard}>
            <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
                {(() => {
                    // uncomment when certain where this belongs in flow
                    if (RSVP?.response === "ACCEPTED") {
                        return (
                            <RSVPSteps
                                handleSubmit={async (
                                    displayName,
                                    discordTag,
                                    selectedAvatarIndex
                                ) => {
                                    const response = await setProfile({
                                        displayName: displayName,
                                        discordTag: discordTag,
                                        avatarId:
                                            avatars[selectedAvatarIndex].name
                                    });
                                }}
                            />
                        );
                    }

                    if (loading) return "Loading...";

                    if (RSVP?.status === "ACCEPTED") {
                        if (RSVP?.admittedPro) {
                            return (
                                <HackKnightAccepted
                                    handleConfirm={handleConfirm}
                                    handleDecline={handleDecline}
                                />
                            );
                        } else {
                            if (
                                registration &&
                                registration?.isProApplicant === true
                            ) {
                                return (
                                    <HackKnightRejected
                                        handleConfirm={handleConfirm}
                                        handleDecline={handleDecline}
                                    />
                                );
                            } else {
                                return (
                                    <GeneralAttendeeAccepted
                                        handleConfirm={handleConfirm}
                                        handleDecline={handleDecline}
                                    />
                                );
                            }
                        }
                    } else if (RSVP?.status === "REJECTED") {
                        return <Rejected handleOk={() => closeModal()} />;
                    } else {
                        // "WAITLISTED" | "TBD";
                    }
                })()}
            </ModalOverlay>

            <ModalOverlay
                isOpen={isQuestionsModalOpen}
                onClose={closeQuestionsModal}
            >
                <Questions handleOk={() => closeQuestionsModal()} />
            </ModalOverlay>

            <div className={styles.rightCurtainWrapper}></div>

            <div className={styles.leftCurtainWrapper}>
                <Image alt="left curtain" src={LeftCurtain} fill />
            </div>
            <div className={styles.rightCurtainWrapper}>
                <Image alt="right curtain" src={RightCurtain} fill />
            </div>
            <div className={styles.mobileLeftCurtainWrapper}>
                <Image alt="left curtain" src={MobileLeftCurtain} fill />
            </div>
            <div className={styles.mobileRightCurtainWrapper}>
                <Image alt="right curtain" src={MobileRightCurtain} fill />
            </div>
            <div className={styles.mobileWindowPaneWrapper}>
                <Image
                    alt="background"
                    aria-hidden="true"
                    src={MobileWindowPane}
                    fill
                />
            </div>

            <Bookshelf
                loading={loading}
                openModal={openModal}
                isModalOpen={isModalOpen}
                name={user?.name}
                admittedPro={RSVP?.admittedPro}
                status={RSVP?.status}
                response={RSVP?.response}
                onActionClick={onActionClick}
            />
        </section>
    );
};

export default Some;
