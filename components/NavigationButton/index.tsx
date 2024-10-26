import styles from "./styles.module.scss";
import Image from "next/image";
import RIGHT_ARROW from "@/public/registration/right_arrow.svg";
import LEFT_ARROW from "@/public/registration/left_arrow.svg";

interface NavButtonProps {
    text: string;
    pointRight: boolean;
}

const NavigationButton: React.FC<NavButtonProps> = ({
    text,
    pointRight
}): JSX.Element => (
    <button className={styles.button}>
        {!pointRight ? (
            <Image alt="left arrow" src={LEFT_ARROW} className={styles.arrow} />
        ) : null}
        <p className={`${pointRight ? styles.right : styles.left}`}>{text}</p>
        {pointRight ? (
            <Image
                alt="right arrow"
                src={RIGHT_ARROW}
                className={styles.arrow}
            />
        ) : null}
    </button>
);

export default NavigationButton;
