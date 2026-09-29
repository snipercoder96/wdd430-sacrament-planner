import { z } from "zod";

export const meetingSchema = z.object({
    date: z.string().min(1, "Date is required"),
    meetingType: z.enum(["testimony", "fast", "regular", "stake", "general"], {
        message: "Choose a valid meeting type",
    }),
    presiding: z.string().min(1, "Presiding is required"),
    conducting: z.string().min(1, "Conducting is required"),
    announcements: z.array(z.string()).nullable().default(null),
    openingHymn: z.object({
        number: z.number().int().min(1),
        title: z.string().min(1),
    }),
    openingPrayer: z.string().min(1, "Opening prayer is required"),
    wardBusiness: z
        .array(
            z.object({
                description: z.string().min(1),
            })
        )
        .nullable()
        .default(null),
    stakeBusiness: z.boolean().nullable().default(false),
    sacramentHymn: z.object({
        number: z.number().int().min(1),
        title: z.string().min(1),
    }),
    speakers: z
        .array(
            z.object({
                name: z.string().min(1),
                topic: z.string().min(1),
                type: z.enum(["speaker", "musical-number"]),
            })
        )
        .nullable()
        .default(null),
    closingHymn: z.object({
        number: z.number().int().min(1),
        title: z.string().min(1),
    }),
    closingPrayer: z.string().min(1, "Closing prayer is required"),
});

export type MeetingFormValues = z.infer<typeof meetingSchema>;