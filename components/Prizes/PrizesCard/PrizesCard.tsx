import styles from "./PrizesCard.module.scss";

type PrizesCardProps = {
    id: number;
    name: string;
    image: string;
    desc: string;
    code: string;
};

const PrizesCard: React.FC<PrizesCardProps> = ({
    id,
    name,
    image,
    desc,
    code
}) => {
    return (
        <div className={styles.container} key={id}>
            <p
                className={
                    code === "solana"
                        ? styles.name_solana
                        : code === "john"
                        ? styles.name_john
                        : code === "warp"
                        ? styles.name_warp
                        : styles.name
                }
            >
                {name}
            </p>
            <img
                src={image}
                className={
                    code === "solana"
                        ? styles.image_solana
                        : code === "john"
                        ? styles.image_john
                        : code === "warp"
                        ? styles.image_warp
                        : styles.image
                }
            />
            <p
                className={
                    code === "solana"
                        ? styles.desc_solana
                        : code === "john"
                        ? styles.desc_john
                        : code === "warp"
                        ? styles.desc_warp
                        : styles.desc
                }
            >
                {desc}
            </p>
        </div>
    );
};

export default PrizesCard;
