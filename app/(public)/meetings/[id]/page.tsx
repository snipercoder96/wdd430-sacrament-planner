import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../components/MeetingDetail";
import { getMeetingById } from "../../../lib/meetings-db";
import type { SacramentMeeting } from "../../../lib/types";
import { auth } from "@/auth";

export default async function MeetingPage({ params }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) {
        notFound();
    }

    const meeting: SacramentMeeting | null = await getMeetingById(Number(id));
    if (!meeting) {
        notFound();
    }

    const session = await auth();

    return (
        <main className="meetings-content">
            <Link className="text-link" href="/meetings">Back to all meetings</Link>
            <div className="meetings-heading">
                <p className="section-eyebrow">Meeting details</p>
                <h1>{meeting.meetingType} meeting</h1>
            </div>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                {session?.user.role === "admin" && (
                    <Link className="text-link" href={`/meetings/${meeting.id}/edit`}>
                        Edit meeting
                    </Link>
                )}
            </div>
            <MeetingDetail meeting={meeting} />
        </main>
    );
}