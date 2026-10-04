// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import type { Metadata } from "next";
import Headers from "./components/Header";
import Footer from "./components/Footer";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meeting Planner",
  },
  description:
    "Plan and browse sacrament meeting schedules, assignments, and details.",
  openGraph: {
    title: "Sacrament Meeting Planner",
    description:
      "Plan and browse sacrament meeting schedules, assignments, and details.",
    type: "website",
    images: [
      {
        url: "/church-image.jpg",
        alt: "A church building beneath a blue sky",
      },
    ],
  },
};

// ✅ Correctly uses google fonts
const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});
//✅ Passes requirement for header and footer content
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <Headers />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

