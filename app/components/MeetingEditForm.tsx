"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "../lib/types";
import { updateMeetingAction } from "../lib/actions";

const initialState = {
    errors: {} as Record<string, string>,
    message: "",
};

export default function MeetingEditForm({ meeting }: { meeting: SacramentMeeting }) {
    const [state, formAction, pending] = useActionState(updateMeetingAction, initialState);
    const errorFor = (field: string) => state.errors?.[field] ?? "";

    return (
        <main className="meetings-content">
            <div className="meetings-heading">
                <p className="section-eyebrow">Sacrament planner</p>
                <h1>Edit meeting</h1>
            </div>

            <form action={formAction} noValidate className="meeting-form">
                <input type="hidden" name="id" value={meeting.id} />

                <div>
                    <label htmlFor="date">Date</label>
                    <input id="date" name="date" type="date" defaultValue={meeting.date} aria-invalid={Boolean(errorFor("date"))} aria-describedby="date-error" />
                    <p id="date-error" aria-live="polite">{errorFor("date")}</p>
                </div>

                <div>
                    <label htmlFor="meetingType">Meeting type</label>
                    <select id="meetingType" name="meetingType" defaultValue={meeting.meetingType} aria-invalid={Boolean(errorFor("meetingType"))} aria-describedby="meetingType-error">
                        <option value="testimony">Testimony</option>
                        <option value="fast">Fast</option>
                        <option value="regular">Regular</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                    </select>
                    <p id="meetingType-error" aria-live="polite">{errorFor("meetingType")}</p>
                </div>

                <div>
                    <label htmlFor="presiding">Presiding</label>
                    <input id="presiding" name="presiding" defaultValue={meeting.presiding} aria-invalid={Boolean(errorFor("presiding"))} aria-describedby="presiding-error" />
                    <p id="presiding-error" aria-live="polite">{errorFor("presiding")}</p>
                </div>

                <div>
                    <label htmlFor="conducting">Conducting</label>
                    <input id="conducting" name="conducting" defaultValue={meeting.conducting} aria-invalid={Boolean(errorFor("conducting"))} aria-describedby="conducting-error" />
                    <p id="conducting-error" aria-live="polite">{errorFor("conducting")}</p>
                </div>

                <div>
                    <label>Announcements</label>
                    {(meeting.announcements ?? [""]).map((announcement, index) => (
                        <input
                            key={`announcement-${index}`}
                            name="announcements"
                            defaultValue={announcement}
                            aria-invalid={Boolean(errorFor("announcements"))}
                            aria-describedby="announcements-error"
                        />
                    ))}
                    <p id="announcements-error" aria-live="polite">{errorFor("announcements")}</p>
                </div>

                <div>
                    <label htmlFor="openingHymnNumber">Opening hymn number</label>
                    <input id="openingHymnNumber" name="openingHymnNumber" type="number" min="1" defaultValue={meeting.openingHymn.number} aria-invalid={Boolean(errorFor("openingHymn.number"))} aria-describedby="openingHymnNumber-error" />
                    <p id="openingHymnNumber-error" aria-live="polite">{errorFor("openingHymn.number")}</p>
                </div>

                <div>
                    <label htmlFor="openingHymnTitle">Opening hymn title</label>
                    <input id="openingHymnTitle" name="openingHymnTitle" defaultValue={meeting.openingHymn.title} aria-invalid={Boolean(errorFor("openingHymn.title"))} aria-describedby="openingHymnTitle-error" />
                    <p id="openingHymnTitle-error" aria-live="polite">{errorFor("openingHymn.title")}</p>
                </div>

                <div>
                    <label htmlFor="openingPrayer">Opening prayer</label>
                    <input id="openingPrayer" name="openingPrayer" defaultValue={meeting.openingPrayer} aria-invalid={Boolean(errorFor("openingPrayer"))} aria-describedby="openingPrayer-error" />
                    <p id="openingPrayer-error" aria-live="polite">{errorFor("openingPrayer")}</p>
                </div>

                <div>
                    <label htmlFor="wardBusiness">Ward business</label>
                    <textarea id="wardBusiness" name="wardBusiness" defaultValue={(meeting.wardBusiness ?? [{ description: "" }])[0]?.description ?? ""} aria-invalid={Boolean(errorFor("wardBusiness"))} aria-describedby="wardBusiness-error" />
                    <p id="wardBusiness-error" aria-live="polite">{errorFor("wardBusiness")}</p>
                </div>

                <div>
                    <label htmlFor="stakeBusiness">Stake business</label>
                    <input id="stakeBusiness" name="stakeBusiness" type="checkbox" value="true" defaultChecked={Boolean(meeting.stakeBusiness)} />
                </div>

                <div>
                    <label htmlFor="sacramentHymnNumber">Sacrament hymn number</label>
                    <input id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" min="1" defaultValue={meeting.sacramentHymn.number} aria-invalid={Boolean(errorFor("sacramentHymn.number"))} aria-describedby="sacramentHymnNumber-error" />
                    <p id="sacramentHymnNumber-error" aria-live="polite">{errorFor("sacramentHymn.number")}</p>
                </div>

                <div>
                    <label htmlFor="sacramentHymnTitle">Sacrament hymn title</label>
                    <input id="sacramentHymnTitle" name="sacramentHymnTitle" defaultValue={meeting.sacramentHymn.title} aria-invalid={Boolean(errorFor("sacramentHymn.title"))} aria-describedby="sacramentHymnTitle-error" />
                    <p id="sacramentHymnTitle-error" aria-live="polite">{errorFor("sacramentHymn.title")}</p>
                </div>

                <div>
                    <label>Speakers</label>
                    {(meeting.speakers ?? [{ name: "", topic: "", type: "speaker" }]).map((speaker, index) => (
                        <div key={`speaker-${index}`}>
                            <input name="speakerName" defaultValue={speaker.name} placeholder="Speaker name" />
                            <input name="speakerTopic" defaultValue={speaker.topic} placeholder="Topic" />
                            <select name="speakerType" defaultValue={speaker.type}>
                                <option value="speaker">Speaker</option>
                                <option value="musical-number">Musical number</option>
                            </select>
                        </div>
                    ))}
                    <p aria-live="polite">{errorFor("speakers")}</p>
                </div>

                <div>
                    <label htmlFor="closingHymnNumber">Closing hymn number</label>
                    <input id="closingHymnNumber" name="closingHymnNumber" type="number" min="1" defaultValue={meeting.closingHymn.number} aria-invalid={Boolean(errorFor("closingHymn.number"))} aria-describedby="closingHymnNumber-error" />
                    <p id="closingHymnNumber-error" aria-live="polite">{errorFor("closingHymn.number")}</p>
                </div>

                <div>
                    <label htmlFor="closingHymnTitle">Closing hymn title</label>
                    <input id="closingHymnTitle" name="closingHymnTitle" defaultValue={meeting.closingHymn.title} aria-invalid={Boolean(errorFor("closingHymn.title"))} aria-describedby="closingHymnTitle-error" />
                    <p id="closingHymnTitle-error" aria-live="polite">{errorFor("closingHymn.title")}</p>
                </div>

                <div>
                    <label htmlFor="closingPrayer">Closing prayer</label>
                    <input id="closingPrayer" name="closingPrayer" defaultValue={meeting.closingPrayer} aria-invalid={Boolean(errorFor("closingPrayer"))} aria-describedby="closingPrayer-error" />
                    <p id="closingPrayer-error" aria-live="polite">{errorFor("closingPrayer")}</p>
                </div>

                <button type="submit" disabled={pending}>
                    {pending ? "Saving..." : "Update Meeting"}
                </button>
            </form>
        </main>
    );
}
