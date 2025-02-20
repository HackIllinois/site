// replace with judges data eventually
import { mentors } from "@/modules/MentorsData";
import styles from "./styles.module.scss";
import BACKGROUND from "@/public/mentors/mentors-background.svg";
import BACKGROUND_CLOUDS from "@/public/mentors/background-clouds.svg";
import Image from "next/image";
import GridLayout from "@/components/GridLayout/GridLayout";

const Judges = () => {
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
            <GridLayout data={mentors} header="Judges" />
        </div>
    );
};

export default Judges;
