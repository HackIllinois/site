"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import LeftCurtain from "./assets/left-curtain.svg";
import RightCurtain from "./assets/right-curtain.svg";
import MobileLeftCurtain from "./assets/mobile-left-curtain.svg";
import MobileRightCurtain from "./assets/mobile-right-curtain.svg";
import MobileWindowPane from "./assets/mobile-window-pane.svg";

import { Bookshelf } from "./bookshelf";
import { ModalOverlay, useModal } from "./modal";
import { useEffect, useState } from "react";
import {
    getProfile,
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
} from "./modal-views";
import { RSVPSteps } from "./modal-views/rsvp-steps";

const avatarKey = [
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/axolotl.png",
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/bunny.png",
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/cat.png",
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/chester.png",
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/fishercat.png",
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/goblin.png",
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/mushroom.png",
    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/main/avatars/squirrel.png",
]

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
    const [acceptedRSVP, setAcceptedRSVP] = useState<boolean>(false);

    async function handleConfirm() {
        const response = await rsvpAccept();
    }

    async function handleDecline() {
        const response = await rsvpDecline();
    }

    function onActionClick() {
        // conditional action , different modals
        if (true) {
            openQuestionsModal();
        }
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
                    // return (
                    //     <RSVPSteps
                    //         handleSubmit={async (
                    //             displayName,
                    //             discordTag,
                    //             selectedAvatarIndex
                    //         ) => {
                    //             // TODO: update this post call to have correct values
                    //             const response = await setProfile({
                    //                 avatarUrl: avatarKey[selectedAvatarIndex],
                    //                 discord: discordTag,
                    //                 displayName: displayName,
                    //             });
                    //         }}
                    //     />
                    // );

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
                                registration?.isProApplicant === "YES"
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
                onActionClick={onActionClick}
            />
        </section>
    );
};

export default Some;
