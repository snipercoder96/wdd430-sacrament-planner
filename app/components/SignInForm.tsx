"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";

export default function SignInForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <form action={formAction} className="sign-in-form">
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                />
            </div>
            <button type="submit" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign in"}
            </button>
            {errorMessage && <p role="alert">{errorMessage}</p>}
        </form>
    );
}