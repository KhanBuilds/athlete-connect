import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TSDB_BASE = "https://www.thesportsdb.com/api/v1/json/3";

function calcAge(dateStr: string | null): number | null {
    if (!dateStr) return null;
    const born = new Date(dateStr);
    const now = new Date();
    let age = now.getFullYear() - born.getFullYear();
    if (now.getMonth() < born.getMonth() || (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())) age--;
    return age;
}

export async function POST(request: Request) {
    const body = await request.json();
    const { name } = body;

    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const searchName = name.replace(/\s+/g, "_");

    // Search TheSportsDB
    const searchRes = await fetch(`${TSDB_BASE}/searchplayers.php?p=${searchName}`);
    const searchData = await searchRes.json();

    if (!searchData.player || searchData.player.length === 0) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const playerId = searchData.player[0].idPlayer;

    // Check if already imported
    const existing = await prisma.athlete.findFirst({
        where: { externalId: playerId },
    });
    if (existing) {
        return NextResponse.json({ message: "Already imported", athlete: existing });
    }

    // Get full details
    const detailRes = await fetch(`${TSDB_BASE}/lookupplayer.php?id=${playerId}`);
    const detailData = await detailRes.json();
    const p = detailData.players[0];

    // Get former teams
    const teamsRes = await fetch(`${TSDB_BASE}/lookupformerteams.php?id=${playerId}`);
    const teamsData = await teamsRes.json();
    const formerTeams = teamsData.formerteams || [];

    // Get honours
    const honoursRes = await fetch(`${TSDB_BASE}/lookuphonours.php?id=${playerId}`);
    const honoursData = await honoursRes.json();
    const honours = honoursData.honours || [];

    const birthParts = (p.strBirthLocation || "").split(",");

    const athlete = await prisma.athlete.create({
        data: {
            externalId: playerId,
            name: p.strPlayer,
            sport: p.strSport === "Soccer" ? "Football" : (p.strSport || "Football"),
            position: p.strPosition || "Forward",
            team: p.strTeam,
            nationality: p.strNationality,
            city: birthParts[0]?.trim() || null,
            country: p.strNationality,
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
        },
    });

    // Add career events
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

    // Add achievements (max 15)
    const seen = new Set<string>();
    let count = 0;
    for (const h of honours) {
        const key = `${h.strHonour}-${h.strSeason}`;
        if (seen.has(key) || count >= 15) continue;
        seen.add(key);
        count++;
        await prisma.achievement.create({
            data: {
                athleteId: athlete.id,
                title: h.strHonour,
                season: h.strSeason,
                teamBadge: h.strTeamBadge,
                logoUrl: h.strHonourLogo,
                trophyUrl: h.strHonourTrophy,
            },
        });
    }

    // Add stats
    const stats = [
        { label: "Status", value: p.strStatus || "Active", trend: "neutral" },
        { label: "Shirt Number", value: p.strNumber || "N/A", trend: "neutral" },
        { label: "Position", value: p.strPosition || "Forward", trend: "neutral" },
        { label: "Preferred Foot", value: p.strSide || "Both", trend: "neutral" },
        { label: "Signing Fee", value: p.strSigning || "N/A", trend: "up" },
        { label: "Agent", value: p.strAgent || "N/A", trend: "neutral" },
    ];

    for (const stat of stats) {
        await prisma.stat.create({
            data: { athleteId: athlete.id, ...stat },
        });
    }

    return NextResponse.json({ message: "Imported", athlete }, { status: 201 });
}
