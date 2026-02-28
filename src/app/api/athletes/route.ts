import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q") || "";
        const sport = searchParams.get("sport") || "";

        const where: Record<string, unknown> = {};

        if (q) {
            where.OR = [
                { name: { contains: q } },
                { sport: { contains: q } },
                { position: { contains: q } },
                { city: { contains: q } },
                { team: { contains: q } },
            ];
        }

        if (sport) {
            where.sport = sport;
        }

        const athletes = await prisma.athlete.findMany({
            where,
            include: {
                stats: true,
                achievements: { take: 3 },
            },
            orderBy: { name: "asc" },
        });

        return NextResponse.json(athletes);
    } catch (error) {
        console.error("GET /api/athletes error:", error);
        return NextResponse.json([], { status: 200 });
    }
}
