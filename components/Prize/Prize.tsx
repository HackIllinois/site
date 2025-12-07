import Image from "next/image";
import styles from "./Prize.module.scss";
import medal from "@/public/prizes/items/medal.svg";
import clsx from "clsx";

interface PrizeProps {
    header: string;
    subheader: string;
    imageSrc: string;
    prize: string;
    code: string;
}

const Prize: React.FC<PrizeProps> = ({
    header,
    subheader,
    imageSrc,
    prize,
    code
}) => {
    return (
        <div className={styles.medalContainer}>
            <Image
                src={medal.src}
                alt="Medal"
                width={300}
                height={300}
                className={styles.medalIcon}
            />

            <div className={styles.medalOverlay1}>
                <h1 className={clsx(styles.title, styles[`${code}Name`])}>
                    {header}
                </h1>
                <p>{subheader}</p>
                <Image
                    src={imageSrc}
                    alt="imageSrc"
                    width={300}
                    height={300}
                    className={clsx(styles.prizeIcon, styles[`${code}Icon`])}
                />
                <h2 className={styles[`${code}Prize`]}>{prize}</h2>
            </div>
        </div>
    );
};
export default Prize;
