import Link from "next/link";
import SignUpForm from "@/app/components/SignUpForm";

export default function SignUpPage() {
    return (
        <section className="meetings-content sign-in-page">
            <div className="meetings-heading">
                <p className="section-eyebrow">Sacrament planner</p>
                <h1>Create an account</h1>
                <p>New accounts can browse meetings. Admin access is assigned separately.</p>
            </div>
            <SignUpForm />
            <p>
                Already have an account?{" "}
                <Link className="text-link" href="/auth/signin">Sign in</Link>
            </p>
        </section>
    );
}
