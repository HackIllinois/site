import MentorCloud from "@/components/Mentors/MentorCloud/MentorCloud";
import { mentors } from "@/modules/MentorsData";
import styles from "./styles.module.scss";
import BACKGROUND from "@/public/mentors/mentors-background.svg";
import BACKGROUND_CLOUDS from "@/public/mentors/background-clouds.svg";
import Image from "next/image";

type mentorProps = {
    id: number;
    name: string;
    image: string;
    desc: string;
};

const Mentors = () => {
    return (
        <div className={styles.container}>
            <div className={styles.backgroundContainer}>
                <Image
                    src={BACKGROUND}
                    alt="background"
                    className={styles.background}
                />
                <Image
                    src={BACKGROUND_CLOUDS}
                    alt="background-clouds"
                    className={styles.backgroundCloudsTop}
                />
            </div>

            <div className={styles.content}>
                <h1>Mentors</h1>
                <div className={styles.body}>
                    {mentors
                        .sort((a, b) => a.id - b.id)
                        .map((mentor: mentorProps) => (
                            <MentorCloud
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
