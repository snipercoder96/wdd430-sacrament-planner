import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "../../../components/MeetingDetail";
import type { SacramentMeeting } from "../../../lib/types";
import { getApiUrl } from "../../../lib/server-api";

export default async function MeetingPage({ params }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await fetch(await getApiUrl(`/api/meetings/${id}`), {
        cache: "no-store",
    });

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error("Unable to load meeting.");
    }

    const meeting: SacramentMeeting = await response.json();

    return (
        <main className="meetings-content">
            <Link className="text-link" href="/meetings">Back to all meetings</Link>
            <div className="meetings-heading">
                <p className="section-eyebrow">Meeting details</p>
                <h1>{meeting.meetingType} meeting</h1>
            </div>
            <MeetingDetail meeting={meeting} />
        </main>
    );
}