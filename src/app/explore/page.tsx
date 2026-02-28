"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Search,
    MapPin,
    CheckCircle,
    ArrowRight,
    X,
    Plus,
    Loader2,
} from "lucide-react";
import Footer from "@/components/Footer";
import styles from "./explore.module.css";

interface AthleteRow {
    id: number;
    name: string;
    sport: string;
    position: string;
    team: string | null;
    nationality: string | null;
    city: string | null;
    country: string | null;
    bio: string | null;
    verified: boolean;
    thumbUrl: string | null;
    cutoutUrl: string | null;
    stats: { label: string; value: string; unit: string | null }[];
}

const SPORTS = ["Football", "Cricket", "Basketball", "Tennis", "Swimming", "Athletics"];

export default function ExplorePage() {
    const [athletes, setAthletes] = useState<AthleteRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSport, setSelectedSport] = useState<string | null>(null);
    const [importName, setImportName] = useState("");
    const [importing, setImporting] = useState(false);
    const [importMsg, setImportMsg] = useState("");

    const fetchAthletes = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("q", searchQuery);
        if (selectedSport) params.set("sport", selectedSport);
        const res = await fetch(`/api/athletes?${params}`);
        const data = await res.json();
        setAthletes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAthletes();
    }, [selectedSport]);

    useEffect(() => {
        const timer = setTimeout(fetchAthletes, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleImport = async () => {
        if (!importName.trim()) return;
        setImporting(true);
        setImportMsg("");
        try {
            const res = await fetch("/api/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: importName }),
            });
            const data = await res.json();
            if (res.ok) {
                setImportMsg(`✅ ${data.message}: ${data.athlete?.name}`);
                setImportName("");
                fetchAthletes();
            } else {
                setImportMsg(`❌ ${data.error}`);
            }
        } catch {
            setImportMsg("❌ Failed to import");
        }
        setImporting(false);
    };

    const sportCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        athletes.forEach((a) => {
            counts[a.sport] = (counts[a.sport] || 0) + 1;
        });
        return counts;
    }, [athletes]);

    return (
        <>
            <div className={styles.page}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarCard}>
                        <h3>Filter by Sport</h3>
                        <button
                            className={`${styles.filterItem} ${!selectedSport ? styles.activeFilter : ""}`}
                            onClick={() => setSelectedSport(null)}
                        >
                            All Sports
                            <span className={styles.filterCount}>{athletes.length}</span>
                        </button>
                        {SPORTS.map((sport) => {
                            const count = sportCounts[sport] || 0;
                            return (
                                <button
                                    key={sport}
                                    className={`${styles.filterItem} ${selectedSport === sport ? styles.activeFilter : ""}`}
                                    onClick={() => setSelectedSport(selectedSport === sport ? null : sport)}
                                >
                                    {sport}
                                    <span className={styles.filterCount}>{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Import from TheSportsDB */}
                    <div className={styles.sidebarCard}>
                        <h3>Import Player</h3>
                        <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-tertiary)", marginBottom: 8 }}>
                            Search any footballer on TheSportsDB
                        </p>
                        <div className={styles.importRow}>
                            <input
                                type="text"
                                value={importName}
                                onChange={(e) => setImportName(e.target.value)}
                                placeholder="e.g. Neymar"
                                className={styles.importInput}
                                onKeyDown={(e) => e.key === "Enter" && handleImport()}
                            />
                            <button
                                onClick={handleImport}
                                disabled={importing}
                                className={styles.importBtn}
                            >
                                {importing ? <Loader2 size={14} className={styles.spin} /> : <Plus size={14} />}
                            </button>
                        </div>
                        {importMsg && <p className={styles.importMsg}>{importMsg}</p>}
                    </div>
                </div>

                <div className={styles.main}>
                    <div className={styles.searchBox}>
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by name, sport, position, or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className={styles.clearBtn}>
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className={styles.resultsInfo}>
                        {loading ? "Loading..." : `${athletes.length} result${athletes.length !== 1 ? "s" : ""}`}
                    </div>

                    {!loading && athletes.length > 0 ? (
                        <div className={styles.list}>
                            {athletes.map((athlete) => (
                                <Link
                                    key={athlete.id}
                                    href={`/profile/${athlete.id}`}
                                    className={styles.card}
                                >
                                    {athlete.thumbUrl ? (
                                        <img
                                            src={athlete.thumbUrl}
                                            alt={athlete.name}
                                            className={styles.avatarImg}
                                        />
                                    ) : (
                                        <div className={styles.avatar}>
                                            {athlete.name.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                    )}
                                    <div className={styles.cardBody}>
                                        <div className={styles.nameRow}>
                                            <h3>{athlete.name}</h3>
                                            {athlete.verified && <CheckCircle size={14} className={styles.verified} />}
                                        </div>
                                        <p className={styles.role}>{athlete.position} · {athlete.team || athlete.sport}</p>
                                        <p className={styles.location}>
                                            <MapPin size={11} /> {athlete.nationality || athlete.country || "Unknown"}
                                        </p>
                                        <p className={styles.bio}>{athlete.bio?.slice(0, 140)}...</p>
                                        <div className={styles.statsInline}>
                                            {athlete.stats.slice(0, 3).map((stat, i) => (
                                                <span key={i} className={styles.statInline}>
                                                    <strong>{stat.value}{stat.unit || ""}</strong> {stat.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.cardAction}>
                                        <span className={styles.viewLink}>View Profile <ArrowRight size={13} /></span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : !loading ? (
                        <div className={styles.empty}>
                            <Search size={36} />
                            <h3>No athletes found</h3>
                            <p>Try adjusting your search or import a player from TheSportsDB.</p>
                        </div>
                    ) : null}
                </div>
            </div>
            <Footer />
        </>
    );
}
