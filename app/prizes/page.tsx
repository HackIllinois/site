"use client";

import styles from "./styles.module.scss";
import Background from "@/public/prizes/backgrounds/prize_background.svg"; 
import medal from "@/public/prizes/items/medal.svg"; 
import Head from "next/head";
import Image from 'next/image';

const prizesList = [
    { title: "First Place", amount: "$5000" },
    { title: "Second Place", amount: "$3000" },
    { title: "Third Place", amount: "$1500" },
    { title: "Fourth Place", amount: "$500" },
];

const Prizes: React.FC = () => {  
    return (
        <>
            <Head>
                <title>HackIllinois | Prizes</title>
            </Head>

            <div
                    style={{
                        backgroundImage: `url(${Background.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center 0%", 
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed", 
                        minHeight: "100vh",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        overflowY: "auto",
                        paddingTop: "50px",
                    }}
                className={styles.container}
            >
              <div className={styles.scrollableGrid}>
                    <div className={styles.prizesGrid}>
                    {prizesList.map((prize, index) => (
                    <div key={index} className={styles.medalContainer}>
                        <Image
                            src={medal.src} 
                            alt="Medal"
                            width={300}  
                            height={300} 
                            className={styles.medalIcon}
                        />

                        <div className={styles.medalOverlay1}>
                            <h1>{prize.title}</h1>
                        </div>
                         <div className={styles.medalOverlay2}>
                             <h2>{prize.amount}</h2>
                         </div>
                    </div>
                    ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Prizes;
