const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const TSDB_BASE = "https://www.thesportsdb.com/api/v1/json/3";

// Players to seed — name as used in TheSportsDB search
const PLAYERS = [
    "Mohamed_Salah",
    "Kylian_Mbappe",
    "Erling_Haaland",
    "Jude_Bellingham",
    "Lionel_Messi",
    "Cristiano_Ronaldo",
];

async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return res.json();
}

function calcAge(dateStr) {
    if (!dateStr) return null;
    const born = new Date(dateStr);
    const now = new Date();
    let age = now.getFullYear() - born.getFullYear();
    if (now.getMonth() < born.getMonth() || (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())) age--;
    return age;
}

async function seedPlayer(searchName) {
    console.log(`\n🔍 Searching: ${searchName}...`);

    // 1. Search player
    const searchData = await fetchJson(`${TSDB_BASE}/searchplayers.php?p=${searchName}`);
    if (!searchData.player || searchData.player.length === 0) {
        console.log(`  ❌ Not found: ${searchName}`);
        return;
    }
    const playerId = searchData.player[0].idPlayer;

    // 2. Get full player details
    const detailData = await fetchJson(`${TSDB_BASE}/lookupplayer.php?id=${playerId}`);
    const p = detailData.players[0];
    console.log(`  ✅ Found: ${p.strPlayer} (${p.strTeam})`);

    // 3. Get former teams
    const teamsData = await fetchJson(`${TSDB_BASE}/lookupformerteams.php?id=${playerId}`);
    const formerTeams = teamsData.formerteams || [];

    // 4. Get honours
    const honoursData = await fetchJson(`${TSDB_BASE}/lookuphonours.php?id=${playerId}`);
    const honours = honoursData.honours || [];

    // 5. Extract city from birth location
    const birthParts = (p.strBirthLocation || "").split(",");
    const city = birthParts[0]?.trim() || null;
    const country = p.strNationality || null;

    // 6. Create athlete in database
    const athlete = await prisma.athlete.upsert({
        where: { externalId: playerId },
        update: {},
        create: {
            externalId: playerId,
            name: p.strPlayer,
            sport: "Football",
            position: p.strPosition || "Forward",
            team: p.strTeam,
            nationality: p.strNationality,
            city: city,
            country: country,
            age: calcAge(p.dateBorn),
            bio: p.strDescriptionEN || `Professional footballer playing for ${p.strTeam}.`,
            height: p.strHeight,
            weight: p.strWeight,
            gender: p.strGender || "Male",
            birthDate: p.dateBorn,
            birthPlace: p.strBirthLocation,
            verified: true,
            thumbUrl: p.strThumb,
            cutoutUrl: p.strCutout,
            bannerUrl: p.strBanner,
            fanartUrl: p.strFanart1,
            facebook: p.strFacebook || null,
            twitter: p.strTwitter || null,
            instagram: p.strInstagram || null,
            website: p.strWebsite || null,
        },
    });

    console.log(`  📝 Athlete ID: ${athlete.id}`);

    // 7. Create career events from former teams
    for (const team of formerTeams) {
        await prisma.careerEvent.create({
            data: {
                athleteId: athlete.id,
                year: team.strJoined || "Unknown",
                title: `${team.strMoveType === "Youth" ? "Youth Academy" : team.strMoveType === "Loan" ? "Loan Move" : "Signed"} — ${team.strFormerTeam}`,
                organization: team.strFormerTeam,
                description: `${team.strMoveType} move. ${team.strJoined} - ${team.strDeparted}`,
                type: team.strMoveType === "Youth" ? "milestone" : "club",
                badgeUrl: team.strBadge,
                moveType: team.strMoveType,
            },
        });
    }
    console.log(`  🏟️  ${formerTeams.length} career events added`);

    // 8. Create achievements from honours
    const uniqueHonours = [];
    const seen = new Set();
    for (const h of honours) {
        const key = `${h.strHonour}-${h.strSeason}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueHonours.push(h);
        }
    }

    for (const honour of uniqueHonours.slice(0, 15)) {
        await prisma.achievement.create({
            data: {
                athleteId: athlete.id,
                title: honour.strHonour,
                season: honour.strSeason,
                teamBadge: honour.strTeamBadge,
                logoUrl: honour.strHonourLogo,
                trophyUrl: honour.strHonourTrophy,
            },
        });
    }
    console.log(`  🏆 ${Math.min(uniqueHonours.length, 15)} achievements added`);

    // 9. Add some generic stats (TheSportsDB doesn't have numerical stats for free)
    const genericStats = [
        { label: "Status", value: p.strStatus || "Active", trend: "neutral" },
        { label: "Shirt Number", value: p.strNumber || "N/A", trend: "neutral" },
        { label: "Position", value: p.strPosition || "Forward", trend: "neutral" },
        { label: "Preferred Foot", value: p.strSide || "Both", trend: "neutral" },
        { label: "Signing Fee", value: p.strSigning || "N/A", trend: "up" },
        { label: "Agent", value: p.strAgent || "N/A", trend: "neutral" },
    ];

    for (const stat of genericStats) {
        await prisma.stat.create({
            data: {
                athleteId: athlete.id,
                label: stat.label,
                value: stat.value,
                trend: stat.trend,
            },
        });
    }
    console.log(`  📊 ${genericStats.length} stats added`);
}

async function main() {
    console.log("🚀 Starting AthleteConnect seed...\n");
    console.log("━".repeat(40));

    // Clear existing data
    await prisma.highlight.deleteMany();
    await prisma.stat.deleteMany();
    await prisma.careerEvent.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.athlete.deleteMany();
    console.log("🗑️  Cleared existing data");

    // Seed each player
    for (const player of PLAYERS) {
        try {
            await seedPlayer(player);
        } catch (err) {
            console.error(`  ❌ Error seeding ${player}:`, err.message);
        }
    }

    const count = await prisma.athlete.count();
    console.log(`\n━${"━".repeat(39)}`);
    console.log(`✅ Seed complete! ${count} athletes in database.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
