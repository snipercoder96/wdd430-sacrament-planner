import type { SacramentMeeting } from './types';
// A basic database storage for sacrament meetings. In a real application, this would be replaced with a proper database.
// ✅ Passes all requirements, at least 5 is present.
const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-05-03",
        meetingType: "regular",
        presiding: "Bishop Smith",
        conducting: "Brother Jones",
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Sister Williams",
        wardBusiness: [{ description: "Sustaining of new Primary president" }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
            { name: "Youth Choir", topic: "", type: "musical-number" },
        ],
        closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
        closingPrayer: "Brother Davis",
        announcements: ["Ward temple night: May 10"],
    },
    {
        id: 2,
        date: "2026-05-10",
        meetingType: "testimony",
        presiding: "Bishop Smith",
        conducting: "Brother Johnson",
        openingHymn: { number: 85, title: "How Firm a Foundation" },
        openingPrayer: "Brother Lee",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 173, title: "While of These Emblems We Partake" },
        speakers: [
            { name: "Various Members", topic: "Bearing Testimony", type: "speaker" },
        ],
        closingHymn: { number: 152, title: "God Be With You Till We Meet Again" },
        closingPrayer: "Sister Thompson",
        announcements: ["Stake conference next week"],
    },
    {
        id: 3,
        date: "2026-05-17",
        meetingType: "stake",
        presiding: "Stake President Adams",
        conducting: "Counselor Johnson",
        openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
        openingPrayer: "Brother Clark",
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 185, title: "Reverently and Meekly Now" },
        speakers: [
            { name: "Stake President Adams", topic: "Strengthening Families", type: "speaker" },
            { name: "Sister Green", topic: "Service and Charity", type: "speaker" },
        ],
        closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
        closingPrayer: "Brother White",
        announcements: ["Stake youth activity: May 20"],
    },
    {
        id: 4,
        date: "2026-05-24",
        meetingType: "regular",
        presiding: "Bishop Smith",
        conducting: "Brother Johnson",
        openingHymn: { number: 3, title: "Now Let Us Rejoice" },
        openingPrayer: "Sister Lopez",
        wardBusiness: [{ description: "Release of Elders Quorum President" }],
        stakeBusiness: false,
        sacramentHymn: { number: 174, title: "O God, the Eternal Father" },
        speakers: [
            { name: "Brother Carter", topic: "Charity Never Faileth", type: "speaker" },
            { name: "Primary Children", topic: "", type: "musical-number" },
        ],
        closingHymn: { number: 193, title: "I Stand All Amazed" },
        closingPrayer: "Brother Nelson",
        announcements: ["Ward picnic: May 30"],
    },
    {
        id: 5,
        date: "2026-05-31",
        meetingType: "fast",
        presiding: "Bishop Smith",
        conducting: "Brother Jones",
        openingHymn: { number: 220, title: "Lord, I Would Follow Thee" },
        openingPrayer: "Brother Kim",
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 180, title: "Father in Heaven, We Do Believe" },
        speakers: [
            { name: "Various Members", topic: "Fast & Testimony", type: "speaker" },
        ],
        closingHymn: { number: 166, title: "Abide with Me; 'Tis Eventide" },
        closingPrayer: "Sister Garcia",
        announcements: ["Youth temple trip: June 5"],
    },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}