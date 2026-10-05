import MeetingCard from "./MeetingCards";
import type { SacramentMeeting } from "../lib/types";
import { auth } from "@/auth";

interface MeetingListProps {
    meetings: SacramentMeeting[];
}

export default async function MeetingDetails({ meetings }: MeetingListProps) {
    const session = await auth();
    const isAdmin = session?.user.role === "admin";

    return (
        <section className="meeting-section" aria-labelledby="meetings-heading">
            <div className="meeting-section-heading">
                <p className="section-eyebrow">Plan ahead</p>
                <h2 id="meetings-heading">Upcoming meetings</h2>
                <p>Review the order of service, assignments, hymns, and announcements.</p>
            </div>
            <div className="meeting-list">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} isAdmin={isAdmin} />
                ))}
            </div>
        </section>
    );
}
