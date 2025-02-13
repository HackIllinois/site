import React from "react";
import styles from "./page.module.scss";
import Olympian from "@/components/Home/Hero/Hero";
import Footer from "@/components/Home/Footer/Footer";
import FAQJoinUs from "@/components/Home/JoinUs/JoinUs";
import Sponsors from "@/components/Home/Sponsors/Sponsors";
import FAQSection from "@/components/Home/FAQ/FAQ";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <Olympian />
            <FAQJoinUs />
            <FAQSection />
            <Sponsors />
            <Footer />
        </main>
    );
};

export default Home;
