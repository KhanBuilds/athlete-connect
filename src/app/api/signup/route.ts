import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password, role, sport } = body;

    // Validate required fields
    if (!name || !email || !password) {
        return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    // If athlete role, create an Athlete profile too
    let athleteId: number | null = null;
    if (role === "athlete") {
        const athlete = await prisma.athlete.create({
            data: {
                name,
                sport: sport || "Football",
                position: "Unspecified",
                nationality: null,
                bio: `${name} is a new athlete on AthleteConnect.`,
                verified: false,
            },
        });
        athleteId = athlete.id;

        // Add starter stats
        await prisma.stat.createMany({
            data: [
                { athleteId: athlete.id, label: "Status", value: "Active", trend: "neutral" },
                { athleteId: athlete.id, label: "Sport", value: sport || "Football", trend: "neutral" },
            ],
        });
    }

    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password, // In production, hash this with bcrypt
            role: role || "athlete",
            sport: sport || null,
            athleteId,
        },
    });

    return NextResponse.json(
        {
            message: "Account created successfully!",
            user: { id: user.id, name: user.name, email: user.email, role: user.role, athleteId },
        },
        { status: 201 }
    );
}
