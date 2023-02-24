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

import mentors from '../../components/mentors/mentors';

const Mentors: React.FC = () => {
    if(mentors == undefined){
        return(<div/>)
    }
    return (
        <div className={styles.mentorsMain}>
            <Navbar path="/mentors" />
            <img src={BUBBLES} className={styles.bubbles} />
            <img src={BOOTH} className={styles.booth} />
            <div className={styles.leftPole}/>
            <div className={styles.rightPole}/>
            <div className={styles.mentorList}>
                <div className={styles.mentorColumn}>
                    {mentors[1].mentorData.map(({ picture, name, bio }, i) => (
                        <div key={i} className={styles.mentor}>
                            <div className={styles.leftBlock}>
                                <img src={picture} className={styles.logo} />
                            </div>
                            <div className={styles.rightBlock}>
                                <h4>{name}</h4>
                                <div className={styles.mentorText}>{bio}</div>
                            </div>
                        </div>
                    ))}
                <div className={styles.mentorColumnSection}> CORPORATE </div>
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
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default Mentors;

