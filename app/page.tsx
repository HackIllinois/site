import Description from "@/components/Home/Description/Description";
import FAQSection from "@/components/Home/FAQ/FAQ";
import FooterSection from "@/components/Home/Footer/FooterSection";
import Olympian from "@/components/Home/Olympian/Olympian";
import Sponsors from "@/components/Home/Sponsors/Sponsors";
import React from "react";
import styles from "./page.module.scss";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <Olympian />
            <Description />
            <Sponsors />
            <FAQSection />
            <FooterSection />
        </main>
    );
};

export default Home;
