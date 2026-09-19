"use client"; // This doesnrt run servers side
import Link from "next/link";
import { usePathname } from "next/navigation";

// ✅ Passses requirement for having use client and usePathName

export default function NavLinks() {
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
            </ul>
        </nav>
    );
}