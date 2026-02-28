import Link from "next/link";
import { Heart } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <span className={styles.logoText}>AthleteConnect</span>
                        <p className={styles.tagline}>
                            The professional network for athletes.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div>
                            <h4>Platform</h4>
                            <Link href="/explore">Explore Athletes</Link>
                            <Link href="/signup">Create Profile</Link>
                            <Link href="#">For Clubs</Link>
                            <Link href="#">For Sponsors</Link>
                        </div>
                        <div>
                            <h4>Sports</h4>
                            <Link href="#">Football</Link>
                            <Link href="#">Cricket</Link>
                            <Link href="#">Basketball</Link>
                            <Link href="#">Tennis</Link>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <Link href="#">About</Link>
                            <Link href="#">Blog</Link>
                            <Link href="#">Careers</Link>
                            <Link href="#">Contact</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© 2025 AthleteConnect. All rights reserved.</p>
                    <p className={styles.madeWith}>
                        Made with <Heart size={12} className={styles.heart} /> during Code till Sehri
                    </p>
                </div>
            </div>
        </footer>
    );
}
