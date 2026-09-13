"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/planner", label: "Planner" },
        { to: "/about", label: "About" },
    ];

    return (
        <nav className="nav-links">
            <ul>
                {navLinks.map((link) => (
                    <li key={link.to}>
                        <Link
                            href={link.to}
                            className={pathname === link.to ? "active" : undefined}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}