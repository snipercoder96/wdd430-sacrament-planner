import MeetingDetails from "../components/MeetingDetails";
import type { SacramentMeeting } from "../lib/types";
import { getApiUrl } from "../lib/server-api";

export default async function MeetingsPage() {
    const response = await fetch(await getApiUrl("/api/meetings"), {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to load meetings.");
    }

    const meetings: SacramentMeeting[] = await response.json();

    return (
        <main className="meetings-content">
            <div className="meetings-heading">
                <p className="section-eyebrow">Sacrament planner</p>
                <h1>All meetings</h1>
                <p>Browse every meeting in your planning schedule.</p>
            </div>
            <MeetingDetails meetings={meetings} />
        </main>
    );
}
