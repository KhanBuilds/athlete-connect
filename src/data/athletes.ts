export interface Athlete {
    id: number;
    name: string;
    sport: string;
    position: string;
    age: number;
    country: string;
    city: string;
    avatar: string;
    coverImage: string;
    bio: string;
    verified: boolean;
    stats: Stat[];
    career: CareerEvent[];
    achievements: string[];
    highlights: VideoHighlight[];
    socialLinks: { platform: string; url: string }[];
}

export interface Stat {
    label: string;
    value: string | number;
    unit?: string;
    trend?: "up" | "down" | "neutral";
}

export interface CareerEvent {
    year: number;
    title: string;
    organization: string;
    description: string;
    type: "club" | "national" | "award" | "milestone";
}

export interface VideoHighlight {
    id: number;
    title: string;
    thumbnail: string;
    duration: string;
    views: number;
    date: string;
}

export const sports = [
    "Football",
    "Basketball",
    "Cricket",
    "Tennis",
    "Swimming",
    "Athletics",
    "Boxing",
    "MMA",
];

export const athletes: Athlete[] = [
    {
        id: 1,
        name: "Ahmad Raza",
        sport: "Football",
        position: "Striker",
        age: 23,
        country: "Pakistan",
        city: "Lahore",
        avatar: "",
        coverImage: "",
        bio: "Professional striker with 5+ years of experience in domestic football leagues. Known for explosive speed and clinical finishing. Currently looking for international opportunities to showcase skills at a higher level.",
        verified: true,
        stats: [
            { label: "Goals", value: 47, trend: "up" },
            { label: "Assists", value: 21, trend: "up" },
            { label: "Matches", value: 89, trend: "neutral" },
            { label: "Pass Accuracy", value: "82%", trend: "up" },
            { label: "Sprint Speed", value: "34.2", unit: "km/h", trend: "neutral" },
            { label: "Rating", value: "8.4", unit: "/10", trend: "up" },
        ],
        career: [
            { year: 2024, title: "First Team Player", organization: "Lahore FC", description: "Promoted to first team after outstanding season in reserves", type: "club" },
            { year: 2023, title: "National Team Call-up", organization: "Pakistan National Team", description: "Selected for SAFF Championship squad", type: "national" },
            { year: 2023, title: "Golden Boot Award", organization: "Pakistan Premier League", description: "Top scorer with 18 goals in the season", type: "award" },
            { year: 2022, title: "Youth Development", organization: "Lahore FC Academy", description: "Completed professional youth development program", type: "club" },
            { year: 2021, title: "100th Career Goal", organization: "All Competitions", description: "Reached milestone of 100 career goals across all competitions", type: "milestone" },
        ],
        achievements: [
            "PPL Golden Boot 2023",
            "National Team Cap",
            "Best Young Player 2022",
            "Academy Graduate of the Year",
        ],
        highlights: [
            { id: 1, title: "Hat-trick vs Karachi United", thumbnail: "", duration: "3:24", views: 12400, date: "2024-01-15" },
            { id: 2, title: "Season Highlights 2023", thumbnail: "", duration: "8:12", views: 34200, date: "2023-12-01" },
            { id: 3, title: "Free Kick Compilation", thumbnail: "", duration: "5:45", views: 8900, date: "2023-10-20" },
        ],
        socialLinks: [
            { platform: "instagram", url: "#" },
            { platform: "twitter", url: "#" },
        ],
    },
    {
        id: 2,
        name: "Sarah Khan",
        sport: "Cricket",
        position: "All-rounder",
        age: 25,
        country: "Pakistan",
        city: "Karachi",
        avatar: "",
        coverImage: "",
        bio: "Dynamic all-rounder representing Pakistan Women's cricket. Consistent performer with both bat and ball, known for match-winning performances under pressure.",
        verified: true,
        stats: [
            { label: "Runs", value: 2340, trend: "up" },
            { label: "Wickets", value: 67, trend: "up" },
            { label: "Matches", value: 52, trend: "neutral" },
            { label: "Batting Avg", value: "38.2", trend: "up" },
            { label: "Bowling Avg", value: "24.1", trend: "up" },
            { label: "Centuries", value: 4, trend: "neutral" },
        ],
        career: [
            { year: 2024, title: "Vice Captain", organization: "Pakistan Women", description: "Appointed vice captain for World Cup campaign", type: "national" },
            { year: 2023, title: "Player of the Tournament", organization: "Asia Cup", description: "Scored 3 half-centuries and took 8 wickets", type: "award" },
            { year: 2022, title: "Domestic Champion", organization: "Karachi Queens", description: "Led team to national championship title", type: "club" },
            { year: 2021, title: "International Debut", organization: "Pakistan Women", description: "Made debut vs Sri Lanka in ODI series", type: "national" },
        ],
        achievements: [
            "Asia Cup Player of Tournament",
            "National Championship Winner",
            "50 International Wickets",
            "Fastest Century in Domestic Cricket",
        ],
        highlights: [
            { id: 4, title: "Match-winning century vs India", thumbnail: "", duration: "6:30", views: 56000, date: "2024-02-10" },
            { id: 5, title: "5-wicket haul vs Bangladesh", thumbnail: "", duration: "4:15", views: 23000, date: "2023-11-15" },
        ],
        socialLinks: [
            { platform: "instagram", url: "#" },
            { platform: "twitter", url: "#" },
        ],
    },
    {
        id: 3,
        name: "Bilal Hussain",
        sport: "Basketball",
        position: "Point Guard",
        age: 21,
        country: "Pakistan",
        city: "Islamabad",
        avatar: "",
        coverImage: "",
        bio: "Emerging point guard with exceptional court vision and leadership. Captain of the university team and aspiring to take Pakistani basketball to international heights.",
        verified: false,
        stats: [
            { label: "Points/Game", value: "22.4", trend: "up" },
            { label: "Assists/Game", value: "8.7", trend: "up" },
            { label: "Rebounds", value: "4.2", trend: "neutral" },
            { label: "3PT %", value: "41%", trend: "up" },
            { label: "FT %", value: "88%", trend: "neutral" },
            { label: "Steals", value: "2.1", trend: "up" },
        ],
        career: [
            { year: 2024, title: "University Captain", organization: "NUST Ballers", description: "Elected captain for the 2024 season", type: "club" },
            { year: 2023, title: "Championship MVP", organization: "HEC Basketball", description: "Named most valuable player in national university championship", type: "award" },
            { year: 2023, title: "Selected for Camp", organization: "Pakistan Basketball", description: "Invited to national team training camp", type: "national" },
            { year: 2022, title: "Joined Program", organization: "NUST Basketball", description: "Received athletic scholarship for basketball", type: "club" },
        ],
        achievements: [
            "HEC Championship MVP",
            "National Camp Selection",
            "University Scoring Record",
            "All-Star Team Selection",
        ],
        highlights: [
            { id: 6, title: "40-point game vs LUMS", thumbnail: "", duration: "7:20", views: 5400, date: "2024-03-01" },
        ],
        socialLinks: [
            { platform: "instagram", url: "#" },
        ],
    },
    {
        id: 4,
        name: "Fatima Noor",
        sport: "Tennis",
        position: "Singles",
        age: 19,
        country: "Pakistan",
        city: "Lahore",
        avatar: "",
        coverImage: "",
        bio: "Rising tennis star, ranked #1 in Pakistan juniors. Trained at international academies with a powerful serve and aggressive baseline game.",
        verified: true,
        stats: [
            { label: "ITF Ranking", value: "#482", trend: "up" },
            { label: "Win Rate", value: "73%", trend: "up" },
            { label: "Aces/Match", value: "6.3", trend: "up" },
            { label: "Titles", value: 8, trend: "neutral" },
            { label: "Matches Won", value: 124, trend: "up" },
            { label: "Serve Speed", value: "178", unit: "km/h", trend: "neutral" },
        ],
        career: [
            { year: 2024, title: "ITF 15K Champion", organization: "ITF Circuit", description: "Won first ITF professional title", type: "award" },
            { year: 2023, title: "National Champion", organization: "Pakistan Tennis", description: "Won national singles championship (U-19)", type: "national" },
            { year: 2023, title: "Training Program", organization: "Dubai Tennis Academy", description: "6-month intensive training at international academy", type: "club" },
            { year: 2022, title: "South Asian Games", organization: "Team Pakistan", description: "Represented Pakistan, reached quarterfinals", type: "national" },
        ],
        achievements: [
            "ITF 15K Champion",
            "National Singles Champion",
            "South Asian Games Representative",
            "Junior #1 Ranking",
        ],
        highlights: [
            { id: 7, title: "Championship Final Set", thumbnail: "", duration: "5:10", views: 8700, date: "2024-01-20" },
            { id: 8, title: "Best Rallies 2023", thumbnail: "", duration: "3:45", views: 4200, date: "2023-12-15" },
        ],
        socialLinks: [
            { platform: "instagram", url: "#" },
            { platform: "twitter", url: "#" },
        ],
    },
    {
        id: 5,
        name: "Hassan Ali Shahzad",
        sport: "Swimming",
        position: "Freestyle / Butterfly",
        age: 22,
        country: "Pakistan",
        city: "Rawalpindi",
        avatar: "",
        coverImage: "",
        bio: "National record holder in 100m freestyle. Training for Olympic qualifiers with a dream to represent Pakistan on the biggest stage in swimming.",
        verified: true,
        stats: [
            { label: "100m Free", value: "50.2", unit: "sec", trend: "up" },
            { label: "200m Fly", value: "2:02", unit: "min", trend: "up" },
            { label: "National Records", value: 3, trend: "neutral" },
            { label: "Gold Medals", value: 14, trend: "up" },
            { label: "Competitions", value: 38, trend: "neutral" },
            { label: "National Rank", value: "#1", trend: "neutral" },
        ],
        career: [
            { year: 2024, title: "Olympic Qualifier Attempt", organization: "World Aquatics", description: "Competing in qualifiers for 2024 Paris Olympics", type: "milestone" },
            { year: 2023, title: "National Record", organization: "Pakistan Swimming", description: "Set new national record in 100m freestyle: 50.2s", type: "award" },
            { year: 2023, title: "Asian Games", organization: "Team Pakistan", description: "Represented Pakistan at Asian Games in Hangzhou", type: "national" },
            { year: 2022, title: "SAF Games Gold", organization: "South Asian Federation", description: "Won gold medal in 100m freestyle", type: "award" },
        ],
        achievements: [
            "National Record Holder (100m Free)",
            "Asian Games Representative",
            "SAF Games Gold Medalist",
            "14x National Gold Medalist",
        ],
        highlights: [
            { id: 9, title: "National Record Breaking Swim", thumbnail: "", duration: "2:30", views: 15600, date: "2023-09-15" },
        ],
        socialLinks: [
            { platform: "instagram", url: "#" },
        ],
    },
    {
        id: 6,
        name: "Ayesha Malik",
        sport: "Athletics",
        position: "Sprinter (100m / 200m)",
        age: 20,
        country: "Pakistan",
        city: "Faisalabad",
        avatar: "",
        coverImage: "",
        bio: "Pakistan's fastest woman. Setting new benchmarks in South Asian sprinting with consistent improvement. Focused on qualifying for international championships.",
        verified: false,
        stats: [
            { label: "100m PB", value: "11.8", unit: "sec", trend: "up" },
            { label: "200m PB", value: "24.1", unit: "sec", trend: "up" },
            { label: "Medals", value: 11, trend: "up" },
            { label: "Competitions", value: 29, trend: "neutral" },
            { label: "National Rank", value: "#1", trend: "neutral" },
            { label: "Wind Sprint", value: "36.5", unit: "km/h", trend: "up" },
        ],
        career: [
            { year: 2024, title: "National Champion", organization: "Pakistan Athletics", description: "Won 100m and 200m at National Championships", type: "award" },
            { year: 2023, title: "Islamic Solidarity Games", organization: "Team Pakistan", description: "Semifinalist in 100m sprint", type: "national" },
            { year: 2023, title: "Personal Best", organization: "National Meet", description: "Set PB of 11.8s in 100m at national meet", type: "milestone" },
            { year: 2022, title: "Rising Star Award", organization: "Pakistan Olympics Association", description: "Awarded Rising Star in Athletics", type: "award" },
        ],
        achievements: [
            "Double National Champion (100m/200m)",
            "ISG Semifinalist",
            "Rising Star Award 2022",
            "U-20 National Record Holder",
        ],
        highlights: [
            { id: 10, title: "100m National Championship Final", thumbnail: "", duration: "1:45", views: 9200, date: "2024-02-28" },
        ],
        socialLinks: [
            { platform: "instagram", url: "#" },
        ],
    },
];

export function getAthleteById(id: number): Athlete | undefined {
    return athletes.find((a) => a.id === id);
}

export function getAthletesBySport(sport: string): Athlete[] {
    return athletes.filter((a) => a.sport.toLowerCase() === sport.toLowerCase());
}

export function searchAthletes(query: string): Athlete[] {
    const q = query.toLowerCase();
    return athletes.filter(
        (a) =>
            a.name.toLowerCase().includes(q) ||
            a.sport.toLowerCase().includes(q) ||
            a.position.toLowerCase().includes(q) ||
            a.city.toLowerCase().includes(q) ||
            a.country.toLowerCase().includes(q)
    );
}

export const sportColors: Record<string, string> = {
    Football: "var(--sport-football)",
    Basketball: "var(--sport-basketball)",
    Cricket: "var(--sport-cricket)",
    Tennis: "var(--sport-tennis)",
    Swimming: "var(--sport-swimming)",
    Athletics: "var(--sport-athletics)",
};

export const sportEmojis: Record<string, string> = {
    Football: "⚽",
    Basketball: "🏀",
    Cricket: "🏏",
    Tennis: "🎾",
    Swimming: "🏊",
    Athletics: "🏃",
    Boxing: "🥊",
    MMA: "🥋",
};
