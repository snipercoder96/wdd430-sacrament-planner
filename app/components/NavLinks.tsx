"use client"; // This doesnrt run servers side
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "../lib/auth-actions";

// ✅ Passses requirement for having use client and usePathName

export default function NavLinks({ isSignedIn }: { isSignedIn: boolean }) {
    const pathname = usePathname();
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/meetings", label: "Meetings" },
        { to: "/about", label: "About" },
    ];

    return (
        <nav className="nav-links">
            <ul>
                {navLinks.map((link) => (
                    <li key={link.to}>
                        <Link
                            href={link.to}
                            className={pathname === link.to ? "active" : undefined} // ❗To fix navigation
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
                {isSignedIn ? (
                    <li>
                        <form action={signOutAction}>
                            <button className="sign-out-button" type="submit">
                                Sign out
                            </button>
                        </form>
                    </li>
                ) : (
                    <li>
                        <Link
                            href="/auth/signin"
                            className={pathname === "/auth/signin" ? "active" : undefined}
                        >
                            Sign in
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}