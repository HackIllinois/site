import { tag } from "@/app/schedule/page";
import styles from "./Tags.module.scss";

type TagsProps = {
    tags: tag[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <div className={styles.tags}>
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className={styles.tag}
                    style={{ backgroundColor: tag.color }}
                >
                    <p>{tag.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Tags;
