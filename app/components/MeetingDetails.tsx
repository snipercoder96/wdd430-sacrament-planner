import MeetingCard from "./MeetingCards";
import type { SacramentMeeting } from "../lib/types";

interface MeetingListProps {
    meetings: SacramentMeeting[];
}

export default function MeetingDetails({ meetings }: MeetingListProps) {
    return (
        <div className="meeting-list grid gap-6">
            {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
        </div>
    );
}
