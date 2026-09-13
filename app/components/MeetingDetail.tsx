import type { SacramentMeeting } from "../lib/types";

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <article className="meeting-card meeting-detail">
            <h2>{meeting.meetingType} meeting</h2>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Presiding:</strong> {meeting.presiding}</p>
            <p><strong>Conducting:</strong> {meeting.conducting}</p>
            <p><strong>Opening Hymn:</strong> {meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
            <p><strong>Opening Prayer:</strong> {meeting.openingPrayer}</p>
            <p><strong>Sacrament Hymn:</strong> {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>

            <h3>Ward business</h3>
            <ul>
                {meeting.wardBusiness.length > 0 ? meeting.wardBusiness.map((item) => (
                    <li key={item.description}>{item.description}</li>
                )) : <li>None</li>}
            </ul>

            <p><strong>Stake business:</strong> {meeting.stakeBusiness ? "Yes" : "No"}</p>

            <h3>Speakers and musical numbers</h3>
            <ul>
                {meeting.speakers.map((speaker) => (
                    <li key={`${speaker.name}-${speaker.topic}`}>
                        {speaker.name}{speaker.topic ? `: ${speaker.topic}` : ""} ({speaker.type})
                    </li>
                ))}
            </ul>

            <p><strong>Closing Hymn:</strong> {meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
            <p><strong>Closing Prayer:</strong> {meeting.closingPrayer}</p>

            <h3>Announcements</h3>
            <ul>
                {meeting.announcements?.length ? meeting.announcements.map((announcement) => (
                    <li key={announcement}>{announcement}</li>
                )) : <li>None</li>}
            </ul>
        </article>
    );
}