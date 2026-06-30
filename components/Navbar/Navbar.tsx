"use client";
import Link from "next/link";
import "./Navbar.styles.scss";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const links: { href: string; text: string }[] = [];

type NavbarProps = {
    showJoinUsButton?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ showJoinUsButton = true }) => {
    const [isOpen, setOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();

    const handleOnClickJoinUs = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/join-us");
    };

    return (
        <>
            <nav className="navbar">
                <Link href="/#">
                    <img
                        src="generic/hackillinois-logo.svg"
                        className="hackillinois-logo"
                    />
                </Link>
                <div className="links">
                    {links.map(({ href, text }, i) => (
                        <Link
                            key={i}
                            href={href}
                            className={path === href ? "link active" : "link"}
                        >
                            {text}
                        </Link>
                    ))}
                </div>
                {showJoinUsButton ? (
                    <button
                        onClick={handleOnClickJoinUs}
                        className="joinButton"
                    >
                        Join Us
                    </button>
                ) : (
                    <div></div>
                )}
                <a
                    href="https://www.mlh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="generic/mlh-logo.svg" className="mlh-logo" />
                </a>
            </nav>

            <nav className="mobile">
                <div className="mobileTop">
                    <Link href="/#">
                        <img
                            src="generic/hackillinois-logo.svg"
                            className="hackillinois-logo mobile"
                        />
                    </Link>
                    <a
                        href="https://www.mlh.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="generic/mlh-logo.svg"
                            className="mlh-logo mobile"
                        />
                    </a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
