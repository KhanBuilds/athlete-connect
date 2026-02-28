"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import styles from "./signup.module.css";

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<"athlete" | "club" | "sponsor">("athlete");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sport, setSport] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role, sport }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                setLoading(false);
                return;
            }

            setSuccess(true);
            // Redirect to their new profile if athlete 
            setTimeout(() => {
                if (data.user.athleteId) {
                    router.push(`/profile/${data.user.athleteId}`);
                } else {
                    router.push("/explore");
                }
            }, 1500);
        } catch {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.page}>
                <div className={styles.card}>
                    <div className={styles.successState}>
                        <CheckCircle size={48} className={styles.successIcon} />
                        <h2>Welcome to AthleteConnect!</h2>
                        <p>Your account has been created. Redirecting to your profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Join AthleteConnect</h1>
                    <p>Create your professional athlete profile.</p>
                </div>

                {/* Role Selection */}
                <div className={styles.roles}>
                    {(["athlete", "club", "sponsor"] as const).map((r) => (
                        <button
                            key={r}
                            className={`${styles.roleBtn} ${role === r ? styles.activeRole : ""}`}
                            onClick={() => setRole(r)}
                            type="button"
                        >
                            {r === "athlete" && "Athlete"}
                            {r === "club" && "Club / Scout"}
                            {r === "sponsor" && "Sponsor"}
                        </button>
                    ))}
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <div className={styles.inputWrap}>
                            <User size={15} className={styles.inputIcon} />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <div className={styles.inputWrap}>
                            <Mail size={15} className={styles.inputIcon} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div className={styles.inputWrap}>
                            <Lock size={15} className={styles.inputIcon} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                className={styles.eyeBtn}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                    </div>

                    {role === "athlete" && (
                        <div className={styles.inputGroup}>
                            <label>Sport</label>
                            <div className={styles.inputWrap}>
                                <select
                                    className={styles.input}
                                    value={sport}
                                    onChange={(e) => setSport(e.target.value)}
                                    style={{ paddingLeft: 12 }}
                                    required
                                >
                                    <option value="" disabled>Select your sport</option>
                                    <option>Football</option>
                                    <option>Cricket</option>
                                    <option>Basketball</option>
                                    <option>Tennis</option>
                                    <option>Swimming</option>
                                    <option>Athletics</option>
                                    <option>Boxing</option>
                                    <option>MMA</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {error && <p className={styles.errorMsg}>{error}</p>}

                    <button
                        type="submit"
                        className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={15} className={styles.spinner} />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Agree & Join
                                <ArrowRight size={15} />
                            </>
                        )}
                    </button>
                </form>

                <p className={styles.switchText}>
                    Already on AthleteConnect?{" "}
                    <Link href="#" className={styles.link}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}
