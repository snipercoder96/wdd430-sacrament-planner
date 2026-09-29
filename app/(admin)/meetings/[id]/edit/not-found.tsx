import Link from "next/link";

export default function EditMeetingNotFound() {
    return (
        <main className="meetings-content">
            <div className="meetings-heading">
                <h1>Meeting not found</h1>
                <p>The meeting you requested does not exist or may have been removed.</p>
                <Link className="text-link" href="/meetings">
                    Return to meetings
                </Link>
            </div>
        </main>
    );
}
