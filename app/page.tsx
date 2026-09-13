import MeetingDetails from "./components/MeetingDetails";
import { getMeetings } from "./lib/meetings-db";

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
      </div>
      <MeetingDetails meetings={meetings} />
    </div>
  );
}
