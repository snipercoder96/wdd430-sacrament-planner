import type { DefaultSession } from "next-auth";
import type { UserRole } from "../app/lib/users-db";

declare module "next-auth" {
    interface User {
        role: UserRole;
    }

    interface Session {
        user: {
            role: UserRole;
        } & DefaultSession["user"];
    }
}
