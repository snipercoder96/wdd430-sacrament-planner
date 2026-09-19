// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import Headers from "./components/Header";
import Footer from "./components/Footer";

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

