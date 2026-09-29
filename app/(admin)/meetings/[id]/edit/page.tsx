import { notFound } from "next/navigation";
import MeetingEditForm from "../../../../components/MeetingEditForm";
import { getMeetingById } from "../../../../lib/meetings-db";

export default async function EditMeetingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!/^\d+$/.test(id) || !Number.isSafeInteger(meetingId)) {
        notFound();
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
        notFound();
    }

    return <MeetingEditForm meeting={meeting} />;
}
