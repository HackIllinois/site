"use client";
import styles from "./ProgressBar.module.scss";
import React, { useEffect, useState } from "react";
import MOON from "@/public/registration/progress_bar/moon.svg";
import TEAR_DROP from "@/public/registration/progress_bar/tear_drop.svg";
import SUN from "@/public/registration/progress_bar/sun.svg";
import BOOK from "@/public/registration/progress_bar/book.svg";
import SKULL from "@/public/registration/progress_bar/skull.svg";
import LIGHTNING_BOLT from "@/public/registration/progress_bar/lightning_bolt.svg";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const symbols = [MOON, SUN, TEAR_DROP, BOOK, SKULL, LIGHTNING_BOLT];

const pageMap = {
    "/register/personal-info": 0,
    "/register/education": 1,
    "/register/hack-specific": 2,
    "/register/transportation": 3,
    "/register/review": 4,
    "/register/confirmation": 5
};

const ProgressBar: React.FC = () => {
    const [furthestPage, setFurthestPage] = useState(0);
    const pathname = usePathname() as keyof typeof pageMap;
    const totalSteps = symbols.length;

    useEffect(() => {
        if (pageMap[pathname] > furthestPage) {
            setFurthestPage(pageMap[pathname]);
        }
    }, [pathname]);

    return (
        <div className={styles.progressStepper}>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressBarFill}
                    style={{
                        width: `${(furthestPage / (totalSteps - 1)) * 100}%`
                    }}
                />
            </div>
            <div className={styles.steps}>
                {symbols.map((symbol, i) => (
                    <div key={i} className={styles.stepIcon}>
                        <Image
                            src={symbol}
                            alt={`Step ${i + 1}`}
                            className={clsx(styles.step, {
                                [styles.active]: furthestPage >= i
                            })}
                            style={{
                                filter:
                                    furthestPage >= i
                                        ? "none"
                                        : "brightness(0) saturate(100%) invert(1)"
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
