"use client";
import styles from "./Background.module.scss";
import Image from "next/image";
import useWindowSize from "@/hooks/use-window-size";

const Background = () => {
    const windowSizeHook = useWindowSize();

    return (
        <div className={styles.container}>
            <Image
                src={`/registration/${!windowSizeHook?.width || windowSizeHook?.width > 768 ? "backgrounds" : "mobile_backgrounds"}/pro_track_info.svg`}
                alt="Background"
                className={styles.background}
                style={{ objectFit: "cover" }}
                fill
            />
        </div>
    );
};

export default Background;
