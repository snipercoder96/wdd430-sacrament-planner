import NavLinks from "./NavLinks";
import { auth } from "@/auth";

export default async function Header() {
    const session = await auth();

    return (
        <header>
            <h1>Sacrament Meeting Planner</h1>
            <NavLinks isSignedIn={Boolean(session?.user)} />
        </header>
    );
}