// ✅ Yes it does succesfully export all required props.
//------------
export type MeetingType =
    | 'testimony'
    | 'fast'
    | 'regular'
    | 'stake'
    | 'general';

export interface Hymn {
    number: number;
    title: string;
}

export interface SpeakerItem {
    name: string;
    topic: string;
    type: 'speaker' | 'musical-number';
}

export interface WardBusinessItem {
    description: string;
}

//---------------

// this collects all the relevant interface above into a single interface for the sacrament meeting
export interface SacramentMeeting {
    id: number;
    date: string;              // ISO date string: 'YYYY-MM-DD'
    meetingType: MeetingType;
    presiding: string;
    conducting: string;
    announcements?: string[];
    openingHymn: Hymn;
    openingPrayer: string;
    wardBusiness: WardBusinessItem[];
    stakeBusiness: boolean;
    sacramentHymn: Hymn;
    speakers: SpeakerItem[];
    closingHymn: Hymn;
    closingPrayer: string;
}