"use client";

import Image from "next/image";
import styles from "./Navbar.module.scss";
import Logo from "@/public/logo.svg";
// import CloudMenu from "@/public/cloud-menu.svg";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavbarItem = {
    title: string;
    link: string;
    active: boolean;
};

const DEFAULT_NAVBAR_ITEMS: NavbarItem[] = [
    {
        title: "Schedule",
        link: "/schedule",
        active: false
    },
    {
        title: "Mentors",
        link: "/mentors",
        active: false
    },
    {
        title: "Prizes",
        link: "/prizes",
        active: false
    },
    {
        title: "Map",
        link: "#",
        active: false
    },
    {
        title: "Travel",
        link: "/travel",
        active: false
    }
];

const Navbar = () => {
    const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [navbarItems, setNavbarItems] = useState(DEFAULT_NAVBAR_ITEMS);

    return (
        <>
            {pathname !== "/olympians/challenge" && (
                <>
                    <nav className={styles.navbar}>
                        <Image
                            alt="HackIllinois Logo"
                            onClick={() => (window.location.pathname = "/")}
                            style={{ cursor: "pointer" }}
                            src={Logo}
                        />
                        <div
                            ref={menuRef}
                            className={styles.mobileMenu}
                            onClick={() => setShowMobileNavbar(p => !p)}
                        >
                            <div className={styles.mobileMenuButton}>
                                <span>Menu</span>
                                {/* <Image alt="Menu" src={CloudMenu} /> */}
                            </div>
                            {showMobileNavbar && (
                                <ul className={styles.mobileNavbarMenu}>
                                    {navbarItems.map((item, index) => (
                                        <li key={item.title}>
                                            <a href={item.link}>{item.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <ul className={styles.navbarList}>
                            {navbarItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.link}
                                        className={
                                            item.active ? styles.active : ""
                                        }
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav className={styles.mobile}>
                        <div className={styles.mobileTop}>
                            <div className={styles.title}>
                                <a href="/">
                                    <Image
                                        alt="Logo"
                                        src={Logo}
                                        className="logo"
                                    />
                                </a>
                            </div>
                            <div
                                className={clsx(
                                    styles.hamburger,
                                    showMobileNavbar && styles.open
                                )}
                                ref={menuRef}
                                onClick={() => setShowMobileNavbar(p => !p)}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div
                            className={clsx(
                                styles.mobileMenu,
                                showMobileNavbar && styles.menuOpen
                            )}
                        >
                            {navbarItems.map((item, index) => (
                                <a
                                    href={item.link}
                                    key={index}
                                    className={styles.link}
                                >
                                    {item.title}
                                </a>
                            ))}
                            {/* <a href="/register" className={styles.link}>
                        Register
                    </a> */}
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};

export default Navbar;
