import type { NextAuthConfig } from "next-auth";

const authConfig = {
    pages: {
        signIn: "/auth/signin",
    },
    providers: [],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                const role = token.role;
                session.user.role =
                    role === "admin" || role === "visitor" ? role : "visitor";
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const pathname = nextUrl.pathname;
            const isProtectedRoute =
                pathname === "/meetings/new" ||
                /^\/meetings\/[^/]+\/edit\/?$/.test(pathname);

            if (!isProtectedRoute) {
                return true;
            }

            if (!auth?.user) {
                return false;
            }

            if (auth.user.role !== "admin") {
                return Response.redirect(new URL("/", nextUrl));
            }

            return true;
        },
    },
} satisfies NextAuthConfig;

export default authConfig;