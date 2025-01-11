"use client";
import styles from "./Background.module.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Background = () => {
    const pathname = usePathname();

    return (
        <div className={styles.container}>
            <Image
                src={`/registration/backgrounds/${pathname.split("/").at(-1)}.svg`}
                alt="Background"
                className={styles.background}
                style={{ objectFit: "cover" }}
                fill
            />
        </div>
    );
};

export default Background;
