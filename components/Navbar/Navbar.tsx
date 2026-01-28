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
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type NavbarItem = {
    title: string;
    link?: string;
    dropdown?: DropdownItem[];
};

type DropdownItem = {
    title: string;
    link: string;
};

const NAVBAR_ITEMS: NavbarItem[] = [
    {
        title: "Register",
        link: "/register/general#personal-information"
    },
    {
        title: "Schedule",
        link: "/schedule"
    },
    {
        title: "Prizes",
        link: "/prizes"
    },
    {
        title: "Travel",
        link: "/travel"
    },
    {
        title: "Resources",
        dropdown: [
            {
                title: "Judge and Mentor Interest Form",
                link: "https://go.hackillinois.org/judgementor-2026"
            },
            {
                title: "Speaker Interest Form",
                link: "https://go.hackillinois.org/speaker-2026"
            }
        ]
    }
];

const DARK_PAGES = ["/register/challenge"];

const Navbar = () => {
    const [showMobileNavbar, setShowMobileNavbar] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
        null
    );
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const isDark = DARK_PAGES.includes(pathname);

    const handleDropdownOpen = (
        event: React.MouseEvent<HTMLElement>,
        title: string
    ) => {
        setAnchorEl(event.currentTarget);
        setOpenDropdown(title);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
        setOpenDropdown(null);
    };

    const toggleMobileDropdown = (title: string) => {
        setMobileDropdownOpen(prev => (prev === title ? null : title));
    };

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
                            {item.dropdown ? (
                                <>
                                    <div
                                        onClick={e =>
                                            handleDropdownOpen(e, item.title)
                                        }
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px"
                                        }}
                                    >
                                        <a>{item.title}</a>
                                        <KeyboardArrowDownIcon
                                            sx={{ fontSize: 20 }}
                                        />
                                    </div>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={openDropdown === item.title}
                                        onClose={handleDropdownClose}
                                        MenuListProps={{
                                            sx: {
                                                backgroundColor: "#1a1a2e",
                                                color: "white",
                                                padding: "8px 0"
                                            }
                                        }}
                                        PaperProps={{
                                            sx: {
                                                backgroundColor: "#1a1a2e",
                                                marginTop: "8px"
                                            }
                                        }}
                                    >
                                        {item.dropdown.map(dropdownItem => (
                                            <MenuItem
                                                key={dropdownItem.title}
                                                component={Link}
                                                href={dropdownItem.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={handleDropdownClose}
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(255, 255, 255, 0.1)"
                                                    }
                                                }}
                                            >
                                                {dropdownItem.title}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <Link
                                    prefetch={false}
                                    href={item.link!}
                                    className={
                                        pathname.startsWith(item.link!)
                                            ? styles.active
                                            : ""
                                    }
                                >
                                    {item.title}
                                </Link>
                            )}
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
            <nav
                className={clsx(
                    styles.mobile,
                    showMobileNavbar && styles.navbarShown
                )}
            >
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
                        <div key={item.title}>
                            {item.dropdown ? (
                                <>
                                    <div
                                        onClick={() =>
                                            toggleMobileDropdown(item.title)
                                        }
                                        className={styles.link}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            cursor: "pointer",
                                            // Explicitly matching the font styles usually inherited by <a> tags
                                            fontSize: "24px", // Adjusted to match typical mobile menu header size
                                            fontWeight: 500, // Ensuring weight matches other links
                                            paddingRight: "8px",
                                            width: "100%"
                                        }}
                                    >
                                        {item.title}
                                        <KeyboardArrowDownIcon
                                            sx={{
                                                fontSize: 32, // Increased from 20 to match the text size
                                                transform:
                                                    mobileDropdownOpen ===
                                                    item.title
                                                        ? "rotate(180deg)"
                                                        : "rotate(0deg)",
                                                transition:
                                                    "transform 0.3s ease"
                                            }}
                                        />
                                    </div>
                                    {mobileDropdownOpen === item.title && (
                                        <div
                                            style={{
                                                paddingLeft: "20px",
                                                marginTop: "15px",
                                                marginBottom: "15px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "15px", // Space out the sub-items
                                                borderLeft:
                                                    "2px solid rgba(255, 255, 255, 0.2)" // Visual guide for hierarchy
                                            }}
                                        >
                                            {item.dropdown.map(dropdownItem => (
                                                <Link
                                                    key={dropdownItem.title}
                                                    href={dropdownItem.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.link}
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        fontSize: "18px", // Slightly smaller than parent but readable
                                                        lineHeight: "1.4",
                                                        opacity: 0.9
                                                    }}
                                                >
                                                    {dropdownItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    prefetch={false}
                                    href={item.link!}
                                    className={styles.link}
                                    // Ensure standard links also fill width for consistent tap area
                                    style={{ display: "block", width: "100%" }}
                                >
                                    {item.title}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div style={{ marginTop: "20px" }}>
                        <ProTrackButton />
                    </div>
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
