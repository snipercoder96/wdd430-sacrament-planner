import Link from "next/link";

export default function NotFound() {
    return (
        <main style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Meeting not found</h1>
            <p>The meeting you requested does not exist or may have been removed.</p>
            <Link href="/meetings">Return to meetings</Link>
        </main>
    );
}