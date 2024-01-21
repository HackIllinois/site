"use client";

import Image from "next/image";
import BookshelfSvg from "@/public/profile/bookshelf.svg";
import MobileBookshelfSvg from "@/public/profile/mobile-bookshelf.svg";
import BookshelfProps from "@/public/profile/bookshelf-props.svg";
import NameBook from "@/public/profile/name-book.svg";
import RSVPButton from "@/public/profile/rsvp-button.svg";
import styles from "@/components/Profile/profile.module.scss";
import { DecisionResponse, DecisionStatus } from "@/utils/types";

type Props = {
    openModal: () => void;
    isModalOpen: boolean;
    name?: string;
    status?: DecisionStatus;
    admittedPro?: boolean;
    loading: boolean;
    onActionClick: () => void;
    response?: DecisionResponse;
};

export const Bookshelf = ({
    openModal,
    isModalOpen,
    name = "",
    status = "TBD",
    loading = false,
    admittedPro,
    onActionClick,
    response
}: Props) => {
    function handleRSVPClick() {
        openModal();
    }

    const type = admittedPro ? "HackKnight" : "General Admission";
    const accepted = status === "ACCEPTED";
    const action = response === "PENDING" ? "View Status" : "Questions";

    return (
        <div className={styles.bookshelfContainer}>
            <div className={styles.boolshelfWrapper}>
                <Image alt="boolshelf" src={BookshelfSvg} fill />
            </div>
            <div className={styles.mobileBoolshelfWrapper}>
                <Image alt="mobile boolshelf" src={MobileBookshelfSvg} fill />
            </div>
            <div className={styles.bookshelfPropsWrapper}>
                <Image alt="bookshelf props" src={BookshelfProps} fill />
            </div>
            <div className={styles.nameBookWrapper}>
                <Image alt="bookshelf props" src={NameBook} fill />
                <div className={styles.nameInBook}>
                    {loading ? "Loading..." : name}
                </div>
            </div>

            <div className={styles.mobileNameInBook}>
                {loading ? "Loading..." : name}
            </div>

            <div className={styles.tagContainer}>
                <div className={styles.type}>
                    {loading ? "Loading..." : type}
                </div>
                <div className={styles.status}>
                    {loading ? "Loading..." : status}
                </div>
                <div className={styles.action} onClick={onActionClick}>
                    {loading ? "Loading..." : action}
                </div>
            </div>
            {/* hiding it bc if its their first time i dont wanna - nvm... */}
            {accepted && response === "PENDING" && (
                // !isModalOpen &&
                <div className={styles.bottomCabinet}>
                    <button
                        onClick={handleRSVPClick}
                        className={styles.rsvpButtonWrapper}
                    >
                        <Image src={RSVPButton} alt="rsvp button" fill />
                    </button>
                </div>
            )}
        </div>
    );
};
