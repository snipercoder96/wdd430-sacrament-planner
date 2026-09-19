"use client";

import Link from "next/link";

type MeetingPaginationProps = {
    currentPage: number;
    totalPages: number;
    query: string;
};

function pageUrl(page: number, query: string): string {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    params.set("page", String(page));
    return `/meetings?${params.toString()}`;
}

export default function MeetingPagination({
    currentPage,
    totalPages,
    query,
}: MeetingPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav className="meeting-pagination" aria-label="Meeting pages">
            {currentPage > 1 && (
                <Link className="text-link" href={pageUrl(currentPage - 1, query)}>
                    Previous
                </Link>
            )}
            <span aria-current="page">Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
                <Link className="text-link" href={pageUrl(currentPage + 1, query)}>
                    Next
                </Link>
            )}
        </nav>
    );
}