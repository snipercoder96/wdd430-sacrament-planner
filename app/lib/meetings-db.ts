import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const databaseUrl =
    process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error(
        'Missing DATABASE_URL or SACRAMENT_DB_DATABASE_URL environment variable'
    );
}

const sql = neon(databaseUrl);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
    query: string = '',
    currentPage: number = 1,
    date?: string
): Promise<SacramentMeeting[]> {
    const searchTerm = `%${query}%`;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      (${date ?? null}::date IS NULL OR date = ${date ?? null}::date)
      AND (
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
      )
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
    return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
    query: string = '',
    date?: string
): Promise<number> {
    const searchTerm = `%${query}%`;
    const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      (${date ?? null}::date IS NULL OR date = ${date ?? null}::date)
      AND (
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
      )
  `;
    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
    id: number
): Promise<SacramentMeeting | null> {
    const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutation stubs — will be wired to the database in Week 04
export async function addMeeting(
    data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
    try {
        const rows = await sql`INSERT INTO meetings (
        date,
        meeting_type,
        presiding,
        conducting,
        announcements,
        opening_hymn,
        opening_prayer,
        ward_business,
        stake_business,
        sacrament_hymn,
        speakers,
        closing_hymn,
        closing_prayer
        ) VALUES
        (
            ${data.date}::date,
            ${data.meetingType},
            ${data.presiding},
            ${data.conducting},
            ${data.announcements},
            ${data.openingHymn},
            ${data.openingPrayer},
            ${data.wardBusiness},
            ${data.stakeBusiness},
            ${data.sacramentHymn},
            ${data.speakers},
            ${data.closingHymn},
            ${data.closingPrayer}
        )
        RETURNING
            id,
            to_char(date, 'YYYY-MM-DD') AS "date",
            meeting_type AS "meetingType",
            presiding,
            conducting,
            announcements,
            opening_hymn AS "openingHymn",
            opening_prayer AS "openingPrayer",
            ward_business AS "wardBusiness",
            stake_business AS "stakeBusiness",
            sacrament_hymn AS "sacramentHymn",
            speakers,
            closing_hymn AS "closingHymn",
            closing_prayer AS "closingPrayer"`;

        return rows[0] as unknown as SacramentMeeting;
    } catch (error) {
        throw new Error('Unable to add meeting', { cause: error });
    }
}

export async function updateMeeting(
    id: number,
    updates: Partial<Omit<SacramentMeeting, 'id'>>
): Promise<SacramentMeeting | null> {
    try {
        const rows = await sql`
            UPDATE meetings
            SET
                date = CASE WHEN ${updates.date !== undefined}
                    THEN ${updates.date}::date ELSE date END,
                meeting_type = CASE WHEN ${updates.meetingType !== undefined}
                    THEN ${updates.meetingType} ELSE meeting_type END,
                presiding = CASE WHEN ${updates.presiding !== undefined}
                    THEN ${updates.presiding} ELSE presiding END,
                conducting = CASE WHEN ${updates.conducting !== undefined}
                    THEN ${updates.conducting} ELSE conducting END,
                announcements = CASE WHEN ${updates.announcements !== undefined}
                    THEN ${updates.announcements} ELSE announcements END,
                opening_hymn = CASE WHEN ${updates.openingHymn !== undefined}
                    THEN ${updates.openingHymn} ELSE opening_hymn END,
                opening_prayer = CASE WHEN ${updates.openingPrayer !== undefined}
                    THEN ${updates.openingPrayer} ELSE opening_prayer END,
                ward_business = CASE WHEN ${updates.wardBusiness !== undefined}
                    THEN ${updates.wardBusiness} ELSE ward_business END,
                stake_business = CASE WHEN ${updates.stakeBusiness !== undefined}
                    THEN ${updates.stakeBusiness} ELSE stake_business END,
                sacrament_hymn = CASE WHEN ${updates.sacramentHymn !== undefined}
                    THEN ${updates.sacramentHymn} ELSE sacrament_hymn END,
                speakers = CASE WHEN ${updates.speakers !== undefined}
                    THEN ${updates.speakers} ELSE speakers END,
                closing_hymn = CASE WHEN ${updates.closingHymn !== undefined}
                    THEN ${updates.closingHymn} ELSE closing_hymn END,
                closing_prayer = CASE WHEN ${updates.closingPrayer !== undefined}
                    THEN ${updates.closingPrayer} ELSE closing_prayer END
            WHERE id = ${id}
            RETURNING
                id,
                to_char(date, 'YYYY-MM-DD') AS "date",
                meeting_type AS "meetingType",
                presiding,
                conducting,
                announcements,
                opening_hymn AS "openingHymn",
                opening_prayer AS "openingPrayer",
                ward_business AS "wardBusiness",
                stake_business AS "stakeBusiness",
                sacrament_hymn AS "sacramentHymn",
                speakers,
                closing_hymn AS "closingHymn",
                closing_prayer AS "closingPrayer"
        `;

        return (rows[0] as unknown as SacramentMeeting) ?? null;
    } catch (error) {
        throw new Error('Unable to update meeting', { cause: error });
    }
}

export async function deleteMeeting(id: number): Promise<boolean> {
    try {
        const rows = await sql`
            DELETE FROM meetings
            WHERE id = ${id}
            RETURNING id
        `;

        return rows.length > 0;
    } catch (error) {
        throw new Error('Unable to delete meeting', { cause: error });
    }
}

export async function getMeetingByDate(
    date: string
): Promise<SacramentMeeting | null> {

    try {
        const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE date = ${date}::date
    `;
        if (rows.length === 0) {
            return null;
        }

        return rows[0] as unknown as SacramentMeeting;
    } catch {
        return null;
    }
}