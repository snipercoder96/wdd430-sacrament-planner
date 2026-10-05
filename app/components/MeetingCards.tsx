import type { SacramentMeeting } from "../lib/types";
import Link from "next/link";
import { deleteMeetingAction } from "../lib/actions";

export default function MeetingCard({
    meeting,
    isAdmin = false,
}: {
    meeting: SacramentMeeting;
    isAdmin?: boolean;
}) {
    return (
        <div className="meeting-card">
            <h2>{meeting.meetingType} meeting</h2>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Presiding:</strong> {meeting.presiding}</p>
            <p><strong>Conducting:</strong> {meeting.conducting}</p>
            <Link className="text-link" href={`/meetings/${meeting.id}`}>
                View full meeting
            </Link>
            {isAdmin && (
                <>
                    <Link className="text-link" href={`/meetings/${meeting.id}/edit`}>
                        Edit meeting
                    </Link>
                    <form action={deleteMeetingAction.bind(null, meeting.id)}>
                        <button type="submit">Delete meeting</button>
                    </form>
                </>
            )}
        </div>
    );
}