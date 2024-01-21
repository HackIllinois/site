"use client";

import styles from "@/components/Profile/modal-views/modal-views.module.scss";
import Image from "next/image";
import { BoldFont, SubmitButton } from ".";
import { avatars } from "../avatars";
import { useRef, useState } from "react";

export const RSVPSteps = ({
    handleSubmit
}: {
    handleSubmit: (
        displayName: string,
        discordTag: string,
        selectedAvatarIndex: number
    ) => void;
}) => {
    const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(0);
    const [displayName, setDisplayName] = useState<string>("");
    const [discordTag, setDiscordTag] = useState<string>("");

    const sliderRef = useRef<HTMLDivElement>(null);

    function handleAvatarClick(index: number) {
        setSelectedAvatarIndex(index);
    }

    function handleLeftArrowClick() {
        const newIndex =
            selectedAvatarIndex !== 0 ? selectedAvatarIndex - 1 : 0;
        setSelectedAvatarIndex(newIndex);
        sliderRef.current!.scrollLeft = 25 + 166 * (newIndex - 1);
    }

    function handleRightArrowClick() {
        const newIndex =
            selectedAvatarIndex !== avatars.length - 1
                ? selectedAvatarIndex + 1
                : selectedAvatarIndex;
        setSelectedAvatarIndex(newIndex);
        sliderRef.current!.scrollLeft = 25 + 166 * (newIndex - 1);
    }

    return (
        <>
            <BoldFont>
                We are so excited to have you at HackIllinois this year! Please
                complete the following information to confirm your attendance:
            </BoldFont>

            <div className={styles.block}>
                <span className={styles.avatarTitle}>Display Name</span>
                <input
                    placeholder="Type here"
                    className={styles.input}
                    onChange={e => setDisplayName(e.target.value)}
                />
            </div>

            <div className={styles.block}>
                <span className={styles.avatarTitle}>Choose your avatar:</span>

                <div className={styles.avatarContainer}>
                    <div
                        className={styles.leftArrow}
                        onClick={handleLeftArrowClick}
                    >
                        <svg
                            width="11"
                            height="22"
                            viewBox="0 0 11 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M11 22L0 11L11 0V22Z" fill="white" />
                        </svg>
                    </div>

                    <div ref={sliderRef} className={styles.avatarSlider}>
                        {avatars.map(({ name, icon }, index) => {
                            return (
                                <Image
                                    src={icon}
                                    alt="some"
                                    key={name}
                                    className={
                                        index === selectedAvatarIndex
                                            ? styles.avatarSelect
                                            : styles.avatarUnselected
                                    }
                                    onClick={() => handleAvatarClick(index)}
                                />
                            );
                        })}
                    </div>

                    <div
                        className={styles.rightArrow}
                        onClick={handleRightArrowClick}
                    >
                        <svg
                            width="11"
                            height="22"
                            viewBox="0 0 11 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 22L11 11L0 0V22Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <span className={styles.avatarTitle}>Discord Tag</span>
                <input
                    placeholder="Type here"
                    className={styles.input}
                    onChange={e => setDiscordTag(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className={styles.okButton}
                onClick={() =>
                    handleSubmit(displayName, discordTag, selectedAvatarIndex)
                }
            >
                <SubmitButton />
            </button>
        </>
    );
};
