import type { NextAuthConfig } from "next-auth";

const authConfig = {
    pages: {
        signIn: "/auth/signin",
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const pathname = nextUrl.pathname;
            const isProtectedRoute =
                pathname === "/meetings/new" ||
                /^\/meetings\/[^/]+\/edit\/?$/.test(pathname);

            return !isProtectedRoute || Boolean(auth?.user);
        },
    },
} satisfies NextAuthConfig;

export default authConfig;