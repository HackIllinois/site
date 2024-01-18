"use client";

import Image from "next/image";
import BookshelfSvg from "./assets/bookshelf.svg";
import MobileBookshelfSvg from "./assets/mobile-bookshelf.svg";
import BookshelfProps from "./assets/bookshelf-props.svg";
import NameBook from "./assets/name-book.svg";
import RSVPButton from "./assets/rsvp-button.svg";

import styles from "./page.module.scss";
import { stat } from "fs";

type Props = {
    openModal: () => void;
    name: string;
    status: string;
    admittedPro: boolean;
    loading: boolean;
};

export const Bookshelf = ({
    openModal,
    name,
    status,
    admittedPro,
    loading
}: Props) => {
    function handleRSVPClick() {
        openModal();
    }

    const type = admittedPro ? "HackKnight" : "General Admission";
    const accepted = status === "ACCEPTED";
    const action =
        status === "ACCEPTED"
            ? "RSVP"
            : status === "DEFERRED"
            ? "View Application"
            : status === "REJECTED"
            ? "Questions?"
            : "";

    return (
        <div className={styles.bookshelfContainer}>
            <div className={styles.boolshelfWrapper}>
                <Image
                    alt="boolshelf"
                    src={BookshelfSvg}
                    // width={1148}
                    // height={584}
                    fill
                />
            </div>
            <div className={styles.mobileBoolshelfWrapper}>
                <Image alt="mobile boolshelf" src={MobileBookshelfSvg} fill />
            </div>
            <div className={styles.bookshelfPropsWrapper}>
                <Image
                    alt="bookshelf props"
                    src={BookshelfProps}
                    // width={169}
                    // height={982}
                    fill
                />
            </div>
            <div className={styles.nameBookWrapper}>
                <Image
                    alt="bookshelf props"
                    src={NameBook}
                    // width={169}
                    // height={982}
                    fill
                />
                <div className={styles.nameInBook}>
                    {loading ? "Loading..." : name}
                </div>
            </div>

            <div className={styles.mobileNameInBook}>
                {loading ? "Loading..." : name}
            </div>

            <div className={styles.tagContainer}>
                <div className={styles.status}>
                    {loading ? "Loading..." : status || "HackKnight"}
                </div>
                <div className={styles.type}>
                    {loading ? "Loading..." : type}
                </div>
                <div className={styles.action}>
                    {loading ? "Loading..." : action}
                </div>
            </div>
            {accepted && (
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
