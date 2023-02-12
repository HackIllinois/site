import styles from "./styles.module.scss";
import Navbar from "components/Navbar";

import BOOTH from "../../assets/prizes/booth.svg";
import HACKLOGO from "../../assets/prizes/hacklogo.svg";
import GITHUB from "../../assets/prizes/githubprize.svg";
import BALLOONS from "../../assets/prizes/balloons.svg";
import BUBBLES from "../../assets/prizes/bubbles.svg";
import DEERE from "../../assets/prizes/deere.svg";

const Prizes: React.FC = () => {
    return (
        <div className={styles.prizesMain}>
            <Navbar path="/prizes" />
            <img src={BUBBLES} className={styles.bubbles} />
            <img src={BOOTH} className={styles.booth} />
            <div className={styles.prizeList}>
                <div className={styles.prizeColumn}>
                    <div className={styles.prize}>
                        <img src={HACKLOGO} className={styles.logo} />
                        <h3>Beginner Track</h3>
                        <h3>(Staff Pick)</h3>
                        <br />
                        <p>First Place:</p>
                        <p>$400</p>
                        <p>Second Place</p>
                        <p>$250</p>
                    </div>
                    <div className={styles.prize}>
                        <img src={GITHUB} className={styles.logo} />
                        <h3>Best Use of Student Devloper Pack</h3>
                        <h3>(Sponsored by GitHub)</h3>
                        <br />
                        <p>First Place:</p>
                        <p>$400</p>
                    </div>
                    <div className={styles.prize}>
                        <img src={HACKLOGO} className={styles.logo} />
                        <h3>General Track</h3>
                        <br />
                        <p>First Place:</p>
                        <p>$400</p>
                    </div>
                </div>
                <div className={styles.prizeColumn}>
                    <div className={styles.prize}>
                        <img src={DEERE} className={styles.logo} />
                        <h3>Community & Sustainability Track</h3>
                        <h3>(Sponsored by John Deere)</h3>
                        <br />
                        <p>First Place:</p>
                        <p>$400</p>
                    </div>
                    <div className={styles.prize}>
                        <h3>To Be Announced!</h3>
                    </div>
                    <div className={styles.prize}>
                        <h3>To Be Announced!</h3>
                    </div>
                </div>
            </div>
            <img src={BALLOONS} className={styles.balloons} />
        </div>
    );
};

export default Prizes;
