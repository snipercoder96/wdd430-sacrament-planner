import type { ReactNode } from "react";

// ✅ Passed Requirement for existing layout
export default function MeetingsLayout({ children }: { children: ReactNode }) {
    return <div className="meetings-page">{children}</div>;
}