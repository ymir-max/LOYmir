"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LINKS } from "@/config/links";
import { useRegisterModal } from "@/components/RegisterModal";

export default function Header() {
  const [hideLogo, setHideLogo] = useState(false);
  const { open: openRegister } = useRegisterModal();

  useEffect(() => {
    const onScroll = () => setHideLogo((window.scrollY || 0) > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full overflow-visible border-b border-[color:var(--text-muted)]/20 bg-[color:var(--bg-panel)]/70 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-3">
        <Link
          href="/"
          aria-label="Astral"
          className="absolute left-2 top-1 z-[60] transition-transform hover:scale-[1.02] sm:left-4"
          style={{
            opacity: hideLogo ? 0 : 1,
            pointerEvents: hideLogo ? "none" : "auto",
            transition: "opacity 320ms ease",
          }}
        >
          <Image
            src="/images/logo-astral-full.png"
            alt="Astral"
            width={1713}
            height={1209}
            priority
            className="h-[88px] w-auto sm:h-[118px] lg:h-[140px]"
          />
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <a
            href={LINKS.cumulativeRewards}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--accent-bronze)]/45 bg-black/30 px-3 py-2 text-xs font-semibold text-[color:var(--accent-cream)]/90 shadow-[inset_0_0_0_1px_rgba(168,135,90,0.25)] transition-all hover:bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] hover:text-[color:var(--bg-base)] active:scale-[0.98] sm:px-4 sm:text-sm"
          >
            Cumulative Rewards
          </a>
          <button
            type="button"
            onClick={openRegister}
            className="inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold text-[color:var(--bg-base)] shadow-[inset_0_0_0_1px_rgba(168,135,90,0.45)] bg-[linear-gradient(180deg,var(--accent-cream),var(--accent-bronze))] transition-all hover:shadow-[0_0_22px_0_rgba(232,217,181,0.2)] active:scale-[0.98] sm:px-4 sm:text-sm"
          >
            Register
          </button>

          <span className="ml-1 hidden h-5 w-[1px] bg-[color:var(--text-muted)]/30 sm:block" />

          <div className="hidden items-center gap-3 text-[color:var(--accent-bronze)] sm:flex">
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-[1.08] hover:text-[color:var(--accent-cream)]"
              aria-label="Discord"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
                <path d="M7.5 18.5c3.5 1.7 5.5 1.5 9 0l1 1.5c2-.4 3-1 3-1.5 0-5-2-9-6-10l-1 .9c-1.2-.3-2.3-.3-3.5 0l-1-.9C5.5 9 3.5 13 3.5 18.5c0 .5 1 .9 3 1.5l1-1.5z" />
                <circle cx="9.5" cy="13" r="1.2" />
                <circle cx="14.5" cy="13" r="1.2" />
              </svg>
            </a>
            <a
              href={LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-[1.08] hover:text-[color:var(--accent-cream)]"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block">
                <path d="M15 3c.5 2.5 2 4 4.5 4.3" />
                <path d="M15 3v11.5a4.5 4.5 0 1 1-4.5-4.5c.3 0 .7 0 1 .1" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
