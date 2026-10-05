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
            const isMeetingRoute =
                pathname === "/meetings" || pathname.startsWith("/meetings/");
            const isAdminRoute =
                pathname === "/meetings/new" ||
                /^\/meetings\/[^/]+\/edit\/?$/.test(pathname);

            if (!isMeetingRoute) {
                return true;
            }

            if (!auth?.user) {
                const homeUrl = nextUrl.clone();
                homeUrl.pathname = "/";
                homeUrl.search = "?access=signin";
                return Response.redirect(homeUrl);
            }

            if (isAdminRoute && auth.user.role !== "admin") {
                const homeUrl = nextUrl.clone();
                homeUrl.pathname = "/";
                homeUrl.search = "?access=admin";
                return Response.redirect(homeUrl);
            }

            return true;
        },
    },
} satisfies NextAuthConfig;

export default authConfig;