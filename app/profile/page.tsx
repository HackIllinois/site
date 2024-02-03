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
    authenticate,
    getRSVP,
    getRegistration,
    getUser,
    isAuthenticated,
    isRegistered,
    rsvpAccept,
    rsvpDecline,
    setProfile
} from "@/utils/api";
import {
    ProfileType,
    RSVPType,
    RegistrationType,
    UserType
} from "@/utils/types";
import {
    DeclineConfirmation,
    GeneralAttendeeAccepted,
    HackKnightAccepted,
    HackKnightRejected,
    Questions,
    RSVPConfirmed,
    Rejected,
    TBD,
    Waitlisted
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
    const [profile, setProfileState] = useState<ProfileType | null>(null);
    const [registration, setRegistration] = useState<RegistrationType | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [showDeclineConfirmation, setShowDeclineConfirmation] =
        useState<boolean>(false);

    async function handleConfirm() {
        setLoading(true);
        await rsvpAccept();
        const updated_rsvp = await getRSVP();
        setRSVP(updated_rsvp);
        setLoading(false);
    }

    async function handleDecline() {
        setLoading(true);
        await rsvpDecline();
        const updated_rsvp = await getRSVP();
        setRSVP(updated_rsvp);
        closeModal();
        setLoading(false);
    }

    function onActionClick() {
        // conditional action , different modals
        RSVP?.response === "PENDING" ? openModal() : openQuestionsModal();
    }

    async function handleSubmitProfile(
        displayName: string,
        discordTag: string,
        selectedAvatarIndex: number
    ) {
        setLoading(true);
        const profile_response = await setProfile({
            displayName: displayName,
            discordTag: discordTag,
            avatarId: avatars[selectedAvatarIndex].name
        });
        setProfileState(profile_response);
        setLoading(false);
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
        }

        setLoading(true);

        isRegistered()
            .then(isRegistered => {
                if (!isRegistered) window.location.pathname = "/register";
            })
            .then(() => {
                getUser().then(user => {
                    setUser(user);
                });
                getRSVP().then(rsvp => {
                    setRSVP(rsvp);

                    if (
                        rsvp.status === "ACCEPTED" &&
                        rsvp.response === "PENDING"
                    )
                        openModal();
                });
                setLoading(false);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (RSVP?.admittedPro) return;

        (async () => {
            setLoading(true);
            const registration = await getRegistration();
            setRegistration(registration);
            setLoading(false);
        })();
    }, [RSVP]);

    return (
        <section className={styles.dashboard}>
            <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
                {(() => {
                    if (loading) return "Loading...";

                    if (showDeclineConfirmation)
                        return (
                            <DeclineConfirmation
                                handleGoBack={() =>
                                    setShowDeclineConfirmation(false)
                                }
                                handleDecline={handleDecline}
                            />
                        );

                    if (RSVP?.response === "ACCEPTED") {
                        if (profile && !(profile instanceof Error))
                            return <RSVPConfirmed />;

                        return <RSVPSteps handleSubmit={handleSubmitProfile} />;
                    }

                    if (RSVP?.status === "ACCEPTED") {
                        if (RSVP?.admittedPro) {
                            return (
                                <HackKnightAccepted
                                    handleConfirm={handleConfirm}
                                    handleDecline={() =>
                                        setShowDeclineConfirmation(true)
                                    }
                                    reimburse={RSVP?.reimbursementValue}
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
                                        handleDecline={() =>
                                            setShowDeclineConfirmation(true)
                                        }
                                        reimburse={RSVP?.reimbursementValue}
                                    />
                                );
                            } else {
                                return (
                                    <GeneralAttendeeAccepted
                                        handleConfirm={handleConfirm}
                                        handleDecline={() =>
                                            setShowDeclineConfirmation(true)
                                        }
                                        reimburse={RSVP?.reimbursementValue}
                                    />
                                );
                            }
                        }
                    } else if (RSVP?.status === "REJECTED") {
                        return <Rejected handleOk={() => closeModal()} />;
                    } else if (RSVP?.status === "WAITLISTED") {
                        return <Waitlisted handleOk={() => closeModal()} />;
                    } else {
                        return <TBD handleOk={() => closeModal()} />;
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
