import { getMeetings } from "../../lib/meetings-db";

export async function GET(request: Request) {
	const searchParams = new URL(request.url).searchParams;
	const query = searchParams.get("query") ?? "";
	const date = searchParams.get("date") ?? undefined;
	const requestedPage = Number(searchParams.get("page") ?? "1");
	const page = Number.isInteger(requestedPage) && requestedPage > 0
		? requestedPage
		: 1;

	if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		return Response.json({ error: "Date must use YYYY-MM-DD format." }, { status: 400 });
	}

	const meetings = await getMeetings(query, page, date);
	return Response.json(meetings);
}
