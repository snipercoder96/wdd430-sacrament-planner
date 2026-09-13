import MeetingDetails from "./components/MeetingDetails";
import { getMeetings } from "./lib/meetings-db";
import Image from "next/image";

export default function Home() {
  const meetings = getMeetings();

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
      <MeetingDetails meetings={meetings} />
    </div>
  );
}
