"use client";

import { useState, useEffect } from "react";
import {
    MapPin,
    CheckCircle,
    TrendingUp,
    TrendingDown,
    Minus,
    Trophy,
    Calendar,
    Play,
    Eye,
    Award,
    Building,
    Flag,
    Star,
    Share2,
    MessageCircle,
    Globe,
    Loader2,
} from "lucide-react";
import Footer from "@/components/Footer";
import styles from "./profile.module.css";

type Tab = "stats" | "timeline" | "achievements" | "about";

interface AthleteData {
    id: number;
    name: string;
    sport: string;
    position: string;
    team: string | null;
    nationality: string | null;
    city: string | null;
    country: string | null;
    age: number | null;
    bio: string | null;
    height: string | null;
    weight: string | null;
    birthPlace: string | null;
    birthDate: string | null;
    verified: boolean;
    thumbUrl: string | null;
    cutoutUrl: string | null;
    bannerUrl: string | null;
    fanartUrl: string | null;
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    website: string | null;
    stats: { id: number; label: string; value: string; unit: string | null; trend: string | null }[];
    career: { id: number; year: string; title: string; organization: string | null; description: string | null; type: string; badgeUrl: string | null; moveType: string | null }[];
    achievements: { id: number; title: string; season: string | null; teamBadge: string | null; logoUrl: string | null; trophyUrl: string | null }[];
    highlights: { id: number; title: string; url: string | null; duration: string | null; views: number; date: string | null }[];
}

