"use client";
import PrizesCard from "@/components/Prizes/PrizesCard/PrizesCard";
import styles from "./page.module.scss";
import { data } from "@/modules/PrizesData";

import { useEffect } from "react";
type prize = {
    id: number;
    name: string;
    image: string;
    desc: string;
};

const Prizes = () => {
    const partitionedData = data.reduce(
        (acc, curr, index) => {
            if (index && (index + 1) % 2 === 0) {
                acc.push([data[index - 1], data[index]]);
            }
            return acc;
        },
        [] as Array<prize[]>
    );

    return (
        <div className={styles.container}>
            <p className={styles.title}>Prizes</p>
            <div className={styles.body}>
                <div className={styles.cat}>
                    <img src="/prizes/cat.svg" />
                </div>
                <div className={styles.content}>
                    <div className={styles.cupboard_outer}>
                        <div className={styles.cupboard_inner}>
                            {partitionedData.map((prize: any) => (
                                <div className={styles.shelf}>
                                    <PrizesCard
                                        id={prize[0].id}
                                        name={prize[0].name}
                                        image={prize[0].image}
                                        desc={prize[0].desc}
                                    />
                                    <PrizesCard
                                        id={prize[1]?.id}
                                        name={prize[1]?.name}
                                        image={prize[1]?.image}
                                        desc={prize[1]?.desc}
                                    />
                                </div>
                            ))}
                            <div className={styles.foot} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prizes;
