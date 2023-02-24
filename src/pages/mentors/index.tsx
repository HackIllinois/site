import styles from "./styles.module.scss";
import Navbar from "components/Navbar";
import Head from 'next/head';

import BOOTH from "../../assets/mentors/booth.svg";
import HACKLOGO from "../../assets/mentors/hacklogo.svg";
import GITHUB from "../../assets/prizes/githubprize.svg";
import BALLOONS from "../../assets/prizes/balloons.svg";
import BUBBLES from "../../assets/prizes/bubbles.svg";
import DEERE from "../../assets/prizes/deere.svg";
import BLUEHILL from "../../assets/prizes/BlueHill.svg";
import CARDANO from "../../assets/sponsors/Cardano.svg";

import mentors from './mentors';

const Mentors: React.FC = () => {
    return (
        <div className={styles.mentorsMain}>
            <Navbar path="/mentors" />
            <img src={BUBBLES} className={styles.bubbles} />
            <img src={BOOTH} className={styles.booth} />
            <div className={styles.leftPole}/>
            <div className={styles.rightPole}/>
            <div className={styles.prizeList}>
                <div className={styles.prizeColumn}>
                <div className={styles.prizeColumnSection}>CORPORATE</div>
                    {mentors[0].mentorData.map(({ picture, name, bio }, i) => (
                        <div key={i} className={styles.mentor}>
                            <div className={styles.leftBlock}>
                                <img src={picture} className={styles.logo} />
                            </div>
                            <div className={styles.rightBlock}>
                                <h4>{name}</h4>
                                <div className={styles.mentorText}>{bio}</div>
                            </div>
                        </div>
                        // <div key={i} className={styles.faqContentColumn}>
                        //     <h3>{question}</h3>
                        //     {answer}
                        //     </div>
                    ))}
                    {/* <div className={styles.mentor}>
                        <div className={styles.leftBlock}>
                            <img src={HACKLOGO} className={styles.logo} />
                        </div>
                        <div className={styles.rightBlock}>
                            <h4>Ian Ludden</h4>
                            <div className={styles.mentorText}>
                            Ian Ludden is a PhD Candidate in Computer Science at the University of Illinois Urbana-Champaign.  His dissertation research integrates algorithmic game theory, graph theory, and combinatorial optimization to tackle partitioning problems in political redistricting and beyond. Ian has also led data analytics projects related to March Madness and public health, including undergraduate research and web development for the BracketOdds website hosted at Illinois. 
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* <img src={BALLOONS} className={styles.balloons} /> */}
        </div>
    );
};

export default Mentors;

