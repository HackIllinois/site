import React, { useState } from "react";

import styles from "./styles.module.scss";
import LOGO from "../../assets/home/hero/logo.svg";
import clsx from "clsx";

const Navbar = (props: { path: string }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.title}>
                    <a href="/">
                        <img src={LOGO} className="logo" />
                    </a>
                </div>
                <div className={styles.links}>
                    <div
                        className={clsx(
                            styles.li,
                            props.path === "/schedule" && styles.active
                        )}
                    >
                        <a href="/schedule" className={styles.link}>
                            Schedule
                        </a>
                    </div>
                    {/* <div
                        className={clsx(
                            styles.li,
                            props.path === "/mentors" && styles.active
                        )}
                    >
                        <a href="/mentors" className={styles.link}>
                            Mentors
                        </a>
                    </div> */}
                    <div
                        className={clsx(
                            styles.li,
                            props.path === "/prizes" && styles.active
                        )}
                    >
                        <a href="/prizes" className={styles.link}>
                            Prizes
                        </a>
                    </div>
                    <div
                        className={clsx(
                            styles.li,
                            props.path === "/maps" && styles.active
                        )}
                    >
                        <a href="/maps" className={styles.link}>
                            Map
                        </a>
                    </div>
                    <div
                        className={clsx(
                            styles.li,
                            props.path === "/travel" && styles.active
                        )}
                    >
                        <a href="/travel" className={styles.link}>
                            Travel
                        </a>
                    </div>
                    {/* <div className={styles.li}>
                        <a href="/register" className={styles.link}>
                            Register
                        </a>
                    </div> */}
                </div>
            </nav>

            <nav className={styles.mobile}>
                <div className={styles.mobileTop}>
                    <div className={styles.title}>
                        <a href="/">
                            <img src={LOGO} className="logo" />
                        </a>
                    </div>
                    <div
                        className={clsx(
                            styles.hamburger,
                            isOpen && styles.open
                        )}
                        onClick={() => setOpen(!isOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div
                    className={clsx(
                        styles.mobileMenu,
                        isOpen && styles.menuOpen
                    )}
                >
                    <a href="/schedule" className={styles.link}>
                        Schedule
                    </a>
                    {/* <a href="/mentors" className={styles.link}>
                        Mentors
                    </a> */}
                    <a href="/prizes" className={styles.link}>
                        Prizes
                    </a>
                    <a href="/maps" className={styles.link}>
                        Map
                    </a>
                    <a href="/travel" className={styles.link}>
                        Travel
                    </a>
                    {/* <a href="/register" className={styles.link}>
                        Register
                    </a> */}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
