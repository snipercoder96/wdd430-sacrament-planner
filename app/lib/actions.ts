"use server";

import { redirect } from "next/navigation";
import { meetingSchema } from "./meeting-schema";
import { addMeeting, deleteMeeting, updateMeeting } from "./meetings-db";

export type FormState = {
    errors?: Record<string, string>;
    message?: string;
};

function parseMeetingFormData(formData: FormData) {
    const announcementValues = formData.getAll("announcements")
        .map((value) => String(value).trim())
        .filter(Boolean);

    const wardBusinessValues = formData.getAll("wardBusiness")
        .map((value) => String(value).trim())
        .filter(Boolean)
        .map((description) => ({ description }));

    const speakerNames = formData.getAll("speakerName").map((value) => String(value).trim());
    const speakerTopics = formData.getAll("speakerTopic").map((value) => String(value).trim());
    const speakerTypes = formData.getAll("speakerType").map((value) => String(value).trim());

    const speakers = speakerNames
        .map((name, index) => ({
            name,
            topic: speakerTopics[index] ?? "",
            type: (speakerTypes[index] === "musical-number" ? "musical-number" : "speaker") as "speaker" | "musical-number",
        }))
        .filter((speaker) => speaker.name || speaker.topic);

    return {
        date: formData.get("date") ? String(formData.get("date")) : "",
        meetingType: formData.get("meetingType") ? String(formData.get("meetingType")) : "",
        presiding: formData.get("presiding") ? String(formData.get("presiding")) : "",
        conducting: formData.get("conducting") ? String(formData.get("conducting")) : "",
        announcements: announcementValues.length > 0 ? announcementValues : null,
        openingHymn: {
            number: Number(formData.get("openingHymnNumber") ?? 0),
            title: formData.get("openingHymnTitle") ? String(formData.get("openingHymnTitle")) : "",
        },
        openingPrayer: formData.get("openingPrayer") ? String(formData.get("openingPrayer")) : "",
        wardBusiness: wardBusinessValues.length > 0 ? wardBusinessValues : null,
        stakeBusiness: formData.get("stakeBusiness") === "true",
        sacramentHymn: {
            number: Number(formData.get("sacramentHymnNumber") ?? 0),
            title: formData.get("sacramentHymnTitle") ? String(formData.get("sacramentHymnTitle")) : "",
        },
        speakers: speakers.length > 0 ? speakers : null,
        closingHymn: {
            number: Number(formData.get("closingHymnNumber") ?? 0),
            title: formData.get("closingHymnTitle") ? String(formData.get("closingHymnTitle")) : "",
        },
        closingPrayer: formData.get("closingPrayer") ? String(formData.get("closingPrayer")) : "",
    };
}

function buildFormErrorResponse(parsed: { error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } } }): FormState {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
        errors: Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? ""])
        ),
        message: "Please fix the highlighted fields.",
    };
}

export async function createMeetingAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const raw = parseMeetingFormData(formData);
    const parsed = meetingSchema.safeParse(raw);

    if (!parsed.success) {
        return buildFormErrorResponse(parsed);
    }

    await addMeeting(parsed.data);
    redirect("/meetings");
}

export async function updateMeetingAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const meetingId = Number(formData.get("id"));

    if (!Number.isInteger(meetingId)) {
        return {
            errors: { id: "Invalid meeting id." },
            message: "Unable to update meeting.",
        };
    }

    const raw = parseMeetingFormData(formData);
    const parsed = meetingSchema.safeParse(raw);

    if (!parsed.success) {
        return buildFormErrorResponse(parsed);
    }

    const updated = await updateMeeting(meetingId, parsed.data);

    if (!updated) {
        return {
            errors: { id: "Meeting not found." },
            message: "Unable to update meeting.",
        };
    }

    redirect(`/meetings/${meetingId}`);
}

export async function deleteMeetingAction(meetingId: number) {
    await deleteMeeting(meetingId);
    redirect("/meetings");
}