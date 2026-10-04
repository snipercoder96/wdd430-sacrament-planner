"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import { AuthError } from "next-auth";
import { meetingSchema } from "./meeting-schema";
import { addMeeting, deleteMeeting, updateMeeting } from "./meetings-db";

export type FormState = {
    errors?: Record<string, string>;
    message?: string;
};

async function requireAuthenticatedUser(): Promise<void> {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/signin");
    }
}

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

function buildFormErrorResponse(parsed: { error: { issues: { path: PropertyKey[]; message: string }[] } }): FormState {
    const errors = Object.fromEntries(
        parsed.error.issues.map((issue) => [issue.path.join("."), issue.message])
    );

    return {
        errors,
        message: "Please fix the highlighted fields.",
    };
}

export async function createMeetingAction(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    await requireAuthenticatedUser();

    const raw = parseMeetingFormData(formData);
    const parsed = meetingSchema.safeParse(raw);

    if (!parsed.success) {
        return buildFormErrorResponse(parsed);
    }

    try {
        await addMeeting(parsed.data);
    } catch (error) {
        console.error("Failed to create meeting", error);
        throw new Error("Unable to create the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}

export async function updateMeetingAction(
    meetingId: number,
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    await requireAuthenticatedUser();

    const raw = parseMeetingFormData(formData);
    const parsed = meetingSchema.safeParse(raw);

    if (!parsed.success) {
        return buildFormErrorResponse(parsed);
    }

    let updated;
    try {
        updated = await updateMeeting(meetingId, parsed.data);
    } catch (error) {
        console.error("Failed to update meeting", error);
        throw new Error("Unable to update the meeting. Please try again.");
    }

    if (!updated) {
        return {
            errors: { id: "Meeting not found." },
            message: "Unable to update meeting.",
        };
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${meetingId}`);
    redirect(`/meetings/${meetingId}`);
}

export async function deleteMeetingAction(meetingId: number) {
    await requireAuthenticatedUser();

    try {
        await deleteMeeting(meetingId);
    } catch (error) {
        console.error("Failed to delete meeting", error);
        throw new Error("Unable to delete the meeting. Please try again.");
    }

    revalidatePath("/meetings");
    redirect("/meetings");
}

// This function is used to handle the sign-in form submission on the server side. It attempts to sign in the user using the provided credentials and returns an error message if the sign-in fails.
// It is used in the SignInForm component to handle the form submission and display any error messages to the user.

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData
): Promise<string | undefined> {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return "Invalid email or password.";
            }

            return "Unable to sign in. Please try again.";
        }

        throw error;
    }
}