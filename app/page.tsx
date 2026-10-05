import Link from "next/link";
import { auth } from "@/auth";
import MeetingDetails from "./components/MeetingDetails";
import { getMeetings } from "./lib/meetings-db";
import Image from "next/image";

type HomeProps = {
  searchParams: Promise<{ access?: string | string[] }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const access = Array.isArray(params.access) ? params.access[0] : params.access;
  const meetings = session?.user ? await getMeetings() : [];

  return (
    <div className="home-page">
      <div className="home-intro">
        <h1>Welcome to the Sacrament Meeting Planner</h1>
        <p>
          This application helps you plan and organize your sacrament meetings
          efficiently.
        </p>
        <div className="hero-image">
          <Image
            src="/church-image.jpg"
            alt="Church"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
      {!session?.user ? (
        <section className="meetings-content" aria-live="polite">
          {access === "signin" && (
            <p role="status">
              Sign in or create an account to view meetings.
            </p>
          )}
          <p>Meeting schedules are available to signed-in users.</p>
          <p>
            <Link className="text-link" href="/auth/signin">Sign in</Link>
            {" or "}
            <Link className="text-link" href="/auth/signup">create an account</Link>
            {" to continue."}
          </p>
        </section>
      ) : access === "admin" ? (
        <section className="meetings-content" role="status">
          <p>Admin access is required to create, edit, or delete meetings.</p>
        </section>
      ) : null}
      {session?.user && <MeetingDetails meetings={meetings} />}
    </div>
  );
}
