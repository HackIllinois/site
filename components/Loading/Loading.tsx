import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
    return (
        <div className={styles.loading}>
            <h2>Loading...</h2>
        </div>
    );
};

export default Loading;
