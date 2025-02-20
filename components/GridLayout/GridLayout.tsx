import MentorCard from "../Mentors/MentorCard/MentorCard";
import styles from "./GridLayout.module.scss";

type mentorProps = {
    id: number;
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
                {data
                    .sort((a, b) => a.id - b.id)
                    .map((mentor: mentorProps) => (
                        <MentorCard
                            key={mentor.id}
                            id={mentor.id}
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
