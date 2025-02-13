"use client";
import styles from "./Background.module.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useWindowSize from "@/hooks/use-window-size";

const Background = () => {
    const pathname = usePathname();
    const windowSizeHook = useWindowSize();

    return (
        <div className={styles.container}>
            <Image
                src={`/registration/${!windowSizeHook?.width || windowSizeHook?.width > 768 ? "backgrounds" : "mobile_backgrounds"}/${pathname.split("/").at(-1)}.svg`}
                alt="Background"
                className={styles.background}
                style={{ objectFit: "cover" }}
                fill
            />
        </div>
    );
};

export default Background;
