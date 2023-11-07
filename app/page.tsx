import React from "react";
import styles from "./page.module.scss";

import Hero from "@/components/Home/Hero/hero";
import Faq from "@/components/Home/Faq/Faq";
import Events from "@/components/Home/Events/events";
import JoinUs from "@/components/Home/JoinUs/JoinUs";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <Hero/>
            <Events />
            <JoinUs />
            <Faq/>
        </main>
    );
};

export default Home;
