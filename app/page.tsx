import React from "react";
import styles from "./page.module.scss";

import Hero from "@/components/Home/Hero/hero";
import Faq from "@/components/Home/Faq/Faq";
import Events from "@/components/Home/Events/events";
import Sponsors from "@/components/Home/Sponsors/sponors";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <Hero />
            <Events />
            <Sponsors />
            <Faq />
        </main>
    );
};

export default Home;
