import type { SacramentMeeting } from "../lib/types";

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
    return (
        <div className="meeting-card">
            <h2>{meeting.meetingType} meeting</h2>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Presiding:</strong> {meeting.presiding}</p>
            <p><strong>Conducting:</strong> {meeting.conducting}</p>
            <p><strong>Opening Hymn:</strong> {meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
            <p><strong>Sacrament Hymn:</strong> {meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
            <p><strong>Closing Hymn:</strong> {meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
            {meeting.speakers.length > 0 && (
                <div>
                    <strong>Speakers:</strong>
                    <ul>
                        {meeting.speakers.map((speaker) => (
                            <li key={`${speaker.name}-${speaker.topic}`}>{speaker.name}: {speaker.topic}</li>
                        ))}
                    </ul>
                </div>
            )}
            {meeting.announcements && meeting.announcements.length > 0 && (
                <div>
                    <strong>Announcements:</strong>
                    <ul>
                        {meeting.announcements.map((announcement) => (
                            <li key={announcement}>{announcement}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}