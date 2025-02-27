import MentorCard from "../Mentors/MentorCard/MentorCard";
import styles from "./GridLayout.module.scss";

type mentorProps = {
    name: string;
    image: string;
    desc: string;
};

type GridLayoutProps = {
    data: mentorProps[];
    header: string;
};

const GridLayout: React.FC<GridLayoutProps> = ({ data, header }) => {
    return (
        <div className={styles.content}>
            <h1>{header}</h1>
            <div className={styles.body}>
                {data.map((mentor: mentorProps, id) => (
                    <MentorCard
                        key={id}
                        id={id}
                        name={mentor.name}
                        image={mentor.image}
                        desc={mentor.desc}
                    />
                ))}
            </div>
        </div>
    );
};

export default GridLayout;
