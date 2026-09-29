"use client";

import { useActionState } from "react";
import { createMeetingAction } from "@/app/lib/actions";

const initialState = {
    errors: {} as Record<string, string>,
    message: "",
};

export default function NewMeetingPage() {
    const [state, formAction, pending] = useActionState(
        createMeetingAction,
        initialState
    );

    const errorFor = (field: string) => state.errors?.[field] ?? "";

    return (
        <main className="meetings-content">
            <div className="meetings-heading">
                <p className="section-eyebrow">Sacrament planner</p>
                <h1>Create meeting</h1>
            </div>

            <form action={formAction} noValidate className="meeting-form">
                <p aria-live="polite">{state.message}</p>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        aria-invalid={Boolean(errorFor("date"))}
                        aria-describedby="date-error"
                    />
                    <p id="date-error" aria-live="polite">
                        {errorFor("date")}
                    </p>
                </div>

                <div>
                    <label htmlFor="meetingType">Meeting type</label>
                    <select
                        id="meetingType"
                        name="meetingType"
                        aria-invalid={Boolean(errorFor("meetingType"))}
                        aria-describedby="meetingType-error"
                    >
                        <option value="">Select a type</option>
                        <option value="testimony">Testimony</option>
                        <option value="fast">Fast</option>
                        <option value="regular">Regular</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                    </select>
                    <p id="meetingType-error" aria-live="polite">
                        {errorFor("meetingType")}
                    </p>
                </div>

                <div>
                    <label htmlFor="presiding">Presiding</label>
                    <input
                        id="presiding"
                        name="presiding"
                        aria-invalid={Boolean(errorFor("presiding"))}
                        aria-describedby="presiding-error"
                    />
                    <p id="presiding-error" aria-live="polite">
                        {errorFor("presiding")}
                    </p>
                </div>

                <div>
                    <label htmlFor="conducting">Conducting</label>
                    <input
                        id="conducting"
                        name="conducting"
                        aria-invalid={Boolean(errorFor("conducting"))}
                        aria-describedby="conducting-error"
                    />
                    <p id="conducting-error" aria-live="polite">
                        {errorFor("conducting")}
                    </p>
                </div>

                <div>
                    <p id="announcements-label">Announcements</p>
                    <label htmlFor="announcement-1">Announcement 1</label>
                    <input id="announcement-1" name="announcements" aria-invalid={Boolean(errorFor("announcements"))} aria-describedby="announcements-error" />
                    <label htmlFor="announcement-2">Announcement 2</label>
                    <input id="announcement-2" name="announcements" aria-invalid={Boolean(errorFor("announcements"))} aria-describedby="announcements-error" />
                    <label htmlFor="announcement-3">Announcement 3</label>
                    <input id="announcement-3" name="announcements" aria-invalid={Boolean(errorFor("announcements"))} aria-describedby="announcements-error" />
                    <p id="announcements-error" aria-live="polite">
                        {errorFor("announcements")}
                    </p>
                </div>

                <div>
                    <label htmlFor="openingHymnNumber">Opening hymn number</label>
                    <input
                        id="openingHymnNumber"
                        name="openingHymnNumber"
                        type="number"
                        min="1"
                        aria-invalid={Boolean(errorFor("openingHymn.number"))}
                        aria-describedby="openingHymnNumber-error"
                    />
                    <p id="openingHymnNumber-error" aria-live="polite">
                        {errorFor("openingHymn.number")}
                    </p>
                </div>

                <div>
                    <label htmlFor="openingHymnTitle">Opening hymn title</label>
                    <input
                        id="openingHymnTitle"
                        name="openingHymnTitle"
                        aria-invalid={Boolean(errorFor("openingHymn.title"))}
                        aria-describedby="openingHymnTitle-error"
                    />
                    <p id="openingHymnTitle-error" aria-live="polite">
                        {errorFor("openingHymn.title")}
                    </p>
                </div>

                <div>
                    <label htmlFor="openingPrayer">Opening prayer</label>
                    <input
                        id="openingPrayer"
                        name="openingPrayer"
                        aria-invalid={Boolean(errorFor("openingPrayer"))}
                        aria-describedby="openingPrayer-error"
                    />
                    <p id="openingPrayer-error" aria-live="polite">
                        {errorFor("openingPrayer")}
                    </p>
                </div>

                <div>
                    <label htmlFor="wardBusiness">Ward business</label>
                    <textarea
                        id="wardBusiness"
                        name="wardBusiness"
                        aria-invalid={Boolean(errorFor("wardBusiness"))}
                        aria-describedby="wardBusiness-error"
                    />
                    <p id="wardBusiness-error" aria-live="polite">
                        {errorFor("wardBusiness")}
                    </p>
                </div>

                <div>
                    <label htmlFor="stakeBusiness">Stake business</label>
                    <input
                        id="stakeBusiness"
                        name="stakeBusiness"
                        type="checkbox"
                        value="true"
                    />
                </div>

                <div>
                    <label htmlFor="sacramentHymnNumber">Sacrament hymn number</label>
                    <input
                        id="sacramentHymnNumber"
                        name="sacramentHymnNumber"
                        type="number"
                        min="1"
                        aria-invalid={Boolean(errorFor("sacramentHymn.number"))}
                        aria-describedby="sacramentHymnNumber-error"
                    />
                    <p id="sacramentHymnNumber-error" aria-live="polite">
                        {errorFor("sacramentHymn.number")}
                    </p>
                </div>

                <div>
                    <label htmlFor="sacramentHymnTitle">Sacrament hymn title</label>
                    <input
                        id="sacramentHymnTitle"
                        name="sacramentHymnTitle"
                        aria-invalid={Boolean(errorFor("sacramentHymn.title"))}
                        aria-describedby="sacramentHymnTitle-error"
                    />
                    <p id="sacramentHymnTitle-error" aria-live="polite">
                        {errorFor("sacramentHymn.title")}
                    </p>
                </div>

                <div>
                    <p id="speaker-label">Speaker(s)</p>
                    <label htmlFor="speaker-name-1">Speaker name</label>
                    <input id="speaker-name-1" name="speakerName" placeholder="Speaker name" aria-describedby="speakers-error" />
                    <label htmlFor="speaker-topic-1">Topic</label>
                    <input id="speaker-topic-1" name="speakerTopic" placeholder="Topic" aria-describedby="speakers-error" />
                    <label htmlFor="speaker-type-1">Speaker type</label>
                    <select id="speaker-type-1" name="speakerType" aria-describedby="speakers-error">
                        <option value="speaker">Speaker</option>
                        <option value="musical-number">Musical number</option>
                    </select>
                    <p id="speakers-error" aria-live="polite">{errorFor("speakers")}</p>
                </div>

                <div>
                    <label htmlFor="closingHymnNumber">Closing hymn number</label>
                    <input
                        id="closingHymnNumber"
                        name="closingHymnNumber"
                        type="number"
                        min="1"
                        aria-invalid={Boolean(errorFor("closingHymn.number"))}
                        aria-describedby="closingHymnNumber-error"
                    />
                    <p id="closingHymnNumber-error" aria-live="polite">
                        {errorFor("closingHymn.number")}
                    </p>
                </div>

                <div>
                    <label htmlFor="closingHymnTitle">Closing hymn title</label>
                    <input
                        id="closingHymnTitle"
                        name="closingHymnTitle"
                        aria-invalid={Boolean(errorFor("closingHymn.title"))}
                        aria-describedby="closingHymnTitle-error"
                    />
                    <p id="closingHymnTitle-error" aria-live="polite">
                        {errorFor("closingHymn.title")}
                    </p>
                </div>

                <div>
                    <label htmlFor="closingPrayer">Closing prayer</label>
                    <input
                        id="closingPrayer"
                        name="closingPrayer"
                        aria-invalid={Boolean(errorFor("closingPrayer"))}
                        aria-describedby="closingPrayer-error"
                    />
                    <p id="closingPrayer-error" aria-live="polite">
                        {errorFor("closingPrayer")}
                    </p>
                </div>

                <button type="submit" disabled={pending}>
                    {pending ? "Saving..." : "Create Meeting"}
                </button>
            </form>
        </main>
    );
}