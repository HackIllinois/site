import MentorCard from "@/components/Mentors/MentorCard/MentorCard";
import { mentors } from "@/modules/MentorsData";
import styles from "./styles.module.scss";

type mentorProps = {
    id: number;
    name: string;
    image: string;
    desc: string;
};

const Mentors = () => {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <img src="/mentors/background-minus-clouds.svg" />
            </div>
            <div className={styles.content}>
                <div className={styles.banner}>
                    <img src="/mentors/banner.svg" />
                </div>
                <div className={styles.body}>
                    {mentors.map((mentor: any) => (
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
        </div>
    );
};

export default Mentors;
<div>
    <div></div>
</div>;
