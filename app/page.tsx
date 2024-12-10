import React from "react";
import styles from "./page.module.scss";
import Registration from "./register/page";
import Olympian from "@/components/Home/Olympian/Olympian";
import Footer from "@/components/Footer/Footer";
import Events from "@/components/Home/Events/Events";
import FAQJoinUs from "@/components/Home/FAQJoinUs/FAQJoinUs";
import Sponsors from "@/components/Home/Sponsors/Sponsors";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <Olympian />
            <Events />
            <FAQJoinUs />
            <Sponsors />
            <Footer />
            {/* <Registration /> */}
        </main>
    );
};

export default Home;
