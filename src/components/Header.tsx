"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [hideLogo, setHideLogo] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setHideLogo(y > 110);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="relative w-full overflow-visible border-b border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)]/70 backdrop-blur sticky top-0 z-50">
      {/* Absolutely positioned oversized emblem pinned to the viewport corner */}
      <Link
        href="/"
        className="group absolute left-5 top-3 z-[60] transition-transform will-change-transform hover:scale-[1.03] hover:shadow-[0_0_22px_rgba(232,217,181,0.14)]"
        aria-label="Legend of Ymir"
        style={{
          opacity: hideLogo ? 0 : 1,
          pointerEvents: hideLogo ? "none" : "auto",
          transition: "opacity 380ms ease",
        }}
      >
        <Image
          src="/images/logo-bronze.png"
          alt="Legend of Ymir"
          width={130}
          height={130}
          priority
          className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] lg:h-[130px] lg:w-[130px] drop-shadow-[0_0_10px_rgba(232,217,181,0.12)]"
        />
        <span className="sr-only">Legend of Ymir</span>
      </Link>

      <div className="relative mx-auto max-w-6xl px-4 py-4 flex items-center justify-between overflow-visible">
        {/* Placeholder to keep layout width on the left while the real logo is absolutely positioned */}
        <div className="w-12 sm:w-16" aria-hidden="true" />

        <nav className="flex items-center gap-4 sm:gap-6 text-sm">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--accent-bronze)]/45 bg-black/30 px-4 py-2 text-base font-semibold text-[color:var(--accent-cream)]/90 shadow-[inset_0_0_0_1px_rgba(168,135,90,0.25)] transition-all hover:bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] hover:text-[color:var(--bg-base)] hover:shadow-[0_0_22px_0_rgba(232,217,181,0.18),inset_0_0_0_1px_rgba(168,135,90,0.45)] active:scale-[0.98]"
          >
            Shop
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--accent-bronze)]/45 bg-black/30 px-4 py-2 text-base font-semibold text-[color:var(--accent-cream)]/90 shadow-[inset_0_0_0_1px_rgba(168,135,90,0.25)] transition-all hover:bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] hover:text-[color:var(--bg-base)] hover:shadow-[0_0_22px_0_rgba(232,217,181,0.18),inset_0_0_0_1px_rgba(168,135,90,0.45)] active:scale-[0.98]"
          >
            Events
          </Link>
        </nav>

        {/* Social icons */}
        <div className="ml-4 flex items-center gap-4 text-[color:var(--accent-bronze)]">
          {/* Facebook (lucide-react has official mark) */}
          <a
            href="https://facebook.com/OfficialYMIR"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-[1.08] hover:text-[color:var(--accent-cream)]"
            aria-label="Facebook — OfficialYMIR"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          {/* Telegram minimal plane */}
          <a
            href="https://t.me/ymirlegend"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-[1.08] hover:text-[color:var(--accent-cream)]"
            aria-label="Telegram — ymirlegend"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              <path d="M22 2L11 13" />
            </svg>
          </a>
          {/* Discord minimal Clyde outline */}
          <a
            href="https://discord.gg/OfficialLegendOfYMIR"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-[1.08] hover:text-[color:var(--accent-cream)]"
            aria-label="Discord — OfficialLegendOfYMIR"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
              <path d="M7.5 18.5c3.5 1.7 5.5 1.5 9 0l1 1.5c2-.4 3-1 3-1.5 0-5-2-9-6-10l-1 .9c-1.2-.3-2.3-.3-3.5 0l-1-.9C5.5 9 3.5 13 3.5 18.5c0 .5 1 .9 3 1.5l1-1.5z" />
              <circle cx="9.5" cy="13" r="1.2" />
              <circle cx="14.5" cy="13" r="1.2" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
