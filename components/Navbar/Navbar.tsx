"use client";

import Logo from "@/public/logo.svg";
import LogoDark from "@/public/logo_dark.svg";
import Image from "next/image";
import styles from "./Navbar.module.scss";
// import CloudMenu from "@/public/cloud-menu.svg";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { NavbarContext } from "./NavbarContext";
import Link from "next/link";

type NavbarItem = {
    title: string;
    link: string;
};

const NAVBAR_ITEMS: NavbarItem[] = [
    // {
    //     title: "Schedule",
    //     link: "/schedule",
    //     active: false
    // },
    // {
    //     title: "Mentors",
    //     link: "/mentors",
    //     active: false
    // },
    // {
    //     title: "Prizes",
    //     link: "/prizes",
    //     active: false
    // },
    // {
    //     title: "Map",
    //     link: "#",
    //     active: false
    // },
    // {
    //     title: "Travel",
    //     link: "/travel",
    //     active: false
    // },
    {
        title: "Register",
        link: "/register"
    },
    {
        title: "Legal",
        link: "/legal"
    }
];

const Navbar = () => {
    const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const navbarContext = useContext(NavbarContext);

    return (
        <>
            <nav
                className={clsx(
                    styles.navbar,
                    navbarContext?.isDark && styles.dark
                )}
            >
                <Image
                    alt="HackIllinois Logo"
                    onClick={() => (window.location.pathname = "/")}
                    style={{ cursor: "pointer" }}
                    src={navbarContext?.isDark ? LogoDark : Logo}
                />
                <ul className={styles.navbarList}>
                    {NAVBAR_ITEMS.map(item => (
                        <li key={item.title}>
                            <Link
                                href={item.link}
                                className={
                                    pathname.startsWith(item.link)
                                        ? styles.active
                                        : ""
                                }
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <OlympianButton />
                    </li>
                </ul>
            </nav>
            <nav className={styles.mobile}>
                <div className={styles.mobileTop}>
                    <div className={styles.title}>
                        <Link href="/">
                            <Image alt="Logo" src={Logo} className="logo" />
                        </Link>
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
                    {NAVBAR_ITEMS.map(item => (
                        <Link
                            href={item.link}
                            key={item.title}
                            className={styles.link}
                        >
                            {item.title}
                        </Link>
                    ))}
                    <OlympianButton />
                </div>
            </nav>
        </>
    );
};

export default Navbar;

const OlympianButton = () => {
    return (
        <Link href="/olympians">
            <button className={styles.olympianButton}>
                <div className={styles.buttonBackground}></div>
                <div className={styles.buttonContent}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                    >
                        <path
                            d="M6.5 0.5L8.25559 5.24441L13 7L8.25559 8.75559L6.5 13.5L4.74441 8.75559L0 7L4.74441 5.24441L6.5 0.5Z"
                            fill="white"
                        />
                        <path
                            d="M13 11.5L14.0804 14.4196L17 15.5L14.0804 16.5804L13 19.5L11.9196 16.5804L9 15.5L11.9196 14.4196L13 11.5Z"
                            fill="white"
                        />
                    </svg>

                    <span>Olympians</span>
                </div>
            </button>
        </Link>
    );
};
