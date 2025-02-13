import styles from "./styles.module.scss";
import React from "react";
import Background from "@/components/Registration/Background";
import ProgressBar from "@/components/Registration/ProgressBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={styles.container}>
            <Background />
            <div className={styles.contentWrapper}>
                <ProgressBar />
                {children}
            </div>
        </main>
    );
};

export default Layout;
