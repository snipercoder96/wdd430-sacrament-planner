import type { SacramentMeeting } from "../lib/types";
import Link from "next/link";

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <div className="meeting-card">
            <h2>{meeting.meetingType} meeting</h2>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Presiding:</strong> {meeting.presiding}</p>
            <p><strong>Conducting:</strong> {meeting.conducting}</p>
            <Link className="text-link" href={`/meetings/${meeting.id}`}>
                View full meeting
            </Link>
        </div>
    );
}