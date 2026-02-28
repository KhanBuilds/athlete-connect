import ProfileContent from "./ProfileContent";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <ProfileContent athleteId={id} />;
}
