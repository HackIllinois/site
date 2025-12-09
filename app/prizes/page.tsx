import React from "react";
import styles from "./styles.module.scss";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <div className={styles.top}>
                <div className={styles.mainText}>
                    <div className={styles.title}>
                        <h1 data-text={"Prizes"}>Prizes</h1>
                    </div>
                    <div className={styles.subtitle}>
                        <span className={styles.text}>coming soon</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
