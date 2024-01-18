"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import LeftCurtain from "./assets/left-curtain.svg";
import RightCurtain from "./assets/right-curtain.svg";

import { Bookshelf } from "./bookshelf";
import { ModalOverlay, useModal } from "./modal";
import { modalKey } from "./modal-views";

const Some: React.FC = () => {
    const { isModalOpen, closeModal, openModal } = useModal();

    const ModalRender = modalKey.rsvp;

    return (
        <section className={styles.dashboard}>
            <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
                <ModalRender />
            </ModalOverlay>

            <div className={styles.rightCurtainWrapper}></div>

            <div className={styles.leftCurtainWrapper}>
                <Image
                    alt="left curtain"
                    src={LeftCurtain}
                    // width={170}
                    // height={982}
                    fill
                />
            </div>
            <div className={styles.rightCurtainWrapper}>
                <Image
                    alt="right curtain"
                    src={RightCurtain}
                    // width={169}
                    // height={982}
                    fill
                />
            </div>

            <Bookshelf openModal={openModal} />
        </section>
    );
};

export default Some;
