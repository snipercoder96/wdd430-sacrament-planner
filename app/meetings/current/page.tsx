import Link from "next/link";
import MeetingCard from "../../components/MeetingCards";
import { getMeetings } from "../../lib/meetings-db";


// ❌ No it doesnt have redirect()
export default function CurrentMeetingPage() {
    const currentMeeting = getMeetings()[0];

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
