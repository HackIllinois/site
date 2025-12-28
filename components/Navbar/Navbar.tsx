"use client";

import Logo from "@/public/logo.svg";
import LogoDark from "@/public/logo_dark.svg";
import MLH from "@/public/assets/mlh.svg";
import styles from "./Navbar.module.scss";
// import CloudMenu from "@/public/cloud-menu.svg";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavbarItem = {
    title: string;
    link: string;
};

const NAVBAR_ITEMS: NavbarItem[] = [
    {
        title: "Register",
        link: "/register/general#personal-information"
    },
    {
        title: "Prizes",
        link: "/prizes"
    },
    {
        title: "Travel",
        link: "/travel"
    }
];

const DARK_PAGES = ["/register/challenge"];

const Navbar = () => {
    const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const isDark = DARK_PAGES.includes(pathname);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowMobileNavbar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setShowMobileNavbar(false);
    }, [pathname]);

    return (
        <>
            <nav className={clsx(styles.navbar, isDark && styles.dark)}>
                {pathname === "/" ? (
                    <img
                        className={styles.logo}
                        alt="HackIllinois Logo"
                        style={{ cursor: "default" }}
                        src={isDark ? LogoDark.src : Logo.src}
                    />
                ) : (
                    <Link href="/" prefetch={false}>
                        <img
                            className={styles.logo}
                            alt="HackIllinois Logo"
                            style={{ cursor: "pointer" }}
                            src={isDark ? LogoDark.src : Logo.src}
                        />
                    </Link>
                )}

                <ul className={styles.navbarList}>
                    {NAVBAR_ITEMS.map(item => (
                        <li key={item.title}>
                            <Link
                                prefetch={false}
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
                        <ProTrackButton />
                    </li>
                </ul>
                <Link
                    href="https://mlh.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className={styles.mlhBanner}
                        alt="MLH Banner"
                        style={{ cursor: "pointer" }}
                        src={MLH.src}
                    />
                </Link>
            </nav>
            <nav className={styles.mobile}>
                <div className={styles.mobileTop}>
                    <div className={styles.title}>
                        {pathname === "/" ? (
                            <img
                                alt="Logo"
                                src={isDark ? LogoDark.src : Logo.src}
                                className={styles.logo}
                                style={{ cursor: "default" }}
                            />
                        ) : (
                            <Link prefetch={false} href="/">
                                <img
                                    alt="Logo"
                                    src={isDark ? LogoDark.src : Logo.src}
                                    className={styles.logo}
                                />
                            </Link>
                        )}
                    </div>
                    <div
                        className={clsx(
                            styles.hamburger,
                            showMobileNavbar && styles.open,
                            isDark && styles.dark
                        )}
                        onClick={() => setShowMobileNavbar(p => !p)}
                        ref={buttonRef}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {!showMobileNavbar ? (
                        <Link
                            href="https://mlh.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={styles.mlhBanner}
                                alt="MLH Banner"
                                style={{ cursor: "pointer" }}
                                src={MLH.src}
                            />
                        </Link>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className={clsx(
                        styles.mobileMenu,
                        showMobileNavbar && styles.menuOpen
                    )}
                    ref={menuRef}
                >
                    {NAVBAR_ITEMS.map(item => (
                        <Link
                            prefetch={false}
                            href={item.link}
                            key={item.title}
                            className={styles.link}
                        >
                            {item.title}
                        </Link>
                    ))}
                    <ProTrackButton />
                </div>
            </nav>
        </>
    );
};

export default Navbar;

const ProTrackButton = () => {
    return (
        <Link prefetch={false} href="/challenge/landing-page">
            <button className={styles.proTrackButton}>
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

                    <span>HackVoyagers</span>
                </div>
            </button>
        </Link>
    );
};
