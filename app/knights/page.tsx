import styles from './page.module.scss'
import Image from 'next/image'
import Saber from '@/public/knights/knight-saber.svg'
import Horse from '@/public/knights/knight-horse.svg'
import Background from '@/public/knights/background.svg'

const Knights : React.FC = () => {

    return(
    <section className={styles.knightsPage}>
        <div className={styles.background}>
            <div className={styles.images}>
                <Image src={Background} alt="Background Dots" className={styles.background} />
                <Image src={Saber} alt="Knight Saber Image" className={styles.saber} />
                <Image src={Horse} alt="Knight Horse Image" className={styles.horse} />
            </div>
            <div className={styles.text}>
                <div className={styles.title}>
                    <h1>Introducing <b>Hack<em>Knights!</em></b></h1>
                </div>
                <div className={styles.descriptionBoxes}>
                    <div className={styles.whatBox}>
                        <h2>What is HackIllinois Knights?</h2>
                        <br></br>
                        <p>HackIllinois Knights is an exclusive track tailored for prospective attendees to dive into a competitively elevated hackathon atmosphere for an increased prize value.
                            <br></br>
                            <br></br>
                            It&apos;s a <em>specialized arena for experienced hackers</em> who have mastered the fundamentals and are now looking to test their skills in a more challenging environment. 
                            <br></br>
                            <br></br>
                            Admission into HackIllinois Knights requires completing our application, which includes a coding challenge.
                        </p>
                    </div>
                    <div className={styles.benefitBox}>
                        <h2>What are the benefits of being a HackIllinois Knight?</h2>
                        <br></br>
                        <p>Attendees in this track have the exclusive opportunity to compete for the <em>grand Knights prize of $2,000.</em>
                            <br></br>
                            <br></br>
                            Additionally, they will gain access to <em>special networking opportunities</em> with our event sponsors – but spots are limited, so register soon!
                        </p>
                    </div>
                    <div className={styles.differBox}>
                        <h2>How is HackIllinois Knights different from standard HackIllinois attendance?</h2>
                        <br></br>
                        <p>HackIllinois is a historically welcoming space for all skill levels, especially for beginner-level coders. This year, we created <em>HackIllinois Knights to be inclusive of advanced skill levels and provide more opportunities for advanced hackers.</em>
                            <br></br>
                            <br></br>
                            All attendees from both tracks will enjoy access to HackIllinois&apos;s vibrant array of events, workshops, Q&As, and the Company Expo. Each track will maintain the spirit of inclusivity and learning to ensure that all attendees, regardless of their track, experience the full magic of HackIllinois!
                            <br></br>
                            <br></br>
                            Additionally, all HackIllinois attendees are eligible to compete in all our sponsored tracks.*
                            <br></br>
                            <br></br>
                            <i>*The Best Beginner track is reserved for HackIllinois General attendees, while the Best Knights track is reserved for HackIllinois Knights attendees.</i>
                        </p>
                    </div>
                </div>
            </div>
        </div>



    </section>
    );
};

export default Knights