export default function ProfileContent({ athleteId }: { athleteId: string }) {
    const [athlete, setAthlete] = useState<AthleteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>("stats");

    useEffect(() => {
        fetch(`/api/athletes/${athleteId}`)
            .then((res) => res.json())
            .then((data) => {
                setAthlete(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [athleteId]);

    if (loading) {
        return (
            <div className={styles.loading}>
                <Loader2 size={32} className={styles.spinner} />
                <p>Loading profile...</p>
            </div>
        );
    }

    if (!athlete) {
        return (
            <div className={styles.loading}>
                <p>Athlete not found.</p>
            </div>
        );
    }

    const initials = athlete.name.split(" ").map((n) => n[0]).join("");

    const trendIcon = (trend?: string | null) => {
        if (trend === "up") return <TrendingUp size={13} className={styles.trendUp} />;
        if (trend === "down") return <TrendingDown size={13} className={styles.trendDown} />;
        return <Minus size={13} className={styles.trendNeutral} />;
    };

    const typeIcon = (type: string) => {
        switch (type) {
            case "club": return <Building size={14} />;
            case "national": return <Flag size={14} />;
            case "award": return <Award size={14} />;
            case "milestone": return <Star size={14} />;
            default: return <Calendar size={14} />;
        }
    };

    return (
        <>
            <div className={styles.page}>
                <div className="container">
                    <div className={styles.layout}>
                        {/* Left column - Main */}
                        <div className={styles.mainCol}>
                            {/* Profile Card */}
                            <div className={styles.profileCard}>
                                {athlete.bannerUrl ? (
                                    <img src={athlete.bannerUrl} alt="" className={styles.coverImg} />
                                ) : (
                                    <div className={styles.coverBar} />
                                )}
                                <div className={styles.profileInfo}>
                                    {athlete.thumbUrl ? (
                                        <img src={athlete.thumbUrl} alt={athlete.name} className={styles.avatarImg} />
                                    ) : (
                                        <div className={styles.avatarLg}>{initials}</div>
                                    )}
                                    <div className={styles.profileDetails}>
                                        <div className={styles.nameRow}>
                                            <h1>{athlete.name}</h1>
                                            {athlete.verified && <CheckCircle size={18} className={styles.verifiedIcon} />}
                                        </div>
                                        <p className={styles.headline}>
                                            {athlete.position} · {athlete.sport} {athlete.team ? `at ${athlete.team}` : ""}
                                        </p>
                                        <p className={styles.locationText}>
                                            <MapPin size={13} /> {athlete.nationality || athlete.country || "Unknown"}
                                            {athlete.age ? ` · Age ${athlete.age}` : ""}
                                            {athlete.height ? ` · ${athlete.height}` : ""}
                                        </p>
                                        <div className={styles.actions}>
                                            <button className="btn btn-primary">
                                                <MessageCircle size={14} /> Contact
                                            </button>
                                            <button className="btn btn-outline">
                                                <Share2 size={14} /> Share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className={styles.tabBar}>
                                {(["stats", "timeline", "achievements", "about"] as Tab[]).map((tab) => (
                                    <button
                                        key={tab}
                                        className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {/* Stats Tab */}
                            {activeTab === "stats" && (
                                <div className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Player Info</h2>
                                    <div className={styles.statsGrid}>
                                        {athlete.stats.map((stat) => (
                                            <div key={stat.id} className={styles.statCard}>
                                                <div className={styles.statHeader}>
                                                    <span className={styles.statLabel}>{stat.label}</span>
                                                    {trendIcon(stat.trend)}
                                                </div>
                                                <div className={styles.statValue}>
                                                    {stat.value}
                                                    {stat.unit && <span className={styles.statUnit}>{stat.unit}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Timeline Tab */}
                            {activeTab === "timeline" && (
                                <div className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Career Timeline</h2>
                                    <div className={styles.timeline}>
                                        {athlete.career.map((event) => (
                                            <div key={event.id} className={styles.timelineItem}>
                                                {event.badgeUrl ? (
                                                    <img src={event.badgeUrl} alt="" className={styles.timelineBadge} />
                                                ) : (
                                                    <div className={styles.timelineDot}>
                                                        {typeIcon(event.type)}
                                                    </div>
                                                )}
                                                <div className={styles.timelineContent}>
                                                    <span className={styles.timelineYear}>{event.year}</span>
                                                    <h4>{event.title}</h4>
                                                    {event.organization && <p className={styles.timelineOrg}>{event.organization}</p>}
                                                    {event.description && <p className={styles.timelineDesc}>{event.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements Tab */}
                            {activeTab === "achievements" && (
                                <div className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Honours & Achievements</h2>
                                    <div className={styles.achievementsGrid}>
                                        {athlete.achievements.map((a) => (
                                            <div key={a.id} className={styles.achievementCard}>
                                                {a.trophyUrl && (
                                                    <img src={a.trophyUrl} alt="" className={styles.trophyImg} />
                                                )}
                                                <div>
                                                    <h4>{a.title}</h4>
                                                    <p className={styles.achieveSeason}>{a.season}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* About Tab */}
                            {activeTab === "about" && (
                                <div className={styles.section}>
                                    <h2 className={styles.sectionTitle}>About</h2>
                                    <p className={styles.bioText}>{athlete.bio}</p>
                                    <div className={styles.detailsGrid}>
                                        {athlete.sport && (
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailLabel}>Sport</span>
                                                <span>{athlete.sport}</span>
                                            </div>
                                        )}
                                        {athlete.position && (
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailLabel}>Position</span>
                                                <span>{athlete.position}</span>
                                            </div>
                                        )}
                                        {athlete.nationality && (
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailLabel}>Nationality</span>
                                                <span>{athlete.nationality}</span>
                                            </div>
                                        )}
                                        {athlete.birthPlace && (
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailLabel}>Birth Place</span>
                                                <span>{athlete.birthPlace}</span>
                                            </div>
                                        )}
                                        {athlete.height && (
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailLabel}>Height</span>
                                                <span>{athlete.height}</span>
                                            </div>
                                        )}
                                        {athlete.weight && (
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailLabel}>Weight</span>
                                                <span>{athlete.weight}</span>
                                            </div>
                                        )}
                                    </div>
                                    {(athlete.twitter || athlete.instagram || athlete.facebook) && (
                                        <div className={styles.socialLinks}>
                                            <h3>Social</h3>
                                            <div className={styles.socialRow}>
                                                {athlete.twitter && (
                                                    <a href={`https://${athlete.twitter}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                                        <Globe size={14} /> Twitter
                                                    </a>
                                                )}
                                                {athlete.instagram && (
                                                    <a href={`https://${athlete.instagram}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                                        <Globe size={14} /> Instagram
                                                    </a>
                                                )}
                                                {athlete.facebook && (
                                                    <a href={`https://${athlete.facebook}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                                        <Globe size={14} /> Facebook
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right column - Sidebar */}
                        <div className={styles.sideCol}>
                            {/* Quick stats */}
                            <div className={styles.sideCard}>
                                <h3>Quick Stats</h3>
                                {athlete.stats.map((stat) => (
                                    <div key={stat.id} className={styles.quickStat}>
                                        <span className={styles.qsLabel}>{stat.label}</span>
                                        <span className={styles.qsValue}>{stat.value}{stat.unit || ""}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Top Achievements */}
                            <div className={styles.sideCard}>
                                <h3>Top Honours</h3>
                                <div className={styles.achieveList}>
                                    {athlete.achievements.slice(0, 6).map((a) => (
                                        <div key={a.id} className={styles.achieveItem}>
                                            <Trophy size={14} className={styles.achieveIcon} />
                                            <div>
                                                <span>{a.title}</span>
                                                <span className={styles.achieveYear}>{a.season}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fanart */}
                            {athlete.fanartUrl && (
                                <div className={styles.sideCard}>
                                    <h3>Gallery</h3>
                                    <img src={athlete.fanartUrl} alt={athlete.name} className={styles.galleryImg} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
