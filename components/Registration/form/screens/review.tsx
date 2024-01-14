// TODO - Implement Page
import styles from "./styles.module.scss";
import Castle from "@/public/registration/review/castle.svg";
import Dragon from "@/public/registration/review/dragon.svg";

import Header from "@/public/registration/review/review header.svg"
import MobileHeader from "@/public/registration/review/mobile review header.svg"

import Mountain from "@/public/registration/review/review mountain.svg"
import MobileMountain from "@/public/registration/review/mobile mountains.svg"

import Sky from "@/public/registration/review/sky.svg"
import MobileSky from "@/public/registration/review/mobile sky.svg"

import { useEffect, useState } from "react";
import Image from "next/image";
const Review = () => {
    const isMobile = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth <= 600;
        }
    }
    const [mobile, setMobile] = useState(isMobile());
    const [mountain, setMountain] = useState(mobile ? MobileMountain : Mountain);
    const [sky, setSky] = useState(mobile ? MobileSky : Sky);
    const [header, setHeader] = useState(mobile ? MobileHeader : Header);

    useEffect(() => {
        const handleResize = () => {
            const newMobile = isMobile();
            setMobile(newMobile);
            setMountain(newMobile ? MobileMountain : Mountain);
            setSky(newMobile ? MobileSky : Sky);
            setHeader(newMobile ? MobileHeader : Header);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobile])
    return (
        <>
            <div className={styles.review}>
                    <Image src={Dragon} alt="Review" className={styles.dragon} />
                    <Image src={Castle} alt="Review" className={styles.castle} />

                    <Image src={header} alt="Review" className={styles.header} />
                    <Image src={sky} alt="Review" className={styles.sky} />
                    <Image src={mountain} alt="Review" className={styles.mountain} />

            </div>
        </>
    );
};

export default Review;
