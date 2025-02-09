import styles from "./Tags.module.scss";

type TagsProps = {
    tags: string[];
    colors: string[];
};

const Tags: React.FC<TagsProps> = ({ tags, colors }) => {
    return (
        <div className={styles.tags}>
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className={styles.tag}
                    style={{ backgroundColor: colors[index % colors.length] }}
                >
                    <p>{tag}</p>
                </div>
            ))}
        </div>
    );
};

export default Tags;
