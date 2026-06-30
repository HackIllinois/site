import "./mainpage.styles.scss";

import styles from "./page.module.scss";
import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import { Metadata } from "next";
import { EmailSubscribeInput } from "@/components/EmailSubscribeInput/EmailSubscribeInput";

export const metadata: Metadata = {
    title: "HackIllinois | About"
};

const Page = () => {
    return (
        <div className="page">
            {/* top section */}
            <div className="logo-div">
                <img src="generic/main-background.svg" className="main-logo" />
                <div className="content">
                    {/* center hero section -- hero logo, prev year, newsletter */}
                    <div className="icon-div">
                        <img
                            src="generic/hackillinois-main.svg"
                            className="iconPosition"
                        />
                    </div>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeco5rnd7eqrH0OBf7K5PgNfpGUfCpH8EpjJTSoiKKvO_6X5g/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            text={"Hack 2027 Interest Form"}
                            navigateTo="https://docs.google.com/forms/d/e/1FAIpQLSeco5rnd7eqrH0OBf7K5PgNfpGUfCpH8EpjJTSoiKKvO_6X5g/viewform"
                            backgroundColor={"#68C8BF"}
                            textColor={"#FCE891"}
                        />
                    </a>
                    <br />
                    <Button
                        text={"Sign up for our newsletter!"}
                        navigateTo="#connect-with-us"
                        backgroundColor={"#FBA036"}
                        textColor={"#FCE891"}
                    />
                </div>
            </div>

            {/* main container */}
            <Container style={{ rowGap: "5rem" }}>
                {/* info section */}
                <div className="section-div">
                    <h1>What is HackIllinois?</h1>
                    <div className="textbox">
                        <br />
                        <p className="p-text">
                            HackIllinois is the premier student-run hackathon at
                            the University of Illinois at Urbana-Champaign. Each
                            spring, HackIllinois hosts nearly a thousand
                            students who work together for a weekend to learn
                            new skills and technologies, creating innovative
                            hacks such as websites, mobile apps, and many more!
                            <br />
                            HackIllinois 2026 took place this February and gave
                            out over $75k in prizes. Stay tuned for Hack 2027:
                            fill out our interest form or sign up for our
                            newsletter to be the first to hear more about it!
                        </p>
                        <img
                            src="generic/what-is-hack.svg"
                            className="tilted-hack"
                        />
                    </div>

                    <br />
                    <br />
                    <div>
                        <a
                            href="https://info.hackillinois.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                text={"Learn more about HackIllinois"}
                                navigateTo="https://info.hackillinois.org"
                                backgroundColor={"#68C8BF"}
                                textColor={"#FCE891"}
                            />
                        </a>
                    </div>
                </div>
                {/* contact us (shortened) */}
                <div className={styles.bottomSection}>
                    <div className={styles.contactSection} id="connect-with-us">
                        <h1>Keep in Touch!</h1>
                        <div className={styles.contactBody}>
                            <div>
                                <p>
                                    Want to stay up-to-date with HackIllinois
                                    events or exciting news? Subscribe to our
                                    newsletter for more info and announcements
                                    about the upcoming season!
                                </p>

                                <div className={styles.icons}>
                                    <div>
                                        <EmailSubscribeInput />
                                    </div>
                                </div>
                            </div>
                            <img
                                src="generic/about/connect-vector.svg"
                                alt="vector"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact us section */}
                {/* <div className={styles.bottomSection}>
                    <div className={styles.contactSection} id="connect-with-us">
                        <h1>Connect With Us</h1>
                        <div className={styles.contactBody}>
                            <div>
                                <p>
                                    Want to stay up-to-date with HackIllinois
                                    events or exciting news? Keep in touch with
                                    us through{" "}
                                    <b>subscribing to our newsletter</b> or{" "}
                                    <b>following our social medias!</b> Be sure
                                    to check out our FAQ for common inquiries.
                                    Still have a question? Reach out to us at{" "}
                                    <a href="mailto:contact@hackillinois.org">
                                        contact@hackillinois.org
                                    </a>
                                    .
                                </p>

                                <div className={styles.icons}>
                                    <div>
                                        <EmailSubscribeInput />
                                    </div>
                                </div>
                            </div>
                            <img src="generic/about/connect-vector.svg" alt="vector" />
                        </div>
                    </div>
                </div> */}
            </Container>
            <div className={styles.bottomVectors}>
                <img
                    src="generic/about/shapes/yellow-horizontal-line.svg"
                    alt="vector"
                />
                <img
                    src="generic/about/shapes/green-circles-group.svg"
                    alt="vector"
                />
            </div>
        </div>
    );
};

export default Page;
