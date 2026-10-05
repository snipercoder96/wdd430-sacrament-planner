import { neon } from "@neondatabase/serverless";

export type UserRole = "admin" | "visitor";

export type AuthUser = {
    id: number;
    email: string;
    name: string;
    passwordHash: string;
    role: UserRole;
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
            password_hash AS "passwordHash",
            role
        FROM users
        WHERE email = ${email.trim().toLowerCase()}
        LIMIT 1
    `;

    return (rows[0] as unknown as AuthUser) ?? null;
}

export async function createVisitorUser(
    name: string,
    email: string,
    passwordHash: string
): Promise<boolean> {
    const rows = await sql`
        INSERT INTO users (name, email, password_hash, role)
        VALUES (${name}, ${email}, ${passwordHash}, 'visitor')
        ON CONFLICT (email) DO NOTHING
        RETURNING id
    `;

    return rows.length > 0;
}