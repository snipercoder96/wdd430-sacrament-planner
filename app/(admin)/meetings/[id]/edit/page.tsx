import { notFound } from "next/navigation";
import MeetingEditForm from "@/app/components/MeetingEditForm";
import { getMeetingById } from "@/app/lib/meetings-db";

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));

    if (!meeting) {
        notFound();
    }

    return <MeetingEditForm meeting={meeting} />;
}
