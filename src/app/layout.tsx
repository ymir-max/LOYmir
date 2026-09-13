import type { Metadata } from "next";
import { Spectral, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RegisterModalProvider } from "@/components/RegisterModal";

const displayFont = Spectral({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Astral",
  description:
    "Astral — an Unreal Engine 5 MMORPG server. Register, download the client and play.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[color:var(--bg-base)] text-[color:var(--text-pale)]">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1200px_800px_at_50%_-10%,var(--bg-panel)_0%,var(--bg-base)_60%),linear-gradient(to_bottom,var(--bg-base),var(--bg-panel),var(--bg-base))]" />
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.5\"/></svg>')",
            backgroundSize: "256px 256px",
          }}
        />
        <RegisterModalProvider>
          <Header />
          {/* Ambient orbs shared across all routes */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="ambient-orb-a -top-40 -left-40 h-[60vmax] w-[60vmax]" />
            <div className="ambient-orb-b -bottom-60 right-[-20%] h-[50vmax] w-[50vmax]" />
          </div>
          <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
          <Footer />
        </RegisterModalProvider>
      </body>
    </html>
  );
}
