import Link from "next/link";
import { redirect } from "next/navigation";
import MeetingCard from "../../../components/MeetingCards";
import { getMeetingByDate } from "../../../lib/meetings-db";

export const dynamic = "force-dynamic";

function getThisSunday(): string {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay());
    return date.toISOString().slice(0, 10);
}

export default async function CurrentMeetingPage() {
    const currentMeeting = await getMeetingByDate(getThisSunday());

    if (currentMeeting) {
        redirect(`/meetings/${currentMeeting.id}`);
    }

    if (!currentMeeting) {
        return (
            <main className="meetings-content">
                <div className="meetings-heading">
                    <p className="section-eyebrow">Planner</p>
                    <h1>Current meeting</h1>
                    <p>No meeting scheduled for this Sunday.</p>
                </div>
                <Link className="text-link" href="/meetings">View all meetings</Link>
            </main>
        );
    }

    return (
        <main className="meetings-content">
            <div className="meetings-heading">
                <p className="section-eyebrow">Planner</p>
                <h1>Current meeting</h1>
                <p>The meeting currently selected for planning.</p>
            </div>
            <MeetingCard meeting={currentMeeting} />
            <Link className="text-link" href="/meetings">View all meetings</Link>
        </main>
    );
}