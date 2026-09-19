import MeetingDetails from "../../components/MeetingDetails";
import MeetingPagination from "../../components/Pagination";
import MeetingSearch from "../../components/MeetingSearch";
import { getMeetings, getMeetingsTotalPages } from "../../lib/meetings-db";

type MeetingsPageProps = {
    searchParams: Promise<{
        query?: string | string[];
        page?: string | string[];
    }>;
};

function firstValue(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
    const params = await searchParams;
    const query = firstValue(params.query) ?? "";
    const requestedPage = Number(firstValue(params.page) ?? "1");
    const currentPage = Number.isInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1;
    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <main className="meetings-content">
            <div className="meetings-heading">
                <p className="section-eyebrow">Sacrament planner</p>
                <h1>All meetings</h1>
                <p>Browse every meeting in your planning schedule.</p>
            </div>
            <MeetingSearch />
            <MeetingDetails meetings={meetings} />
            <MeetingPagination currentPage={currentPage} totalPages={totalPages} query={query} />
        </main>
    );
}