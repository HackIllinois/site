import { FC } from "react";

import styles from "./Sponsors.module.scss";
import BACKGROUND from "@/public/home/sponsors/sponsor-background.svg";

import Image from "next/image";
import SponsorItem from "@/components/SponsorItem/SponsorItem";

const Sponsors: FC = () => {
    return (
        <section className={styles.container}>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <div className={styles.content}>
                <h1 className={styles.title}>Sponsors</h1>
            </div>
            <SponsorItem
                className={styles.caterpillar}
                sponsorType="platinum"
                sponsorSrc="/home/sponsors/caterpiller.png"
                sponsor="Caterpiller"
                link={"https://www.caterpillar.com/"}
                width={900}
                height={139}
            />
            <SponsorItem
                className={styles.johndeere}
                sponsorType="platinum"
                sponsorSrc="/home/sponsors/john_deere.svg"
                sponsor="John Deere"
                link={"https://www.deere.com/en/index.html"}
                width={386}
                height={73}
            />
            <SponsorItem
                className={styles.solana}
                sponsorType="platinum"
                sponsorSrc="/home/sponsors/solana.svg"
                sponsor="Solana"
                link={"https://solana.com/"}
                width={323}
                height={49}
            />
            <SponsorItem
                className={styles.discover}
                sponsorType="gold"
                sponsorSrc="/home/sponsors/discover.svg"
                sponsor="Discover"
                link={"https://www.discover.com/"}
                width={1013}
                height={321}
            />
            <SponsorItem
                className={styles.klaviyo}
                sponsorType="gold"
                sponsorSrc="/home/sponsors/klaviyo.png"
                sponsor="Klaviyo"
                link={"https://www.klaviyo.com/"}
                width={1045}
                height={340}
            />
            <SponsorItem
                className={styles.capitalone}
                sponsorType="gold"
                sponsorSrc="/home/sponsors/capital_one.png"
                sponsor="Capital One"
                link={"https://www.capitalone.com/"}
                width={1798}
                height={625}
            />
            <SponsorItem
                className={styles.agco}
                sponsorType="gold"
                sponsorSrc="/home/sponsors/agco.svg"
                sponsor="AGCO"
                link={"https://www.agcocorp.com/us/en/home.html"}
                width={685}
                height={254}
            />
            <div className={styles.sponsorTable}>
                <SponsorItem
                    className={styles.slb}
                    sponsorType="silver"
                    sponsorSrc="/home/sponsors/slb.svg"
                    sponsor="slb"
                    link={"https://www.slb.com/"}
                    width={685}
                    height={254}
                />
                <SponsorItem
                    sponsorType="silver"
                    sponsorSrc="/home/sponsors/cloudflare.svg"
                    sponsor="Cloudflare"
                    link={"https://www.cloudflare.com/"}
                    width={685}
                    height={254}
                />
                <SponsorItem
                    sponsorType="silver"
                    sponsorSrc="/home/sponsors/desco.svg"
                    sponsor="DESCO"
                    link={"https://www.deshaw.com/"}
                    width={432}
                    height={94}
                />
                <SponsorItem
                    sponsorType="silver"
                    sponsorSrc="/home/sponsors/research_park.svg"
                    sponsor="Research Park"
                    link={"https://researchpark.illinois.edu/"}
                    width={685}
                    height={254}
                />
                <SponsorItem
                    sponsorType="bronze"
                    sponsorSrc="/home/sponsors/warp.svg"
                    sponsor="Warp"
                    link={"https://www.warp.dev/"}
                    width={381}
                    height={92}
                />
                <SponsorItem
                    sponsorType="bronze"
                    sponsorSrc="/home/sponsors/telora.jpeg"
                    sponsor="Telora"
                    link={"https://telora.com/"}
                    width={200}
                    height={200}
                />
                <SponsorItem
                    sponsorType="bronze"
                    sponsorSrc="/home/sponsors/hrt.svg"
                    sponsor="HRT"
                    link={"https://www.hudsonrivertrading.com/"}
                    width={166}
                    height={101}
                />
            </div>
        </section>
    );
};

export default Sponsors;
