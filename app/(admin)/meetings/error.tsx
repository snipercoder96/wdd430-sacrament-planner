"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminMeetingsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="meetings-content">
            <div className="meetings-heading">
                <h1>Unable to update meetings</h1>
                <p>Something went wrong while processing the meeting.</p>
                <button type="button" onClick={reset}>
                    Try again
                </button>
                <Link className="text-link" href="/meetings">
                    Return to meetings
                </Link>
            </div>
        </main>
    );
}
