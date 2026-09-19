"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MeetingSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("query") ?? "");
    const updateSearch = useDebouncedCallback((nextValue: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextValue.trim()) {
            params.set("query", nextValue.trim());
        } else {
            params.delete("query");
        }
        params.delete("page");

        const queryString = params.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    return (
        <form className="meeting-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="meeting-search">Search meetings</label>
            <input
                id="meeting-search"
                type="search"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                    updateSearch(event.target.value);
                }}
                placeholder="Search by speaker, leader, or type"
            />
        </form>
    );
}