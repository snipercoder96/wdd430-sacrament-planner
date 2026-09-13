// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Headers from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Headers />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

