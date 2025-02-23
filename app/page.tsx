import React from "react";
import styles from "./page.module.scss";
import Olympian from "@/components/Home/Olympian/Olympian";
import Footer from "@/components/Home/Footer/Footer";
import FAQJoinUs from "@/components/Home/FAQJoinUs/FAQJoinUs";
import Sponsors from "@/components/Home/Sponsors/Sponsors";
import FAQSection from "@/components/Home/FAQ/FAQ";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <Olympian />
            <FAQJoinUs />
            <section id="faq">
                <FAQSection />
            </section>
            <section id="sponsors">
                <Sponsors />
            </section>
            <Footer />
        </main>
    );
};

export default Home;
