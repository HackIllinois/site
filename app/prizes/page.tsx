"use client";

import Prize from "@/components/Prize/Prize";
import Background from "@/public/prizes/backgrounds/prize_background.svg";

import Head from "next/head";
import styles from "./styles.module.scss";
import HACK_LOGO from "@/public/prizes/items/hack-logo.svg";
import ATHENA_PRIZE_INFO_CHARACTER from "@/public/prizes/characters/athena-prize-info.svg";
import Image from "next/image";

const prizesList = [
    {
        title: "Olympians",
        subheader: "(Path)",
        amount: "$1000",
        imageSrc: HACK_LOGO.src,
        code: "hack"
    },
    {
        title: "General",
        subheader: "(Path)",
        amount: "$1750",
        imageSrc: HACK_LOGO.src,
        code: "hack"
    },
    {
        title: "Best Financial Hack", // capital 1
        subheader: "(Track)",
        amount: "$1000",
        imageSrc: "/home/sponsors/capital_one.png",
        code: "c1"
    },
    {
        title: "Autonomous Vehicles", // john deere
        subheader: "(Track)",
        amount: "Raspberry Pi 4B and Vehicle Kit for each member",
        imageSrc: "/home/sponsors/john_deere.svg",
        code: "john"
    },
    {
        title: "Best Developer Tool", // warp
        subheader: "(Track)",
        amount: "Keychron mechanical keyboard for each member",
        imageSrc: "/home/sponsors/warp.svg",
        code: "warp"
    },
    {
        title: "AI-Powered Agriculture Ops Planning", // agco
        subheader: "(Track)",
        amount: "$1000",
        imageSrc: "/home/sponsors/agco.svg",
        code: "agco"
    },
    {
        title: "Best Solana Blockchain Hack", // solana
        subheader: "(Track)",
        amount: "$2000",
        imageSrc: "/home/sponsors/solana.svg",
        code: "solana"
    }
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
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    overflowY: "auto",
                    paddingTop: "50px"
                }}
                className={styles.container}
            >
                <div className={styles.leftDiv}>
                    <h1 className={styles.title}>Prizes</h1>

                    <Image
                        className={styles.character}
                        src={ATHENA_PRIZE_INFO_CHARACTER.src}
                        width={400}
                        height={700}
                        alt="Athena"
                    />
                </div>
                <div className={styles.scrollableGrid}>
                    <div className={styles.prizesGrid}>
                        {prizesList.map((prize, index) => (
                            <Prize
                                key={index}
                                header={prize.title}
                                subheader={prize.subheader}
                                imageSrc={prize.imageSrc}
                                prize={prize.amount}
                                code={prize.code}
                            />
                            // <div key={index} className={styles.medalContainer}>
                            //     <Image
                            //         src={medal.src}
                            //         alt="Medal"
                            //         width={300}
                            //         height={300}
                            //         className={styles.medalIcon}
                            //     />

                            //     <div className={styles.medalOverlay1}>
                            //         <h1>{prize.title}</h1>
                            //     </div>
                            //     <div className={styles.medalOverlay2}>
                            //         <h2>{prize.amount}</h2>
                            //     </div>
                            // </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Prizes;
