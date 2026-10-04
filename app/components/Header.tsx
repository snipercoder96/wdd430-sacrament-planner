import NavLinks from "./NavLinks";
import { auth, signOut } from "@/auth";

export default async function Header() {
    const session = await auth();

    return (
        <header>
            <h1>Sacrament Meeting Planner</h1>
            <NavLinks />
            {session?.user && (
                <form
                    action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                    }}
                >
                    <button className="sign-out-button" type="submit">
                        Sign out
                    </button>
                </form>
            )}
        </header>
    );
}