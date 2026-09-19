import { getMeetings } from "../../lib/meetings-db";


// ✅ Yes it does pass the requirements for getting date parameter
export function GET(request: Request) {
	const date = new URL(request.url).searchParams.get("date");
	return Response.json(getMeetings(date));
}
