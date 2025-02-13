"use client";
import React from "react";
import styles from "./MentorCard.module.scss";
import BACK_CLOUD from "@/public/mentors/mentor-back-cloud.svg";
import FRONT_CLOUD from "@/public/mentors/mentor-front-cloud.svg";
import Image from "next/image";
import TEST_IMAGE from "@/public/mentors/mentor-images/abdu.jpg";
import Modal from "react-modal";
import { useState } from "react";
import SCROLL from "@/public/mentors/mentor-scroll.svg";
import MOBILE_SCROLL from "@/public/mentors/mobile-scroll.svg";
import useWindowSize from "@/hooks/use-window-size";

type mentorProps = {
    id: number;
    name: string;
    image: string;
    desc: string;
};

const MentorCard: React.FC<mentorProps> = ({ id, name, image, desc }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const windowSizeHook = useWindowSize();

    const handleClick = () => {
        setModalOpen(true);
        console.log(image);
    };

    return (
        <>
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    style={{
                        overlay: { zIndex: 1000 },
                        content: {
                            padding: 0,
                            overflow: "visible",
                            border: "none",
                            width: "80%",
                            height: "80%",
                            margin: "auto",
                            background: "transparent"
                        }
                    }}
                    ariaHideApp={false}
                >
                    <Image
                        src={
                            windowSizeHook?.width && windowSizeHook?.width < 480
                                ? MOBILE_SCROLL
                                : SCROLL
                        }
                        alt="scroll"
                        className={styles.scroll}
                    />
                    <div className={styles.modalContainer}>
                        <div className={styles.modalContent}>
                            {/* they are all abdu bc i did not want to copy over all the picture files */}
                            <Image
                                src={TEST_IMAGE}
                                alt="image"
                                className={styles.modalImage}
                            />
                            <div className={styles.modalText}>
                                <h1>{name}</h1>
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            <div className={styles.container} key={id} onClick={handleClick}>
                <Image
                    src={BACK_CLOUD}
                    alt="back-cloud"
                    className={styles.backCloud}
                />
                <div>
                    <Image
                        src={TEST_IMAGE}
                        alt="image"
                        className={styles.image}
                    />
                </div>
                <Image
                    src={FRONT_CLOUD}
                    alt="front-cloud"
                    className={styles.frontCloud}
                />
                <h2>{name}</h2>
            </div>
        </>
    );
};

export default MentorCard;
