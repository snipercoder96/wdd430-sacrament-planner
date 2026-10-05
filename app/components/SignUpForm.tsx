"use client";

import { useActionState } from "react";
import { signUpAction, type FormState } from "@/app/lib/actions";

const initialState: FormState = {};

export default function SignUpForm() {
    const [state, formAction, isPending] = useActionState(
        signUpAction,
        initialState
    );

    const errorFor = (field: string) => state.errors?.[field] ?? "";

    return (
        <form action={formAction} className="sign-in-form">
            <p aria-live="polite">{state.message}</p>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    aria-invalid={Boolean(errorFor("name"))}
                    aria-describedby="name-error"
                />
                <p id="name-error" aria-live="polite">{errorFor("name")}</p>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errorFor("email"))}
                    aria-describedby="email-error"
                />
                <p id="email-error" aria-live="polite">{errorFor("email")}</p>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={12}
                    maxLength={72}
                    aria-invalid={Boolean(errorFor("password"))}
                    aria-describedby="password-error"
                />
                <p id="password-error" aria-live="polite">{errorFor("password")}</p>
            </div>
            <button type="submit" disabled={isPending}>
                {isPending ? "Creating account..." : "Create account"}
            </button>
        </form>
    );
}
