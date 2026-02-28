"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Users, Building2, Trophy, BarChart3 } from "lucide-react";
import styles from "./HeroSection.module.css";

const stats = [
    { value: "2,500+", label: "Athletes", icon: Users },
    { value: "120+", label: "Clubs & Scouts", icon: Building2 },
    { value: "8", label: "Sports", icon: Trophy },
    { value: "15K+", label: "Profile Views", icon: BarChart3 },
];

interface HeroPlayer {
    id: number;
    name: string;
    position: string;
    team: string | null;
    nationality: string | null;
    sport: string;
    thumbUrl: string | null;
    stats: { label: string; value: string }[];
}

export default function HeroSection() {
    const [player, setPlayer] = useState<HeroPlayer | null>(null);

    useEffect(() => {
        fetch("/api/athletes")
            .then((r) => r.json())
            .then((data: HeroPlayer[]) => {
                if (data.length > 0) setPlayer(data[0]);
            })
            .catch(() => { });
    }, []);

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroInner}`}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        The professional network for athletes
                    </h1>
                    <p className={styles.heroDesc}>
                        Create your athlete profile, showcase your stats and match footage,
                        build your career timeline — and connect with clubs, scouts, and
                        sponsors looking for talent like you.
                    </p>

                    <div className={styles.heroCta}>
                        <Link href="/signup" className="btn btn-primary btn-lg">
                            Join now — it&apos;s free
                            <ArrowRight size={16} />
                        </Link>
                        <Link href="/explore" className="btn btn-outline btn-lg">
                            Browse athletes
                        </Link>
                    </div>
                </div>

                <div className={styles.heroRight}>
                    {player && (
                        <Link href={`/profile/${player.id}`} className={styles.previewCard}>
                            <div className={styles.previewHeader}>
                                {player.thumbUrl ? (
                                    <img src={player.thumbUrl} alt={player.name} className={styles.previewImg} />
                                ) : (
                                    <div className={styles.previewAvatar}>
                                        {player.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                )}
                                <div>
                                    <h3 className={styles.previewName}>{player.name}</h3>
                                    <p className={styles.previewRole}>{player.position} at {player.team}</p>
                                    <p className={styles.previewMeta}>{player.nationality} · {player.sport}</p>
                                </div>
                            </div>
                            <div className={styles.previewStats}>
                                {player.stats.slice(0, 3).map((s, i) => (
                                    <div key={i} className={styles.pStat}>
                                        <span className={styles.pStatVal}>{s.value}</span>
                                        <span className={styles.pStatLbl}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.previewBtnRow}>
                                <span className={styles.previewBtn}>Contact</span>
                                <span className={styles.previewBtnOutline}>View Profile</span>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            {/* Stats strip */}
            <div className={styles.statsStrip}>
                <div className={`container ${styles.statsInner}`}>
                    {stats.map((s, i) => (
                        <div key={i} className={styles.statItem}>
                            <s.icon size={18} className={styles.statIcon} />
                            <span className={styles.statValue}>{s.value}</span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
