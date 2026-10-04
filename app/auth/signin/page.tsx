import SignInForm from "@/app/components/SignInForm";

export default function SignInPage() {
    return (
        <section className="meetings-content sign-in-page">
            <div className="meetings-heading">
                <p className="section-eyebrow">Bishopric access</p>
                <h1>Sign in</h1>
            </div>
            <SignInForm />
        </section>
    );
}