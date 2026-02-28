import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const athleteId = parseInt(id, 10);

    if (isNaN(athleteId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const athlete = await prisma.athlete.findUnique({
        where: { id: athleteId },
        include: {
            stats: true,
            career: { orderBy: { year: "desc" } },
            achievements: true,
            highlights: true,
        },
    });

    if (!athlete) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(athlete);
}
