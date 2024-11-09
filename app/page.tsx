import React from "react";
import styles from "./page.module.scss";
import Registration from "./register/page";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <Registration />
        </main>
    );
};

export default Home;
