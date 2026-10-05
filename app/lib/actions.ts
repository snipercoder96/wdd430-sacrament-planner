"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { meetingSchema } from "./meeting-schema";
import { addMeeting, deleteMeeting, updateMeeting } from "./meetings-db";
import { createVisitorUser } from "./users-db";

export type FormState = {
    errors?: Record<string, string>;
    message?: string;
};

const signupSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
    email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
    password: z
        .string()
        .min(12, "Password must be at least 12 characters.")
        .max(72, "Password must be no more than 72 characters.")
        .refine(
            (password) => Buffer.byteLength(password, "utf8") <= 72,
            "Password must be no more than 72 UTF-8 bytes."
        ),
});

async function requireAdmin(): Promise<void> {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "admin") {
        redirect("/");
    }
}

export async function signUpAction(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const parsed = signupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        const errors: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
            const field = issue.path[0];
            if (typeof field === "string" && !errors[field]) {
                errors[field] = issue.message;
            }
        }

        return { errors, message: "Please correct the highlighted fields." };
    }

    const { name, email, password } = parsed.data;
    const passwordHash = await bcrypt.hash(password, 12);

    let created: boolean;
    try {
        created = await createVisitorUser(name, email, passwordHash);
    } catch (error) {
        console.error("Failed to create user account", error);
        throw new Error("Unable to create your account. Please try again.");
    }

    if (!created) {
        return {
            errors: { email: "An account with this email already exists." },
            message: "Please use a different email address or sign in.",
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                message: "Your account was created, but sign-in failed. Please sign in.",
            };
        }

        throw error;
    }

    return {};
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
    await requireAdmin();

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
    await requireAdmin();

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
    await requireAdmin();

    let deleted: boolean;
    try {
        deleted = await deleteMeeting(meetingId);
    } catch (error) {
        console.error("Failed to delete meeting", error);
        throw new Error("Unable to delete the meeting. Please try again.");
    }

    if (!deleted) {
        throw new Error("Meeting not found; nothing was deleted.");
    }

    revalidatePath("/");
    revalidatePath("/meetings");
    revalidatePath(`/meetings/${meetingId}`);
    redirect("/meetings");
}

// This function is used to handle the sign-in form submission on the server side. It attempts to sign in the user using the provided credentials and returns an error message if the sign-in fails.
// It is used in the SignInForm component to handle the form submission and display any error messages to the user.

export async function authenticate(
    _prevState: string | undefined,
    formData: FormData
): Promise<string | undefined> {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/",
        });
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