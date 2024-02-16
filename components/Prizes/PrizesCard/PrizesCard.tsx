import styles from "./PrizesCard.module.scss";

type PrizesCardProps = {
    id: number;
    name: string;
    image: string;
    desc: string;
};

const PrizesCard: React.FC<PrizesCardProps> = ({ id, name, image, desc }) => {
    return (
        <div className={styles.container} key={id}>
            <p className={styles.name}>{name}</p>
            <img src={image} className={styles.image} />
            <p className={styles.desc}>{desc}</p>
        </div>
    );
};

export default PrizesCard;
