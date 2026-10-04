import { neon } from "@neondatabase/serverless";

export type AuthUser = {
    id: number;
    email: string;
    name: string;
    passwordHash: string;
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL environment variable");
}

const sql = neon(databaseUrl);

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
    const rows = await sql`
        SELECT
            id,
            email,
            name,
            password_hash AS "passwordHash"
        FROM users
        WHERE email = ${email.trim().toLowerCase()}
        LIMIT 1
    `;

    return (rows[0] as unknown as AuthUser) ?? null;
}