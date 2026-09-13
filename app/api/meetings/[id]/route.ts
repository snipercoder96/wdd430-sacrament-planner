import { getMeetingById } from "../../../lib/meetings-db";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	if (!/^\d+$/.test(id)) {
        // If the id isnt a digit then throw an error
		return Response.json({ error: "Meeting ID must be a number." }, { status: 400 });
	}

	const meeting = getMeetingById(Number(id));

	if (!meeting) {
		return Response.json({ error: "Meeting not found." }, { status: 404 });
	}

	return Response.json(meeting);
}
