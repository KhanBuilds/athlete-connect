"use client";

import { BarChart3, Video, Globe, Shield, Users, Calendar } from "lucide-react";
import styles from "./FeaturesSection.module.css";

const features = [
    {
        icon: BarChart3,
        title: "Stats Dashboard",
        desc: "Track and display your performance metrics with detailed breakdowns that clubs and scouts can review.",
    },
    {
        icon: Video,
        title: "Match Footage",
        desc: "Upload game highlights and training clips so scouts can evaluate your skills firsthand.",
    },
    {
        icon: Globe,
        title: "Global Visibility",
        desc: "Get discovered by clubs and sponsors from around the world, beyond your local league.",
    },
    {
        icon: Shield,
        title: "Verified Profiles",
        desc: "Earn verification by connecting with registered clubs and federations for credibility.",
    },
    {
        icon: Users,
        title: "Club & Sponsor Access",
        desc: "Organizations can browse, filter, and shortlist athletes that match their recruitment criteria.",
    },
    {
        icon: Calendar,
        title: "Career Timeline",
        desc: "Build a structured career history showing your progression, transfers, and milestones.",
    },
];

export default function FeaturesSection() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Built for athletes who want to go further
                    </h2>
                    <p className={styles.subtitle}>
                        Everything you need to build a professional sports profile and get noticed.
                    </p>
                </div>

                <div className={styles.grid}>
                    {features.map((f, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.cardIcon}>
                                <f.icon size={20} />
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>{f.title}</h3>
                                <p className={styles.cardDesc}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
