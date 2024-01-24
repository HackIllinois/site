"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Logo from "@/public/logo.svg";
import CloudMenu from "@/public/cloud-menu.svg";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavbarItem = {
    title: string;
    link: string;
};

const navbar_items: NavbarItem[] = [
    // {
    //     title: "Schedule",
    //     link: "#"
    // },
    // {
    //     title: "Mentors",
    //     link: "#"
    // },
    // {
    //     title: "Prizes",
    //     link: "#"
    // },
    // {
    //     title: "Map",
    //     link: "#"
    // },
    // {
    //     title: "Travel",
    //     link: "#"
    // }
];

const Navbar = () => {
    const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // const handleClickOutside = (event: MouseEvent) => {
    //     if (
    //         menuRef.current &&
    //         !menuRef.current.contains(event.target as Node)
    //     ) {
    //         setShowMobileNavbar(false);
    //     }
    // };

    // useEffect(() => {
    //     // Add when mounted
    //     document.addEventListener("mousedown", handleClickOutside);
    //     // Return function to be called when unmounted
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    return (
        <>
            {pathname !== "/knights/challenge" && (
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
                                <Image alt="Menu" src={CloudMenu} />
                            </div>
                            {showMobileNavbar && (
                                <ul className={styles.mobileNavbarMenu}>
                                    {navbar_items.map((item, index) => (
                                        <li key={item.title}>
                                            <a href={item.link}>{item.title}</a>
                                        </li>
                                    ))}
                                    <li>
                                        <KnightsButton />
                                    </li>
                                </ul>
                            )}
                        </div>
                        <ul className={styles.navbarList}>
                            {navbar_items.map((item, index) => (
                                <li key={item.title}>
                                    <a href={item.link}>{item.title}</a>
                                </li>
                            ))}
                            <li>
                                <KnightsButton />
                            </li>
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
                            {/* <a href="/profile" className={styles.link}>
                        Profile
                    </a> */}
                            <KnightsButton />
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

const KnightsButton = () => {
    return (
        <a href="/knights">
            <button className={styles.knightButton}>
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

                    <span>Knights</span>
                </div>
            </button>
        </a>
    );
};
function handleClickOutside(this: Document, ev: MouseEvent) {
    throw new Error("Function not implemented.");
}
