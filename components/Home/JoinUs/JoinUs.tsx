import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Cloud from '@/public/home/joinus/dividerCloud.svg'

import Twitter from '@/public/home/joinus/twitterlogo.svg'
import Instagram from '@/public/home/joinus/instagramlogo.svg'
import Header from '@/public/home/joinus/joinusHeader.svg'
import SMCloud from '@/public/home/joinus/smcloud.svg'

const JoinUs = () => {
    return ( 
        <section className={styles.joinus}>
            <div className={styles.joinusContainer}>

                {/* <div>
                    <Image alt="divider cloud" src={Cloud}></Image>

                </div> */}
                
                <div className={styles.joinusContainerItem1}>
                    <Image className={styles.joinusHeader} alt='join us header' src={Header}/>
                </div>

                <div className={styles.joinusContainerItem2}>
                    <Image className={styles.socialmediaCloud} alt='social media' src={SMCloud}/>

                    <div className={styles.logoContainer}> 
                        <Link target="_blank" href="https://www.instagram.com/hackillinois">
                            <Image className={styles.instagram} alt='instagram' src={Instagram}/>
                        </Link>
                        
                        <Link target="_blank" href="https://twitter.com/HackIllinois">
                            <Image className={styles.twitter} alt='twitter' src={Twitter} />
                        </Link>

                    </div>

                    <div className={styles.handleContainer}> 
                        <p> 
                            @HackIllinois  
                        </p>
                    </div>
                </div>

                <div className={styles.joinusContainerItem3}>

                    <div className={styles.infoContainer}>
                        Follow us on <b>Twitter</b> (@<a target="_blank" href="https://www.twitter.com/hackillinois">HackIllinois</a>)  
                        and <b>Instagram</b> (@<a target="_blank" href="https://www.instagram.com/hackillinois">HackIllinois</a>)
                        to be notified of our event updates! There will be regular content and posts.
                    </div>
                        
                </div>

            </div>
        </section>
    );
}

export default JoinUs;