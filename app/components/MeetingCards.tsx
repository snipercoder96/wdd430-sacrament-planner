import type { SacramentMeeting } from "../lib/types";
import Link from "next/link";
import { deleteMeetingAction } from "../lib/actions";

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <div className="meeting-card">
            <h2>{meeting.meetingType} meeting</h2>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Presiding:</strong> {meeting.presiding}</p>
            <p><strong>Conducting:</strong> {meeting.conducting}</p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
                <Link className="text-link" href={`/meetings/${meeting.id}`}>
                    View full meeting
                </Link>
                <Link className="text-link" href={`/meetings/${meeting.id}/edit`}>
                    Edit
                </Link>
                <form action={deleteMeetingAction.bind(null, meeting.id)}>
                    <button type="submit" className="text-link" style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}