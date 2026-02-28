import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AthleteConnect — The Professional Network for Athletes",
  description: "Showcase your stats, share match footage, build your career timeline, and get discovered by clubs and sponsors worldwide.",
  keywords: "athletes, sports, recruitment, stats, career, clubs, sponsors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: 52 }}>{children}</main>
      </body>
    </html>
  );
}
