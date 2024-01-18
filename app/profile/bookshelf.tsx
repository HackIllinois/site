"use client";

import Image from "next/image";
import BookshelfSvg from "./assets/bookshelf.svg";
import BookshelfProps from "./assets/bookshelf-props.svg";
import NameBook from "./assets/name-book.svg";
import RSVPButton from "./assets/rsvp-button.svg";

import styles from "./page.module.scss";

type Props = {
    openModal: () => void;
};

export const Bookshelf = ({ openModal }: Props) => {
    function handleRSVPClick() {
        openModal();
    }

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
                <span className={styles.nameInBook}>Jane Doe</span>
            </div>
            <div className={styles.tempTEst}>
                <div className={styles.status}>HackKnight</div>
                <div className={styles.type}>Deferred</div>
                <div className={styles.action}>RSVP</div>
            </div>
            <div className={styles.bottomCabinet}>
                <button
                    onClick={handleRSVPClick}
                    className={styles.rsvpButtonWrapper}
                >
                    <Image src={RSVPButton} alt="rsvp button" fill />
                </button>
            </div>
        </div>
    );
};
