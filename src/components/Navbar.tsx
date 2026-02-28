"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X, Compass, Home } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "My Network", icon: Compass },
    { href: "/profile/1", label: "Profile", icon: User },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.navInner}`}>
                <Link href="/" className={styles.logo}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={styles.logoSvg}>
                        <rect width="28" height="28" rx="6" fill="var(--accent-primary)" />
                        <path d="M8 20V12h3v8H8zm1.5-9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM13 20v-5.5c0-1.4 1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V20h-3v-5c0-.6-.4-1-1-1s-1 .4-1 1v5h-3z" fill="white" />
                    </svg>
                    <span className={styles.logoText}>AthleteConnect</span>
                </Link>

                <div className={styles.searchBar}>
                    <Search size={15} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search athletes, sports, clubs..."
                        className={styles.searchInput}
                    />
                </div>

                <div className={`${styles.navLinks} ${mobileOpen ? styles.mobileOpen : ""}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <link.icon size={20} strokeWidth={pathname === link.href ? 2.5 : 1.5} />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                    <div className={styles.navDivider} />
                    <Link href="/signup" className={styles.joinBtn} onClick={() => setMobileOpen(false)}>
                        Join Now
                    </Link>
                </div>

                <button
                    className={styles.mobileToggle}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>
        </nav>
    );
}
