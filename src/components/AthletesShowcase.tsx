"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";
import styles from "./AthletesShowcase.module.css";

interface ShowcaseAthlete {
    id: number;
    name: string;
    sport: string;
    position: string;
    team: string | null;
    nationality: string | null;
    verified: boolean;
    thumbUrl: string | null;
    stats: { label: string; value: string; unit: string | null }[];
}

export default function AthletesShowcase() {
    const [athletes, setAthletes] = useState<ShowcaseAthlete[]>([]);

    useEffect(() => {
        fetch("/api/athletes")
            .then((r) => r.json())
            .then((data: ShowcaseAthlete[]) => setAthletes(data.slice(0, 4)))
            .catch(() => { });
    }, []);

    if (athletes.length === 0) return null;

    return (
        <section className={styles.showcase}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Athletes on AthleteConnect</h2>
                    <Link href="/explore" className={styles.seeAll}>
                        See all athletes <ArrowRight size={14} />
                    </Link>
                </div>

                <div className={styles.grid}>
                    {athletes.map((athlete) => (
                        <Link
                            key={athlete.id}
                            href={`/profile/${athlete.id}`}
                            className={styles.card}
                        >
                            <div className={styles.cardHeader}>
                                {athlete.thumbUrl ? (
                                    <img src={athlete.thumbUrl} alt={athlete.name} className={styles.avatarImg} />
                                ) : (
                                    <div className={styles.avatar}>
                                        {athlete.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                )}
                                <div className={styles.info}>
                                    <div className={styles.nameRow}>
                                        <h3>{athlete.name}</h3>
                                        {athlete.verified && (
                                            <CheckCircle size={14} className={styles.verified} />
                                        )}
                                    </div>
                                    <p className={styles.role}>
                                        {athlete.position} · {athlete.team || athlete.sport}
                                    </p>
                                    <p className={styles.location}>
                                        <MapPin size={11} /> {athlete.nationality || "Unknown"}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.statsRow}>
                                {athlete.stats.slice(0, 3).map((stat, i) => (
                                    <div key={i} className={styles.stat}>
                                        <span className={styles.statVal}>{stat.value}{stat.unit || ""}</span>
                                        <span className={styles.statLbl}>{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.sportTag}>
                                {athlete.sport}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
