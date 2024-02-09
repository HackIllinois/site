import React from "react";
import styles from "./MentorCard.module.scss";

type mentorProps = {
    id: number;
    name: string;
    image: string;
    desc: string;
};

const MentorCard: React.FC<mentorProps> = ({ id, name, image, desc }) => {
    return (
        <div className={styles.container} key={id}>
            <div className={styles.image}>
                <img src={image} />
            </div>
            <div className={styles.body}>
                <p className={styles.name}>{name}</p>
                <p className={styles.desc}>
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default MentorCard;
