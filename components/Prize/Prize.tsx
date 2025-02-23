import Image from "next/image";
import styles from "./Prize.module.scss";
import medal from "@/public/prizes/items/medal.svg";
interface PrizeProps {
    header: string;
    subheader: string;
    imageSrc: string;
    prize: string;
}

const Prize: React.FC<PrizeProps> = ({
    header,
    subheader,
    imageSrc,
    prize
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
                <h1 className={styles.title}>{header}</h1>
                <p>{subheader}</p>
                <Image
                    src={imageSrc}
                    alt="imageSrc"
                    width={300}
                    height={300}
                    className={styles.prizeIcon}
                />
                <h2>{prize}</h2>
            </div>
        </div>
    );
};
export default Prize;
