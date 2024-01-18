"use client";

import CloseIcon from "../assets/close-icon";
import { MouseEvent, ReactNode } from "react";
import styles from "./modal.module.scss";

type Props = {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => any;
};

export const ModalOverlay = ({ children, isOpen, onClose }: Props) => {
    function handleClose() {
        onClose();
    }

    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return;

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalWindow}>
                <CloseIcon
                    className={styles.closeButton}
                    onClick={handleClose}
                />
                {children}
            </div>
        </div>
    );
};
