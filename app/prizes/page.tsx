import PrizesCard from "@/components/Prizes/PrizesCard/PrizesCard";
import styles from "./page.module.scss";
import { data } from "@/modules/PrizesData";
import React from "react";

type prize = {
    id: number;
    name: string;
    image: string;
    desc: string;
    code: string;
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
                <div className={styles.mobileCat}>
                    <img src="/prizes/cat-mobile.svg" />
                </div>
                <div className={styles.content}>
                    <div className={styles.cupboard_outer}>
                        <div className={styles.cupboard_inner}>
                            {partitionedData.map((prize: any, index: React.Key) => (
                                <div className={styles.shelf} key={index}>
                                    <PrizesCard
                                        id={prize[0].id}
                                        name={prize[0].name}
                                        image={prize[0].image}
                                        desc={prize[0].desc}
                                        code={prize[0].code}
                                    />
                                    <PrizesCard
                                        id={prize[1]?.id}
                                        name={prize[1]?.name}
                                        image={prize[1]?.image}
                                        desc={prize[1]?.desc}
                                        code={prize[1]?.code}
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
